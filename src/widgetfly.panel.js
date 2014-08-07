Widgetfly.Panel = (function(global) {'use strict';

	// Widgetfly.Panel
	// -------------
	var Panel = function(options) {

		Widgetfly.Widget.apply(this, arguments);

		this.options = Widgetfly.Utils.extend({}, Panel.DEFAULTS,options);

		if (options === undefined || options.container === undefined || options.container === null) {
			//console.log('container not defined.');
			return false;
		}

		if(typeof options.container === 'string'){
			this.container = document.querySelector(options.container);
		}else if(typeof options.container === 'object'){
			this.container = options.container;
		}

		if (this.container && this.container.length <= 0) {
			return false;
		}

		this.register(this.id);

		this.render();

		this.iframe = this.getIframe();

		this.style();

		if (this.container) {
			for (var n in this.container.childNodes) {
				if(this.container.childNodes[n].nodeName !== 'SCRIPT' && this.container.childNodes[n].parentNode === this.container){
					this.container.removeChild(this.container.childNodes[n]);
				}
			}
			this.container.appendChild(this.spinner);
			this.container.appendChild(this.el);
		}

		return this;
	};

	Panel.DEFAULTS = Widgetfly.Utils.extend({}, Widgetfly.Widget.DEFAULTS,{
		autoGrow : false,
		show : true,
		template : '<iframe allowtransparency="true" frameborder="0" tabindex="0" title="Widgetfly Widget" width="100%" class="widgetfly wf-panel wf-hide"></iframe>',
		options : {

		}
	});

	Widgetfly.Utils.inherit(Panel, Widgetfly.Widget);

	Panel.prototype.close = function() {
		//console.log('Widget.Action close');
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
