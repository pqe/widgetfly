Widgetfly.Widget = (function(global) {'use strict';
	// Widget
	// -------------
	var Widget = function(options) {
		this.id = Widgetfly.Utils.uniqueId('widget');
		this.started = false;
		return this;
	};

	Widget.DEFAULTS = Widgetfly.Utils.extend({},{
		autoGrow : false,
		autoStart: true,
		show : true,
		spinner : '<div class="widgetfly wf-spinner"><div class="rect1"></div><div class="rect2"></div><div class="rect3"></div><div class="rect4"></div><div class="rect5"></div></div>'
	});

	Widgetfly.Utils.inherit(Widget, Widgetfly.Events);

	Widget.prototype.getId = function() {
		return this.id;
	};

	Widget.prototype.style = function() {
		var r = function(el){
			if(el.className){
				Widgetfly.Utils.addClass(el, el.className);
			}
			var i,j, nodes = el.childNodes;
			for(i in nodes){
				if(nodes[i].className && (nodes[i].className.indexOf('widgetfly') === 0 || nodes[i].className.indexOf('wf-') === 0)){

					Widgetfly.Utils.addClass(nodes[i], nodes[i].className);
				}
				if(nodes[i].childNodes){
					for(j in nodes[i].childNodes){
						r(nodes[i].childNodes[j]);
					}
				}
			}
		};
		r(this.el);
	};

	Widget.prototype.getIframe = function(){
		var iframe = this.el.querySelector('iframe');
		if(!iframe){
			if(this.el.tagName === 'IFRAME'){
				iframe = this.el;
			}
		}
		return iframe;
	};

	Widget.prototype.onStart = function(callback) {
		if (Widgetfly.Utils.isFunction(callback)) {
			this.on('onStart', callback);
		}
	};

	Widget.prototype.start = function() {
		//console.log('Widget.Action start');
		if(this.started){ return; }

		var handlers = Widgetfly.Mediator.getActionHandlers(this.id);
		if (handlers && Widgetfly.Utils.isFunction(handlers.onStart)) {
			handlers.onStart.apply(this,arguments);
		}

		if(this.spinner){
			if(this.spinner.parentNode){
				this.spinner.parentNode.removeChild(this.spinner);
			}
		}

		if(Widgetfly.Utils.isTrue(this.options.show)){
			this.show();
		}else{
			this.hide();
		}
		this.started = true;
	};

	Widget.prototype.onHide = function(callback) {
		if (Widgetfly.Utils.isFunction(callback)) {
			this.on('onHide', callback);
		}
	};

	Widget.prototype.hide = function() {
		//console.log('Widget.Action hide');
		Widgetfly.Utils.removeClass(this.el, 'wf-show wf-hide');
		Widgetfly.Utils.addClass(this.el, 'wf-hide');
		var handlers = Widgetfly.Mediator.getActionHandlers(this.id);
		if (handlers && Widgetfly.Utils.isFunction(handlers.onHide)) {
			handlers.onHide.apply(this,arguments);
		}
	};

	Widget.prototype.toggle = function() {
			if(this.isShow()){
				this.hide();
			}else{
				this.show();
			}
	};

	Widget.prototype.onShow = function(callback) {
		if (Widgetfly.Utils.isFunction(callback)) {
			this.on('onShow', callback);
		}
	};

	Widget.prototype.isShow = function() {
		var result = Widgetfly.Utils.hasClass(this.el,'wf-show');
		this.trigger('_isShow',result);
		return result;
	};

	Widget.prototype.show = function() {
		//console.log('Widget.Action show');
		var handlers;
		Widgetfly.Utils.removeClass(this.el, 'wf-show wf-hide');
		Widgetfly.Utils.addClass(this.el, 'wf-show');
		handlers = Widgetfly.Mediator.getActionHandlers(this.id);
		if (handlers && Widgetfly.Utils.isFunction(handlers.onShow)) {
			handlers.onShow.apply(this,arguments);
		}
		this.trigger('_onShow');
	};

	Widget.prototype.onBeforeClose = function(callback) {
		if (Widgetfly.Utils.isFunction(callback)) {
			this.on('onBeforeClose', callback);
		}
	};

	Widget.prototype.close = function() {
		//console.log('Widget.Action close');
		var r, self = this, handlers;
		handlers = Widgetfly.Mediator.getActionHandlers(this.id);
		if (handlers && Widgetfly.Utils.isFunction(handlers.onBeforeClose)) {
			r = handlers.onBeforeClose.apply(this,arguments);
		}
		if(r !== false){
			this.trigger('_onClose');
			Widgetfly.Mediator.unregister(this.id, function() {
				self.container.removeChild(self.el);
			});
		}
	};

	Widget.prototype.register = function() {
		var nowScripts = document.currentScript;
		//console.log(this);
		Widgetfly.Mediator.register(this.id, this);
		if(nowScripts){
			nowScripts.setAttribute('data-id', this.id);
		}
	};

	Widget.prototype.render = function() {
		var self = this, src, iframe, origin, urlOptions;
		if (window.location.protocol === 'file:') {
			origin = window.location.protocol + '//' + window.location.pathname;
		} else {
			origin = window.location.protocol + '//' + window.location.hostname + (parseInt(window.location.port,10) &&  window.location.port !== 80 ? (':' + window.location.port) : '');
		}

		urlOptions = {
			origin : origin,
			options : this.options.options,
			autoGrow : this.options.autoGrow,
			autoStart : this.options.autoStart
		};

		this.spinner = Widgetfly.Utils.toElement(this.options.spinner);

		this.el = Widgetfly.Utils.toElement(this.options.template);

		iframe = this.getIframe();

		iframe.setAttribute('name', this.id);

		if (this.options.src.indexOf('#') === -1) {
			src = this.options.src + '#';
		} else {
			src = this.options.src.substring(0,this.options.src.indexOf('#')) + '#';
		}

		src = src + encodeURIComponent(JSON.stringify(urlOptions));

		iframe.onload = function(e){
			if(Widgetfly.Utils.isTrue(self.options.autoStart)){
				var timerId, run = 0, ack = false;

				self.on('ack',function(){
					ack = true;
					clearInterval(timerId);
				});

				timerId = setInterval(function(){
					run++;
					if(run > 3) {
						clearInterval(timerId);
						if(!ack){
							self.start();
						}
					}else{
						if(ack){
							clearInterval(timerId);
						}
					}
					self.trigger('ack');
				},400);

			}
		};

		iframe.setAttribute('src', src);

		return iframe;
	};

	Widget.prototype.sizeChange = function(size){
		if(this.isShow()){
			Widgetfly.Utils.innerStyle(this.iframe,{size: 'height:' + ((typeof size.height === 'string') ? size.height : (String(size.height) + 'px'))});
		}
	};

	return Widget;
})(this);
