var Widgetfly = (function(global){
	'use strict';
	var Widgetfly;
	
	if(global.Widgetfly){
		Widgetfly = global.Widgetfly;
		Widgetfly.init();
	}else{
		Widgetfly = {};
		
		// @include ../../.tmp/widgetfly.css.js
		// @include ../widgetfly.utils.js
		// @include ../widgetfly.events.js
		// @include ../widgetfly.mediator.js
		// @include ../widgetfly.server.js
		// @include ../widgetfly.widget.js
		// @include ../widgetfly.panel.js
		// @include ../widgetfly.modal.js
		// @include ../widgetfly.popover.js
		// @include ../widgetfly.bootstrap.js
	}

	return Widgetfly;
})(window);
