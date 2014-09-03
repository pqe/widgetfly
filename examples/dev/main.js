var PanelWidget = Widgetfly.Panel.extend({/** overwrite **/});
var ModalWidget = Widgetfly.Modal.extend({/** overwrite **/});

var pa0 = new PanelWidget({
	container : '.socialpanel',
	show : true,
	autoGrow : true,
	src : 'http://hsfeng.github.io/widgetfly-showcase/examples/widgets/socialpanel/panel.html',
	options : {

	}
});


var pa1 = new PanelWidget({
	container : '.mypanel',
	show : true,
	autoGrow: true,
	src : 'http://hsfeng.github.io/widgetfly-showcase/examples/widgets/panel.html',
	options : {
		hello : 'world'
	}
});
var m1 = new ModalWidget({
	show : false,
	backdrop : true,
	src : 'http://hsfeng.github.io/widgetfly-showcase/examples/widgets/filechooser/modal.html'
});

m1.on('selected', function(path){
	$('.file').html(path);
});

pa1.onStart(function() {
	console.log('pa1 is started');
	pa1.trigger('hello', 'pa1');

	pa1.onBeforeClose(function() {
		console.log('pa1 is closing');
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
	src : 'http://hsfeng.github.io/widgetfly-showcase/examples/widgets/popover.html'
});

document.querySelector('#target-right').onclick = function() {
	po1.toggle();
};

var po2 = new PopoverWidget({
	target : '#target-left',
	placement : 'left',
	show : false,
	src : 'http://hsfeng.github.io/widgetfly-showcase/examples/widgets/popover.html'
});

document.querySelector('#target-left').onclick = function() {
	po2.toggle();
};

var po3 = new PopoverWidget({
	target : '#target-top',
	placement : 'top',
	show : false,
	src : 'http://hsfeng.github.io/widgetfly-showcase/examples/widgets/popover.html'
});

document.querySelector('#target-top').onclick = function() {
	po3.toggle();
};

var po4 = new PopoverWidget({
	target : '#target-bottom',
	placement : 'bottom',
	show : false,
	src : 'http://hsfeng.github.io/widgetfly-showcase/examples/widgets/popover.html'
});

document.querySelector('#target-bottom').onclick = function() {
	po4.toggle();
};

var PreviewWidget = Widgetfly.Popover.extend({
	preview : function(url){
		this.trigger('preview',url);
	}
});

var po5 = new PreviewWidget({
	target : '#target-preview-1',
	placement : 'top',
	show : false,
	src : 'http://hsfeng.github.io/widgetfly-showcase/examples/widgets/embedly/popover.html'
});

document.querySelector('#target-preview-1').onmouseover = function() {
	po5.preview(document.querySelector('#target-preview-1').getAttribute('href'));
	po5.show();
};

document.querySelector('#target-preview-1').onmouseout = function() {
	po5.hide();
};

document.querySelector('#target-preview-2').onmouseover = function() {
	po5.preview(document.querySelector('#target-preview-2').getAttribute('href'));
	po5.show();
};

document.querySelector('#target-preview-2').onmouseout = function() {
	po5.hide();
};
