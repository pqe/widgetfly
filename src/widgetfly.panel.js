Widgetfly.Panel = (function(global) {'use strict';

	// Widgetfly.Panel
	// -------------
	var Panel = function(setting) {
		//console.log(setting);
		var el;
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

		this.setting = setting;
		this.register(this.id);

		if (setting.options.initRender) {
			this.iframe = this.el = this.render();
			if (setting.container === undefined || setting.container === null) {
				Widgetfly.Utils.getElementsByClassName('qt')[0].appendChild(this.el);
			} else {
				if (setting.appendType === 'id') {
					if (window.document.getElementById(setting.container).length > 0) {
						window.document.getElementById(setting.container).appendChild(this.el);
					}
				} else {
					Widgetfly.Utils.getElementsByClassName(setting.container)[0].appendChild(this.el);
				}
			}
		}

		return this;
	};

	Widgetfly.Utils.inherit(Panel, Widgetfly.Widget);

	Panel.prototype.render = function() {
		return Widgetfly.Widget.prototype.render.apply(this, arguments);
	};

	return Panel;
})(this);
