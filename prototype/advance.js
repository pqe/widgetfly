var MyWidget = Widgetfly.Panel.extend({/** overwrite **/});
var Orz = Widgetfly.Modal.extend({/** overwrite **/});
var widgetA = new MyWidget({
	container : '.qfb',
	autoGrow : true,
	options : {
		initRender : true,
		src : 'http://192.168.73.128/widgetfly/prototype/relative.html'
	},
	css : {

	}
});
widgetA.onStart(function() {
	console.log('widgetA is started');
	widgetA.trigger('hello', 'widgetA');
});
console.log(widgetA);
//widgetA.hide();
widgetA.on('click', function(){
	widgetA.hide();
});

var test = new Orz({
	container : '.testModal',
	autoGrow : true,
	options : {
		initRender : true,
		src : 'http://192.168.73.128/widgetfly/prototype/relative.html'
	}
});
test.onStart(function(){
	console.log('test is started');
});
