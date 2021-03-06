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
		var self = this, paramData = decodeURIComponent(window.location.hash.substring(1));
		this.options = JSON.parse(paramData);
		window.addEventListener('message', function(msgObj) {
			if(window.parent){
				var action, origin, parser;

				parser = window.document.createElement('a');
				parser.href = self.options.origin;
				origin = parser.protocol + '//' + parser.hostname + (parser.port &&  parseInt(parser.port,10) !== 80 ? (':' + parser.port) : '');

				if(origin !== 'file://' && origin !== msgObj.origin){
					//console.log('Server ignore message from ' + msgObj.origin);
					return;
				}

				action = msgObj.data.action;
				if (Widgetfly.Utils.isFunction(self[action])) {
					self[action](msgObj.data.msg);
				} else {
					if (!Widgetfly.Utils.isEmpty(self.events) && Widgetfly.Utils.isFunction(self.events[action])) {
						self.events[action](msgObj.data.msg);
					}
				}
			}
		}, false);

		if(this.options.autoStart){
			this.trigger('start');
		}

		if(this.options.autoGrow){
			this.isShow(function(value){
				if(value){
					self.expand();
				}
			});
		}
	};

	Server.prototype.on = function(key, callback) {
		this.events[key] = callback;
	};

	Server.prototype.off = function(key) {
		delete this.events[key];
	};

	Server.prototype.trigger = function(action, data) {
		//console.log('Server.trigger');
		var corsObj = {
			msg : data,
			action : action,
			id : this.id
		};

		//console.log(corsObj);
		parent.postMessage(corsObj, this.options.origin);
	};

	Server.prototype.isShow = function(callback) {
		var self = this, wrapper = function(data){
			self.off('_isShow', wrapper);
			callback(data);
		};
		this.on('_isShow', wrapper);
		this.trigger('isShow');
	};

	Server.prototype.onShow = function(callback) {
		this.on('_onShow', callback);
	};

	Server.prototype.show = function() {
		this.trigger('show');
	};

	Server.prototype.ack = function() {
		this.trigger('ack');
	};

	Server.prototype.start = function(){
		var self = this;
		this.trigger('start');
		if(this.options.autoGrow){
			setTimeout(function(){
				self.expand();
			},100);
		}
	};

	Server.prototype.hide = function() {
		this.trigger('hide');
	};

	Server.prototype.toggle = function() {
		this.trigger('toggle');
	};

	Server.prototype.close = function() {
		//console.log('Prepare server close action');
		var self = this;
		Widgetfly.Utils.each(this.events, function(key) {
			delete self.events[key];
		});
		this.trigger('close');

	};

	Server.prototype.expand = function() {
		var self = this,compact = function(){
			if(document.readyState === 'complete'){
				var body = document.body,
					html = document.documentElement,
					height = Math.max( body.scrollHeight, body.offsetHeight,
									html.clientHeight, html.scrollHeight, html.offsetHeight );
				self.trigger('sizeChange', {height : height});
			}else{
				compact._id = setTimeout(compact,100);
			}
		};
		compact();
	};

	Server.prototype.compact = function() {
		var self = this,resize = function(){
				window.removeEventListener('resize', resize, false);
				var body = document.body,
					html = document.documentElement,
					height = Math.max( body.scrollHeight, body.offsetHeight,
									html.clientHeight, html.scrollHeight, html.offsetHeight );
				self.trigger('sizeChange', {height : height});
			}, compact = function(){
			if(document.readyState === 'complete'){
				window.addEventListener('resize', resize, false);
				self.trigger('sizeChange', {height : 0});
			}else{
				compact._id = setTimeout(compact,100);
			}
		};
		compact();
	};

	return Server;

})(this);
