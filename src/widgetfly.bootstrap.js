(function(window){
	'use strict';
	// Initialize for DOM prepare
	// -------------
	var nowScripts = document.getElementsByTagName('script'),
		instance,
		param = Widgetfly.Utils.parseUrl(nowScripts);
	
	if (!Widgetfly.Utils.inIframe()) {
		console.log('Now is app initialize');
		Widgetfly.Mediator.init();
		if (Widgetfly.Utils.getElementsByClassName('qt').length <= 0) {
			instance = window.document.createElement('div');
			instance.setAttribute('class', 'qt');
			window.document.getElementsByTagName('body')[0].appendChild(instance);
		}
		if (!Widgetfly.Utils.isEmpty(param)) {
			//console.log(param);
			new Widgetfly.Panel(param);
		}
	} else {
		console.log('Now is widget initialize');
		// widget
		//var Server = new Widgetfly.Server();
	}

})(this);
