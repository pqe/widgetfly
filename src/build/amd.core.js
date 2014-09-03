/*
 * Widgetfly
 * A javascript library for building cross-site web widgets.
 * @link https://github.com/qpe/widgetfly
 * @author hsfeng
 * @version 0.1.3
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
		// @include widgetfly.core.js
		return Widgetfly;
}));
