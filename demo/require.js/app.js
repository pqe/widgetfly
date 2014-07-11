'use strict';
require.config({
	baseUrl: '',
	paths: {
		widgetfly: '../../dist/widgetfly'
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
	var MyWidget = Widgetfly.Panel.extend({/** overwrite **/});
	var widgetA = new MyWidget({
		container : '.mypanel',
		show : true,
		src : 'http://127.0.0.1:3000/widgetfly/demo/dev/panel.html',
		options : {
			hello: 'world'
		}
	});
	widgetA.onStart(function(){
		alert(1);
	});
});
