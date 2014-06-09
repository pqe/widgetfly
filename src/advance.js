var Widgetfly = window.Widgetfly, test = new Widgetfly.Panel({
	container : '.QFB',
	autoGrow : true,
	options : {
		initRender : true,
		src : 'http://192.168.73.128/widgetfly/src/demo/relative.html'
	},
	css : {

	}
});

test.onStart(function(){
	console.log('start!!');
});

//setTimeout('test.trigger(test.id, "hello")', 3000);

//test.on('click', function(){});
