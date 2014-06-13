Widgetfly.Panel = (function(global) {'use strict';

	// Widgetfly.Panel
	// -------------
	var Panel = function(setting) {
		//console.log(setting);

		Widgetfly.Widget.apply(this, arguments);

		setting.dom = setting.container;
		if (setting.container.substr(0, 1) === '.') {
			setting.appendType = 'class';
			setting.container = setting.container.replace('.', '');
		} else if (setting.container.substr(0, 1) === '#') {
			setting.appendType = 'id';
			setting.container = setting.container.replace('#', '');
		}

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

	Widgetfly.Utils.inherit(Panel, Widgetfly.Widget);

	Panel.prototype.render = function(setting) {
		//Widgetfly.Widget.apply(this, arguments);
		var iframe = this.helpRender(setting);

		//console.log(document.getElementsByTagName('iFrame').item(0));
		if (setting.container === undefined || setting.container === null) {
			Widgetfly.Utils.getElementsByClassName('qt')[0].appendChild(iframe);
		} else {
			//console.log(append.substr(1, append.length));
			if (setting.appendType === 'id') {
				if (window.document.getElementById(setting.container).length > 0) {
					window.document.getElementById(setting.container).appendChild(iframe);
				}
			} else {
				Widgetfly.Utils.getElementsByClassName(setting.container)[0].appendChild(iframe);
			}
		}

		this.iframe = iframe;
	};

	return Panel;
})(this);
