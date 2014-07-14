Widgetfly
==============

A javascript library for building cross-site web widgets.


#Installation
Install using bower:
```shell
$ bower install widgetfly --save
```
Configure RequireJS 
```
require.config({
	...
	paths : {
		...
		'widgetfly' : 'path_to_bower_components/widgetfly/dist/widgetfly.min'
		...
	}
...
	
define(["widgetfly"], function (Widgetfly) {
	var WidgetA = new Widgetfly.Modal.extend({ 'custom' : 'and override' });
	var myWidgetA = new WidgetA({ 'custom' : 'options' });
	myWidgetA.onStart(function(){
		myWidgetA.show();
	});
});

```

#Usage
Include the Widgetfly SDK on your page once, ideally right after the opening ```<body>``` tag.
```
<div id="widgetfly-root"></div>
<script>(function(d, s, id, callback) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)){
  	callback(Widgetfly.Mediator.get(id));
  	return;
  }
  js = d.createElement(s); js.id = id;
  js.onload = function() {
  	callback(Widgetfly.Mediator.get(js.getAttribute('data-widgetfly-id'));
  };
  js.src = "//yourwebsite/wigetfly.min.js#xfbml=1&appId=430127053738244";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'widgetfly-sdk', function(widget){
	//do something with your widget
}));</script>

```

##Using a Widgetfly programmatically
Following example shows how to interact between widgets.
```
<script src="wigetfly.min.js"></script>
<script>
	//Creating a custom widget class. 
	var MyWidgetA = Widgetfly.Panel.extend({ 'custom' : 'and override' });
	var MyWidgetB = Widgetfly.Modal.extend({ 'custom' : 'and override' });
	//Using your widget class.
	var widgetA = new MyWidgetA({ 'custom' : 'options' });
	widgetA('widget-event',function(result){
		var widgetB = new MyWidgetB({ 'custom' : 'options' });
		widgetB.show();
	});
</script>
```
#Widgetfly Modules
##Widgetfly.Panel
**Panel** is a module that ................ For example:
```
var MyWidgetA = Widgetfly.Panel.extend({ 'custom' : 'and override' });
var widgetA = new MyWidgetA({
	container : '.classContainer',
	autoGrow : true,
	show : true,
	src : 'http://host.domain/page/which/used',
	options : {
		hello: 'world'
	}
});
```
###Module Options
* container : id / class / HTML tag
* autoGrow : true / false
* src : URL
* show : true / false
* options : { key : value }

###Methods support list
<table>
    <tr>
        <td>onStart</td>
    </tr>
    <tr>
        <td>show</td>
    </tr>
    <tr>
        <td>onShow</td>
    </tr>
    <tr>
        <td>hide</td>
    </tr>
    <tr>
        <td>onHide</td>
    </tr>
    <tr>
        <td>close</td>
    </tr>
    <tr>
        <td>onBeforeClose</td>
    </tr>
    <tr>
        <td>isShow</td>
    </tr>
    <tr>
        <td>getId</td>
    </tr>
    <tr>
        <td>Widget.Server.exapnd</td>
    </tr>
</table>

##Widgetfly.Modal
**Modal** is a module that ................ For example:
```
var MyWidgetB = Widgetfly.Modal.extend({ 'custom' : 'and override' });
var widgetB = new MyWidgetB({
	container : '.classContainer',
	backdrop : true,
	autoGrow : true,
	show : true,
	src : 'http://host.domain/page/which/used'
});
```
###Module Options
* container : id / class / HTML tag
* backdrop: light / dark
* autoGrow : true / false
* src : URL
* show : true / false

###Methods support list
<table>
    <tr>
        <td>onStart</td>
    </tr>
    <tr>
        <td>show</td>
    </tr>
    <tr>
        <td>onShow</td>
    </tr>
    <tr>
        <td>hide</td>
    </tr>
    <tr>
        <td>onHide</td>
    </tr>
    <tr>
        <td>close</td>
    </tr>
    <tr>
        <td>onBeforeClose</td>
    </tr>
    <tr>
        <td>isShow</td>
    </tr>
    <tr>
        <td>getId</td>
    </tr>
    <tr>
        <td>Widget.Server.exapnd</td>
    </tr>
</table>
##Widgetfly.Popover
**Popover** is a module that ................ For example:
```
var MyWidgetC = Widgetfly.Popover.extend({ 'custom' : 'and override' });
var widgetC = new MyWidgetC({
	target : '.classContainer',
	placement : 'top',
	autoGrow : true,
	show : true,
	src : 'http://host.domain/page/which/used'
});
```
###Module Options
* target : id / class / HTML tag
* placement : top / left / bottom / right
* autoGrow : true / false
* src : URL
* show : true / false

###Methods support list
<table>
    <tr>
        <td>onStart</td>
    </tr>
    <tr>
        <td>show</td>
    </tr>
    <tr>
        <td>onShow</td>
    </tr>
    <tr>
        <td>hide</td>
    </tr>
    <tr>
        <td>onHide</td>
    </tr>
    <tr>
        <td>close</td>
    </tr>
    <tr>
        <td>onBeforeClose</td>
    </tr>
    <tr>
        <td>isShow</td>
    </tr>
    <tr>
        <td>getId</td>
    </tr>
    <tr>
        <td>Widget.Server.exapnd</td>
    </tr>
</table>

#Module Methods
We will follow example in [using a Widgetfly programmatically](#using a Widgetfly programmatically) to explain the method below.
Before start to use these method, we should know the architecture of widget. In our widget, we make two different mode to help **Developer** and **General user**. Usually, we called **application mode** for Developer and **widget mode** for User.
##Application mode
In app, you might be a developer, because you will generate a widget and use our code in app, and provide a widget view for your user.
If you controll the widget without in initial setting, you can use the following methods to contoll widget display after widget is initialize and render, include get some information or provide some event callback function for user. Like do something when widget is hided :
```
widgetA.onHide(function(){
	// saveDB() is a pseudocode, we don't have this method... just a example
	saveDB(widgetA.getId());
	
	...
	
});
```
###onStart()
**onStart** method used to tells framework the widget is already started, and developer can do something after this callback function.
```
widgetA.onStart(function() {
	console.log('widgetA is started');
});
```
###show()
**show()** is used to show the widget if it is invisible.

**In App Case :**
```
widgetA.show();
```
###onShow(callback)
**onShow()** is a callback function with **show()**, this function will fire when show() is fired, it will action before show(), after it finished, call show() to work.
```
widgetA.onShow(function(){
	console.log('widgetA is prepare to hide');
	return true;
});
```
###hide()
**hide()** is used to hide the widget if it is visible.
```
widgetA.hide();
```
###onHide(callback)
**onHide()** is similar to **onShow()**, one is for show() callback, and this is a callback for hide().
```
widgetA.onHide(function(){
	console.log('widgetA is prepare to hide');
	return true;
});
```
###close()
**close()** can helps you to **destroy** the widget and release memory.
```
widgetA.close();
```
###onBeforeClose(callback)
When **close()** method is fired, this method will fire before close(), it's a callback function for close().
```
widgetA.onBeforeClose(function(){
	console.log('widgetA is closing');
	return true;
});
```
###isShow()
Return boolean value of the widget is visible or not.
###getId()
Return widget unique ID.

##Widgetfly.Server - widget user Mode
In widget, we seems you will be a user, the widget provider(developer) generate a widget and provide some actions for you, like hide, widget provide controll a method ```onHide()```, so when you controll the view and set hide, thec action will work with method ```onHide()``` and work.
###show()
```
Widgetfly.Server.show();
```
###hide()
```
Widgetfly.Server.hide();
```
###close()
```
Widgetfly.Server.close();
```
###expand()
When widget is started and set autoGrow as ```true``` in initialize setting, This method can helps you to fire the method to this, and auto resize the widget in disply, This method is usually used after widget is loaded and render HTML finished.
```
Widgetfly.Server.expand();
```




