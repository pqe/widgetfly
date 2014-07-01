Widgetfly.Modal = (function(global) {'use strict';
	// Widgetfly.Modal
	// -------------
	var Modal = function(options) {
		var self = this;
		Widgetfly.Widget.apply(this, arguments);
		this.options = Widgetfly.Utils.extend(Modal.DEFAULTS,options);
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
			
			this.backdrop = window.document.createElement('div');
			this.el.querySelector('.wf-close').onclick = function() {
				self.close();
			};
		
			Widgetfly.Utils.addClass(this.backdrop,'widgetfly wf-modal-backdrop in');
			this.container.appendChild(this.backdrop);
			
			this.style();
			if (options.show) {
				this.show();
			} else {
				this.hide();
			}
			this.container.appendChild(this.el);
		}
		
		return this;
	};
	
	Modal.DEFAULTS = Widgetfly.Utils.extend({},{
		autoGrow : false,
		show : true,
		backdrop : true,
		template : '<div class="widgetfly wf-modal"><div class="wf-modal-dialog"><div class="wf-modal-content"><a class="wf-close" href="###">x</a><iframe allowtransparency="true" frameborder="0" tabindex="0" title="Widgetfly Widget" width="100%" verticalscrolling="no" scrolling="no" horizontalscrolling="no" class="wf-modal-body"></iframe></div></div></div>',
		options : {
					
		}
	});

	Widgetfly.Utils.inherit(Modal, Widgetfly.Widget);

	Modal.prototype.sizeChange = function(size) {
		document.getElementsByName(this.id)[0].height = size + 'px';
	};
	
	Modal.prototype.show = function() {
		Widgetfly.Widget.prototype.show.apply(this, arguments);
		Widgetfly.Utils.removeClass(this.backdrop, 'wf-show wf-hide');
		Widgetfly.Utils.addClass(this.backdrop, 'wf-show');
	};
	
	Modal.prototype.hide = function() {
		Widgetfly.Widget.prototype.hide.apply(this, arguments);
		Widgetfly.Utils.removeClass(this.backdrop, 'wf-show wf-hide');
		Widgetfly.Utils.addClass(this.backdrop, 'wf-hide');
	};
	
	Modal.prototype.close = function() {
		console.log('Widget.Action close');
		var r, self = this, handlers;
		handlers = Widgetfly.Mediator.getActionHandlers(this.id);
		if (handlers && Widgetfly.Utils.isFunction(handlers.onBeforeClose)) {
			r = handlers.onBeforeClose();
		}
		if(r !== false){
			Widgetfly.Mediator.unregister(this.id, function() {
				self.container.removeChild(self.el);
				self.container.removeChild(self.backdrop);
			});
		}
	};

	return Modal;

})(this);
