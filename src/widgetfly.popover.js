Widgetfly.Popover = (function(global) {'use strict';
	// Widgetfly.Popover
	// -------------
	var Popover = function(options) {
		var el, appendType, selector, elms = [], content, tmp;
		Widgetfly.Widget.apply(this, arguments);
		this.options = options;

		if (options === undefined || options.target === undefined || options.target === null) {
			return false;
		}
		
		if (options.target.substr(0, 1) === '.') {
			appendType = 'class';
			selector = options.target.replace('.', '');
		} else if (options.target.substr(0, 1) === '#') {
			appendType = 'id';
			selector = options.target.replace('#', '');
		} else{
			appendType = 'tag';
			selector = options.target;
		}

		this.register(this.id);

		if (appendType === 'id') {
			tmp = window.document.getElementById(selector);
			if(tmp !== null){
				elms.push(tmp);
			}
		} else if (appendType === 'class') {
			elms = Widgetfly.Utils.getElementsByClassName(selector);
		} else {
			elms = window.document.getElementsByTagName(selector);
		}
		
		if (elms && elms.length > 0) {
			this.container = elms[0].parentNode;
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
