Widgetfly.Popover = (function(global) {'use strict';
	// Widgetfly.Popover
	// -------------
	var Popover = function(options) {
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
		
		this.render();
		
		this.iframe = this.getIframe();
		
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
		template : '<div class="widgetfly wf-popover"><div class="wf-arrow"></div><iframe allowtransparency="true" frameborder="0" tabindex="0" title="Widgetfly Widget" width="100%" verticalscrolling="no" scrolling="no" horizontalscrolling="no" class="wf-popover-content"></iframe></div>',
		options : {
					
		}
	});

	Widgetfly.Utils.inherit(Popover, Widgetfly.Widget);

	
	Popover.prototype.style = function() {
		Widgetfly.Widget.prototype.style.apply(this, arguments);
		
		var placement = this.options.placement;
		if(!placement){
			placement = 'right';
		}
		Widgetfly.Utils.addClass(this.el, 'wf-' + placement);
	};

	return Popover;

})(this);
