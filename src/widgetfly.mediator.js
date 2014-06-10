Widgetfly.Mediator = (function(global) {
	'use strict';
	// Mediator
	// -------------
	var Mediator = {

		instance : {},

		eventInstance : {},

		mapping : {},

		init : function() {
			window.addEventListener('message', function(msgObj) {
				Mediator.receive(msgObj);
			}, false);
		},

		getWidget : function(Id) {
			return this.instance[Id];
		},

		register : function(instance) {
			this.instance[instance.id] = instance;
		},

		unregister : function(id, callback) {
			if (this.eventInstance[id] !== undefined) {
				var self = this;
				Widgetfly.Utils.each(this.eventInstance[id], function(key) {
					delete self.eventInstance[id][key];
				});
			}
			delete this.instance[id];
			callback(true);
		},

		send : function(id, action, data, targetId, targetOrigin, transfer) {
			console.log('Events.trigger');
			var corsObj = {
				msg : data,
				action : action,
				id : id
			};

			if (targetId !== undefined) {
				corsObj.targetId = targetId;
			}

			if (targetOrigin === undefined) {
				targetOrigin = '*';
			}
			window.frames[id].postMessage(corsObj, targetOrigin, transfer);
			//window.postMessage(corsObj, targetOrigin, transfer);
		},

		bind : function(id, eventName, callback) {
			console.log('Events.bind');
			if (this.eventInstance[id] === undefined) {
				this.eventInstance[id] = {};
			}
			this.eventInstance[id][eventName] = callback;
		},

		unbind : function(id, eventName) {
			console.log('Events.unbind');
			delete this.eventInstance[id][eventName];
			if (Object.keys(this.eventInstance[id]).length <= 0) {
				delete this.eventInstance[id];
			}
		},

		receive : function(msgObj) {
			console.log('Mediator.receive');
			var instanceId = msgObj.data.id;
			if (msgObj.data.targetId !== undefined) {
				instanceId = msgObj.data.targetId;
			}

			var instance = Mediator.instance[instanceId], eventInstance = Mediator.eventInstance[instanceId], action = msgObj.data.action;
			if (Widgetfly.Utils.isFunction(instance[action])) {
				instance[action](msgObj.data.msg);
			} else {
				if (!Widgetfly.Utils.isEmpty(eventInstance) && Widgetfly.Utils.isFunction(eventInstance[action])) {
					eventInstance[action](msgObj.data.msg);
				}
			}
		}
	};
	
	return Mediator;
})(this);
