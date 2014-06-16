Widgetfly.Modal = (function(global) {'use strict';
	// Widgetfly.Modal
	// -------------
	var Modal = function(setting) {
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

		if (Widgetfly.Utils.getElementsByClassName('qt modal').length <= 0) {
			var modalDiv = window.document.createElement('div');
			if (setting.appendType === 'class') {
				modalDiv.setAttribute('class', 'qt modal ' + setting.container);
			} else {
				modalDiv.setAttribute('class', 'qt modal');
				modalDiv.setAttribute('id', setting.container);
			}
			Widgetfly.Utils.getElementsByClassName('qt')[0].appendChild(modalDiv);
		}

		if (Widgetfly.Utils.getElementsByClassName('qt modal')[0].childNodes.length > 0) {
			Widgetfly.Utils.getElementsByClassName('qt modal')[0].removeChild(Widgetfly.Utils.getElementsByClassName('qt content')[0]);
			if (setting.appendType === 'class') {
				Widgetfly.Utils.getElementsByClassName('qt modal')[0].setAttribute('class', 'qt modal ' + setting.container);
			} else {
				Widgetfly.Utils.getElementsByClassName('qt modal')[0].setAttribute('class', 'qt modal');
				Widgetfly.Utils.getElementsByClassName('qt modal')[0].setAttribute('id', setting.container);
			}
		}

		this.setting = setting;
		this.register(this.id);

		if (setting.options.initRender) {
			//console.log(123);
			this.el = this.render(setting);
			Widgetfly.Utils.getElementsByClassName('qt modal')[0].appendChild(this.el);
			Widgetfly.Utils.addClass(Widgetfly.Utils.getElementsByClassName('qt modal')[0], 'active');
		}
		return this;
	};

	Widgetfly.Utils.inherit(Modal, Widgetfly.Widget);

	Modal.prototype.render = function() {
		//console.log(setting);
		var contentView = window.document.createElement('div'), viewTop = window.document.createElement('div'), spanTitle = document.createElement('span'), aClose = document.createElement('a'), iframe = Widgetfly.Widget.prototype.render.apply(this, arguments);

		if (this.setting.options !== undefined && this.setting.options !== null && this.setting.options !== {}) {
			spanTitle.textContent = this.setting.options.title;
		}

		aClose.setAttribute('href', '###');
		aClose.setAttribute('class', 'close');
		aClose.textContent = 'x';
		aClose.onclick = function() {
			Widgetfly.Utils.removeClass('.modal', 'active', Widgetfly.Utils.getElementsByClassName('qt')[0]);
		};

		viewTop.setAttribute('class', 'qt view-top');
		viewTop.appendChild(spanTitle);
		viewTop.appendChild(aClose);

		contentView.setAttribute('class', 'qt content');
		contentView.appendChild(viewTop);
		contentView.appendChild(iframe);
		this.iframe = iframe;

		return contentView;
	};

	Modal.prototype.sizeChange = function(size) {
		document.getElementsByName(this.id)[0].height = size + 'px';
	};

	return Modal;

})(this);
