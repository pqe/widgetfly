var PanelWidget = Widgetfly.Panel.extend({/** overwrite **/});
var ModalWidget = Widgetfly.Modal.extend({/** overwrite **/});

var pa0 = new PanelWidget({
	container : '.socialpanel',
	show : true,
	autoGrow : true,
	src : 'http://pqe.github.io/widgetfly/examples/widgets/socialpanel/panel.html',
	options : {

	}
});


var pa1 = new PanelWidget({
	container : '.mypanel',
	show : true,
	src : 'http://pqe.github.io/widgetfly/examples/widgets/panel.html',
	options : {
		hello : 'world'
	}
});
var m1 = new ModalWidget({
	show : false,
	backdrop : true,
	src : '../../../widgetfly.github.io/examples/widgets/filechooser/modal.html'
});

m1.on('selected', function(path){
	$('.file').html(path);
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

var PopoverWidget = Widgetfly.Popover.extend({/** overwrite **/});
var po1 = new PopoverWidget({
	target : '#target-right',
	placement : 'right',
	show : false,
	src : 'http://pqe.github.io/widgetfly/examples/widgets/popover.html'
	//src : 'http://127.0.0.1:3000/widgetfly/example/dev/popover.html'
});

document.querySelector('#target-right').onclick = function() {
	po1.toggle();
};

var po2 = new PopoverWidget({
	target : '#target-left',
	placement : 'left',
	show : false,
	src : 'http://pqe.github.io/widgetfly/examples/widgets/popover.html'
	//src : 'http://127.0.0.1:3000/widgetfly/example/dev/popover.html'
});

document.querySelector('#target-left').onclick = function() {
	po2.toggle();
};

var po3 = new PopoverWidget({
	target : '#target-top',
	placement : 'top',
	show : false,
	src : 'http://pqe.github.io/widgetfly/examples/widgets/popover.html'
	//src : 'http://127.0.0.1:3000/widgetfly/example/dev/popover.html'
});

document.querySelector('#target-top').onclick = function() {
	po3.toggle();
};

var po4 = new PopoverWidget({
	target : '#target-bottom',
	placement : 'bottom',
	show : false,
	src : 'http://pqe.github.io/widgetfly/examples/widgets/popover.html'
	//src : 'http://127.0.0.1:3000/widgetfly/example/dev/popover.html'
});

document.querySelector('#target-bottom').onclick = function() {
	po4.toggle();
};
