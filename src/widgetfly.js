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
		var Widgetfly = function(){
			/**
		 	* @constructor
		 	* @since 0.1.0
		 	*/
			console.log('Initialize the lib');
			
			var baseObj = Object.create(Base), script = document.getElementsByTagName('script'), index = script.length - 1, nowScript = script[index], parameter = baseObj.parseUrl(nowScript.src);
			if(!baseObj.isEmpty(parameter)){
				baseObj.Widget = widget;
			}
			else{
				baseObj.Server = Server;
			}
			return baseObj;
		}, 
		
		Base = {	
			isEmpty : function(obj){
			    // null and undefined are "empty"
			    if (obj == null) return true;
			
			    // Assume if it has a length property with a non-zero value
			    // that that property is correct.
			    if (obj.length > 0)    return false;
			    if (obj.length === 0)  return true;
			
			    // Otherwise, does it have any properties of its own?
			    // Note that this doesn't handle
			    // toString and valueOf enumeration bugs in IE < 9
			    for (var key in obj) {
			        if (hasOwnProperty.call(obj, key)) return false;
			    }			
			    return true;				
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
			}
		},
		
		Events = Widgetfly.Events = {

			events : [],

			on : function(action, callback) {
				switch(action) {
					case 'click':
						
					break;
					case 'open':
						break;
					case 'close':
						break;
					default:
				}
			},

			trigger : function(action) {
				switch(action) {
					case 'click':
						break;
					case 'open':
						break;
					case 'close':
						break;
					default:
				}
			}
		}, 
		
		Server = {
			on : Events.on
		},
		
		Widget = function() {
			/**
			 * my method
			 * @method myMethod
			 * @memberof Widgetfly
			 * @param {string|Object|number} param
			 * @since 0.1.0
			 * @returns {String} returns params
			 */
			return this;
		};

		/**
		 * my prototype
		 * @method myPrototype
		 * @memberof Widgetfly
		 * @param {string} name
		 * @param {string} value
		 * @since 0.1.0
		 * @returns {String} returns name | value
		 */
		/*
		Widgetfly.Server.prototype.myPrototype = function(name, value) {
			console.log('Method: myPrototype');
			return name + ' | ' + value;
		};
		*/
		if(window.Widgetfly === undefined){
			window.Widgetfly = window.$Q = Widgetfly();					
		}
		return window.Widgetfly;
	})); 