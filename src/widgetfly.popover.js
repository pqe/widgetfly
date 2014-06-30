Widgetfly.Popover = (function(global) {'use strict';
	// Widgetfly.Popover
	// -------------
	var Popover = function(options) {
		var arrow;
		Widgetfly.Widget.apply(this, arguments);
		this.options = Widgetfly.Utils.extend(Popover.DEFAULTS,options);

		if (options === undefined || options.target === undefined || options.target === null) {
			return false;
		}

		this.register(this.id);
		
		this.target = window.document.querySelector(options.target);
		if (this.target && this.target.length <= 0) {
			return false;
		}
		
		this.container = this.target.parentNode;
		
		this.el = document.createElement('div');
		
		arrow = document.createElement('div');
		Widgetfly.Utils.addClass(arrow, 'wf-arrow');
		this.el.appendChild(arrow);
		
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
	
	Popover.DEFAULTS = Widgetfly.Utils.extend({},{
		autoGrow : false,
		show : true,
		placement : 'right',
		options : {
					
		}
	});

	Widgetfly.Utils.inherit(Popover, Widgetfly.Widget);

	Popover.prototype.render = function() {
		return Widgetfly.Widget.prototype.render.apply(this, arguments);
	};
	
	Popover.prototype.style = function() {
		Widgetfly.Widget.prototype.style.apply(this, arguments);
		Widgetfly.Utils.addClass(this.el, 'wf-popover');
		Widgetfly.Utils.addClass(this.iframe, 'wf-popover-content');
		
		var placement = this.options.placement;
		if(!placement){
			placement = 'right';
		}
		Widgetfly.Utils.addClass(this.el, 'wf-' + placement);
	};

	return Popover;

})(this);
