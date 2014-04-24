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
		};
		
		Widgetfly.utilties = {
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
				each(slice.call(arguments, 1), function(source) {
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
			}
		}; 
		
		Widgetfly.Events = function(){
			
		};

		Widgetfly.Events.prototype = {

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
		}; 
		
		Widgetfly.Server = {
		};
		
		Widgetfly.widget = function(){
			console.log(2);
		};
		
		Widgetfly.widget.prototype = {
			widget : function(){
				
			}
		};
		
		Widgetfly.Panel = function(){
			console.log(1);
		};
		
		Widgetfly.Panel.prototype = Widgetfly.widget.prototype = {
			Panel : function(){
				
			}
		};
		var test = new Widgetfly.Panel();
		console.log(test);
		
		/*
		var Widget = function() {
			*
			 * my method
			 * @method myMethod
			 * @memberof Widgetfly
			 * @param {string|Object|number} param
			 * @since 0.1.0
			 * @returns {String} returns params
			 
			return this;
		};
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
		return Widgetfly;
	}));
