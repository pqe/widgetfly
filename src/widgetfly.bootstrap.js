(function(global) {'use strict';

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
	},nowScripts, instance, params, parser;
	
	Widgetfly.Panel.extend = Widgetfly.Modal.extend = Widgetfly.Popover.extend = Widgetfly.Server.extend = extend;

	// Initialize for DOM prepare
	// -------------
	Widgetfly.init = function(){
		
		if (!Widgetfly.Utils.inIframe()) {
			//console.log('Now is Widgets initialize');
			Widgetfly.Mediator.init();
			
			nowScripts = document.currentScript;
			if(nowScripts){
				parser = document.createElement('a');
				parser.href = nowScripts.getAttribute('src');
				params  = Widgetfly.Utils.params(parser.hash);
				
				if (!Widgetfly.Utils.isEmpty(params)) {
					
					if(params.type === 'modal'){
						delete params.container;
						new (Widgetfly.Modal.extend({}))(params);
					}if(params.type === 'popover'){
						if(!params.target){
							params.target = nowScripts.parentNode;
						}
						new (Widgetfly.Popover.extend({}))(params);
					}else{
						if(!params.container){
							params.container = nowScripts.parentNode;
						}
						new (Widgetfly.Panel.extend({}))(params);
					}
				}
			}
		} else {
			//console.log('Now is Server initialize');
			// widget
			Widgetfly.Server._default = new Widgetfly.Server({});
			Widgetfly.Server.get = function() {
				return Widgetfly.Server._default;
			};
		}
	};
	
	Widgetfly.init();

})(this);
