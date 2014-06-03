var Widgetfly = window.Widgetfly, test = new Widgetfly.Panel({
	append : '.QFB',
	options : {
		initRender : true,
		src : 'http://192.168.73.128/widgetfly/src/demo/relative.html'
	},
	css : {

	}
});
test.on('click', function(){
	test.close();
});
//
//test.on('click', function(){});
