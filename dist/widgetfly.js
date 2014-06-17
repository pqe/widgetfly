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
		var Widgetfly = (function(global){
			'use strict';
			var Widgetfly = {};
				
			Widgetfly.Utils = (function(global) {'use strict';
				// Utilities
				// -------------
			
				var idCounter = 0, Utils = {
					has : function(obj, key) {
						return Object.prototype.hasOwnProperty.call(obj, key);
					},
			
					each : function(obj, iterator, context) {
						var i, l, key;
			
						if (obj === null) {
							return false;
						}
			
						if (Array.prototype.forEach && obj.forEach === Array.prototype.forEach) {
							obj.forEach(iterator, context);
						} else if ( typeof obj.length === 'number') {
							for ( i = 0, l = obj.length; i < l; i++) {
								if (iterator.call(context, obj[i], i, obj) === {}) {
									return false;
								}
							}
						} else {
							for (key in obj) {
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
			
					getParameterByName : function(name) {
						name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
						var regex = new RegExp('[\\#&]' + name + '=([^&#]*)'), results = regex.exec(window.location.hash);
						return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
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
							parameter = parameter.split('?');
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
			
					uniqueId : function(prefix) {
						var id = String(++idCounter);
						return prefix ? prefix + id : id;
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
			
			Widgetfly.Events = (function(global) {'use strict';
				// Events
				// -------------
				var Events = function() {
				};
			
				Events.prototype.trigger = function(action, data) {
					Widgetfly.Mediator.send(this.id, action, data);
				};
			
				Events.prototype.on = function(action, callback) {
					Widgetfly.Mediator.bind(this.id, action, callback);
				};
			
				Events.prototype.off = function(action) {
					Widgetfly.Mediator.unbind(this.id, action);
				};
			
				return Events;
			})(this);
			
			Widgetfly.Mediator = (function(global) {'use strict';
				// Mediator
				// -------------
				var Mediator = {
			
					widgets : {},
			
					actionHandlers : {},
			
					init : function() {
						var self = this;
						window.addEventListener('message', function(msgObj) {
							self.receive(msgObj);
						}, false);
					},
			
					getWidget : function(id) {
						return this.widgets[id];
					},
			
					getActionHandlers : function(id) {
						return this.actionHandlers[id];
					},
			
					register : function(id, widget) {
						this.widgets[widget.id] = widget;
						this.actionHandlers[widget.id] = {};
					},
			
					unregister : function(id, callback) {
						if (this.actionHandlers[id] !== undefined) {
							var self = this;
							Widgetfly.Utils.each(this.actionHandlers[id], function(key) {
								delete self.actionHandlers[id][key];
							});
						}
						delete this.widgets[id];
						callback(true);
					},
			
					send : function(id, action, data) {
						console.log('Mediator.send');
			
						var parser, targetOrigin, corsObj = {
							msg : data,
							action : action,
							id : id
						}, widget = this.widgets[id];
			
						if (widget) {
							parser = window.document.createElement('a');
							parser.href = widget.iframe.src;
							targetOrigin = parser.protocol + '//' + parser.host;
							widget.iframe.contentWindow.postMessage(corsObj, targetOrigin);
						}
					},
			
					bind : function(id, action, callback) {
						console.log('Mediator.bind');
						if (this.actionHandlers[id] === undefined) {
							this.actionHandlers[id] = {};
						}
						this.actionHandlers[id][action] = callback;
					},
			
					unbind : function(id, action) {
						console.log('Mediator.unbind');
						delete this.actionHandlers[id][action];
						if (Object.keys(this.actionHandlers[id]).length <= 0) {
							delete this.actionHandlers[id];
						}
					},
			
					receive : function(msgObj) {
						console.log('Mediator.receive');
			
						var origin, parser, widgetId = msgObj.data.id, widget = this.widgets[widgetId], myActionHandlers = this.actionHandlers[widgetId], action = msgObj.data.action;
			
						if (widget) {
							parser = window.document.createElement('a');
							parser.href = widget.iframe.src;
							origin = parser.protocol + '//' + parser.host;
			
							if (origin !== msgObj.origin) {
								console.log('Widget ignore message from ' + msgObj.origin);
								return;
							}
			
							if (widget && Widgetfly.Utils.isFunction(widget[action])) {
								widget[action](msgObj.data.msg);
							} else {
								if (!Widgetfly.Utils.isEmpty(myActionHandlers) && Widgetfly.Utils.isFunction(myActionHandlers[action])) {
									myActionHandlers[action](msgObj.data.msg);
								}
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
			
				Server.prototype.init = function() {
					var self = this;
					this.trigger('start');
					window.addEventListener('message', function(msgObj) {
						if(window.parent){
							var action, origin, parser, params,paramData = Widgetfly.Utils.getParameterByName('wo');
							params = JSON.parse(paramData);
							
							parser = window.document.createElement('a');
							parser.href = params.origin;
							origin = parser.protocol + '//' + parser.host;
							
							if(origin !== 'file://' && origin !== msgObj.origin){
								console.log('Server ignore message from ' + msgObj.origin);
								return;
							}
							
							action = msgObj.data.action;
							if (Widgetfly.Utils.isFunction(self[action])) {
								self[action](msgObj.data.msg);
							} else {
								if (!Widgetfly.Utils.isEmpty(self.events) && Widgetfly.Utils.isFunction(self.events[action])) {
									self.events[action](msgObj.data.msg);
								}
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
			
				Server.prototype.trigger = function(action, data) {
					console.log('Server.trigger');
					var corsObj = {
						msg : data,
						action : action,
						id : this.id
					}, params = JSON.parse(Widgetfly.Utils.getParameterByName('wo'));
					
					//console.log(corsObj);
					parent.postMessage(corsObj, params.origin);
				};
			
				Server.prototype.show = function() {
					this.trigger('show');
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
						self.trigger('close');
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
					this.id = Widgetfly.Utils.uniqueId('widget');
				};
			
				Widgetfly.Utils.inherit(Widget, Widgetfly.Events);
			
				Widget.prototype.getId = function() {
					return this.id;
				};
			
				Widget.prototype.onStart = function(callback) {
					if (Widgetfly.Utils.isFunction(callback)) {
						this.on('onStart', callback);
					}
				};
			
				Widget.prototype.start = function() {
					console.log('Widget.Action start');
					var handlers = Widgetfly.Mediator.getActionHandlers(this.id);
					if (handlers && Widgetfly.Utils.isFunction(handlers.onStart)) {
						handlers.onStart();
					}
				};
			
				Widget.prototype.onHide = function(callback) {
					if (Widgetfly.Utils.isFunction(callback)) {
						this.on('onHide', callback);
					}
				};
			
				Widget.prototype.hide = function() {
					console.log('Widget.Action hide');
					if(!Widgetfly.Utils.hasClass(this.el, 'hide')){
						Widgetfly.Utils.addClass(this.el, 'hide');
					}
					var handlers = Widgetfly.Mediator.getActionHandlers(this.id);
					if (handlers && Widgetfly.Utils.isFunction(handlers.onHide)) {
						handlers.onHide();
					}
				};
			
				Widget.prototype.onShow = function(callback) {
					if (Widgetfly.Utils.isFunction(callback)) {
						this.on('onShow', callback);
					}
				};
			
				Widget.prototype.show = function() {
					console.log('Widget.Action show');
					var self = this, handlers;
					if(!Widgetfly.Utils.hasClass(this.el, 'show')){
						Widgetfly.Utils.addClass(this.el, 'show');
					}
					handlers = Widgetfly.Mediator.getActionHandlers(this.id);
					if (handlers && Widgetfly.Utils.isFunction(handlers.onShow)) {
						handlers.onShow();
					}
				};
			
				Widget.prototype.onBeforeClose = function(callback) {
					if (Widgetfly.Utils.isFunction(callback)) {
						this.on('onBeforeClose', callback);
					}
				};
			
				Widget.prototype.close = function() {
					console.log('Widget.Action close');
					var r, self = this, handlers;
					handlers = Widgetfly.Mediator.getActionHandlers(this.id);
					if (handlers && Widgetfly.Utils.isFunction(handlers.onBeforeClose)) {
						r = handlers.onBeforeClose();
					}
					if(r !== false){
						Widgetfly.Mediator.unregister(this.id, function() {
							self.container.removeChild(self.el);
						});
					}
				};
			
				Widget.prototype.register = function() {
					var nowScripts = document.getElementsByTagName('script'), cScript = nowScripts[nowScripts.length - 1];
					//console.log(this);
					Widgetfly.Mediator.register(this.id, this);
					cScript.setAttribute('data-id', this.id);
				};
			
				Widget.prototype.render = function() {
					var src, iframe = document.createElement('iFrame'), origin, urlOptions;
					if (window.location.protocol === 'file:') {
						origin = window.location.href;
					} else {
						origin = window.location.protocol + '//' + window.location.host;
					}
			
					urlOptions = {
						origin : origin
					};
			
					iframe.setAttribute('name', this.id);
			
					if (this.options.src.indexOf('#') === -1) {
						src = this.options.src + '#';
					} else {
						src = this.options.src + '&';
					}
			
					src = src + 'wo=' + decodeURIComponent(JSON.stringify(urlOptions));
			
					iframe.setAttribute('src', src);
					return iframe;
				};
			
				return Widget;
			})(this);
			
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
			
			Widgetfly.Modal = (function(global) {'use strict';
				// Widgetfly.Modal
				// -------------
				var Modal = function(setting) {
					//console.log(setting);
			
					Widgetfly.Widget.apply(this, arguments);
			
					setting.dom = setting.container;
					if (setting.container.substr(0, 1) === '.') {
						setting.appendType = 'class';
						setting.container = setting.container.replace('.', '');
					} else if (setting.container.substr(0, 1) === '#') {
						setting.appendType = 'id';
						setting.container = setting.container.replace('#', '');
					}
			
					if (setting === undefined) {
						return false;
					}
			
					if (Widgetfly.Utils.getElementsByClassName('qt modal').length <= 0) {
						var modalDiv = window.document.createElement('div');
						if (setting.appendType === 'class') {
							modalDiv.setAttribute('class', 'qt modal ' + setting.container);
						} else {
							modalDiv.setAttribute('class', 'qt modal');
							modalDiv.setAttribute('id', setting.container);
						}
						Widgetfly.Utils.getElementsByClassName('qt')[0].appendChild(modalDiv);
					}
			
					if (Widgetfly.Utils.getElementsByClassName('qt modal')[0].childNodes.length > 0) {
						Widgetfly.Utils.getElementsByClassName('qt modal')[0].removeChild(Widgetfly.Utils.getElementsByClassName('qt content')[0]);
						if (setting.appendType === 'class') {
							Widgetfly.Utils.getElementsByClassName('qt modal')[0].setAttribute('class', 'qt modal ' + setting.container);
						} else {
							Widgetfly.Utils.getElementsByClassName('qt modal')[0].setAttribute('class', 'qt modal');
							Widgetfly.Utils.getElementsByClassName('qt modal')[0].setAttribute('id', setting.container);
						}
					}
			
					this.setting = setting;
					this.register(this.id);
			
					if (setting.options.initRender) {
						//console.log(123);
						this.el = this.render(setting);
						Widgetfly.Utils.getElementsByClassName('qt modal')[0].appendChild(this.el);
						Widgetfly.Utils.addClass(Widgetfly.Utils.getElementsByClassName('qt modal')[0], 'active');
					}
					return this;
				};
			
				Widgetfly.Utils.inherit(Modal, Widgetfly.Widget);
			
				Modal.prototype.render = function() {
					//console.log(setting);
					var contentView = window.document.createElement('div'), viewTop = window.document.createElement('div'), spanTitle = document.createElement('span'), aClose = document.createElement('a'), iframe = Widgetfly.Widget.prototype.render.apply(this, arguments);
			
					if (this.setting.options !== undefined && this.setting.options !== null && this.setting.options !== {}) {
						spanTitle.textContent = this.setting.options.title;
					}
			
					aClose.setAttribute('href', '###');
					aClose.setAttribute('class', 'close');
					aClose.textContent = 'x';
					aClose.onclick = function() {
						Widgetfly.Utils.removeClass('.modal', 'active', Widgetfly.Utils.getElementsByClassName('qt')[0]);
					};
			
					viewTop.setAttribute('class', 'qt view-top');
					viewTop.appendChild(spanTitle);
					viewTop.appendChild(aClose);
			
					contentView.setAttribute('class', 'qt content');
					contentView.appendChild(viewTop);
					contentView.appendChild(iframe);
					this.iframe = iframe;
			
					return contentView;
				};
			
				Modal.prototype.sizeChange = function(size) {
					document.getElementsByName(this.id)[0].height = size + 'px';
				};
			
				return Modal;
			
			})(this);
			
			Widgetfly.Popover = (function(global) {'use strict';
				// Widgetfly.Popover
				// -------------
				var Popover = function(setting) {
				};
				
				Widgetfly.Utils.inherit(Popover, Widgetfly.Widget);
				
				return Popover;
			
			})(this);
			
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
			
		
			return Widgetfly;
		})(this);
		
		return Widgetfly;
}));
