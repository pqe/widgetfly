/*
 * Widgetfly
 * A javascript library for building cross-site web widgets.
 * @link https://github.com/qpe/widgetfly
 * @author hsfeng
 * @version 0.1.0
 * @license https://github.com/qpe/widgetfly/blob/master/LICENSE
 * @copyright hsfeng
 */

( function(root, factory) {'use strict';
		if ( typeof define === 'function' && define.amd) {
			// AMD. Register as an anonymous module.
			define([], function() {
				// Also create a global in case some scripts
				// that are loaded still are looking for
				// a global even when an AMD loader is in use.
				return (root.Widgetfly = factory());
			});
		} else {
			// Browser globals
			root.Widgetfly = factory(root);
		}
	}(this, function() {'use strict';
		console.log('Module Widgetfly loaded');

		/**
		 * Widgetfly
		 * @module Widgetfly
		 * @namespace Widgetfly
		 * @version 0.1.0
		 * @author hsfeng
		 */

		var breaker = {}, Widgetfly = {
			/**
			 * @constructor
			 * @since 0.1.0
			 */
			find : function() {

			}
		};

		// Utilities
		// -------------

		Widgetfly.Utils = {
			has : function(obj, key) {
				return Object.prototype.hasOwnProperty.call(obj, key);
			},

			each : function(obj, iterator, context) {
				if (obj === null) {
					return false;
				}

				if (Array.prototype.forEach && obj.forEach === Array.prototype.forEach) {
					obj.forEach(iterator, context);
				} else if (obj.length === +obj.length) {
					for (var i = 0, l = obj.length; i < l; i++) {
						if (iterator.call(context, obj[i], i, obj) === breaker) {
							return false;
						}
					}
				} else {
					for (var key in obj) {
						if (Widgetfly.Utils.has(obj, key)) {
							if (iterator.call(context, obj[key], key, obj) === breaker) {
								return false;
							}
						}
					}
				}
			},

			isEmpty : function(obj) {
				// null and undefined are "empty"
				if (obj === null) {
					return true;
				}

				// Assume if it has a length property with a non-zero value
				// that that property is correct.
				if (obj.length > 0) {
					return false;
				}

				if (obj.length === 0) {
					return true;
				}

				// Otherwise, does it have any properties of its own?
				// Note that this doesn't handle
				// toString and valueOf enumeration bugs in IE < 9
				for (var key in obj) {
					if (hasOwnProperty.call(obj, key)) {
						return false;
					}
				}
				return true;
			},

			extend : function(obj) {
				this.each(Array.prototype.slice.call(arguments, 1), function(source) {
					if (source) {
						for (var prop in source) {
							obj[prop] = source[prop];
						}
					}
				});
				return obj;
			},

			inherit : function(Child, Parent) {
				var F = function() {
				};
				F.prototype = Parent.prototype;
				Child.prototype = new F();
				Child.prototype.constructor = Child;
				Child.uber = Parent.prototype;
			},

			parseUrl : function(URL, checkLib) {
				var nowSrc, parameter, createParam = {}, i, tmpStr, tmpParam;
				if ( typeof URL !== 'string' && URL.length > 0) {
					URL = URL[URL.length - 1];
					if (URL.getAttribute.length !== undefined) {
						nowSrc = URL.getAttribute('src', -1);
					}
				} else {
					nowSrc = URL;
				}
				parameter = nowSrc.split('?', 2);
				if (parameter.length > 1) {
					parameter = parameter[1];
					parameter = parameter.split('&');
					if (parameter.length > 0) {
						if (parameter[0].split('=', 2).length > 0) {
							createParam.type = parameter[0].split('=', 2)[1];
						}

						if (parameter[1] !== undefined && parameter[1].split('=', 2).length > 0) {
							if (parameter[1].split('=', 2)[1] !== '') {
								createParam.append = parameter[1].split('=', 2)[1];
								if (parameter[1].split('=', 2)[0] === 'appendClass') {
									createParam.appendType = 'class';
									createParam.dom = '.' + createParam.append;
								} else {
									createParam.appendType = 'id';
									createParam.dom = '#' + createParam.append;
								}
							}
						}
						if (parameter.length > 2) {
							createParam.options = {};
							for ( i = 2; i < parameter.length; i++) {
								if (parameter[i].split('=', 2).length > 0) {
									tmpParam = parameter[i].split('=', 2)[1];
									tmpParam = tmpParam.split(':');
									if (tmpParam.length > 0) {
										tmpStr = tmpParam.shift();
										if (tmpParam.length !== 0) {
											tmpParam = tmpParam.join(':');
											if (tmpParam !== '' && tmpParam !== null && tmpParam !== 'null') {
												createParam.options[tmpStr] = tmpParam;
											}
										}
									}
								}
							}
						}
					}
				}

				if (checkLib === undefined) {
					return createParam;
				} else {
					checkLib(createParam);
				}
			},

			genId : function() {
				var i = 0, id = '', first, possible1 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', possible2 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
				first = possible1.charAt(Math.floor(Math.random() * possible1.length));
				for ( i = 1; i < 20; i++) {
					id += possible2.charAt(Math.floor(Math.random() * possible2.length));
				}
				return (first + id);
			},

			getElementsByClassName : function(testClass, startFrom) {
				/**
				 * getElementsByClassName
				 * @fileOverview An easy way to find DOM Nodes with a specific class
				 * @author Dan Beam <dan@danbeam.org>
				 * @param {string} className - the class we're looking for on DOM Nodes
				 * @param {element} startFrom (optional) - a point in the DOM to start from
				 * @return {array} results - any DOM Nodes that have the specified class
				 */

				for (var// this will be incremented to 0 at start of loop
				i = -1,
				// results of the DOM query (elements with matching class)
				results = [],
				// regular expression to see if the class attribute contains
				// the searched for class
				finder = new RegExp('(?:^|\\s)' + testClass + '(?:\\s|$)'),
				// grab all DOM elements and the set's length
				a = startFrom && startFrom.getElementsByTagName && startFrom.getElementsByTagName('*') || document.all || document.getElementsByTagName('*'),

				// cache the length property
				l = a.length;

				// this is done before we start and at every comparison (note the ++)
				++i < l;
				// this is done after the first comparison and every iteration afterward
				finder.test(a[i].className) && results.push(a[i])) {
				}
				// do memory management and return the results of our query
				a = null;
				return results;
			},

			inIframe : function() {
				try {
					return window.self !== window.top;
				} catch (e) {
					return true;
				}
			},

			isFunction : function(obj) {
				return typeof obj === 'function';
			},

			isElement : function(o) {
				return ( typeof HTMLElement === 'object' ? o instanceof HTMLElement : o && typeof o === 'object' && o !== null && o.nodeType === 1 && typeof o.nodeName === 'string');
			},

			trans2Elem : function(element, startFrom) {
				var target;
				if ( typeof element === 'string') {
					if (element.substr(0, 1) === '#') {
						target = document.getElementById(element.replace('#', ''));
					} else if (element.substr(0, 1) === '.') {
						target = this.getElementsByClassName(element.replace('.', ''), startFrom)[0];
					} else {
						target = document.getElementsByTagName(element)[0];
					}
				} else {
					target = element;
				}
				return target;
			},

			hasClass : function(element, cls) {
				return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
			},

			addClass : function(element, className, startFrom) {
				var target;
				if (startFrom === undefined) {
					startFrom = document;
				}
				target = this.trans2Elem(element, startFrom);
				if (!this.hasClass(target, className)) {
					target.className += ' ' + className;
				}
			},

			removeClass : function(element, rmClass, startFrom) {
				var target, newClass;
				if (startFrom === undefined) {
					startFrom = document;
				}
				target = this.trans2Elem(element, startFrom);

				if (target !== undefined && this.isElement(target)) {
					newClass = ' ' + target.className.replace(/[\t\r\n]/g, ' ') + ' ';
					if (this.hasClass(target, rmClass)) {
						while (newClass.indexOf(' ' + rmClass + ' ') >= 0) {
							newClass = newClass.replace(' ' + rmClass + ' ', ' ');
						}
						target.className = newClass.replace(/^\s+|\s+$/g, '');
					}
				}
			},

			toggleClass : function(element, className, startFrom) {
				var target, newClass;
				if (startFrom === undefined) {
					startFrom = document;
				}
				target = this.trans2Elem(element, startFrom);
				if (target !== undefined && this.isElement(target)) {
					newClass = ' ' + target.className.replace(/[\t\r\n]/g, ' ') + ' ';
					if (this.hasClass(target, className)) {
						while (newClass.indexOf(' ' + className + ' ') >= 0) {
							newClass = newClass.replace(' ' + className + ' ', ' ');
						}
						target.className = newClass.replace(/^\s+|\s+$/g, '');
					} else {
						target.className += ' ' + className;
					}
				}
			}
		};

		// Events
		// -------------
		var Events = function() {

		};

		Events.prototype.trigger = function(id, action, data, targetId, targetOrigin, transfer) {
			Mediator.send(id, action, data, targetId, targetOrigin, transfer);
		};

		Events.prototype.on = function(eventName, callback) {
			Mediator.bind(this.id, eventName, callback);
		};

		Events.prototype.off = function(eventName) {
			Mediator.unbind(this.id, eventName);
		};

		var nowScripts = document.getElementsByTagName('script'), instance, param = Widgetfly.Utils.parseUrl(nowScripts);

		var Mediator = {

			instance : {},

			eventInstance : {},

			mapping : {},

			init : function() {
				window.addEventListener('message', function(msgObj) {
					Mediator.receive(msgObj);
				}, false);
			},

			getWidget : function(Id) {
				return this.instance[Id];
			},

			register : function(instance){
				this.instance[instance.id] = instance;
			},
			
			unregister : function(id, callback){
				if(this.eventInstance[id] !== undefined){
					var self = this;
					Widgetfly.Utils.each(this.eventInstance[id], function(key){
						delete self.eventInstance[id][key];
					});			
					delete this.instance[id];
					callback(true);
				}
				else{
					callback(true);
				}	
			},

			send : function(id, action, data, targetId, targetOrigin, transfer){
				console.log('Events.trigger');
				var corsObj = {
					msg : data,
					action : action,
					id : id
				};
	
				if (targetId !== undefined) {
					corsObj.targetId = targetId;
				}
	
				if (targetOrigin === undefined) {
					targetOrigin = '*';
				}
				parent.postMessage(corsObj, targetOrigin, transfer);				
			},
			
			bind : function(id, eventName, callback){
				console.log('Events.bind');
				if(this.eventInstance[id] === undefined){
					this.eventInstance[id] = {};
				}
				this.eventInstance[id][eventName] = callback;				
			},
			
			unbind : function(id, eventName){
				console.log('Events.unbind');
				delete this.eventInstance[id][eventName];
				if(Object.keys(this.eventInstance[id]).length <= 0){
					delete this.eventInstance[id];
				}
			},
			
			receive : function(msgObj) {
				var intanceId = msgObj.data.id;
				if (msgObj.data.targetId !== undefined) {
					intanceId = msgObj.data.targetId;
				}

				var instance = Mediator.instance[intanceId], eventInstance = Mediator.eventInstance[intanceId], action = msgObj.data.action;
				if (Widgetfly.Utils.isFunction(instance[action])) {
					instance[action](msgObj.data.msg);
				} else {
					if (!Widgetfly.Utils.isEmpty(eventInstance) && Widgetfly.Utils.isFunction(eventInstance[action])) {
						eventInstance[action](msgObj.data.msg);
					}
				}
			}
		};

		var Server = function() {

		};
		
		Widgetfly.Utils.inherit(Server, Events);
		
		Server.prototype.init = function() {
			parent.window.addEventListener('message', function(msgObj) {
				console.log(msgObj);
			}, false);
		};

		Server.prototype.trigger = function(action, data, targetId, targetOrigin, transfer) {
			console.log('Server.trigger');
			var corsObj = {
				msg : data,
				action : action,
				id : this.id
			};

			if (targetId !== undefined) {
				corsObj.targetId = targetId;
			}

			if (targetOrigin === undefined) {
				targetOrigin = '*';
			}
			console.log(corsObj);
			parent.postMessage(corsObj, targetOrigin, transfer);			
		};

		Server.prototype.show = function() {
			this.trigger(window.name, 'show');
		};

		Server.prototype.hide = function() {
			this.trigger(window.name, 'hide');
		};

		Server.prototype.sizeChange = function(size) {
			//console.log(size);
			Events.trigger(window.name, 'sizeChange', size);
		};

		var extend = function(protoProps, staticProps) {
			var parent = this;
			var child;

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
			var Surrogate = function() {
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
		};
		// Widget
		// -------------
		var Widget = function() {
			this.id = Widgetfly.Utils.genId();
		};

		Widgetfly.Utils.inherit(Widget, Events);

		Widget.prototype.getId = function() {
			return this.id;
		};

		Widget.prototype.register = function() {
			var cScript = nowScripts[nowScripts.length - 1];
			Mediator.register(this);
			cScript.setAttribute('data-id', this.id);
		};

		Widget.prototype.onBeforeClose = function(callback){
			Mediator.unregister(self.id, function(){
				callback();
			});			
		};

		Widget.prototype.close = function(){
			var self = this;
			this.onBeforeClose(function(){
				//console.log(self);
				var removeDom;
				if(self.setting.appendType === 'class'){
					removeDom = document.getElementsByClassName(self.setting.append)[0];
				}
				else{
					removeDom = document.getElementById(self.setting.append);
				}				
				removeDom.parentNode.removeChild(removeDom);
			});
		};

		Widget.prototype.setMap = function(setting) {
			var append = setting.dom;
			Mediator.mapping[append] = setting.id;
		};

		// Widgetfly.Panel
		// -------------
		Widgetfly.Panel = function(setting) {
			//console.log(setting);
			setting.dom = setting.append;
			if (setting.append.substr(0, 1) === '.') {
				setting.appendType = 'class';
				setting.append = setting.append.replace('.', '');
			} else if(setting.append.substr(0, 1) === '#') {
				setting.appendType = 'id';
				setting.append = setting.append.replace('#', '');
			}
			Widget.apply(this, arguments);

			if (setting === undefined) {
				return false;
			}

			if (setting.options.src !== undefined) {
				if (setting.append === undefined && setting.appendClass !== undefined) {
					setting.appendType = 'class';
					setting.dom = '.' + setting.appendClass;
					setting.append = setting.appendClass;
				}
			}

			setting.id = this.id;
			this.setting = setting;
			this.setMap(setting);
			this.register(this.id);

			if (setting.options.initRender) {
				this.render(setting);
			}
			return this;
		};

		Widgetfly.Utils.inherit(Widgetfly.Panel, Widget);

		Widgetfly.Panel.prototype.render = function(setting) {
			var iframe = document.createElement('iFrame');
			iframe.setAttribute('src', setting.options.src.toString());
			iframe.setAttribute('name', setting.id);
			//console.log(document.getElementsByTagName('iFrame').item(0));
			if (setting.append === undefined || setting.append === null) {
				Widgetfly.Utils.getElementsByClassName('QT')[0].appendChild(iframe);
			} else {
				//console.log(append.substr(1, append.length));
				if (setting.appendType === 'id') {
					if (window.document.getElementById(setting.append).length > 0) {
						window.document.getElementById(setting.append).appendChild(iframe);
					}
				} else {
					Widgetfly.Utils.getElementsByClassName(setting.append)[0].appendChild(iframe);
				}
			}
		};

		Widgetfly.Panel.prototype.show = function() {
			if (this.setting.appendType === 'id') {
				if (window.document.getElementById(this.setting.append) !== undefined) {
					window.document.getElementById(this.setting.append).show();
				}
			} else {
				if (window.document.getElementsByClassName(this.setting.append)[0] !== undefined) {
					window.document.getElementsByClassName(this.setting.append)[0].show();
				}
			}
		};

		Widgetfly.Panel.prototype.hide = function() {
			if (this.setting.appendType === 'id') {
				window.document.getElementById(this.setting.append).hide();
			} else {
				window.document.getElementsByClassName(this.setting.append)[0].hide();
			}
		};

		Widgetfly.Panel.extend = extend;

		// Initialize for DOM prepare
		// -------------

		if (!Widgetfly.Utils.inIframe()) {
			console.log('Now is app initialize');
			Mediator.init();
			if (Widgetfly.Utils.getElementsByClassName('QT').length <= 0) {
				instance = window.document.createElement('div');
				instance.setAttribute('class', 'QT');
				window.document.getElementsByTagName('body')[0].appendChild(instance);
			}
			if (!Widgetfly.Utils.isEmpty(param)) {
				//console.log(param);
				new Widgetfly.Panel(param);
			}
		} else {
			console.log('Now is widget initialize');
			// widget
			Widgetfly.Server = new Server();
			Widgetfly.Server.id = window.name;
		}

		Widgetfly.testlib = Mediator;

		return Widgetfly;
	}));
