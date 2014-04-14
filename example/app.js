'use strict';
require.config({
	baseUrl: '',
	paths: {
		jquery: 'jquery.min',
		widgetfly: 'widgetfly.min'
	},
	shim: {
		jquery: {
			exports: '$'
		},
		widgetfly: {
			exports: 'Widgetfly'
		}
	},
	scriptType: 'text/javascript'
});

require([
	'jquery',
	'widgetfly'
], function ($, Widgetfly) {
	var a = new  Widgetfly();
	a.myMethod('foo');
	a.myPrototype('foo', 'bar');
});
