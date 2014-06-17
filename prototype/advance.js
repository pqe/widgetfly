var MyWidget = Widgetfly.Panel.extend({/** overwrite **/});
var Orz = Widgetfly.Modal.extend({/** overwrite **/});
//var test = Widgetfly.Popover.extend({/** overwrite **/});

var widgetA = new MyWidget({
	container : '.qfb',
	autoGrow : true,
	show : true,
	src : 'http://192.168.73.128/widgetfly/prototype/relative.html'
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
	show : true,
	src : 'http://192.168.73.128/widgetfly/prototype/relative.html'
});
test.onStart(function(){
	console.log('test is started');
});

/*
function OrzClick(){
	var zz = new test({
		container : '.testBtn',
		targetEl : '#test',
		placement : 'right',
		autoGrow : true,
		show : true,
		src : 'http://192.168.73.128/widgetfly/prototype/relative.html',
		options : {
			
		}
	});
}
*/