#Installation
Pure javascript
```html
<script src="widgetfly.min.js"></script>
<script>
var ModalWidget = Widgetfly.Modal.extend({/** overwrite **/});
var m1 = new ModalWidget({
	show : false,
	backdrop : true,
	src : 'url-of-widget/modal.html'
});
...
</script>
```

Install using bower:
```shell
$ bower install widgetfly --save
```
Configure RequireJS
```js
require.config({
	...
	paths : {
		...
		'widgetfly' : 'widgetfly.min'
		...
	}
...

define(["widgetfly"], function (Widgetfly) {
	var ModalWidget = Widgetfly.Modal.extend({/** overwrite **/});
	var m1 = new ModalWidget({
		show : false,
		backdrop : true,
		src : 'url-of-widget/modal.html'
	});
	...
});

```

#Usage
## Universal Embed Code
Include the Widgetfly SDK with bootstrapping options on your page once, ideally right after the opening ```<body>``` tag.
```html
<div class="mypanel">
	<script>
		(function() {
			var js = document.createElement('script'); js.type = 'text/javascript'; js.async = true;
			js.src = 'http://127.0.0.1:3000/widgetfly/dist/widgetfly.js#type=panel&show=true&src=http://127.0.0.1:3000/widgetfly/examples/widgets/panel.html';
			document.currentScript.parentNode.appendChild(js);
		})();
	</script>
</div>

```
## Getting embedded widget instance
```html
<div class="mytarget">Target Element
	<script>
		(function(callback) {
			var js = document.createElement('script'); js.type = 'text/javascript'; js.async = true;
			js.src = 'http://127.0.0.1:3000/widgetfly/dist/widgetfly.js#type=popover&show=true&src=http://127.0.0.1:3000/widgetfly/examples/widgets/popover.html';
			js.onload = function() {
				callback(Widgetfly.Mediator.getWidget(js.getAttribute('data-id')));
			};
		  document.currentScript.parentNode.appendChild(js);
		})(function(widget){
		  //do something with widget
		});
	</script>
</div>
```

##Using a Widgetfly programmatically
Following example shows how to interact between widgets.

```html
<script src="wigetfly.min.js"></script>
<script>
	//Creating your custom widget class.
	var MyWidgetA = Widgetfly.Panel.extend({ //override });
	var MyWidgetB = Widgetfly.Modal.extend({ //override });
	//Using your widget class.
	var widgetA = new MyWidgetA({ 'custom' : 'options' });
	widgetA('widget-event',function(result){
		var widgetB = new MyWidgetB({ 'custom' : 'options' });
		widgetB.show();
	});
</script>
```
#Widgets

There are three types of widgets in Widgetfly currently.

##Widgetfly.Panel


###Widget Options
* **container** : id / class / HTML tag
* **autoGrow** : true / false , default: false
* **autoStart** : true / false , default: true
<p> This option indicates **Server** trigger start event automatically.</p>
* **show** : true / false, default: true
* **src** : URL of widget
* **options** : { //custom widget specification }
<p>Extra options will pass to **Server** object</p>

Getting widget options in a **Widget**
```js
this.options
```

###Methods
*  **show()**
<p>Manually show a widget</p>
* **hide()**
<p>Manually hides a widget</p>
* **toggle()**
<p>Display or hide the widget</p>
* **close()**
<p>Manually destroy a widget</p>
* **isShow()**
<p>Detect if a widget is visible</p>
* **getId()**
<p>Get widget Id</p>
* **on('custom-event',callbackFunction)**
<p>Bind a callback function to a **Widget**</p>
```js
myWidget.on('chooseFiles', function(files){
	// do something...
});
```
* **off('custom-event')**
<p>Remove all previously-bound callback function from a **Widget**</p>
* **trigger('custom-event',eventData)**
<p>Trigger **Server** callbacks for the given event. Subsequent arguments to trigger will be passed along to the **Server** callback function.
```js
mywidget.trigger('hello',{name: 'world'});
```

##Widgetfly.Modal

###Widget Options
* **container** : id / class / HTML tag
* **backdrop** : true / false
* **autoGrow** : true / false , default: false
* **autoStart** : true / false , default: true
<p> This option indicates **Server** trigger start event automatically.</p>
* **show** : true / false, default: false
* **src** : URL of widget
* **size** : small / medium / large
* **options** : { //custom widget specification }
<p>Extra options will pass to **Server** object</p>

Getting widget options in a **Widget**
```js
this.options
```

###Methods
* **show()**
<p>Manually show a widget</p>
* **hide()**
<p>Manually hides a widget</p>
* **toggle()**
<p>Display or hide the widget</p>
* **close()**
<p>Manually destroy a widget</p>
* **isShow()**
<p>Detect if a widget is visible</p>
* **getId()**
<p>Get widget Id</p>
* **on('custom-event',callbackFunction)**
<p>Bind a callback function to a **Widget**</p>
```js
myWidget.on('chooseFiles', function(files){
	// do something...
});
```
* **off('custom-event')**
<p>Remove all previously-bound callback function from a **Widget**</p>
* **trigger('custom-event',eventData)**
<p>Trigger **Server** callbacks for the given event. Subsequent arguments to trigger will be passed along to the **Server** callback function.
```js
mywidget.trigger('hello',{name: 'world'});
```

##Widgetfly.Popover

###Widget Options
* **target** : id / class / HTML tag
* **placement** : top / left / bottom / right / auto
* **autoGrow** : true / false , default: false
* **autoStart** : true / false , default: true
<p> This option indicates **Server** trigger start event automatically.</p>
* **show** : true / false, default: false
* **src** : URL of widget
* **styles** : extra css styles (ex. width:500px; height:500px;)
* **options** : { //custom widget specification }
<p>Extra options will pass to **Server** object</p>

Getting widget options in a **Widget**
```js
this.options
```

###Methods
*  **show()**
<p>Manually show a widget</p>
* **hide()**
<p>Manually hides a widget</p>
* **toggle()**
<p>Display or hide the widget</p>
* **close()**
<p>Manually destroy a widget</p>
* **isShow()**
<p>Detect if a widget is visible</p>
* **getId()**
<p>Get widget Id</p>
* **on('custom-event',callbackFunction)**
<p>Bind a callback function to a **Widget**</p>
```js
myWidget.on('chooseFiles', function(files){
	// do something...
});
```
* **off('custom-event')**
<p>Remove all previously-bound callback function from a **Widget**</p>
* **trigger('custom-event',eventData)**
<p>Trigger **Server** callbacks for the given event. Subsequent arguments to trigger will be passed along to the **Server** callback function.
```js
mywidget.trigger('hello',{name: 'world'});
```

##Default events callback binding for widgets
* onShow
* onHide
* onBeforeClose
```js
myWidget.onBeforeClose(function(){
	return window.confirm('are your sure?');
});
```

#Widgets development
##Widgetfly.Server
In widget, we seems you will be a user, the widget provider(developer) generate a widget and provide some actions for you, like hide, widget provide controll a method ```onHide()```, so when you controll the view and set hide, thec action will work with method ```onHide()``` and work.

###Using Server instance
```js
var myServer = Widgetfly.Server.get();
myServer.trigger('your-event',{//event data});
```

###Custom your Server and Widget
Extending **Server** class
```js
var CustomServer = Widgetfly.Server.extend({
	//extend to add your features
	hello : function(name){
		this.trigger('hello',{name: name});
	}
});
var myCustomServer = new CustomServer({//custom options});
myCustomServer.hello('world');
```
Extending **Widget** class
```js
var CustomPanel = Widgetfly.Panel.extend({
	//extend to add support Server features
	onHello : function(callback){
		this.on('hello',callback);
	}
});
var myCustomPanel = new CustomPanel({

	/*custom widget options*/
	options : {
		'...' : '...',
		'your_parameters_obj': 'passing parameters to Server'
	}
});
myCustomPanel.onHello(function(name){
	alert('hello ' + name);
});
```

###Server options
* **origin** : The Widget origin
* **autoGrow** : true / false
<p> Expanding height to fit the widget content when widget is initialized.</p>
* **autoStart** : true / false, default: true
<p> This option indicates **Server** trigger start event automatically.</p>
* **options** : {//custom widget specification}
<p>Custom options will pass from Widget to Server object</p>

Get custom options passing from a **Widget** object.
```js
this.options.options
```

###Methods
* **show()**
<p>Manually **Server** trigger to show a **Widget**</p>
```js
Widgetfly.Server.get().show();
```
* **hide()**
<p>Manually **Server** trigger to hide a **Widget**</p>
```js
Widgetfly.Server.get().hide();
```
* **toggle()**
<p>Display or hide the widget</p>
```js
Widgetfly.Server.get().toggle();
```
* **start()**
<p>Manually **Server** trigger to start a **Widget**</p>
```js
Widgetfly.Server.get().start();
```
* **close()**
<p>Manually **Server** trigger to destroy a **Widget**</p>
```js
Widgetfly.Server.get().close();
```

* **expand()**
<p>This method helps you to expand **Widget** height to fit the widget content, This method is usually used after widget is loaded and render HTML finished.</p>
```
Widgetfly.Server.get().expand();
```
* **compact()**
<p>This method helps you to compact **Widget** height to fit the widget content, This method is usually used after widget is loaded and render HTML finished.</p>
```
Widgetfly.Server.get().compact();
```

* **isShow(callback)**
<p>check if **Widget** is shown</p>
```
Widgetfly.Server.get().isShow(function(show){
	console.log(show);
});
```

* **onShow(callback)**
<p>bind a callback function to listen the show event from **Widget**.</p>
```
Widgetfly.Server.get().onShow(function(){
	Widgetfly.Server.get().expand();
});
```

* **on('custom-event',callbackFunction)**
<p>Bind a callback function to listen event from **Widget**</p>
```js
myServer.on('doSomething', function(data){
	// do something...
});
```
* **off('custom-event')**
<p>Remove all previously-bound callback function from a **Server**</p>
* **trigger('custom-event',eventData)**
<p>Trigger **Widget** callbacks for the given event. Subsequent arguments to trigger will be passed along to the **Widget** callback function.
```js
myServer.trigger('hello',{name: 'world'});
```
