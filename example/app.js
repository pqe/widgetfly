'use strict';
require.config({
	baseUrl: '',
	paths: {
		widgetfly: '../src/widgetfly'
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
	var a = new Widgetfly.Panel();
	console.log(a);
});
