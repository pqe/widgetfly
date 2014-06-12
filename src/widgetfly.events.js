Widgetfly.Events = (function(global){
	'use strict';
	// Events
	// -------------
	var Events = function() {};

	Events.prototype.trigger = function(action, data, targetId, targetOrigin, transfer) {
		Widgetfly.Mediator.send(this.id, action, data, targetId, targetOrigin, transfer);
	};

	Events.prototype.on = function(eventName, callback) {
		Widgetfly.Mediator.bind(this.id, eventName, callback);
	};

	Events.prototype.off = function(eventName) {
		Widgetfly.Mediator.unbind(this.id, eventName);
	};
		
	return Events;
})(this);
