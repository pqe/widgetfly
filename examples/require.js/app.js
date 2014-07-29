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
		src : 'http://pqe.github.io/widgetfly/examples/widgets/panel.html',
		options : {
			hello: 'world'
		}
	});
	widgetA.onStart(function(){
		console.log('onStart');
	});
});
