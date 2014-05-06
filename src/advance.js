var test = new Widgetfly.Panel({
	append : 'QFB',
	appendType : 'class',
	options : {
		initRender : true,
		src : 'http://192.168.73.128/widgetfly/src/demo/qusion.html'
	},
	css : {

	}
});

test.on('click', function(data){
	var test2 = new Widgetfly.Model({
		append : 'QGPlus',
		appendType : 'class',
		options : {
			initRender : true,
			src : 'http://192.168.73.128/widgetfly/src/demo/relative2.html',
			title : 'test'
		}
	});
});

