Widgetfly.Mediator = (function(global) {'use strict';
	// Mediator
	// -------------
	var Mediator = {

		widgets : {},

		actionHandlers : {},

		init : function() {
			var self = this;
			window.addEventListener('message', function(msgObj) {
				self.receive(msgObj);
			}, false);
		},

		getWidget : function(id) {
			return this.widgets[id];
		},

		getActionHandlers : function(id) {
			return this.actionHandlers[id];
		},

		register : function(id, widget) {
			this.widgets[widget.id] = widget;
			widget.mediator = this;
			this.actionHandlers[widget.id] = {};
		},

		unregister : function(id, callback) {
			if (this.actionHandlers[id] !== undefined) {
				var self = this;
				Widgetfly.Utils.each(this.actionHandlers[id], function(key) {
					delete self.actionHandlers[id][key];
				});
			}
			delete this.widgets[id];
			callback(true);
		},

		send : function(id, action, data) {
			//console.log('Mediator.send');

			var parser, targetOrigin, corsObj = {
				msg : data,
				action : action,
				id : id
			}, widget = this.widgets[id];

			if (widget) {
				parser = window.document.createElement('a');
				parser.href = widget.iframe.src;
				targetOrigin = parser.protocol + '//' + parser.host;
				widget.iframe.contentWindow.postMessage(corsObj, targetOrigin);
			}
		},

		bind : function(id, action, callback) {
			//console.log('Mediator.bind: ' + action);
			if (this.actionHandlers[id] === undefined) {
				this.actionHandlers[id] = {};
			}
			this.actionHandlers[id][action] = callback;
		},

		unbind : function(id, action) {
			//console.log('Mediator.unbind');
			delete this.actionHandlers[id][action];
			if (Object.keys(this.actionHandlers[id]).length <= 0) {
				delete this.actionHandlers[id];
			}
		},

		receive : function(msgObj) {
			//console.log('Mediator.receive');

			var origin, parser, widgetId = msgObj.data.id, widget = this.widgets[widgetId], myActionHandlers = this.actionHandlers[widgetId], action = msgObj.data.action;

			if (widget) {
				parser = window.document.createElement('a');
				parser.href = widget.iframe.src;
				origin = parser.protocol + '//' + parser.host;

				if (origin !== msgObj.origin) {
					//console.log('Widget ignore message from ' + msgObj.origin);
					return;
				}

				if (widget && Widgetfly.Utils.isFunction(widget[action])) {
					widget[action](msgObj.data.msg);
				} else {
					if (!Widgetfly.Utils.isEmpty(myActionHandlers) && Widgetfly.Utils.isFunction(myActionHandlers[action])) {
						myActionHandlers[action](msgObj.data.msg);
					}
				}
			}
		}
	};

	return Mediator;
})(this);
