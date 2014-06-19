Widgetfly.Panel = (function(global) {'use strict';

	// Widgetfly.Panel
	// -------------
	var Panel = function(options) {

		var el, appendType, selector, elms = [], tmp;
		Widgetfly.Widget.apply(this, arguments);
		this.options = options;

		if (options === undefined || options.container === undefined || options.container === null) {
			return false;
		}

		if (options.container.substr(0, 1) === '.') {
			appendType = 'class';
			selector = options.container.replace('.', '');
		} else if (options.container.substr(0, 1) === '#') {
			appendType = 'id';
			selector = options.container.replace('#', '');
		} else {
			appendType = 'tag';
			selector = options.container;
		}

		this.register(this.id);

		this.iframe = this.el = this.render();

		if (appendType === 'id') {
			tmp = window.document.getElementById(selector);
			if (tmp !== null) {
				elms.push(tmp);
			}
		} else if (appendType === 'class') {
			elms = Widgetfly.Utils.getElementsByClassName(selector);
		} else {
			elms = window.document.getElementsByTagName(selector);
		}

		if (elms && elms.length > 0) {
			this.container = elms[0];
		}
		
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
		Widgetfly.Utils.addClass(this.el, 'wf_panel');
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
