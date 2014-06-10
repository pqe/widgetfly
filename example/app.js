'use strict';
require.config({
	baseUrl: '',
	paths: {
		widgetfly: '../dist/widgetfly'
	},
	shim: {
		widgetfly: {
			exports: 'Widgetfly'
		}
	},
	scriptType: 'text/javascript'
});

require([
	'widgetfly'
], function (Widgetfly) {
	var a = new (Widgetfly.Panel.extend())({});
	console.log(a);
	var b = new (Widgetfly.Panel.extend())({});
	console.log(b);
	console.log(a);
	a.getId();
});
