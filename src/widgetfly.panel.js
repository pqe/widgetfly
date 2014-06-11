Widgetfly.Panel = (function(global) {'use strict';
	
	// Widgetfly.Panel
	// -------------
	var Panel = function(setting) {
		//console.log(setting);
		setting.dom = setting.container;
		if (setting.container.substr(0, 1) === '.') {
			setting.appendType = 'class';
			setting.container = setting.container.replace('.', '');
		} else if (setting.container.substr(0, 1) === '#') {
			setting.appendType = 'id';
			setting.container = setting.container.replace('#', '');
		}
		
		Widgetfly.Utils.inherit(Panel, Widgetfly.Widget);

		if (setting === undefined) {
			return false;
		}

		if (setting.options.src !== undefined) {
			if (setting.container === undefined && setting.appendClass !== undefined) {
				setting.appendType = 'class';
				setting.dom = '.' + setting.appendClass;
				setting.container = setting.appendClass;
			}
		}

		setting.id = this.id;
		this.setting = setting;
		this.setMap(setting);
		this.register(this.id);

		if (setting.options.initRender) {
			this.render(setting);
		}
		
		return this;
	};
	
	Panel.extend = Widgetfly.Utils.inherit;
	
	return Panel;
})(this);
