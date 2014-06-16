Widgetfly.Events = (function(global) {'use strict';
	// Events
	// -------------
	var Events = function() {
	};

	Events.prototype.trigger = function(action, data) {
		Widgetfly.Mediator.send(this.id, action, data);
	};

	Events.prototype.on = function(action, callback) {
		Widgetfly.Mediator.bind(this.id, action, callback);
	};

	Events.prototype.off = function(action) {
		Widgetfly.Mediator.unbind(this.id, action);
	};

	return Events;
})(this);
