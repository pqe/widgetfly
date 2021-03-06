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
	var PanelWidget = Widgetfly.Panel.extend({/** overwrite **/});
	var ModalWidget = Widgetfly.Modal.extend({/** overwrite **/});
	var pa1 = new PanelWidget({
		container : '.mypanel',
		show : true,
		src : 'http://hsfeng.github.io/widgetfly-showcase/examples/widgets/panel.html',
		options : {
			hello: 'world'
		}
	});
	var m1 = new ModalWidget({
		show : false,
		backdrop : true,
		src : 'http://hsfeng.github.io/widgetfly-showcase/examples/widgets/filechooser/modal.html'
	});

	m1.on('selected', function(path){
		document.querySelector('.file').innerHTML = path;
	});

	pa1.onStart(function() {
		console.log('p1 is started');
		pa1.trigger('hello', 'p1');

		pa1.onBeforeClose(function() {
			console.log('p1 is closing');
			return true;
		});
		pa1.on('openModalWidget', function() {
			m1.show();
		});
	});
});
