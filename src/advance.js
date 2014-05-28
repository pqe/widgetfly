var Widgetfly = window.Widgetfly, test = new Widgetfly.Panel({
	append : 'QFB',
	appendType : 'class',
	options : {
		initRender : true,
		src : 'http://192.168.73.128/widgetfly/src/demo/relative.html'
	},
	css : {

	}
});

test.on('click', function () {
	'use strict';
	var modalTest = new Widgetfly.Modal({
		append : 'QGPlus',
		appendType : 'class',
		options : {
			initRender : true,
			src : 'http://192.168.73.128/widgetfly/src/demo/relative2.html',
			title : 'test'
		}
	});
});
