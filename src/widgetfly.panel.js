Widgetfly.Panel = (function(global) {'use strict';

	// Widgetfly.Panel
	// -------------
	var Panel = function(options) {
		
		var el, appendType, selector, elms;
		Widgetfly.Widget.apply(this, arguments);
		this.options = options;
		
		if (options === undefined) {
			return false;
		}
		
		if (options.container === undefined || options.container === null) {
			appendType = 'tag';
			selector = 'body';
		}else{
			if (options.container.substr(0, 1) === '.') {
				appendType = 'class';
				selector = options.container.replace('.', '');
			} else if (options.container.substr(0, 1) === '#') {
				appendType = 'id';
				selector = options.container.replace('#', '');
			} else{
				appendType = 'tag';
				selector = options.container;
			}
		}

		this.register(this.id);
		
		this.iframe = this.el = this.render();
			
		if (appendType === 'id') {
			elms = window.document.getElementById(selector);
		}else if (appendType === 'class') {
			elms = Widgetfly.Utils.getElementsByClassName(selector);
		}else{
			elms = window.document.getElementsByTagName(selector);
		}
		
		if (elms && elms.length > 0) {
			this.container = elms[0];
		}
			
		if(this.container){
			if(options.show){
				Widgetfly.Utils.addClass(this.el, 'show');
			}else{
				Widgetfly.Utils.addClass(this.el, 'hide');
			}
			this.container.appendChild(this.el);
		}

		return this;
	};

	Widgetfly.Utils.inherit(Panel, Widgetfly.Widget);

	Panel.prototype.render = function() {
		return Widgetfly.Widget.prototype.render.apply(this, arguments);
	};

	return Panel;
})(this);
