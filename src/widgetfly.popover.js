Widgetfly.Popover = (function(global) {'use strict';
	// Widgetfly.Popover
	// -------------
	var Popover = function(options) {
		var el, appendType, selector, elms, content;
		Widgetfly.Widget.apply(this, arguments);
		this.options = options;

		if (options === undefined) {
			return false;
		}

		if (options.container === undefined || options.container === null) {
			appendType = 'tag';
			selector = 'body';
		} else {
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
		}

		this.register(this.id);

		if (appendType === 'id') {
			elms = window.document.getElementById(selector);
		} else if (appendType === 'class') {
			elms = Widgetfly.Utils.getElementsByClassName(selector);
		} else {
			elms = window.document.getElementsByTagName(selector);
		}

		if (elms && elms.length > 0) {
			this.container = elms[0];
		}

		this.el = document.createElement('div');
		this.el.setAttribute('class', 'popover fade in ' + options.placement);
		content = document.createElement('div');
		content.setAttribute('class', 'popover-content');

		this.iframe = this.render();
		content.appendChild(this.iframe);
		this.el.appendChild(content);

		if (this.container) {
			this.container.appendChild(this.el);
		}

		return this;
	};

	Widgetfly.Utils.inherit(Popover, Widgetfly.Widget);

	Popover.prototype.render = function() {
		return Widgetfly.Widget.prototype.render.apply(this, arguments);
	};

	return Popover;

})(this);
