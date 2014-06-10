/*
 * Widgetfly
 * A javascript library for building cross-site web widgets.
 * @link https://github.com/qpe/widgetfly
 * @author hsfeng
 * @version 0.1.0
 * @license https://github.com/qpe/widgetfly/blob/master/LICENSE
 * @copyright hsfeng
 */
(function(root, factory) {'use strict';
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
	}(this, function() {
		'use strict';
		var Widgetfly = (function(window){
			'use strict';
			var Widgetfly = {};
				
			Widgetfly.Utils = (function(global) {'use strict';
				// Utilities
				// -------------
			
				var Utils = {
					has : function(obj, key) {
						return Object.prototype.hasOwnProperty.call(obj, key);
					},
			
					each : function(obj, iterator, context) {
						if (obj === null) {
							return false;
						}
			
						if (Array.prototype.forEach && obj.forEach === Array.prototype.forEach) {
							obj.forEach(iterator, context);
						} else if (typeof obj.length === 'number') {
							for (var i = 0, l = obj.length; i < l; i++) {
								if (iterator.call(context, obj[i], i, obj) === {}) {
									return false;
								}
							}
						} else {
							for (var key in obj) {
								if (Widgetfly.Utils.has(obj, key)) {
									if (iterator.call(context, obj[key], key, obj) === {}) {
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
										createParam.container = parameter[1].split('=', 2)[1];
										if (parameter[1].split('=', 2)[0] === 'appendClass') {
											createParam.appendType = 'class';
											createParam.dom = '.' + createParam.container;
										} else {
											createParam.appendType = 'id';
											createParam.dom = '#' + createParam.container;
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
			
				return Utils;
			})(this);
			
			Widgetfly.Events = (function(global){
				'use strict';
				// Events
				// -------------
				var Events = function() {};
			
				Events.prototype.trigger = function(id, action, data, targetId, targetOrigin, transfer) {
					Widgetfly.Mediator.send(id, action, data, targetId, targetOrigin, transfer);
				};
			
				Events.prototype.on = function(eventName, callback) {
					Widgetfly.Mediator.bind(this.id, eventName, callback);
				};
			
				Events.prototype.off = function(eventName) {
					Widgetfly.Mediator.unbind(this.id, eventName);
				};
					
				return Events;
			})(this);
			
			Widgetfly.Mediator = (function(global) {
				'use strict';
				// Mediator
				// -------------
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
			
					register : function(instance) {
						this.instance[instance.id] = instance;
					},
			
					unregister : function(id, callback) {
						if (this.eventInstance[id] !== undefined) {
							var self = this;
							Widgetfly.Utils.each(this.eventInstance[id], function(key) {
								delete self.eventInstance[id][key];
							});
						}
						delete this.instance[id];
						callback(true);
					},
			
					send : function(id, action, data, targetId, targetOrigin, transfer) {
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
						window.frames[id].postMessage(corsObj, targetOrigin, transfer);
						//window.postMessage(corsObj, targetOrigin, transfer);
					},
			
					bind : function(id, eventName, callback) {
						console.log('Events.bind');
						if (this.eventInstance[id] === undefined) {
							this.eventInstance[id] = {};
						}
						this.eventInstance[id][eventName] = callback;
					},
			
					unbind : function(id, eventName) {
						console.log('Events.unbind');
						delete this.eventInstance[id][eventName];
						if (Object.keys(this.eventInstance[id]).length <= 0) {
							delete this.eventInstance[id];
						}
					},
			
					receive : function(msgObj) {
						console.log('Mediator.receive');
						var instanceId = msgObj.data.id;
						if (msgObj.data.targetId !== undefined) {
							instanceId = msgObj.data.targetId;
						}
			
						var instance = Mediator.instance[instanceId], eventInstance = Mediator.eventInstance[instanceId], action = msgObj.data.action;
						if (Widgetfly.Utils.isFunction(instance[action])) {
							instance[action](msgObj.data.msg);
						} else {
							if (!Widgetfly.Utils.isEmpty(eventInstance) && Widgetfly.Utils.isFunction(eventInstance[action])) {
								eventInstance[action](msgObj.data.msg);
							}
						}
					}
				};
				
				return Mediator;
			})(this);
			
			Widgetfly.Server = (function(global) {'use strict';
				// Server
				// -------------
				var Server = function() {
					this.id = window.name;
					this.events = {};
					this.init();
				};
			
				Widgetfly.Utils.inherit(Server, Widgetfly.Events);
			
				Server.init = function() {
					var self = this;
					this.trigger('start');
					window.addEventListener('message', function(msgObj) {
						//console.log(msgObj);
						var action = msgObj.data.action;
						if (Widgetfly.Utils.isFunction(self[action])) {
							self[action](msgObj.data.msg);
						} else {
							if (!Widgetfly.Utils.isEmpty(self.events) && Widgetfly.Utils.isFunction(self.events[action])) {
								self.events[action](msgObj.data.msg);
							}
						}
					}, false);
				};
			
				Server.prototype.on = function(key, callback) {
					this.events[key] = callback;
				};
			
				Server.prototype.off = function(key) {
					delete this.events[key];
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
					//console.log(corsObj);
					parent.postMessage(corsObj, targetOrigin, transfer);
				};
			
				Server.prototype.show = function() {
					this.trigger('_show');
				};
			
				Server.prototype.hide = function() {
					this.trigger('hide');
				};
			
				Server.prototype.onClose = function(callback) {
					console.log('Server onClose action');
					callback();
				};
			
				Server.prototype.close = function() {
					console.log('Prepare server close action');
					var self = this;
					Widgetfly.Utils.each(this.events, function(key) {
						delete self.events[key];
					});
			
					this.onClose(function() {
						console.log('Server close action');
						self.trigger('_close');
					});
				};
			
				/*
				 Server.prototype.setAutoGrow = function(width, height) {
				 //console.log(size);
				 Events.trigger(window.name, 'sizeChange', width, height);
				 };
				 */
				Server.prototype.setSize = function(width, height) {
					//console.log(size);
					Widgetfly.Events.trigger(window.name, 'sizeChange', width, height);
				};
				
				return Server;
				
			})(this);
			
			Widgetfly.Widget = (function(global) {'use strict';
				// Widget
				// -------------
				var Widget = function() {
					this.id = Widgetfly.Utils.genId();
				};
			
				Widgetfly.Utils.inherit(Widget, Widgetfly.Events);
			
				Widget.prototype.onStart = function(callback) {
					if (Widgetfly.Utils.isFunction(callback)) {
						this.on('_onStart', callback);
					}
				};
			
				Widget.prototype.start = function() {
					console.log('action onStart');
					if (Widgetfly.Utils.isFunction(Widgetfly.Mediator.eventInstance[this.id]._onStart)) {
						Widgetfly.Mediator.eventInstance[this.id]._onStart();
					}
				};
			
				Widget.prototype.getId = function() {
					return this.id;
				};
			
				Widget.prototype.onHide = function(callback) {
					if (Widgetfly.Utils.isFunction(callback)) {
						this.on('_onHide', callback);
					}
				};
			
				Widget.prototype.hide = function() {
					console.log('action hide');
					if (this.setting.appendType === 'id') {
						window.document.getElementById(this.setting.container).hide();
					} else {
						window.document.getElementsByClassName(this.setting.container)[0].hide();
					}
					console.log('action onHide');
					if (Widgetfly.Utils.isFunction(Widgetfly.Mediator.eventInstance[this.id]._onHide)) {
						Widgetfly.Mediator.eventInstance[this.id]._onHide();
					}
				};
			
				Widget.prototype.onShow = function(callback) {
					if (Widgetfly.Utils.isFunction(callback)) {
						this.on('_onShow', callback);
					}
				};
			
				Widget.prototype.show = function() {
					var self = this;
					console.log('action show');
					if (self.setting.appendType === 'id') {
						if (window.document.getElementById(self.setting.container) !== undefined) {
							window.document.getElementById(self.setting.container).show();
						}
					} else {
						if (window.document.getElementsByClassName(self.setting.container)[0] !== undefined) {
							window.document.getElementsByClassName(self.setting.container)[0].show();
						}
					}
					console.log('action onShow');
					if (Widgetfly.Utils.isFunction(Widgetfly.Mediator.eventInstance[this.id].onShow)) {
						Widgetfly.Mediator.eventInstance[this.id]._onShow();
					}
				};
			
				Widget.prototype.onBeforeClose = function(callback) {
					if (Widgetfly.Utils.isFunction(callback)) {
						this.on('_onBeforeClose', callback);
					}
				};
			
				Widget.prototype.close = function() {
					var self = this;
					if (Widgetfly.Utils.isFunction(Widgetfly.Mediator.eventInstance[this.id]._onBeforeClose)) {
						Widgetfly.Mediator.eventInstance[this.id]._onBeforeClose();
					}
					Widgetfly.Mediator.unregister(this.id, function() {
						var removeDom;
						if (self.setting.appendType === 'class') {
							removeDom = document.getElementsByClassName(self.setting.container)[0];
						} else {
							removeDom = document.getElementById(self.setting.container);
						}
						removeDom.parentNode.removeChild(removeDom);
					});
				};
			
				Widget.prototype.setMap = function(setting) {
					var container = setting.dom;
					Widgetfly.Mediator.mapping[container] = setting.id;
				};
			
				Widget.prototype.register = function() {
					var nowScripts = document.getElementsByTagName('script'), cScript = nowScripts[nowScripts.length - 1];
					//console.log(this);
					Widgetfly.Mediator.register(this);
					cScript.setAttribute('data-id', this.id);
				};
			
				return Widget;
			})(this);
			
			Widgetfly.Panel = (function(global) {'use strict';
				
				// Widgetfly.Panel
				// -------------
				var Panel = function(setting) {
					//console.log(setting);
					setting.dom = setting.container;
					if (setting.container.substr(0, 1) === '.') {
						setting.appendType = 'class';
						setting.container = setting.container.replace('.', '');
					} else if (setting.container.substr(0, 1) === '#') {
						setting.appendType = 'id';
						setting.container = setting.container.replace('#', '');
					}
					
					Widgetfly.Widget.apply(this, arguments);
			
					if (setting === undefined) {
						return false;
					}
			
					if (setting.options.src !== undefined) {
						if (setting.container === undefined && setting.appendClass !== undefined) {
							setting.appendType = 'class';
							setting.dom = '.' + setting.appendClass;
							setting.container = setting.appendClass;
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
				
				return Panel;
			})(this);
			
			// Widgetfly.Modal
			// -------------
			Widgetfly.Modal = function(setting) {
			
			};
			
			// Widgetfly.Popover
			// -------------
			Widgetfly.Popover = function(setting) {
			
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
		
			Widgetfly.Panel.extend = Widgetfly.Modal.extend = Widgetfly.Popover.extend = Widgetfly.Server.extend = extend;
		
			// Initialize for DOM prepare
			// -------------
			var nowScripts = document.getElementsByTagName('script'),
				instance,
				param = Widgetfly.Utils.parseUrl(nowScripts);
			
			if (!Widgetfly.Utils.inIframe()) {
				console.log('Now is app initialize');
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
				console.log('Now is widget initialize');
				// widget
				//var Server = new Widgetfly.Server();
			}
		
			return Widgetfly;
		})(this);
		
		return Widgetfly;
}));
