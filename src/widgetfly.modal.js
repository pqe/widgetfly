Widgetfly.Modal = (function(global) {'use strict';
	// Widgetfly.Modal
	// -------------
	var Modal = function(options) {
		var el, elms = window.document.querySelector('.wf-modal');
		Widgetfly.Widget.apply(this, arguments);
		this.options = Widgetfly.Utils.extend(Modal.DEFAULTS,options);
		this.container = window.document.querySelector('body');
		
		if (options === undefined) {
			return false;
		}

		if(elms !== null){
			this.container.removChild(window.document.querySelector('.wf-modal'));
		}
		
		this.register(this.id);
		
		if (this.container) {
			this.el = this.render(options);
			this.style();
			if (options.show) {
				this.show();
			} else {
				this.hide();
			}
			this.container.appendChild(this.el);
		}
		return this;
	};
	
	Modal.DEFAULTS = Widgetfly.Utils.extend({},{
		autoGrow : false,
		show : true,
		options : {
					
		}
	});

	Widgetfly.Utils.inherit(Modal, Widgetfly.Widget);

	Modal.prototype.render = function() {
		//console.log(setting);
		var self = this, modalContent = window.document.createElement('div'), aClose = document.createElement('a'), iframe = Widgetfly.Widget.prototype.render.apply(this, arguments);

		Widgetfly.Utils.addClass(modalContent, 'wf-modal');

		aClose.setAttribute('href', '###');
		aClose.textContent = 'x';
		aClose.onclick = function() {
			//Widgetfly.Utils.removeClass('.modal', 'active', Widgetfly.Utils.getElementsByClassName('qt')[0]);
			self.close();
		};
		Widgetfly.Utils.addClass(aClose,'wf-close');

		Widgetfly.Utils.addClass(iframe, 'wf-modal-body');
		modalContent.appendChild(aClose);
		modalContent.appendChild(iframe);
		this.iframe = iframe;

		return modalContent;
	};
	
	Modal.prototype.style = function() {
		Widgetfly.Widget.prototype.style.apply(this, arguments);
		Widgetfly.Utils.addClass(this.el, 'wf-modal');
	};

	Modal.prototype.sizeChange = function(size) {
		document.getElementsByName(this.id)[0].height = size + 'px';
	};

	return Modal;

})(this);
