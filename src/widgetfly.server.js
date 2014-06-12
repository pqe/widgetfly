Widgetfly.Server = (function(global) {'use strict';
	// Server
	// -------------
	var Server = function() {
		this.id = window.name;
		this.events = {};
		this.init();
	};

	Widgetfly.Utils.inherit(Server, Widgetfly.Events);

	Server.prototype.init = function() {
		var self = this;
		this.trigger('start');
		window.addEventListener('message', function(msgObj) {
			if(window.parent){
				var origin, parser = window.document.createElement('a');
				parser.href = window.parent.location;
				origin = parser.protocol + '//' + parser.host;
				
				if(origin !== msgObj.origin){
					console.log('Server ignore message from ' + msgObj.origin);
					return;
				}
				
				var action = msgObj.data.action;
				if (Widgetfly.Utils.isFunction(self[action])) {
					self[action](msgObj.data.msg);
				} else {
					if (!Widgetfly.Utils.isEmpty(self.events) && Widgetfly.Utils.isFunction(self.events[action])) {
						self.events[action](msgObj.data.msg);
					}
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

	Server.prototype.trigger = function(action, data) {
		console.log('Server.trigger');
		var targetOrigin, corsObj = {
			msg : data,
			action : action,
			id : this.id
		};
		
		var parser = window.document.createElement('a');
		parser.href = window.parent.location;
		targetOrigin = parser.protocol + '//' + parser.host;
				
		//console.log(corsObj);
		parent.postMessage(corsObj, targetOrigin);
	};

	Server.prototype.show = function() {
		this.trigger('show');
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
			self.trigger('close');
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
