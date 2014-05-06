/*
 * widgetfly
 * Description of the module
 * @link https://github.com/hsfeng/widgetfly
 * @author hsfeng
 * @version 0.1.0
 * @license https://github.com/hsfeng/widgetfly/blob/master/LICENSE
 * @copyright hsfeng
 */

(function (root, factory) {
		'use strict';
		if (typeof define === 'function' && define.amd) {
			// AMD. Register as an anonymous module.
			define([], function () {
				// Also create a global in case some scripts
				// that are loaded still are looking for
				// a global even when an AMD loader is in use.
				return (root.Widgetfly = factory());
			});
		} else {
			// Browser globals
			root.Widgetfly = factory(root);
		}
	}(this, function () {
		'use strict';
		console.log('Module Widgetfly loaded');
		/**
		 * My AMD module: Widgetfly
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
			find : function () {
				
			}
		},
		
		Utils = {
			has : function (obj, key) {
				return Object.prototype.hasOwnProperty.call(obj, key);
			},
			
			each : function (obj, iterator, context) {
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
						if (Utils.has(obj, key)) {
							if (iterator.call(context, obj[key], key, obj) === breaker) {
								return false;
							}
						}
					}
				}
			},
			
			isEmpty : function (obj) {
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

			extend : function (obj) {
				this.each(Array.prototype.slice.call(arguments, 1), function (source) {
					if (source) {
						for (var prop in source) {
							obj[prop] = source[prop];
						}
					}
				});
				return obj;
			},

			parseUrl : function (URL, checkLib) {
				var nowSrc, parameter, createParam = {}, i, tmpStr, tmpParam;
				if (typeof URL !== 'string' && URL.length > 0) {
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
								} else {
									createParam.appendType = 'id';
								}
							}
						}
						if (parameter.length > 2) {
							createParam.options = {};
							for (i = 2; i < parameter.length; i++) {
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
			
			genId : function () {
				var i = 0, id = '', first, possible1 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', possible2 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
				first = possible1.charAt(Math.floor(Math.random() * possible1.length));
				for (i = 1; i < 20; i++) {
					id += possible2.charAt(Math.floor(Math.random() * possible2.length));
				}
				return (first + id);
			},
			
			getElementsByClassName : function (testClass, startFrom) {
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
				finder.test(a[i].className) && results.push(a[i])) {}
				// do memory management and return the results of our query
				a = null;
				return results;
			},
			
			inIframe : function () {
			    try {
			        return window.self !== window.top;
			    } catch (e) {
			        return true;
			    }
			},

			isFunction : function (obj) {
				return typeof obj === 'function';
			},
			
			isElement : function (o) {
				return (typeof HTMLElement === 'object' ? o instanceof HTMLElement : o && typeof o === 'object' && o !== null && o.nodeType === 1 && typeof o.nodeName === 'string');
			},
	
			trans2Elem : function (element, startFrom) {
				var target;
				if (typeof element === 'string') {
					if (element.substr(0, 1) === '#') {
						target = document.getElementById(element.replace('#', ''));
					} else if (element.substr(0, 1) === '.') {
						target = this.getElementsByClassName(element.replace('.', ''), startFrom)[0];
					} else {
						target = document.getElementsByTagName(element)[0];
					}
				}
				else {
					target = element;
				}
				return target;
			},
	
			hasClass : function (element, cls) {
				return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
			},
	
			addClass : function (element, className, startFrom) {
				var target;
				if (startFrom === undefined) {
					startFrom = document;
				}
				target = this.trans2Elem(element, startFrom);
			    if (!this.hasClass(target, className)) {
			        target.className += ' ' + className;
			    }
			},
	
			removeClass : function (element, rmClass, startFrom) {
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
	
			toggleClass : function (element, className, startFrom) {
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
		},
		
		Events = {
			send : function (id, action, data, targetId, targetOrigin, transfer) {
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
			}
		};
		
		var nowScripts = document.getElementsByTagName('script'),
		instance, param = Utils.parseUrl(nowScripts);
			
		if (!Utils.inIframe()) {
			console.log('Now is app initialize');
			// App initialize			
			var	Server = {
				
				instance : {},
				
				eventInstance : {},
				
				mapping : {},
				
				init : function () {
					window.addEventListener('message', function (msgObj) {
						Server.receive(msgObj);
					}, false);
				},
				
				getInstance : function () {
					return this.instance;
				},
				
				receive : function (msgObj) {
					var intanceId = msgObj.data.id;
					if (msgObj.data.targetId !== undefined) {
						intanceId = msgObj.data.targetId;
					}
					var instance = Server.instance[intanceId],
					eventInstance = Server.eventInstance[intanceId], action = msgObj.data.action;
					if (Utils.isFunction(instance[action])) {
						instance[action]();
					}
					else {
						if (!Utils.isEmpty(eventInstance) && Utils.isFunction(eventInstance[action])) {
							eventInstance[action](msgObj.data.msg);
						}
					}
				}
			};
			
			Server.init();
			
//-------------------------------------------------------------------------------------------------------------				
			var Widget = function () {
				this.id = Utils.genId();
			};
			
			Widget.prototype.on = function (eventName, callback) {
				Server.eventInstance[this.id] = {};
				Server.eventInstance[this.id][eventName] = callback;
			};
			
			Widget.prototype.off = function () {
					
			};
			
			Widget.prototype.register = function () {
				Server.instance[this.id] = this;
			};
			
			Widget.prototype.setMap = function (setting) {
				var append = setting.append;
				if (setting.appendType === 'id') {
					Server.mapping['#' + append] = setting.id;
				}
				else {
					Server.mapping['.' + append] = setting.id;
				}
			};
			
			// Panel
			Widgetfly.Panel = function (setting) {
				//console.log(setting);
				if (setting === undefined) {
					return false;
				}
				
				if (setting.options.src !== undefined) {
					if (setting.append === undefined && setting.appendClass !== undefined) {
						setting.appendType = 'class';
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
			
			Widgetfly.Panel.prototype = new Widget();

			Widgetfly.Panel.prototype.render = function (setting) {
				var iframe = document.createElement('iFrame');
				iframe.setAttribute('src', setting.options.src.toString());
				iframe.setAttribute('name', setting.id);
				//console.log(document.getElementsByTagName('iFrame').item(0));
				if (setting.append === undefined || setting.append === null) {
					Utils.getElementsByClassName('QT')[0].appendChild(iframe);
				} else {
					//console.log(append.substr(1, append.length));
					if (setting.appendType === 'id') {
						if (window.document.getElementById(setting.append).length > 0) {
							window.document.getElementById(setting.append).appendChild(iframe);
						}
					} else {
						Utils.getElementsByClassName(setting.append)[0].appendChild(iframe);
					}
				}
			};
			
			Widgetfly.Panel.prototype.getId = function () {
				return this.id;
			};
			
			Widgetfly.Panel.prototype.show = function () {
				if (this.setting.appendType === 'id') {
					window.document.getElementById(this.setting.append).show();
				}
				else {
					window.document.getElementsByClassName(this.setting.append)[0].show();
				}
			};
			
			Widgetfly.Panel.prototype.hide = function () {
				if (this.setting.appendType === 'id') {
					window.document.getElementById(this.setting.append).hide();
				}
				else {
					window.document.getElementsByClassName(this.setting.append)[0].hide();
				}
			};
		
			// Modal
			Widgetfly.Modal = function (setting) {
				if (setting === undefined) {
					return false;
				}
				if (Utils.getElementsByClassName('QT modal').length <= 0) {
					var modalDiv = window.document.createElement('div');
					if (setting.appendType === 'class') {
						modalDiv.setAttribute('class', 'QT modal ' + setting.append);
					} else {
						modalDiv.setAttribute('class', 'QT modal');
						modalDiv.setAttribute('id', setting.append);
					}
					Utils.getElementsByClassName('QT')[0].appendChild(modalDiv);
				}
	
				if (Utils.getElementsByClassName('QT modal')[0].childNodes.length > 0) {
					Utils.getElementsByClassName('QT modal')[0].removeChild(Utils.getElementsByClassName('QT content')[0]);
					if (setting.appendType === 'class') {
						Utils.getElementsByClassName('QT modal')[0].setAttribute('class', 'QT modal ' + setting.append);
					} else {
						Utils.getElementsByClassName('QT modal')[0].setAttribute('class', 'QT modal');
						Utils.getElementsByClassName('QT modal')[0].setAttribute('id', setting.append);
					}
				}
				
				setting.id = this.id;
				this.setting = setting;
				this.setMap(setting);
				this.register(this.id);
				
				if (setting.options.initRender) {
					//console.log(123);
					this.render(setting);
					Utils.addClass(Utils.getElementsByClassName('QT modal')[0], 'active');
				}
				return this;
			};
	
			Widgetfly.Modal.prototype = new Widget();
			
			Widgetfly.Modal.prototype.getId = function () {
				return this.id;
			};

			Widgetfly.Modal.prototype.render = function (setting) {
				//console.log(setting);
				var contentView = window.document.createElement('div'), viewTop = window.document.createElement('div'), spanTitle = document.createElement('span'), aClose = document.createElement('a'), iframe = document.createElement('iFrame');
	
				if (setting.options !== undefined && setting.options !== null && setting.options !== {}) {
					spanTitle.textContent = setting.options.title;
				}
	
				aClose.setAttribute('href', 'javascript:void(0)');
				aClose.setAttribute('class', 'close');
				aClose.textContent = 'x';
				aClose.onclick = function () {
					Utils.removeClass('.modal', 'active', Utils.getElementsByClassName('QT')[0]);
				};
	
				viewTop.setAttribute('class', 'QT view-top');
				viewTop.appendChild(spanTitle);
				viewTop.appendChild(aClose);
	
				iframe.setAttribute('src', setting.options.src);
				iframe.setAttribute('id', setting.id);
	
				contentView.setAttribute('class', 'QT content');
				contentView.appendChild(viewTop);
				contentView.appendChild(iframe);
	
				Utils.getElementsByClassName('QT modal')[0].appendChild(contentView);
			};
								
			// PopOver
			Widgetfly.PopOver = function (setting) {
				if (setting === undefined) {
					return false;
				}
				if (setting.options.initRender && setting.options.src !== undefined) {
					if (setting.append === undefined && setting.appendClass !== undefined) {
						setting.appendType = 'class';
						setting.append = setting.appendClass;
					}
					setting.id = this.id;
					this.setting = setting;
					this.setMap(setting);
					this.register(this.id);
					
					this.render(setting);
				}
				return this;
			};
			
			Widgetfly.PopOver.prototype = new Widget();
			
			Widgetfly.PopOver.prototype.getId = function () {
				return this.id;
			};
			
			Widgetfly.PopOver.prototype.render = function () {
				return this.id;
			};
//----------------------------------------------------------------------------------------			
			//Initialize for DOM prepare
			if (Utils.getElementsByClassName('QT').length <= 0) {
				instance = window.document.createElement('div');
				instance.setAttribute('class', 'QT');
				window.document.getElementsByTagName('body')[0].appendChild(instance);
			}
						
			if (!Utils.isEmpty(param)) {
				//console.log(param);
				new Widgetfly.Panel(param);
			}
		}
		else {
			console.log('Now is widget initialize');
			// widget
			window.addEventListener('message', function (msgObj) {
				console.log(msgObj);
			}, false);
			
			Widgetfly.Panel = Widgetfly.Modal = Widgetfly.PopOver = {
				trigger : function (action, data, targetId) {
					Events.send(window.name, action, data, targetId);
				},
				
				show : function () {
					Events.send(window.name, 'show');
				},
				
				hide : function () {
					Events.send(window.name, 'hide');
				}
			};
		}
		/*
		var test = new Widgetfly.Panel({
			append : 'QFB',
			appendType : 'class',
			options : {
				initRender : true,
				src : 'http://192.168.73.128/widgetfly/src/prototype/relative.html'
			}
		});
		*/
		//console.log(test);
		//console.log(Server.getInstance()[0].id);

		return Widgetfly;
	})); 