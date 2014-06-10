var nowScripts = document.getElementsByTagName('script');
if (window.Qplugin === undefined) {
	window.Qplugin = {

		debug : true,

		appInfo : {
			caller : null,
			id : null,
			type : null
		},

		library : false,

		plugins : [],

		pluginIds : [],

		initialize : function() {
			var self = this, instance = document.createElement('div'), param = this.parseUrl(nowScripts);
			instance.setAttribute('class', 'QT');
			this.plugins = [];
			this.pluginIds = [];
			this.appInfo = this.register();
			this.create(this.appInfo.id, param.type, this.appInfo.id, param.append, param.options, param.appendType);
			if (this.getElementsByClassName('QT').length <= 0) {
				document.getElementsByTagName('body')[0].appendChild(instance);
			}
			window.addEventListener('message', function(msgObj) {
				self.listener(msgObj);
			}, false);
		},

		genId : function() {
			var i = 0, id = '', first, possible1 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', possible2 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
			first = possible1.charAt(Math.floor(Math.random() * possible1.length));
			for ( i = 1; i < 20; i++) {
				id += possible2.charAt(Math.floor(Math.random() * possible2.length));
			}
			return (first + id);
		},

		register : function(caller, type) {
			var id = this.genId(), plugin = {
				caller : caller,
				id : id,
				type : type
			};
			this.pluginIds.push(id);
			this.plugins.push(plugin);
			return plugin;
		},

		parseUrl : function(URL, checkLib) {
			var nowSrc, parameter, createParam = {}, i, tmpStr, tmpParam;
			if (typeof URL !== 'string' && URL.length > 0) {				
				URL = URL[URL.length - 1];
				if (URL.getAttribute.length !== undefined) {
					nowSrc = URL.getAttribute('src', -1);
				}
			}
			else{
				nowSrc = URL;
			}
			
			parameter = nowSrc.split('?', 2);
			if (parameter.length > 1) {
				parameter = parameter[1];
				parameter = parameter.split('&');
				if (parameter.length > 0) {
					if (parameter[0].split('=', 2).length > 0) {
						createParam.type = parameter[0].split('=', 2)[1];
					}

					if (parameter[1] !== undefined && parameter[1].split('=', 2).length > 0) {
						if (parameter[1].split('=', 2)[1] !== "") {
							createParam.append = parameter[1].split('=', 2)[1];
							if (parameter[1].split('=', 2)[0] === 'appendClass') {
								createParam.appendType = 'class';
							} else {
								createParam.appendType = 'id';
							}
						}
					}
					if (parameter.length > 2) {
						createParam.options = {};
						for ( i = 2; i < parameter.length; i++) {
							if (parameter[i].split('=', 2).length > 0) {
								tmpParam = parameter[i].split('=', 2)[1];
								tmpParam = tmpParam.split(':');
								if (tmpParam.length > 0) {
									tmpStr = tmpParam.shift();
									if (tmpParam.length !== 0) {
										tmpParam = tmpParam.join(':');
										if (tmpParam !== "" && tmpParam !== null && tmpParam !== 'null') {
											createParam.options[tmpStr] = tmpParam;
										}
									}
								}
							}
						}
					}
				}
			}

			if (checkLib === undefined) {
				this.library = true;
				return createParam;
			} else {
				checkLib(createParam);
			}			
		},

		create : function(caller, type, widgetId, append, options, appendType) {
			// create(type, append);
			// type : panel / popoverup / panel
			// append : null / selector('#xxx' or '.xxx'), default is append to body, class="Qplugin box"
			var self = this;
			if (caller === undefined || caller === null) {
				return false;
			}

			if (appendType === undefined && append !== undefined) {
				if (append.substr(0, 1) === '#') {
					appendType = 'id';
					append.replace('#', '');
				} else {
					appendType = 'class';
					append.replace('.', '');
				}
			}

			if (type === 'modal') {
				this.modalInit(append, appendType, options);
				this.modalRender(widgetId, appendType, options);
			} else if (type === 'popover') {
				this.popoverInit(appendType, appendType, options);
				this.popoverRender();
			} else if (type === 'panel') {
				if (caller === this.appInfo.id) {
					this.panelInit(append);
					this.panelRender(widgetId, append, appendType, options);
					if (appendType === 'id') {
						return document.getElementById(append);
					} else {
						return this.getElementsByClassName(append)[0];
					}
				} else {
					return false;
				}
			}
		},

		listener : function(msgObj) {
			switch(msgObj.data.action){
				case 'register':
					if(msgObj.data.msg === undefined){
						msgObj.source.postMessage({resp : this.register(msgObj.data.msg.caller, msgObj.data.msg.type), action : msgObj.data.action}, msgObj.origin);						
					}
					else{
						msgObj.source.postMessage({resp : this.register(msgObj.data.msg.caller, msgObj.data.msg.type), action : msgObj.data.action, createParam : msgObj.data.msg.createParam}, msgObj.origin);
					}
				break;
				case 'getInfo2reg':
					if(msgObj.data.msg === undefined){
						msgObj.source.postMessage({resp : this.appInfo, action : msgObj.data.action}, msgObj.origin);
					}
					else{
						msgObj.source.postMessage({resp : this.appInfo, action : msgObj.data.action, createParam : msgObj.data.msg.createParam}, msgObj.origin);
					}
				break;
				case 'getInfo':
					msgObj.source.postMessage({resp : this.appInfo, action : msgObj.data.action}, msgObj.origin);
				break;
				case 'parseUrl':
					this.parseUrl(msgObj.data.msg, function(createParam){
						msgObj.source.postMessage({resp : createParam, action : msgObj.data.action}, msgObj.origin);
					});
				break;
				case 'trigger':
					this.trigger(msgObj.data.msg.widgetId, msgObj.data.msg.action);
				break;
				case 'create' :
					this.create(msgObj.data.msg.caller, msgObj.data.msg.type, msgObj.data.msg.widgetId, msgObj.data.msg.append, msgObj.data.msg.options, msgObj.data.msg.appendType);
				break;
				default:
					return false;
			}
			/*
			if(msg.action !== 'register' && msg.action !== 'getInfo'){
				if (msg.from !== undefined && msg.to !== undefined && this.pluginIds.indexOf(msg.from) > -1) {
					if (msg.to === '' || msg.to === null) {
						console.log('Get message from child : ' + msg.from + ' and no to other space, so get it data : ' + msg.msg);
						return false;
					}
				}
			}
			else{
				if()
			}
			*/
		},

		getInfo : function(){
			return this.appInfo;
		},

		getPlugins : function() {
			return this.plugins;
		},

		modalInit : function(append, appendType, options) {
			if (this.getElementsByClassName('QT').length <= 0) {
				var QTool, modalDiv;
				if (append === undefined || append === null && this.getElementsByClassName('QT').length <= 0) {
					QTool = document.createElement('div');
					QTool.setAttribute('class', 'QT');
					this.getElementsByClassName('QT')[0].appendChild(QTool);
				}
			}
			if (this.getElementsByClassName('QT modal').length <= 0) {
				modalDiv = document.createElement('div');
				if (appendType === 'class') {
					modalDiv.setAttribute('class', 'QT modal ' + append);
				} else {
					modalDiv.setAttribute('class', 'QT modal');
					modalDiv.setAttribute('id', append);
				}
				this.getElementsByClassName('QT')[0].appendChild(modalDiv);
			}

			if (this.getElementsByClassName('QT modal')[0].childNodes.length > 0) {
				this.getElementsByClassName('QT modal')[0].removeChild(this.getElementsByClassName('QT content')[0]);
				if (appendType === 'class') {
					this.getElementsByClassName('QT modal')[0].setAttribute('class', 'QT modal ' + append);
				} else {
					this.getElementsByClassName('QT modal')[0].setAttribute('class', 'QT modal');
					this.getElementsByClassName('QT modal')[0].setAttribute('id', append);
				}
			}
		},

		modalRender : function(widgetId, appendType, options) {
			var self = this, contentView = document.createElement('div'), viewTop = document.createElement('div'), spanTitle = document.createElement('span'), aClose = document.createElement('a'), iframe = document.createElement('iFrame');

			if (options !== undefined && options !== null && options !== {}) {
				spanTitle.textContent = options.title;
			}

			aClose.setAttribute('href', 'javascript:void(0)');
			aClose.setAttribute('class', 'close');
			aClose.textContent = 'x';
			aClose.onclick = function() {
				self.removeClass('.modal', 'active', self.getElementsByClassName('QT')[0]);
			};

			viewTop.setAttribute('class', 'QT view-top');
			viewTop.appendChild(spanTitle);
			viewTop.appendChild(aClose);

			iframe.setAttribute('src', options.src);
			iframe.setAttribute('id', widgetId);

			contentView.setAttribute('class', 'QT content');
			contentView.appendChild(viewTop);
			contentView.appendChild(iframe);

			this.getElementsByClassName('QT modal')[0].appendChild(contentView);
		},

		popoverInit : function() {
			var QTool, popOverDiv;
			if (append === undefined || append === null && this.getElementsByClassName('QT').length <= 0) {
				QTool = document.createElement('div');
				QTool.setAttribute('class', 'QT');
				this.getElementsByClassName('QT')[0].appendChild(QTool);
			}
			modalDiv = document.createElement('div');
			modalDiv.setAttribute('class', 'QT popOver');
			this.getElementsByClassName('QT')[0].appendChild(modalDiv);
		},

		popoverRender : function() {

		},

		panelInit : function(append) {
			if (append === undefined || append === null && this.getElementsByClassName('QT').length <= 0) {
				var QTool = document.createElement('div');
				QTool.setAttribute('class', 'QT');
				this.getElementsByClassName('QT')[0].appendChild(QTool);
			}
		},

		panelRender : function(widgetId, append, appendType, options) {
			var iframe = document.createElement('iFrame');
			iframe.setAttribute('src', options.src.toString());
			iframe.setAttribute('id', widgetId);
			//console.log(document.getElementsByTagName('iFrame').item(0));
			if (append === undefined || append === null) {
				this.getElementsByTagName('QT')[0].appendChild(iframe);
			} else {
				//console.log(append.substr(1, append.length));
				if (appendType === 'id') {
					if (this.getElementById(append).length > 0) {
						this.getElementById(append).appendChild(iframe);
					}
				} else {
					this.getElementsByClassName(append)[0].appendChild(iframe);
				}
			}
		},

		trigger : function(widgetId, action) {
			var target = document.getElementById(widgetId).parentNode.parentNode;
			//get instance which is QT child.
			switch(action) {
				case 'open' :
					if (!this.hasClass(target, 'active')) {
						this.addClass(target, 'active');
					}
					break;
				case 'close':
					//console.log(target.className);
					if (this.hasClass(target, 'active')) {
						this.removeClass(target, 'active');
					}
					break;
				default :
					if (this.debug) {
						console.info('No this action, action id is %s', widgetId);
					}
			}
		},
		// Self tool function
		getElementsByClassName : function(testClass, startFrom) {
			/**
			 * getElementsByClassName
			 * @fileOverview An easy way to find DOM Nodes with a specific class
			 * @author Dan Beam <dan@danbeam.org>
			 * @param {string} className - the class we're looking for on DOM Nodes
			 * @param {element} startFrom (optional) - a point in the DOM to start from
			 * @return {array} results - any DOM Nodes that have the specified class
			 */

			for (var// this will be incremented to 0 at start of loop
			i = -1,
			// results of the DOM query (elements with matching class)
			results = [],
			// regular expression to see if the class attribute contains
			// the searched for class
			finder = new RegExp('(?:^|\\s)' + testClass + '(?:\\s|$)'),
			// grab all DOM elements and the set's length
			a = startFrom && startFrom.getElementsByTagName && startFrom.getElementsByTagName('*') || document.all || document.getElementsByTagName('*'),

			// cache the length property
			l = a.length;

			// this is done before we start and at every comparison (note the ++)
			++i < l;
			// this is done after the first comparison and every iteration afterward
			finder.test(a[i].className) && results.push(a[i]));
			// do memory management and return the results of our query
			a = null;
			return results;
		},

		isNative : function(object, method) {
			return object && method in object && typeof object[method] != 'string' &&
			// IE & W3C browser return "[native code]"
			// Safari <= 2.0.4 will return "[function]"
			(/\{\s*\[native code\]\s*\}|^\[function\]$/).test(object[method]);
		},

		//Returns true if it is a DOM node
		isNode : function(o) {
			return ( typeof Node === "object" ? o instanceof Node : o && typeof o === "object" && typeof o.nodeType === "number" && typeof o.nodeName === "string");
		},

		//Returns true if it is a DOM element
		isElement : function(o) {
			return ( typeof HTMLElement === "object" ? o instanceof HTMLElement : o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName === "string");
		},

		trans2Elem : function(element, startFrom){
			if(typeof element === 'string'){			
				if (element.substr(0, 1) === '#') {
					target = document.getElementById(element.replace('#', ''));
				} else if (element.substr(0, 1) === '.') {
					target = this.getElementsByClassName(element.replace('.', ''), startFrom)[0];
				} else {
					target = document.getElementsByTagName(element)[0];
				}
			}
			else{
				target = element;
			}
			return target;			
		},

		hasClass : function(element, cls) {
			return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
		},

		addClass : function(element, className, startFrom) {
			var target;
			if (startFrom === undefined) {
				startFrom = document;
			}
			target = this.trans2Elem(element, startFrom);
		    if (!this.hasClass(target, className)) {
		        target.className += ' ' + className;
		    }
		},

		removeClass : function(element, rmClass, startFrom) {
			var target, newClass;
			if (startFrom === undefined) {
				startFrom = document;
			}
			target = this.trans2Elem(element, startFrom);
			
			if (target !== undefined && this.isElement(target)) {
				newClass = ' ' + target.className.replace(/[\t\r\n]/g, ' ') + ' ';
				if (this.hasClass(target, rmClass)) {
					while (newClass.indexOf(' ' + rmClass + ' ') >= 0) {
						newClass = newClass.replace(' ' + rmClass + ' ', ' ');
					}
					target.className = newClass.replace(/^\s+|\s+$/g, '');
				}
			}
		},

		toggleClass : function(element, className, startFrom) {
			var target, newClass;
			if (startFrom === undefined) {
				startFrom = document;
			}
			target = this.trans2Elem(element, startFrom);
			if (target !== undefined && this.isElement(target)) {
				newClass = ' ' + target.className.replace(/[\t\r\n]/g, ' ') + ' ';
			    if (this.hasClass(target, className)) {
			        while (newClass.indexOf(' ' + className + ' ') >= 0 ) {
			            newClass = newClass.replace( ' ' + className + ' ' , ' ' );
			        }
			        target.className = newClass.replace(/^\s+|\s+$/g, '');
			    } else {
			        target.className += ' ' + className;
			    }
		    }
		}
	};
	window.Qplugin.initialize();
} else {
	window.Qplugin.parseUrl(nowScripts, function(createParam) {
		var widget = Qplugin.register(Qplugin.appInfo.id, createParam.type);
		Qplugin.create(Qplugin.appInfo.id, createParam.type, widget.id, createParam.append, createParam.options, createParam.appendType);
	});
}