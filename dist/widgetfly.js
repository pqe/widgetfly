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
				return (root.Widgetfly = factory(root));
			});
		} else {
			// Browser globals
			root.Widgetfly = factory(root);
		}
	}(this, function(global) {
		'use strict';
		var Widgetfly = (function(global){
			'use strict';
			var Widgetfly;
			
			if(global.Widgetfly){
				Widgetfly = global.Widgetfly;
				Widgetfly.init();
			}else{
				Widgetfly = {};
				
				(function () {
				    // widgetfly.css
				    var cssText = "" +
				".widgetfly .wf-show,.widgetfly.wf-show{display:block !important}.widgetfly .wf-hide,.widgetfly.wf-hide{display:none !important}.widgetfly .wf-root,.widgetfly.wf-root{position:absolute;left:0px;top:-9999px;width:47px;height:29px;z-index:999999999}.widgetfly .wf-spinner,.widgetfly.wf-spinner{margin:16px auto;width:50px;height:30px;text-align:center;font-size:10px}.widgetfly .wf-spinner>div,.widgetfly.wf-spinner>div{background-color:#666;height:100%;width:6px;display:inline-block;margin:0 3px 0 0;-webkit-animation:wf-stretchdelay 1.2s infinite ease-in-out;animation:wf-stretchdelay 1.2s infinite ease-in-out}.widgetfly .wf-spinner>.rect2,.widgetfly.wf-spinner>.rect2{-webkit-animation-delay:-1.1s;animation-delay:-1.1s}.widgetfly .wf-spinner>.rect3,.widgetfly.wf-spinner>.rect3{-webkit-animation-delay:-1s;animation-delay:-1s}.widgetfly .wf-spinner>.rect4,.widgetfly.wf-spinner>.rect4{-webkit-animation-delay:-0.9s;animation-delay:-0.9s}.widgetfly .wf-spinner>.rect5,.widgetfly.wf-spinner>.rect5{-webkit-animation-delay:-0.8s;animation-delay:-0.8s}@-webkit-keyframes wf-stretchdelay{0%,40%,100%{-webkit-transform:scaleY(.4)}20%{-webkit-transform:scaleY(1)}}@keyframes wf-stretchdelay{0%,40%,100%{transform:scaleY(.4);-webkit-transform:scaleY(.4)}20%{transform:scaleY(1);-webkit-transform:scaleY(1)}}.widgetfly .wf-panel,.widgetfly.wf-panel{width:100% !important;border:none !important;overflow:hidden !important}.widgetfly .wf-animated-modal,.widgetfly.wf-animated-modal{-webkit-animation-duration:0.2s;animation-duration:0.2s;-webkit-animation-fill-mode:both;animation-fill-mode:both}@-webkit-keyframes wf-fadeInUpBig{0%{opacity:0;-webkit-transform:translate3d(0, 2000px, 0);transform:translate3d(0, 2000px, 0)}100%{opacity:1;-webkit-transform:none;transform:none}}@keyframes wf-fadeInUpBig{0%{opacity:0;-webkit-transform:translate3d(0, 2000px, 0);-ms-transform:translate3d(0, 2000px, 0);transform:translate3d(0, 2000px, 0)}100%{opacity:1;-webkit-transform:none;-ms-transform:none;transform:none}}.widgetfly .wf-animated-fadeInUpBig{-webkit-animation-name:wf-fadeInUpBig;animation-name:wf-fadeInUpBig}.widgetfly .wf-modal,.widgetfly.wf-modal{position:fixed;top:0;right:0;bottom:0;left:0;z-index:1050;overflow-x:hidden;overflow-y:auto;-webkit-overflow-scrolling:touch;outline:0;opacity:1}.widgetfly .wf-modal .wf-modal-dialog,.widgetfly.wf-modal .wf-modal-dialog{-webkit-transform:translate3d(0, 0, 0);-o-transform:translate3d(0, 0, 0);transform:translate3d(0, 0, 0);position:relative;margin:30px auto;min-width:240px}.widgetfly .wf-modal .wf-modal-dialog .wf-modal-content,.widgetfly.wf-modal .wf-modal-dialog .wf-modal-content{position:relative;background-color:#fff;border:1px solid #ccc;border:1px solid rgba(0,0,0,0.26);border-radius:3px;-webkit-box-shadow:0 2px 5px rgba(0,0,0,0.26);box-shadow:0 2px 5px rgba(0,0,0,0.26);background-clip:padding-box;outline:0}.widgetfly .wf-modal .wf-modal-dialog .wf-modal-content .wf-modal-body,.widgetfly.wf-modal .wf-modal-dialog .wf-modal-content .wf-modal-body{position:relative}.widgetfly .wf-modal .wf-modal-dialog .wf-modal-content .wf-close,.widgetfly.wf-modal .wf-modal-dialog .wf-modal-content .wf-close{position:absolute;right:0px;margin-top:-2px;margin-right:4px;text-decoration:none;font-size:21px;font-weight:600;line-height:1em;color:#000;text-shadow:0 1px 0 #fff;cursor:pointer;filter:alpha(opacity=50);opacity:.5;font-family:\"Helvetica Neue\",Helvetica,Arial,sans-serif;z-index:1050}.widgetfly .wf-modal.wf-modal-lg .wf-modal-dialog,.widgetfly.wf-modal.wf-modal-lg .wf-modal-dialog{max-width:80%}.widgetfly .wf-modal.wf-modal-lg .wf-modal-dialog .wf-modal-body,.widgetfly.wf-modal.wf-modal-lg .wf-modal-dialog .wf-modal-body{min-height:80%}.widgetfly .wf-modal.wf-modal-md .wf-modal-dialog,.widgetfly.wf-modal.wf-modal-md .wf-modal-dialog{max-width:50%}.widgetfly .wf-modal.wf-modal-md .wf-modal-dialog .wf-modal-body,.widgetfly.wf-modal.wf-modal-md .wf-modal-dialog .wf-modal-body{min-height:60%}.widgetfly .wf-modal.wf-modal-sm .wf-modal-dialog,.widgetfly.wf-modal.wf-modal-sm .wf-modal-dialog{max-width:30%}.widgetfly .wf-modal.wf-modal-sm .wf-modal-dialog .wf-modal-body,.widgetfly.wf-modal.wf-modal-sm .wf-modal-dialog .wf-modal-body{min-height:30%}.widgetfly .wf-modal-backdrop,.widgetfly.wf-modal-backdrop{position:fixed;top:0;right:0;bottom:0;left:0;z-index:1040;background-color:#000;filter:alpha(opacity=50);opacity:.5}@media screen and (max-width:640px){.widgetfly.wf-modal .wf-modal-dialog,.widgetfly.wf-modal-lg .wf-modal-dialog,.widgetfly.wf-modal-md .wf-modal-dialog,.widgetfly.wf-modal-sm .wf-modal-dialog{width:100%;min-width:100%;height:100%;min-height:100%;padding:0;margin:0}.widgetfly.wf-modal .wf-modal-dialog .wf-modal-content,.widgetfly.wf-modal-lg .wf-modal-dialog .wf-modal-content,.widgetfly.wf-modal-md .wf-modal-dialog .wf-modal-content,.widgetfly.wf-modal-sm .wf-modal-dialog .wf-modal-content{position:fixed;top:0px;width:100%;min-width:100%;height:100%;min-height:100%;-webkit-animation-name:none;animation-name:none;border:0;border-radius:0}.widgetfly.wf-modal .wf-modal-dialog .wf-modal-content .wf-close,.widgetfly.wf-modal-lg .wf-modal-dialog .wf-modal-content .wf-close,.widgetfly.wf-modal-md .wf-modal-dialog .wf-modal-content .wf-close,.widgetfly.wf-modal-sm .wf-modal-dialog .wf-modal-content .wf-close{right:0px;margin-top:10px;margin-right:10px;font-size:28px;font-weight:800;border-radius:50%;width:35px;height:35px;text-align:center;line-height:23px;border:5px solid #000;text-shadow:none}}.widgetfly .wf-animated-popover,.widgetfly.wf-animated-popover{-webkit-animation-duration:0.5s;animation-duration:0.5s;-webkit-animation-fill-mode:both;animation-fill-mode:both}@-webkit-keyframes wf-fadeIn{0%{opacity:0}100%{opacity:1}}@keyframes wf-fadeIn{0%{opacity:0}100%{opacity:1}}.widgetfly .wf-animated-fadeIn,.widgetfly.wf-animated-fadeIn{-webkit-animation-name:wf-fadeIn;animation-name:wf-fadeIn}.widgetfly .wf-popover,.widgetfly.wf-popover{top:0;left:0;z-index:1010;display:none;padding:1px;text-align:left;background-color:#fff;background-clip:padding-box;border:1px solid #ccc;border:1px solid rgba(0,0,0,0.26);border-radius:3px;-webkit-box-shadow:0 2px 5px rgba(0,0,0,0.26);box-shadow:0 2px 5px rgba(0,0,0,0.26);white-space:normal;position:absolute;display:block;float:left;min-width:240px}.widgetfly .wf-popover .wf-arrow,.widgetfly.wf-popover .wf-arrow{border-width:11px}.widgetfly .wf-popover .wf-arrow,.widgetfly.wf-popover .wf-arrow,.widgetfly .wf-popover .wf-arrow:after,.widgetfly.wf-popover .wf-arrow:after{position:absolute;display:block;width:0;height:0;border-color:transparent;border-style:solid;content:\"\";border-width:10px}.widgetfly .wf-popover.wf-top,.widgetfly.wf-popover.wf-top{margin-bottom:10px}.widgetfly .wf-popover.wf-top .wf-arrow,.widgetfly.wf-popover.wf-top .wf-arrow{bottom:-11px;left:50%;margin-left:-11px;border-top-color:#999;border-top-color:rgba(0,0,0,0.25);border-bottom-width:0}.widgetfly .wf-popover.wf-top .wf-arrow:after,.widgetfly.wf-popover.wf-top .wf-arrow:after{bottom:1px;margin-left:-10px;content:\" \";border-top-color:#fff;border-bottom-width:0}.widgetfly .wf-popover.wf-left,.widgetfly.wf-popover.wf-left{margin-right:10px}.widgetfly .wf-popover.wf-left .wf-arrow,.widgetfly.wf-popover.wf-left .wf-arrow{top:50%;right:-11px;margin-top:-11px;border-right-width:0;border-left-color:#999;border-left-color:rgba(0,0,0,0.25)}.widgetfly .wf-popover.wf-left .wf-arrow:after,.widgetfly.wf-popover.wf-left .wf-arrow:after{right:1px;bottom:-10px;content:\" \";border-right-width:0;border-left-color:#fff}.widgetfly .wf-popover.wf-bottom,.widgetfly.wf-popover.wf-bottom{margin-top:10px}.widgetfly .wf-popover.wf-bottom .wf-arrow,.widgetfly.wf-popover.wf-bottom .wf-arrow{top:-11px;left:50%;margin-left:-11px;border-top-width:0;border-bottom-color:#999;border-bottom-color:rgba(0,0,0,0.25)}.widgetfly .wf-popover.wf-bottom .wf-arrow:after,.widgetfly.wf-popover.wf-bottom .wf-arrow:after{top:1px;margin-left:-10px;content:\" \";border-top-width:0;border-bottom-color:#fff}.widgetfly .wf-popover.wf-right,.widgetfly.wf-popover.wf-right{margin-left:10px}.widgetfly .wf-popover.wf-right .wf-arrow,.widgetfly.wf-popover.wf-right .wf-arrow{top:50%;left:-11px;margin-top:-11px;border-right-color:#999;border-right-color:rgba(0,0,0,0.25);border-left-width:0}.widgetfly .wf-popover.wf-right .wf-arrow:after,.widgetfly.wf-popover.wf-right .wf-arrow:after{bottom:-10px;left:1px;content:\" \";border-right-color:#fff;border-left-width:0}";
				    // cssText end
				
				    var styleEl = document.createElement("style");
				    document.getElementsByTagName("head")[0].appendChild(styleEl);
				    if (styleEl.styleSheet) {
				        if (!styleEl.styleSheet.disabled) {
				            styleEl.styleSheet.cssText = cssText;
				        }
				    } else {
				        try {
				            styleEl.innerHTML = cssText
				        } catch(e) {
				            styleEl.innerText = cssText;
				        }
				    }
				}());
				
				Widgetfly.Utils = (function(global) {'use strict';
					// Utilities
					// -------------
				
					var idCounter = 0, Utils = {
				
						has : function(obj, key) {
							return Object.prototype.hasOwnProperty.call(obj, key);
						},
				
						/**
						 *	The cornerstone, an `each` implementation, aka `forEach`.
						 *	Handles raw objects in addition to array-likes. Treats all
						 *	sparse array-likes as if they were dense.
						 *	Borrowing this code from underscore:
						*	https://github.com/jashkenas/underscore
						 */
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
				
						/**
						 *	Is a given array, string, or object empty?
						 *	An "empty" object has no enumerable own-properties.
						 *	Borrowing this code from underscore:
						 *	https://github.com/jashkenas/underscore
						 */
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
				
						/*
						 *	Extend a given object with all the properties in passed-in object(s).
						 *	Borrowing this code from underscore:
						 *	https://github.com/jashkenas/underscore
						 */
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
				
						/**
						 * Parse and stringify URL query strings
						 * orrowing this code from :
						 * https://github.com/sindresorhus/query-stringby
						 */
						params : function (str) {
							if (typeof str !== 'string') {
								return {};
							}
				
							str = str.trim().replace(/^(\?|#)/, '');
				
							if (!str) {
								return {};
							}
				
							return str.trim().split('&').reduce(function (ret, param) {
								var parts = param.replace(/\+/g, ' ').split('='),
									key = parts[0],
									val = parts[1];
				
								key = decodeURIComponent(key);
								// missing `=` should be `null`:
								// http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
								val = val === undefined ? null : decodeURIComponent(val);
				
								if (!ret.hasOwnProperty(key)) {
									ret[key] = val;
								} else if (Array.isArray(ret[key])) {
									ret[key].push(val);
								} else {
									ret[key] = [ret[key], val];
								}
				
								return ret;
							}, {});
						},
				
						/**
						 * Generate a unique integer id (unique within the entire client session).
						 * Useful for temporary DOM ids.
						 * Borrowing this code from underscore:
						 * https://github.com/jashkenas/underscore
						 */
						uniqueId : function(prefix) {
							var id = String(++idCounter);
							return prefix ? prefix + id : id;
						},
				
						isTrue : function(value){
							if(value === true || value === 'true'){
								return true;
							}else{
								return false;
							}
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
				
						hasClass : function(element, cls) {
							return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
						},
				
						addClass : function(element, className) {
							if (!this.hasClass(element, className)) {
								element.className += ' ' + className;
							}
							this.innerStyle(element);
						},
				
						removeClass : function(element, rmClass) {
							var newClass;
							if (element !== undefined && this.isElement(element)) {
								newClass = ' ' + element.className.replace(/[\t\r\n]/g, ' ') + ' ';
								if (this.hasClass(element, rmClass)) {
									while (newClass.indexOf(' ' + rmClass + ' ') >= 0) {
										newClass = newClass.replace(' ' + rmClass + ' ', ' ');
									}
									element.className = newClass.replace(/^\s+|\s+$/g, '');
								}
							}
							this.innerStyle(element);
						},
				
						toggleClass : function(element, className) {
							var newClass;
							if (element !== undefined && this.isElement(element)) {
								newClass = ' ' + element.className.replace(/[\t\r\n]/g, ' ') + ' ';
								if (this.hasClass(element, className)) {
									while (newClass.indexOf(' ' + className + ' ') >= 0) {
										newClass = newClass.replace(' ' + className + ' ', ' ');
									}
									element.className = newClass.replace(/^\s+|\s+$/g, '');
								} else {
									element.className += ' ' + className;
								}
							}
							this.innerStyle(element);
						},
				
						innerStyle : function css(a, options) {
						    var i,r,mr,cs,match, ruleExp, result,styles = [],rules,mediaRules, sheets = document.styleSheets, o = [], extStyles = '';
						    a.matches = a.matches || a.webkitMatchesSelector || a.mozMatchesSelector || a.msMatchesSelector || a.oMatchesSelector;
						    for (i in sheets) {
										if(sheets[i].href){
											continue;
										}
						        rules = sheets[i].rules || sheets[i].cssRules;
						        for (r in rules) {
											if(rules[r].type === 4){
												if(window.matchMedia(rules[r].media.mediaText).matches){
													mediaRules = rules[r].rules || rules[r].cssRules;
													for (mr in mediaRules) {
															if (a.matches(mediaRules[mr].selectorText)) {
																	o.push(mediaRules[mr].cssText);
															}
													}
												}
											}else{
												if (a.matches(rules[r].selectorText)) {
														o.push(rules[r].cssText);
												}
											}
						        }
						    }
				
						    for (i in o){
									r = o[i];
									if(r && typeof(r) === 'string' && r.indexOf('.widgetfly') === 0){
										ruleExp = /\{\s*([^\}]+)\s\}/g;
										match = ruleExp.exec(r);
										if(match){
											cs = r.split(' ')[1];
											if(cs.indexOf('.wf-') === 0 && cs.indexOf('.wf-animated-') !== 0){
												styles.push(match[1]);
											}
										}
									}
								}
						    result = styles.join(' ');
						    if(options){
									for(i in options){
										extStyles = extStyles + options[i];
									}
									a.setAttribute('data-ext-style', extStyles);
									result = result + ' ' + extStyles;
								}else{
									if(a.getAttribute('data-ext-style')){
										result = result + ' ' + a.getAttribute('data-ext-style');
									}
								}
								a.style.cssText = result;
						},
				
						actual : function(el){
							var elWidth,elHeight,style,
							fixStyle = ' visibility: hidden !important; display: block !important; position: absolute !important;',
							size = function(s){
									if(Boolean(s)){
										return parseInt(s.substring(0,s.indexOf('px')),10);
									}else{
										return 0;
									}
							};
				
							if (el.offsetParent === null) {
								el.setAttribute('style', el.getAttribute('style') + fixStyle);
							}
				
							elWidth = el.offsetWidth;
				
							elHeight = el.offsetHeight;
				
							style = el.getAttribute('style');
							if(style && style.indexOf(fixStyle) !== 0){
								el.setAttribute('style', style.substring(0,style.indexOf(fixStyle)));
							}
							return {
								width : elWidth + size(el.style.marginLeft) + size(el.style.marginRight),
								height : elHeight + size(el.style.marginTop) + size(el.style.marginBottom)
							};
						},
				
						/**
						 * Get the current coordinates of the first element, or set the coordinates of every element, in the set of matched elements, relative to the document.
						 * Borrowing this code from jquery:
						 * https://github.com/jquery/jquery
						 */
						offset: function(el) {
							var docElem, win,
							elem = el,
							box = { top: 0, left: 0 },
							doc = elem && elem.ownerDocument;
				
							if ( !doc ) {
								return;
							}
				
							docElem = doc.documentElement;
							// If we don't have gBCR, just use 0,0 rather than error
							// BlackBerry 5, iOS 3 (original iPhone)
							if ( typeof elem.getBoundingClientRect !== undefined ) {
								box = elem.getBoundingClientRect();
							}
							win = window;
							return {
								top: box.top + win.pageYOffset - docElem.clientTop,
								left: box.left + win.pageXOffset - docElem.clientLeft
							};
						},
				
						toElement : function(content){
							var el = document.createElement('div');
							el.innerHTML = content;
							return el.firstChild;
						},
				
						throttle : function(method, scope) {
								clearTimeout(scope._tId);
								scope._tId = setTimeout(function(){
										method.call(scope);
								}, 100);
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
							widget.mediator = this;
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
							if(callback) {
								callback(true);
							}
						},
				
						send : function(id, action, data) {
							//console.log('Mediator.send');
				
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
							//console.log('Mediator.bind: ' + action);
							if (this.actionHandlers[id] === undefined) {
								this.actionHandlers[id] = {};
							}
							this.actionHandlers[id][action] = callback;
						},
				
						unbind : function(id, action) {
							//console.log('Mediator.unbind');
							delete this.actionHandlers[id][action];
							if (Object.keys(this.actionHandlers[id]).length <= 0) {
								delete this.actionHandlers[id];
							}
						},
				
						receive : function(msgObj) {
							//console.log('Mediator.receive');
				
							var origin, parser, widgetId = msgObj.data.id, widget = this.widgets[widgetId], myActionHandlers = this.actionHandlers[widgetId], action = msgObj.data.action;
				
							if (widget) {
								parser = window.document.createElement('a');
								parser.href = widget.iframe.src;
								origin = parser.protocol + '//' + parser.host;
				
								if (origin !== msgObj.origin) {
									//console.log('Widget ignore message from ' + msgObj.origin);
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
						var self = this, paramData = decodeURIComponent(window.location.hash.substring(1));
						this.params = JSON.parse(paramData);
						this.trigger('start');
						window.addEventListener('message', function(msgObj) {
							if(window.parent){
								var action, origin, parser;
				
								parser = window.document.createElement('a');
								parser.href = self.params.origin;
								origin = parser.protocol + '//' + parser.host;
				
								if(origin !== 'file://' && origin !== msgObj.origin){
									//console.log('Server ignore message from ' + msgObj.origin);
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
						//console.log('Server.trigger');
						var corsObj = {
							msg : data,
							action : action,
							id : this.id
						};
						//self.params = JSON.parse(decodeURIComponent(window.location.hash.substring(1)));
				
						//console.log(corsObj);
						parent.postMessage(corsObj, this.params.origin);
					};
				
					Server.prototype.show = function() {
						this.trigger('show');
					};
				
					Server.prototype.hide = function() {
						this.trigger('hide');
					};
				
					Server.prototype.toggle = function() {
						this.trigger('toggle');
					};
				
					Server.prototype.onClose = function(callback) {
						//console.log('Server onClose action');
						callback();
					};
				
					Server.prototype.close = function() {
						//console.log('Prepare server close action');
						var self = this;
						Widgetfly.Utils.each(this.events, function(key) {
							delete self.events[key];
						});
				
						this.onClose(function() {
							//console.log('Server close action');
							self.trigger('close');
						});
					};
				
					Server.prototype.expand = function() {
						var height = 0, width = null,body = window.document.body;
						if (window.innerHeight) {
						    height = window.innerHeight;
						} else if (body.parentElement.clientHeight) {
						    height = body.parentElement.clientHeight;
						} else if (body && body.clientHeight) {
						    height = body.clientHeight;
						}
						this.trigger('sizeChange', {height : height, width : width});
					};
				
					return Server;
				
				})(this);
				
				Widgetfly.Widget = (function(global) {'use strict';
					// Widget
					// -------------
					var Widget = function(options) {
						this.id = Widgetfly.Utils.uniqueId('widget');
						return this;
					};
				
					Widget.DEFAULTS = Widgetfly.Utils.extend({},{
						spinner : '<div class="widgetfly wf-spinner"><div class="rect1"></div><div class="rect2"></div><div class="rect3"></div><div class="rect4"></div><div class="rect5"></div></div>'
					});
				
					Widgetfly.Utils.inherit(Widget, Widgetfly.Events);
				
					Widget.prototype.getId = function() {
						return this.id;
					};
				
					Widget.prototype.style = function() {
						var r = function(el){
							if(el.className){
								Widgetfly.Utils.addClass(el, el.className);
							}
							var i,j, nodes = el.childNodes;
							for(i in nodes){
								if(nodes[i].className && (nodes[i].className.indexOf('widgetfly') === 0 || nodes[i].className.indexOf('wf-') === 0)){
				
									Widgetfly.Utils.addClass(nodes[i], nodes[i].className);
								}
								if(nodes[i].childNodes){
									for(j in nodes[i].childNodes){
										r(nodes[i].childNodes[j]);
									}
								}
							}
						};
						r(this.el);
					};
				
					Widget.prototype.getIframe = function(){
						var iframe = this.el.querySelector('iframe');
						if(!iframe){
							if(this.el.tagName === 'IFRAME'){
								iframe = this.el;
							}
						}
						return iframe;
					};
				
					Widget.prototype.onStart = function(callback) {
						if (Widgetfly.Utils.isFunction(callback)) {
							this.on('onStart', callback);
						}
					};
				
					Widget.prototype.start = function() {
						//console.log('Widget.Action start');
						var handlers = Widgetfly.Mediator.getActionHandlers(this.id);
						if (handlers && Widgetfly.Utils.isFunction(handlers.onStart)) {
							handlers.onStart();
						}
				
						if(Widgetfly.Utils.isTrue(this.options.show)){
							this.show();
						}else{
							this.hide();
						}
				
					};
				
					Widget.prototype.onHide = function(callback) {
						if (Widgetfly.Utils.isFunction(callback)) {
							this.on('onHide', callback);
						}
					};
				
					Widget.prototype.hide = function() {
						//console.log('Widget.Action hide');
						Widgetfly.Utils.removeClass(this.el, 'wf-show');
						Widgetfly.Utils.removeClass(this.el, 'wf-hide');
						Widgetfly.Utils.addClass(this.el, 'wf-hide');
						var handlers = Widgetfly.Mediator.getActionHandlers(this.id);
						if (handlers && Widgetfly.Utils.isFunction(handlers.onHide)) {
							handlers.onHide();
						}
					};
				
					Widget.prototype.toggle = function() {
							if(this.isShow()){
								this.hide();
							}else{
								this.show();
							}
					};
				
					Widget.prototype.onShow = function(callback) {
						if (Widgetfly.Utils.isFunction(callback)) {
							this.on('onShow', callback);
						}
					};
				
					Widget.prototype.isShow = function() {
						return Widgetfly.Utils.hasClass(this.el,'wf-show');
					};
				
					Widget.prototype.show = function() {
						//console.log('Widget.Action show');
						var self = this, handlers;
						Widgetfly.Utils.removeClass(this.el, 'wf-show');
						Widgetfly.Utils.removeClass(this.el, 'wf-hide');
						Widgetfly.Utils.addClass(this.el, 'wf-show');
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
						//console.log('Widget.Action close');
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
						var nowScripts = document.currentScript;
						//console.log(this);
						Widgetfly.Mediator.register(this.id, this);
						if(nowScripts){
							nowScripts.setAttribute('data-id', this.id);
						}
					};
				
					Widget.prototype.render = function() {
						var self = this, src, iframe, origin, urlOptions;
						if (window.location.protocol === 'file:') {
							origin = window.location.protocol + '//' + window.location.pathname;
						} else {
							origin = window.location.protocol + '//' + window.location.host;
						}
				
						urlOptions = {
							origin : origin,
							options : this.options.options,
							autoGrow : this.options.autoGrow
						};
				
						this.spinner = Widgetfly.Utils.toElement(this.options.spinner);
				
						this.el = Widgetfly.Utils.toElement(this.options.template);
				
						iframe = this.getIframe();
				
						iframe.setAttribute('name', this.id);
				
						if (this.options.src.indexOf('#') === -1) {
							src = this.options.src + '#';
						} else {
							src = this.options.src.substring(0,this.options.src.indexOf('#')) + '#';
						}
				
						src = src + encodeURIComponent(JSON.stringify(urlOptions));
				
						iframe.onload = function(e){
							if(self.spinner){
								if(self.spinner.parentNode){
									self.spinner.parentNode.removeChild(self.spinner);
								}
							}
						};
				
						iframe.setAttribute('src', src);
				
						return iframe;
					};
				
					Widget.prototype.sizeChange = function(size){
						Widgetfly.Utils.innerStyle(this.iframe,{size: 'height:' + ((typeof size.height === 'string') ? size.height : (String(size.height) + 'px'))});
					};
				
					return Widget;
				})(this);
				
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
				
				Widgetfly.Modal = (function(global) {'use strict';
					// Widgetfly.Modal
					// -------------
					var Modal = function(options) {
						var self = this, sizeClass, aw, w;
				
						Widgetfly.Widget.apply(this, arguments);
						this.options = Widgetfly.Utils.extend({}, Modal.DEFAULTS,options);
						this.container = window.document.querySelector('body');
				
						if (options === undefined) {
							return false;
						}
				
						aw = Widgetfly.Mediator.widgets;
						for(w in aw){
							if(aw[w] instanceof Widgetfly.Modal){
								aw[w].close();
							}
						}
				
						this.register(this.id);
				
						if (this.container) {
							this.render();
				
							this.iframe = this.getIframe();
				
							this.backdrop = document.createElement('div');
				
							if(this.options.size === 'large'){
								sizeClass = 'wf-modal-lg';
							}else if(this.options.size === 'small'){
								sizeClass = 'wf-modal-sm';
							}else{
								sizeClass = 'wf-modal-md';
							}
							Widgetfly.Utils.addClass(this.el,sizeClass);
				
							Widgetfly.Utils.addClass(this.backdrop,'widgetfly wf-modal-backdrop wf-hide');
				
							//bind close event
							this.el.querySelector('.wf-close').onclick = function() {
								self.hide();
							};
				
							this.el.onclick = function(e){
								if(e.target === self.el){
									self.hide();
								}
							};
				
							if(this.options.backdrop){
								this.container.appendChild(this.backdrop);
							}
				
							this.style();
				
							this.el.querySelector('.wf-modal-content').insertBefore(this.spinner,this.iframe);
							this.container.appendChild(this.el);
				
						}
				
						this.resizeCallback = function(e){
							if(self.isShow()){
								Widgetfly.Utils.throttle(self.style, self);
							}
						};
				
						window.addEventListener('resize', this.resizeCallback, false);
				
						return this;
					};
				
					Modal.DEFAULTS = Widgetfly.Utils.extend({}, Widgetfly.Widget.DEFAULTS,{
						autoGrow : false,
						show : true,
						backdrop : true,
						template : '<div class="widgetfly wf-modal wf-hide"><div class="wf-modal-dialog"><div class="wf-modal-content wf-animated-fadeInUpBig wf-animated-modal"><a class="wf-close" href="javascript:void(0)">&#215</a><iframe allowtransparency="true" frameborder="0" tabindex="0" title="Widgetfly Widget" width="100%" class="wf-modal-body wf-show"></iframe></div></div></div>',
						options : {
				
						}
					});
				
					Widgetfly.Utils.inherit(Modal, Widgetfly.Widget);
				
					Modal.prototype.show = function() {
						//show only one modal at a time
						for(var i in this.mediator.widgets){
							if(this.mediator.widgets[i] instanceof Widgetfly.Modal){
								if(this.mediator.widgets[i].isShow()){
									this.mediator.widgets[i].hide();
								}
							}
						}
						Widgetfly.Widget.prototype.show.apply(this, arguments);
						if(Widgetfly.Utils.isTrue(this.options.backdrop)){
							Widgetfly.Utils.removeClass(this.backdrop, 'wf-show');
							Widgetfly.Utils.removeClass(this.backdrop, 'wf-hide');
							Widgetfly.Utils.addClass(this.backdrop, 'wf-show');
						}
					};
				
					Modal.prototype.hide = function() {
						Widgetfly.Widget.prototype.hide.apply(this, arguments);
						if(Widgetfly.Utils.isTrue(this.options.backdrop)){
							Widgetfly.Utils.removeClass(this.backdrop, 'wf-show');
							Widgetfly.Utils.removeClass(this.backdrop, 'wf-hide');
							Widgetfly.Utils.addClass(this.backdrop, 'wf-hide');
						}
					};
				
					Modal.prototype.close = function() {
						//console.log('Widget.Action close');
						var r, self = this, handlers;
						handlers = Widgetfly.Mediator.getActionHandlers(this.id);
						if (handlers && Widgetfly.Utils.isFunction(handlers.onBeforeClose)) {
							r = handlers.onBeforeClose();
						}
						window.window.removeEventListener('resize', this.resizeCallback, false);
						if(r !== false){
							Widgetfly.Mediator.unregister(this.id, function() {
								self.container.removeChild(self.el);
								if(Widgetfly.Utils.isTrue(self.options.backdrop)){
									self.container.removeChild(self.backdrop);
								}
							});
						}
					};
				
					return Modal;
				
				})(this);
				
				Widgetfly.Popover = (function(global) {'use strict';
					// Widgetfly.Popover
					// -------------
					var Popover = function(options) {
						var self = this;
				
						Widgetfly.Widget.apply(this, arguments);
						this.options = Widgetfly.Utils.extend({}, Popover.DEFAULTS,options);
				
						this.styles = {};
						if(options.styles){
							this.styles.extra = options.styles;
						}
				
						this.container = window.document.querySelector('body');
				
						if (options === undefined || options.target === undefined || options.target === null) {
							return false;
						}
				
						this.register(this.id);
				
						if(typeof options.target === 'string'){
							this.target = document.querySelector(options.target);
						}else if(typeof options.target === 'object'){
							this.target = options.target;
						}
				
						if (this.target && this.target.length <= 0) {
							return false;
						}
				
						this.render();
				
						if(this.options.size){
							this.styles.size = 'height:' + this.options.size.height + '; width:' + this.options.size.width;
						}
				
						this.iframe = this.getIframe();
				
						this.style();
				
						if (this.container) {
							this.el.insertBefore(this.spinner,this.iframe);
							this.container.appendChild(this.el);
						}
				
						this.resizeCallback = function(e){
							if(self.isShow()){
								Widgetfly.Utils.throttle(self.applyPlacement, self);
							}
						};
				
						window.addEventListener('resize', this.resizeCallback, false);
				
						return this;
					};
				
					Popover.DEFAULTS = Widgetfly.Utils.extend({}, Widgetfly.Widget.DEFAULTS,{
						autoGrow : false,
						show : true,
						placement : 'right',
						template : '<div class="widgetfly wf-popover wf-hide wf-animated-fadeIn wf-animated-popover"><div class="wf-arrow"></div><iframe allowtransparency="true" frameborder="0" tabindex="0" title="Widgetfly Widget" width="100%" class="wf-popover-content"></iframe></div>',
						options : {
				
						}
					});
				
					Widgetfly.Utils.inherit(Popover, Widgetfly.Widget);
				
					Popover.prototype.style = function() {
						var placement = this.options.placement;
						if(!placement){
							placement = 'right';
						}
						Widgetfly.Utils.addClass(this.el, 'wf-' + placement);
						Widgetfly.Widget.prototype.style.apply(this, arguments);
					};
				
					Popover.prototype.applyPlacement = function () {
						Widgetfly.Utils.innerStyle(this.el,this.styles);
				
						var top,left,offset = Widgetfly.Utils.offset(this.target),
							tg  = Widgetfly.Utils.actual(this.target),
							el = Widgetfly.Utils.actual(this.el);
				
						if(this.options.placement === 'left'){
							top = offset.top + Math.round(tg.height / 2) - Math.round(el.height / 2);
							left = offset.left - el.width;
						}else if(this.options.placement === 'top'){
							top =  offset.top - el.height;
							left = offset.left + Math.round(tg.width / 2) - Math.round(el.width / 2);
						}else if(this.options.placement === 'bottom'){
							top =  offset.top + tg.height;
							left = offset.left + Math.round(tg.width / 2) - Math.round(el.width / 2);
						}else{
							//default: right
							top = offset.top + Math.round(tg.height / 2) - Math.round(el.height / 2);
							left = offset.left + tg.width;
						}
						this.styles.offset = 'top: ' + ((typeof top === 'string') ? top : (String(top) + 'px')) + '; left:' + ((typeof left === 'string') ? left : (String(left) + 'px;'));
						Widgetfly.Utils.innerStyle(this.el,this.styles);
					};
				
					Popover.prototype.show = function(){
						var self = this;
						/*
						if(this.interval) {
							clearInterval(this.interval);
						}*/
				
						this.applyPlacement();
				
						/*this.interval = setInterval(function(){
							self.applyPlacement();
						},500);*/
				
						Widgetfly.Widget.prototype.show.apply(this, arguments);
					};
				
					/*Popover.prototype.hide = function(){
						if(this.interval) {
							clearInterval(this.interval);
						}
						Widgetfly.Widget.prototype.hide.apply(this, arguments);
					};
					*/
				
					Popover.prototype.close = function(){
						window.window.removeEventListener('resize', this.resizeCallback, false);
				
						Widgetfly.Widget.prototype.close.apply(this, arguments);
					};
				
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
									}else if(params.type === 'popover'){
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
				
			}
		
			return Widgetfly;
		})(window);
		
		return Widgetfly;
}));
