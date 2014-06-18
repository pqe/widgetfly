Widgetfly.Widget = (function(global) {'use strict';
	// Widget
	// -------------
	var Widget = function() {
		this.id = Widgetfly.Utils.uniqueId('widget');
		return this;
	};

	Widgetfly.Utils.inherit(Widget, Widgetfly.Events);

	Widget.prototype.getId = function() {
		return this.id;
	};
	
	Widget.prototype.css = function() {
		Widgetfly.Utils.addClass(this.el, 'widgetfly');
	};

	Widget.prototype.onStart = function(callback) {
		if (Widgetfly.Utils.isFunction(callback)) {
			this.on('onStart', callback);
		}
	};

	Widget.prototype.start = function() {
		console.log('Widget.Action start');
		var handlers = Widgetfly.Mediator.getActionHandlers(this.id);
		if (handlers && Widgetfly.Utils.isFunction(handlers.onStart)) {
			handlers.onStart();
		}
	};

	Widget.prototype.onHide = function(callback) {
		if (Widgetfly.Utils.isFunction(callback)) {
			this.on('onHide', callback);
		}
	};

	Widget.prototype.hide = function() {
		console.log('Widget.Action hide');
		Widgetfly.Utils.removeClass(this.el, 'hide show');
		Widgetfly.Utils.addClass(this.el, 'hide');
		var handlers = Widgetfly.Mediator.getActionHandlers(this.id);
		if (handlers && Widgetfly.Utils.isFunction(handlers.onHide)) {
			handlers.onHide();
		}
	};

	Widget.prototype.onShow = function(callback) {
		if (Widgetfly.Utils.isFunction(callback)) {
			this.on('onShow', callback);
		}
	};

	Widget.prototype.show = function() {
		console.log('Widget.Action show');
		var self = this, handlers;
		Widgetfly.Utils.removeClass(this.el, 'show hide');
		Widgetfly.Utils.addClass(this.el, 'show');
		handlers = Widgetfly.Mediator.getActionHandlers(this.id);
		if (handlers && Widgetfly.Utils.isFunction(handlers.onShow)) {
			handlers.onShow();
		}
	};

	Widget.prototype.onBeforeClose = function(callback) {
		if (Widgetfly.Utils.isFunction(callback)) {
			this.on('onBeforeClose', callback);
		}
	};

	Widget.prototype.close = function() {
		console.log('Widget.Action close');
		var r, self = this, handlers;
		handlers = Widgetfly.Mediator.getActionHandlers(this.id);
		if (handlers && Widgetfly.Utils.isFunction(handlers.onBeforeClose)) {
			r = handlers.onBeforeClose();
		}
		if(r !== false){
			Widgetfly.Mediator.unregister(this.id, function() {
				self.container.removeChild(self.el);
			});
		}
	};

	Widget.prototype.register = function() {
		var nowScripts = document.getElementsByTagName('script'), cScript = nowScripts[nowScripts.length - 1];
		//console.log(this);
		Widgetfly.Mediator.register(this.id, this);
		cScript.setAttribute('data-id', this.id);
	};

	Widget.prototype.render = function() {
		var src, iframe = document.createElement('iFrame'), origin, urlOptions;
		if (window.location.protocol === 'file:') {
			origin = window.location.href;
		} else {
			origin = window.location.protocol + '//' + window.location.host;
		}

		urlOptions = {
			origin : origin
		};

		iframe.setAttribute('name', this.id);
		//console.log(this.options.src);
		if (this.options.src.indexOf('#') === -1) {
			src = this.options.src + '#';
		} else {
			src = this.options.src + '&';
		}

		src = src + 'wo=' + decodeURIComponent(JSON.stringify(urlOptions));

		iframe.setAttribute('src', src);
		return iframe;
	};

	return Widget;
})(this);
