Widgetfly.Panel = (function(global) {'use strict';

	// Widgetfly.Panel
	// -------------
	var Panel = function(options) {

		var elms = [], tmp;
		Widgetfly.Widget.apply(this, arguments);
		
		this.options = Widgetfly.Utils.extend(Panel.DEFAULTS,options);

		if (options === undefined || options.container === undefined || options.container === null) {
			return false;
		}

		this.container = window.document.querySelector(options.container);
		if (this.container && this.container.length <= 0) {
			return false;
		}
		
		this.register(this.id);
		
		this.render();

		this.iframe = this.getIframe();
		
		this.style();
		
		if (this.container) {
			if (options.show) {
				this.show();
			} else {
				this.hide();
			}
			while (this.container.hasChildNodes()) {
				this.container.removeChild(this.container.lastChild);
			}
			this.container.appendChild(this.el);
		}

		return this;
	};
	
	Panel.DEFAULTS = Widgetfly.Utils.extend({},{
		autoGrow : false,
		show : true,
		template : '<iframe allowtransparency="true" frameborder="0" tabindex="0" title="Widgetfly Widget" width="100%" verticalscrolling="no" scrolling="no" horizontalscrolling="no" class="widgetfly wf-panel"></iframe>',
		options : {
					
		}
	});

	Widgetfly.Utils.inherit(Panel, Widgetfly.Widget);

	Panel.prototype.close = function() {
		console.log('Widget.Action close');
		var r, self = this, handlers;
		handlers = Widgetfly.Mediator.getActionHandlers(this.id);
		if (handlers && Widgetfly.Utils.isFunction(handlers.onBeforeClose)) {
			r = handlers.onBeforeClose();
		}
		if (r !== false) {
			Widgetfly.Mediator.unregister(this.id, function() {
				self.container.remove(0);
			});
		}
	};

	return Panel;
})(this);
