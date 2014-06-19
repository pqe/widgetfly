Widgetfly.Popover = (function(global) {'use strict';
	// Widgetfly.Popover
	// -------------
	var Popover = function(options) {
		var el, appendType, selector = options.target, elms = [], content, tmp;
		Widgetfly.Widget.apply(this, arguments);
		this.options = options;

		if (options === undefined || options.target === undefined || options.target === null) {
			return false;
		}

		this.register(this.id);		
		
		this.container = window.document.querySelector(selector);
		if (this.container && this.container.length <= 0) {
			return false;
		}
		
		this.el = document.createElement('div');
		this.el.setAttribute('class', 'popover fade in ' + options.placement);
		content = document.createElement('div');
		content.setAttribute('class', 'popover-content');

		this.iframe = this.render();
		content.appendChild(this.iframe);
		this.el.appendChild(content);

		this.css();
		
		if (this.container) {
			if (options.show) {
				this.show();
			} else {
				this.hide();
			}
			this.container.appendChild(this.el);
		}

		return this;
	};

	Widgetfly.Utils.inherit(Popover, Widgetfly.Widget);

	Popover.prototype.render = function() {
		return Widgetfly.Widget.prototype.render.apply(this, arguments);
	};
	
	Popover.prototype.style = function() {
		Widgetfly.Widget.prototype.style.apply(this, arguments);
		Widgetfly.Utils.addClass(this.el, 'wf_popover');
	};

	return Popover;

})(this);
