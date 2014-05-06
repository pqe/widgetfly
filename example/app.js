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
	var a = new Widgetfly.Panel({append: 'abc', name: 'a', options: {}});
	console.log(a);
	var b = new Widgetfly.Panel({append: 'def', name: 'b', options: {}});
	console.log(b);
	console.log(a);
	a.show();
});
