Widgetfly.Modal = (function(global) {'use strict';
	// Widgetfly.Modal
	// -------------
	var Modal = function(options) {
		var el, appendType = 'tag', selector = 'body', elms = window.document.getElementsByTagName(selector);
		Widgetfly.Widget.apply(this, arguments);
		this.options = options;
		this.container = elms[0];
		
		if (options === undefined) {
			return false;
		}
	
		if(Widgetfly.Utils.getElementsByClassName('modal').length > 0){
			this.container.removChild(Widgetfly.Utils.getElementsByClassName('modal'));
		}
		
		this.register(this.id);

		this.css();
		
		if (this.container) {
			this.el = this.render(options);
			if (options.show) {
				this.show();
			} else {
				this.hide();
			}
			this.container.appendChild(this.el);
			Widgetfly.Utils.addClass(this.el, 'active');
		}
		return this;
	};

	Widgetfly.Utils.inherit(Modal, Widgetfly.Widget);

	Modal.prototype.render = function() {
		//console.log(setting);
		var self = this, modalContent = window.document.createElement('div'), contentView = window.document.createElement('div'), viewTop = window.document.createElement('div'), spanTitle = document.createElement('span'), aClose = document.createElement('a'), iframe = Widgetfly.Widget.prototype.render.apply(this, arguments);

		modalContent.setAttribute('class', 'modal');

		spanTitle.textContent = 'Orz';

		aClose.setAttribute('href', '###');
		aClose.setAttribute('class', 'close');
		aClose.textContent = 'x';
		aClose.onclick = function() {
			//Widgetfly.Utils.removeClass('.modal', 'active', Widgetfly.Utils.getElementsByClassName('qt')[0]);
			self.close();
		};

		viewTop.setAttribute('class', 'view-top');
		viewTop.appendChild(spanTitle);
		viewTop.appendChild(aClose);

		contentView.setAttribute('class', 'content');
		contentView.appendChild(viewTop);
		contentView.appendChild(iframe);
		modalContent.appendChild(contentView);
		this.iframe = iframe;

		return modalContent;
	};
	
	Modal.prototype.style = function() {
		Widgetfly.Widget.prototype.style.apply(this, arguments);
		Widgetfly.Utils.addClass(this.el, 'wf_modal');
	};

	Modal.prototype.sizeChange = function(size) {
		document.getElementsByName(this.id)[0].height = size + 'px';
	};

	return Modal;

})(this);
