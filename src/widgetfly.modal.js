Widgetfly.Modal = (function(global) {'use strict';
	// Widgetfly.Modal
	// -------------
	var Modal = function(options) {
		var self = this, sizeClass;
		Widgetfly.Widget.apply(this, arguments);
		this.options = Widgetfly.Utils.extend({}, Modal.DEFAULTS,options);
		this.container = window.document.querySelector('body');

		if (options === undefined) {
			return false;
		}

		if(document.querySelector('.wf-modal')){
			this.container.removChild(document.querySelector('.wf-modal'));
		}
		if(document.querySelector('.wf-modal-backdrop')){
			this.container.removChild(document.querySelector('.wf-modal-backdrop'));
		}

		this.register(this.id);

		if (this.container) {
			this.render();

			this.iframe = this.getIframe();

			this.backdrop = document.createElement('div');

			if(this.options.size === 'large'){
				sizeClass = 'wf-modal-lg';
			}else if(this.options.size === 'small'){
				sizeClass = 'wf-modal-sm';
			}else{
				sizeClass = 'wf-modal-md';
			}
			Widgetfly.Utils.addClass(this.el,sizeClass);

			Widgetfly.Utils.addClass(this.backdrop,'widgetfly wf-modal-backdrop wf-hide');

			//bind close event
			this.el.querySelector('.wf-close').onclick = function() {
				self.hide();
			};

			this.el.onclick = function(e){
				if(e.target === self.el){
					self.hide();
				}
			};

			if(this.options.backdrop){
				this.container.appendChild(this.backdrop);
			}

			this.style();

			//this.container.appendChild(this.spinner);
			this.container.appendChild(this.el);
		}

		return this;
	};

	Modal.DEFAULTS = Widgetfly.Utils.extend({}, Widgetfly.Widget.DEFAULTS,{
		autoGrow : false,
		show : true,
		backdrop : true,
		template : '<div class="widgetfly wf-modal wf-hide"><div class="wf-modal-dialog"><div class="wf-modal-content wf-animated-fadeInUpBig wf-animated-modal"><a class="wf-close" href="javascript:void(0)">&#215</a><iframe allowtransparency="true" frameborder="0" tabindex="0" title="Widgetfly Widget" width="100%" class="wf-modal-body wf-show"></iframe></div></div></div>',
		options : {

		}
	});

	Widgetfly.Utils.inherit(Modal, Widgetfly.Widget);

	Modal.prototype.show = function() {
		//show only one modal at a time
		for(var i in this.mediator.widgets){
			if(this.mediator.widgets[i] instanceof Widgetfly.Modal){
				if(this.mediator.widgets[i].isShow()){
					this.mediator.widgets[i].hide();
				}
			}
		}
		Widgetfly.Widget.prototype.show.apply(this, arguments);
		if(Widgetfly.Utils.isTrue(this.options.backdrop)){
			Widgetfly.Utils.removeClass(this.backdrop, 'wf-show');
			Widgetfly.Utils.removeClass(this.backdrop, 'wf-hide');
			Widgetfly.Utils.addClass(this.backdrop, 'wf-show');
		}
	};

	Modal.prototype.hide = function() {
		Widgetfly.Widget.prototype.hide.apply(this, arguments);
		if(Widgetfly.Utils.isTrue(this.options.backdrop)){
			Widgetfly.Utils.removeClass(this.backdrop, 'wf-show');
			Widgetfly.Utils.removeClass(this.backdrop, 'wf-hide');
			Widgetfly.Utils.addClass(this.backdrop, 'wf-hide');
		}
	};

	Modal.prototype.close = function() {
		//console.log('Widget.Action close');
		var r, self = this, handlers;
		handlers = Widgetfly.Mediator.getActionHandlers(this.id);
		if (handlers && Widgetfly.Utils.isFunction(handlers.onBeforeClose)) {
			r = handlers.onBeforeClose();
		}
		if(r !== false){
			Widgetfly.Mediator.unregister(this.id, function() {
				self.container.removeChild(self.el);
				if(Widgetfly.Utils.isTrue(self.options.backdrop)){
					self.container.removeChild(self.backdrop);
				}
			});
		}
	};

	return Modal;

})(this);
