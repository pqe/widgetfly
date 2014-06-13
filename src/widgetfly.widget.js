Widgetfly.Widget = (function(global) {'use strict';
	// Widget
	// -------------
	var Widget = function() {
		this.id = Widgetfly.Utils.genId();
	};

	Widgetfly.Utils.inherit(Widget, Widgetfly.Events);

	Widget.prototype.onStart = function(callback) {
		if (Widgetfly.Utils.isFunction(callback)) {
			this.on('onStart', callback);
		}
	};

	Widget.prototype.start = function() {
		console.log('Action onStart');
		var events = Widgetfly.Mediator.getWidgetEvents(this.id);
		if (events && Widgetfly.Utils.isFunction(events.onStart)) {
			events.onStart();
		}
	};

	Widget.prototype.getId = function() {
		return this.id;
	};

	Widget.prototype.onHide = function(callback) {
		if (Widgetfly.Utils.isFunction(callback)) {
			this.on('onHide', callback);
		}
	};

	Widget.prototype.hide = function() {
		console.log('action hide');
		if (this.setting.appendType === 'id') {
			window.document.getElementById(this.setting.container).hide();
		} else {
			window.document.getElementsByClassName(this.setting.container)[0].hide();
		}
		console.log('action onHide');
		var events = Widgetfly.Mediator.getWidgetEvents(this.id);
		if (events && Widgetfly.Utils.isFunction(events.onHide)) {
			events.onHide();
		}
	};

	Widget.prototype.onShow = function(callback) {
		if (Widgetfly.Utils.isFunction(callback)) {
			this.on('onShow', callback);
		}
	};

	Widget.prototype.show = function() {
		var self = this,events;
		console.log('action show');
		if (self.setting.appendType === 'id') {
			if (window.document.getElementById(self.setting.container) !== undefined) {
				window.document.getElementById(self.setting.container).show();
			}
		} else {
			if (window.document.getElementsByClassName(self.setting.container)[0] !== undefined) {
				window.document.getElementsByClassName(self.setting.container)[0].show();
			}
		}
		console.log('action onShow');
		events = Widgetfly.Mediator.getWidgetEvents(this.id);
		if (events && Widgetfly.Utils.isFunction(events.onShow)) {
			events.onShow();
		}
	};

	Widget.prototype.onBeforeClose = function(callback) {
		if (Widgetfly.Utils.isFunction(callback)) {
			this.on('onBeforeClose', callback);
		}
	};

	Widget.prototype.close = function() {
		var self = this, events;
		events = Widgetfly.Mediator.getWidgetEvents(this.id);
		if (events && Widgetfly.Utils.isFunction(events.onBeforeClose)) {
			events.onBeforeClose();
		}
		Widgetfly.Mediator.unregister(this.id, function() {
			var removeDom;
			if (self.setting.appendType === 'class') {
				removeDom = document.getElementsByClassName(self.setting.container)[0];
			} else {
				removeDom = document.getElementById(self.setting.container);
			}
			removeDom.parentNode.removeChild(removeDom);
		});
	};

	Widget.prototype.setMap = function(setting) {
		var container = setting.dom;
		Widgetfly.Mediator.mapping[container] = setting.id;
	};

	Widget.prototype.register = function() {
		var nowScripts = document.getElementsByTagName('script'), cScript = nowScripts[nowScripts.length - 1];
		//console.log(this);
		Widgetfly.Mediator.register(this.id, this);
		cScript.setAttribute('data-id', this.id);
	};

	return Widget;
})(this);
