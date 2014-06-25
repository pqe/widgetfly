Widgetfly.Popover = (function(global) {'use strict';
	// Widgetfly.Popover
	// -------------
	var Popover = function(options) {
		var el, appendType, elms = [], tmp;
		Widgetfly.Widget.apply(this, arguments);
		this.options = options;

		if (options === undefined || options.target === undefined || options.target === null) {
			return false;
		}

		this.register(this.id);
		
		this.container = window.document.querySelector(options.target);
		if (this.container && this.container.length <= 0) {
			return false;
		}
		
		this.el = document.createElement('div');
		Widgetfly.Utils.addClass(this.el,'wf_popover');
		Widgetfly.Utils.addClass(this.el, options.placement);
		
		this.iframe = this.render();
		this.el.appendChild(this.iframe);

		this.style();
		
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
