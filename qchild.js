var nowScripts = document.getElementsByTagName('script');
if(window.Qwidget === undefined){
	window.Qwidget = {
		
		regInfo : null,
		
		plugins : [],
		
		pluginIds : [],
		
		modal : null,
		
		initialize : function(){
			this.regInfo = parent.Qplugin.register(parent.Qplugin.appInfo.id, 'sub');
			//console.log('child initialize (' + this.regInfo.id + ')');
		},
		
		create : function(type, append, options, appendType){
			parent.Qplugin.create(this.regInfo.id, type, append, options, appendType);
		},
		
		send : function(data, target, transfer){
			if(target === undefined){
				target = parent.location;
			}
			
			parent.postMessage({
				msg : data,
				from : this.regInfo.id,
				to : ''
			}, target, transfer);
		},
		
		receive : function(){
			
		},
		
		trigger : function(widgetId, action){
			parent.Qplugin.trigger(widgetId, action);
		},
		
		getModal : function(){
			return this.modal;
		},
		
		setModal : function(modalId){
			this.modal = modalId;
		}
	};
	window.Qwidget.initialize();
}
else{
	parent.Qplugin.parseUrl(nowScripts, function(createParam){
		var widget;
		if(createParam.type !== 'panel'){
			widget = parent.Qplugin.register(Qwidget.regInfo.id, createParam.type);
			Qwidget.plugins.push(widget);
			if(createParam.type === 'modal'){
				Qwidget.setModal(widget.id); 
			}
			Qwidget.create(createParam.type, widget.id, createParam.append, createParam.options, createParam.appendType);			
		}
	});
}
