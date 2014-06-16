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

		this.setting = setting;
		this.register(this.id);

		if (setting.options.initRender) {
			this.render();
		}

		return this;
	};

	Widgetfly.Utils.inherit(Panel, Widgetfly.Widget);

	Panel.prototype.render = function() {
		
		var el, iframe = Widgetfly.Widget.prototype.render.apply(this, arguments);

		//console.log(document.getElementsByTagName('iFrame').item(0));
		
		if (this.setting.container === undefined || this.setting.container === null) {
			el = Widgetfly.Utils.getElementsByClassName('qt')[0];
			el.appendChild(iframe);
		} else {
			//console.log(append.substr(1, append.length));
			if (this.setting.appendType === 'id') {
				if (window.document.getElementById(this.setting.container).length > 0) {
					el = window.document.getElementById(this.setting.container);
					el.appendChild(iframe);
				}
			} else {
				el = Widgetfly.Utils.getElementsByClassName(this.setting.container)[0];
				el.appendChild(iframe);
			}
		}

		this.iframe = iframe;
		
		return el;
	};

	return Panel;
})(this);
