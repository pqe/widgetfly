Widgetfly.Mediator = (function(global) {
	'use strict';
	// Mediator
	// -------------
	var Mediator = {

		widgets : {},

		widgetEvents : {},

		mapping : {},

		init : function() {
			var self = this;
			window.addEventListener('message', function(msgObj) {
				self.receive(msgObj);
			}, false);
		},

		getWidget : function(id) {
			return this.widgets[id];
		},
		
		getWidgetEvents : function(id){
			return this.widgetEvents[id];
		},

		register : function(id, widget) {
			this.widgets[widget.id] = widget;
			this.widgetEvents[widget.id] = {};
		},

		unregister : function(id, callback) {
			if (this.widgetEvents[id] !== undefined) {
				var self = this;
				Widgetfly.Utils.each(this.widgetEvents[id], function(key) {
					delete self.widgetEvents[id][key];
				});
			}
			delete this.widgets[id];
			callback(true);
		},
		
		send : function(id, action, data) {
			console.log('Events.trigger');
			
			var f, i, targetOrigin, corsObj = {
				msg : data,
				action : action,
				id : id
			};

			for(i = 0; i < window.frames.length; i++){
				if(window.frames[i].name === id){
					f =  window.frames[i];
					break;
				}
			}
			
			if(f){
				var parser = window.document.createElement('a');
				parser.href = f.location;
				targetOrigin = parser.protocol + '//' + parser.host;
				f.postMessage(corsObj, targetOrigin);
			}
			
		},

		bind : function(id, eventName, callback) {
			console.log('Events.bind');
			if (this.widgetEvents[id] === undefined) {
				this.widgetEvents[id] = {};
			}
			this.widgetEvents[id][eventName] = callback;
		},

		unbind : function(id, eventName) {
			console.log('Events.unbind');
			delete this.widgetEvents[id][eventName];
			if (Object.keys(this.widgetEvents[id]).length <= 0) {
				delete this.widgetEvents[id];
			}
		},

		receive : function(msgObj) {
			console.log('Mediator.receive');
			
			var i, f, widgetId = msgObj.data.id;
			
			for(i = 0; i < window.frames.length; i++){
				if(window.frames[i].name === widgetId){
					f =  window.frames[i];
					break;
				}
			}
			
			if(f){
				var origin, parser = window.document.createElement('a');
				parser.href = f.location;
				origin = parser.protocol + '//' + parser.host;
				
				if(origin !== msgObj.origin){
					console.log('Widget ignore message from ' + msgObj.origin);
					return;
				}
	
				var widget = this.widgets[widgetId], widgetEvents = this.widgetEvents[widgetId], action = msgObj.data.action;
				if (widget && Widgetfly.Utils.isFunction(widget[action])) {
					widget[action](msgObj.data.msg);
				} else {
					if (!Widgetfly.Utils.isEmpty(widgetEvents) && Widgetfly.Utils.isFunction(widgetEvents[action])) {
						widgetEvents[action](msgObj.data.msg);
					}
				}
			}
		}
	};
	
	return Mediator;
})(this);
