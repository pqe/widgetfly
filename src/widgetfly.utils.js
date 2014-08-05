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
		    var i,r,cs,match, ruleExp, result,styles = [],rules, sheets = document.styleSheets, o = [], extStyles = '';
		    a.matches = a.matches || a.webkitMatchesSelector || a.mozMatchesSelector || a.msMatchesSelector || a.oMatchesSelector;
		    for (i in sheets) {
		        rules = sheets[i].rules || sheets[i].cssRules;
		        for (r in rules) {
		            if (a.matches(rules[r].selectorText)) {
		                o.push(rules[r].cssText);
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
		}

	};

	return Utils;
})(this);
