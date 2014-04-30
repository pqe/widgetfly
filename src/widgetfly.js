/*
 * widgetfly
 * Description of the module
 * @link https://github.com/hsfeng/widgetfly
 * @author hsfeng
 * @version 0.1.0
 * @license https://github.com/hsfeng/widgetfly/blob/master/LICENSE
 * @copyright hsfeng
 */

( function(root, factory) {
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
		console.log('Module Widgetfly loaded');
		/**
		 * My AMD module: Widgetfly
		 * @module Widgetfly
		 * @namespace Widgetfly
		 * @version 0.1.0
		 * @author hsfeng
		 */

		var Widgetfly = {
			/**
			 * @constructor
			 * @since 0.1.0
			 */
		},
		
		Utils = {
			has : function(obj, key){
				return Object.prototype.hasOwnProperty.call(obj, key);
			},
			
			each : function(obj, iterator, context) {
				if (obj == null)
					return;
				if (Array.prototype.forEach && obj.forEach === Array.prototype.forEach) {
					obj.forEach(iterator, context);
				} else if (obj.length === +obj.length) {
					for (var i = 0, l = obj.length; i < l; i++) {
						if (iterator.call(context, obj[i], i, obj) === breaker)
							return;
					}
				} else {
					for (var key in obj) {
						if (_.has(obj, key)) {
							if (iterator.call(context, obj[key], key, obj) === breaker)
								return;
						}
					}
				}
			},
			
			isEmpty : function(obj) {
				// null and undefined are "empty"
				if (obj == null)
					return true;

				// Assume if it has a length property with a non-zero value
				// that that property is correct.
				if (obj.length > 0)
					return false;
				if (obj.length === 0)
					return true;

				// Otherwise, does it have any properties of its own?
				// Note that this doesn't handle
				// toString and valueOf enumeration bugs in IE < 9
				for (var key in obj) {
					if (hasOwnProperty.call(obj, key))
						return false;
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
							if (parameter[1].split('=', 2)[1] !== "") {
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
							for ( i = 2; i < parameter.length; i++) {
								if (parameter[i].split('=', 2).length > 0) {
									tmpParam = parameter[i].split('=', 2)[1];
									tmpParam = tmpParam.split(':');
									if (tmpParam.length > 0) {
										tmpStr = tmpParam.shift();
										if (tmpParam.length !== 0) {
											tmpParam = tmpParam.join(':');
											if (tmpParam !== "" && tmpParam !== null && tmpParam !== 'null') {
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
				finder.test(a[i].className) && results.push(a[i]));
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
			}
		};
		
		Widgetfly.Events = { 

		};
		
		var self = this, nowScripts = document.getElementsByTagName('script'), 
		instance, param = Utils.parseUrl(nowScripts);
			
		if (!Utils.inIframe() && Utils.getElementsByClassName('QT').length <= 0) {
			// App
			instance = document.createElement('div');
			instance.setAttribute('class', 'QT');
			document.getElementsByTagName('body')[0].appendChild(instance);
			
			var	Server = {
				
				instance : [],
				
				eventInstance : [],
				
				init : function(){
					window.addEventListener('message', function(msgObj) {
						Server.receive(msgObj);
					}, false);					
				},
				
				getInstance : function(){
					return this.instance;
				},
				
				receive : function(msgObj){
					console.log(msgObj);
				}
			};
			
			Server.init();
	
			var Widget = function() {
				this.id = Utils.genId();
				this.register(this.id);
			};
			
			Widget.prototype.on = function(){
				
			};
			
			Widget.prototype.off = function(){
					
			};
			
			Widget.prototype.register = function(){
				Server.instance.push(this);
			};
			
			// Panel
			Widgetfly.Panel = function(options) {
				if(options === undefined){
					options = param;
					options.render = true;
				}

				if(options.render && options.src !== undefined){
					if(options.append === undefined && options.appendClass !== undefined){
						options.appendType = 'class';
						options.append = options.appendClass;
					}
					this.render(options);
				}		
				return this;
			};
			
			Widgetfly.Panel.prototype = new Widget;

			Widgetfly.Panel.prototype.render = function(options){
				var iframe = document.createElement('iFrame');
				iframe.setAttribute('src', options.src.toString());
				iframe.setAttribute('id', this.id);
				//console.log(document.getElementsByTagName('iFrame').item(0));
				if (options.append === undefined || options.append === null) {
					Utils.getElementsByClassName('QT')[0].appendChild(iframe);
				} else {
					//console.log(append.substr(1, append.length));
					if (options.appendType === 'id') {
						if (document.getElementById(options.append).length > 0) {
							document.getElementById(options.append).appendChild(iframe);
						}
					} else {
						Utils.getElementsByClassName(options.append)[0].appendChild(iframe);
					}
				}					
			};
			
			Widgetfly.Panel.prototype.getId = function() {
				return this.id;
			};
			
			Widgetfly.Panel.prototype.show = function(){
				
			};
			
			Widgetfly.Panel.prototype.hide = function(){
				
			};
		
			// Model
			Widgetfly.Model = function() {
				return this;
			};
	
			//Widgetfly.Model.prototype = new Widget;
			
			Widgetfly.Model.prototype.getId = function() {
				return this.id;
			};
						
			// PopOver
			Widgetfly.PopOver = function() {
				return this;
			};
	
			//Widgetfly.PopOver.prototype = new Widget;
			
			Widgetfly.PopOver.prototype.getId = function() {
				return this.id;
			};
		}
		else{
			// widget
		}
				

		
		var test = new Widgetfly.Panel({render:true, appendClass:'QFB', src : 'http://192.168.73.128/widgetfly/src/prototype/relative.html'});
		//var test2 = new Widgetfly.Panel();
		//var test3 = new Widgetfly.Panel();
		console.log(test);
		//console.log(test2);
		//console.log(test3);
		console.log(Server.getInstance()[0].id);

		return Widgetfly;
	}));
