Widgetfly.Server = (function(global) {'use strict';
	// Server
	// -------------
	var Server = function() {
		this.id = window.name;
		this.events = {};
		this.init();
	};

	Widgetfly.Utils.inherit(Server, Widgetfly.Events);

	Server.init = function() {
		var self = this;
		this.trigger('start');
		window.addEventListener('message', function(msgObj) {
			//console.log(msgObj);
			var action = msgObj.data.action;
			if (Widgetfly.Utils.isFunction(self[action])) {
				self[action](msgObj.data.msg);
			} else {
				if (!Widgetfly.Utils.isEmpty(self.events) && Widgetfly.Utils.isFunction(self.events[action])) {
					self.events[action](msgObj.data.msg);
				}
			}
		}, false);
	};

	Server.prototype.on = function(key, callback) {
		this.events[key] = callback;
	};

	Server.prototype.off = function(key) {
		delete this.events[key];
	};

	Server.prototype.trigger = function(action, data, targetId, targetOrigin, transfer) {
		console.log('Server.trigger');
		var corsObj = {
			msg : data,
			action : action,
			id : this.id
		};

		if (targetId !== undefined) {
			corsObj.targetId = targetId;
		}

		if (targetOrigin === undefined) {
			targetOrigin = '*';
		}
		//console.log(corsObj);
		parent.postMessage(corsObj, targetOrigin, transfer);
	};

	Server.prototype.show = function() {
		this.trigger('_show');
	};

	Server.prototype.hide = function() {
		this.trigger('hide');
	};

	Server.prototype.onClose = function(callback) {
		console.log('Server onClose action');
		callback();
	};

	Server.prototype.close = function() {
		console.log('Prepare server close action');
		var self = this;
		Widgetfly.Utils.each(this.events, function(key) {
			delete self.events[key];
		});

		this.onClose(function() {
			console.log('Server close action');
			self.trigger('_close');
		});
	};

	/*
	 Server.prototype.setAutoGrow = function(width, height) {
	 //console.log(size);
	 Events.trigger(window.name, 'sizeChange', width, height);
	 };
	 */
	Server.prototype.setSize = function(width, height) {
		//console.log(size);
		Widgetfly.Events.trigger(window.name, 'sizeChange', width, height);
	};
	
	return Server;
	
})(this);
