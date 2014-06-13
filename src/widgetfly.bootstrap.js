(function(window) {'use strict';

	var extend = function(protoProps, staticProps) {
		var child,parent = this, Surrogate;

		// The constructor function for the new subclass is either defined by you
		// (the "constructor" property in your `extend` definition), or defaulted
		// by us to simply call the parent's constructor.
		if (protoProps && (Widgetfly.Utils.has(protoProps, 'constructor'))) {
			child = protoProps.constructor;
		} else {
			child = function() {
				return parent.apply(this, arguments);
			};
		}

		// Add static properties to the constructor function, if supplied.
		Widgetfly.Utils.extend(child, parent, staticProps);

		// Set the prototype chain to inherit from `parent`, without calling
		// `parent`'s constructor function.
		Surrogate = function() {
			this.constructor = child;
		};
		Surrogate.prototype = parent.prototype;
		child.prototype = new Surrogate();

		// Add prototype properties (instance properties) to the subclass,
		// if supplied.
		if (protoProps) {
			Widgetfly.Utils.extend(child.prototype, protoProps);
		}

		// Set a convenience property in case the parent's prototype is needed
		// later.
		child.__super__ = parent.prototype;

		return child;
	},nowScripts, instance, param;
	
	Widgetfly.Panel.extend = Widgetfly.Modal.extend = Widgetfly.Popover.extend = Widgetfly.Server.extend = extend;

	// Initialize for DOM prepare
	// -------------
	nowScripts = document.getElementsByTagName('script');
	param  = Widgetfly.Utils.parseUrl(nowScripts);

	if (!Widgetfly.Utils.inIframe()) {
		console.log('Now is Widgets initialize');
		Widgetfly.Mediator.init();
		if (Widgetfly.Utils.getElementsByClassName('qt').length <= 0) {
			instance = window.document.createElement('div');
			instance.setAttribute('class', 'qt');
			window.document.getElementsByTagName('body')[0].appendChild(instance);
		}
		if (!Widgetfly.Utils.isEmpty(param)) {
			//console.log(param);
			new Widgetfly.Panel(param);
		}
	} else {
		console.log('Now is Server initialize');
		// widget
		//var Server = new Widgetfly.Server();
	}

})(this);
