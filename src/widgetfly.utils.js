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
