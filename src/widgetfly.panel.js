Widgetfly.Panel = (function(global) {'use strict';

	// Widgetfly.Panel
	// -------------
	var Panel = function(options) {

		var el, elms = [], tmp;
		Widgetfly.Widget.apply(this, arguments);
		this.options = options;

		if (options === undefined || options.container === undefined || options.container === null) {
			return false;
		}

		this.container = window.document.querySelector(options.container);
		if (this.container && this.container.length <= 0) {
			return false;
		}
		
		this.register(this.id);

		this.iframe = this.el = this.render();
		
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

	Widgetfly.Utils.inherit(Panel, Widgetfly.Widget);

	Panel.prototype.render = function() {
		return Widgetfly.Widget.prototype.render.apply(this, arguments);
	};
	
	Panel.prototype.style = function() {
		Widgetfly.Widget.prototype.style.apply(this, arguments);
		Widgetfly.Utils.addClass(this.el, 'wf-panel');
	};

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
