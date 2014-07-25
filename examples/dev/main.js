var PanelWidget = Widgetfly.Panel.extend({/** overwrite **/});
var ModalWidget = Widgetfly.Modal.extend({/** overwrite **/});
var pa1 = new PanelWidget({
	container : '.mypanel',
	show : true,
	//src : 'http://127.0.0.1:3000/widgetfly/example/dev/panel.html',
	src : '../../examples/widgets/panel.html',
	options : {
		hello : 'world'
	}
});
var m1 = new ModalWidget({
	show : false,
	backdrop : true,
	src : '../../examples/widgets/modal.html'
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
	//widgetA.close();
});

var PopoverWidget = Widgetfly.Popover.extend({/** overwrite **/});
var po1 = new PopoverWidget({
	target : '#target-right',
	placement : 'right',
	show : false,
	src : '../../examples/widgets/popover.html'
	//src : 'http://127.0.0.1:3000/widgetfly/example/dev/popover.html'
});

document.querySelector('#target-right').onmouseover = function() {
	po1.show();
};
document.querySelector('#target-right').onmouseleave = function() {
	po1.hide();
};
var po2 = new PopoverWidget({
	target : '#target-left',
	placement : 'left',
	show : false,
	src : '../../examples/widgets/popover.html'
	//src : 'http://127.0.0.1:3000/widgetfly/example/dev/popover.html'
});

document.querySelector('#target-left').onmouseover = function() {
	po2.show();
};
document.querySelector('#target-left').onmouseleave = function() {
	po2.hide();
};
var po3 = new PopoverWidget({
	target : '#target-top',
	placement : 'top',
	show : false,
	src : '../../examples/widgets/popover.html'
	//src : 'http://127.0.0.1:3000/widgetfly/example/dev/popover.html'
});

document.querySelector('#target-top').onmouseover = function() {
	po3.show();
};
document.querySelector('#target-top').onmouseleave = function() {
	po3.hide();
};
var po4 = new PopoverWidget({
	target : '#target-bottom',
	placement : 'bottom',
	show : false,
	src : '../../examples/widgets/popover.html'
	//src : 'http://127.0.0.1:3000/widgetfly/example/dev/popover.html'
});

document.querySelector('#target-bottom').onmouseover = function() {
	po4.show();
};
document.querySelector('#target-bottom').onmouseleave = function() {
	po4.hide();
}; 