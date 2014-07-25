Widgetfly.Popover = (function(global) {'use strict';
	// Widgetfly.Popover
	// -------------
	var Popover = function(options) {
		Widgetfly.Widget.apply(this, arguments);
		this.options = Widgetfly.Utils.extend({}, Popover.DEFAULTS,options);
		this.container = window.document.querySelector('body');

		if (options === undefined || options.target === undefined || options.target === null) {
			return false;
		}

		this.register(this.id);
		
		if(typeof options.target === 'string'){
			this.target = document.querySelector(options.target);
		}else if(typeof options.target === 'object'){
			this.target = options.target;
		}
		
		if (this.target && this.target.length <= 0) {
			return false;
		}
		
		this.render();
		
		this.iframe = this.getIframe();
		
		this.style();
		
		if (this.container) {
			//this.container.appendChild(this.spinner);
			this.container.appendChild(this.el);
		}
		return this;
	};
	
	Popover.DEFAULTS = Widgetfly.Utils.extend({}, Widgetfly.Widget.DEFAULTS,{
		autoGrow : false,
		show : true,
		placement : 'right',
		template : '<div class="widgetfly wf-popover wf-hide wf-animated-fadeIn wf-animated-popover"><div class="wf-arrow"></div><iframe allowtransparency="true" frameborder="0" tabindex="0" title="Widgetfly Widget" width="100%" verticalscrolling="no" scrolling="no" horizontalscrolling="no" class="wf-popover-content"></iframe></div>',
		options : {
					
		}
	});

	Widgetfly.Utils.inherit(Popover, Widgetfly.Widget);

	
	Popover.prototype.style = function() {
		var placement = this.options.placement;
		if(!placement){
			placement = 'right';
		}
		Widgetfly.Utils.addClass(this.el, 'wf-' + placement);
		Widgetfly.Widget.prototype.style.apply(this, arguments);
	};
	
	Popover.prototype.applyPlacement = function () {
		var top,left,offset = Widgetfly.Utils.offset(this.target),
			tg  = Widgetfly.Utils.actual(this.target),
			el = Widgetfly.Utils.actual(this.el);
			
		if(this.options.placement === 'left'){
			top = offset.top + Math.round(tg.height / 2) - Math.round(el.height / 2);
			left = offset.left - el.width;
		}else if(this.options.placement === 'top'){
			top =  offset.top - el.height;
			left = offset.left + Math.round(tg.width / 2) - Math.round(el.width / 2);
		}else if(this.options.placement === 'bottom'){
			top =  offset.top + tg.height;
			left = offset.left + Math.round(tg.width / 2) - Math.round(el.width / 2);
		}else{
			//default: right
			top = offset.top + Math.round(tg.height / 2) - Math.round(el.height / 2);
			left = offset.left + tg.width;
		}
		this.el.setAttribute('data-ext-style','top: ' + top + 'px; left:' + left + 'px;');
		Widgetfly.Utils.innerStyle(this.el);
	};
	
	Popover.prototype.show = function(){
		var self = this;
		if(this.interval) {
			clearInterval(this.interval);
		}
		this.applyPlacement();
		this.interval = setInterval(function(){
			self.applyPlacement();
		},500);
		
		Widgetfly.Widget.prototype.show.apply(this, arguments);
	};
	
	Popover.prototype.hide = function(){
		if(this.interval) {
			clearInterval(this.interval);
		}
		Widgetfly.Widget.prototype.hide.apply(this, arguments);
	};
	
	Popover.prototype.close = function(){
		if(this.interval) {
			clearInterval(this.interval);
		}
		Widgetfly.Widget.prototype.close.apply(this, arguments);
	};

	return Popover;

})(this);
