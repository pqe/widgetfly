var nowScripts = document.getElementsByTagName('script');
if(window.Qwidget === undefined){
	window.Qwidget = {
		
		regInfo : null,
		
		parentInfo : null,
		
		plugins : [],
		
		pluginIds : [],
		
		modal : null,
		
		initialize : function(){
			//this.regInfo = parent.Qplugin.register(parent.Qplugin.appInfo.id, 'sub');
			//console.log('child initialize (' + this.regInfo.id + ')');
			var self = this;
			this.register();
			window.addEventListener('message', function(msgObj) {
				self.receive(msgObj);
			}, false);
		},
		
		register : function(options){
			if(options === undefined){
				this.send('getInfo2reg');
			}
			else{
				this.send('getInfo2reg', options);
			}
		},
		
		create : function(caller, type, widgetId, append, options, appendType){
			console.info("%s, %s, %s, %s, %s, %s", caller, type, widgetId, append, options, appendType);
			if(type === 'modal'){
				this.modal = widgetId;
			}
			this.send('create', {caller:caller, type:type, widgetId:widgetId, append:append, options:options, appendType:appendType});
			//parent.Qplugin.create(this.regInfo.id, type, append, options, appendType);
		},
		
		send : function(action, data, target, transfer){
			if(target === undefined){
				target = '*';
			}
			parent.postMessage({
				msg : data,
				action : action
			}, target, transfer);				
		},
		
		receive : function(msgObj){
			switch(msgObj.data.action){
				case 'register':
					if(msgObj.data.createParam === undefined){
						this.regInfo = msgObj.data.resp;
						this.finishInit();
					}
					else{
						this.plugins.push(msgObj.data.resp.id);
						this.create(this.regInfo.id, msgObj.data.createParam.type, msgObj.data.resp.id, msgObj.data.createParam.append, msgObj.data.createParam.options, msgObj.data.createParam.appendType);
					}
				break;
				case 'getInfo2reg':
					if(msgObj.data.createParam === undefined){
						this.parentInfo = msgObj.data.resp;
						if(this.parentInfo.id !== undefined){
							this.send('register', {caller : this.parentInfo.id, type :'sub'});
						}
					}
					else{
						this.send('register', {caller : this.regInfo.id, type : msgObj.data.createParam.type, createParam : msgObj.data.createParam});
					}
				break;
				case 'getInfo':
					this.parentInfo = msgObj.data.resp;
				break;
				case 'parseUrl':
					//console.log(msgObj.data.resp);
					this.regSub(msgObj.data.resp);
				break;
				default:
					return false;				
			}
		},
		
		trigger : function(widgetId, action){
			this.send('trigger', {widgetId : widgetId, action:action});
			//parent.Qplugin.trigger(widgetId, action);
		},
		
		getModal : function(){
			return this.modal;
		},
		
		setModal : function(modalId){
			this.modal = modalId;
		},
		
		regSub : function(createParam){
			var widget;
			if(createParam.type !== 'panel'){
				widget = this.register({id : this.regInfo.id, type : createParam.type, createParam : createParam});
			}			
		},
		
		createSub : function(widget, createParam){
			//console.log(widget);
			/*
			if(createParam.type === 'modal'){
				this.setModal(widget.id); 
			}
			Qwidget.create(createParam.type, widget.id, createParam.append, createParam.options, createParam.appendType);								
			*/			
		},
		
		finishInit : function(){
			var scripts = document.getElementsByTagName('script'), i;
			for(i = 1; i < scripts.length; i++){
				if(nowScripts[i].src !== undefined){
					Qwidget.send('parseUrl', nowScripts[i].src);
				}				
			}					
		}
	};
	window.Qwidget.initialize();
}
else{

	/*
	parent.Qplugin.parseUrl(nowScripts, function(createParam){
		var widget;
		if(createParam.type !== 'panel'){
			widget = Qwidget.register({id : Qwidget.regInfo.id, type : createParam.type});
			Qwidget.plugins.push(widget);
			if(createParam.type === 'modal'){
				Qwidget.setModal(widget.id); 
			}
			Qwidget.create(createParam.type, widget.id, createParam.append, createParam.options, createParam.appendType);			
		}
	});
	*/
}