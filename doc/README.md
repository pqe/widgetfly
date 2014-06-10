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

Include the Widgetfly SDK on your page once, ideally right after the opening <body> tag.

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
	var WidgetA = Widgetfly.Panel.extend({ 'custom' : 'and override' });
	var WidgetB = Widgetfly.Modal.extend({ 'custom' : 'and override' });
	//Using your widget class.
	var myWidgetA = new WidgetA({ 'custom' : 'options' });
	myWidgetA('widget-event',function(result){
		var myWidgetB = new WidgetB({ 'custom' : 'options' });
		myWidgetB.show();
	});
</script>
```

#Widgetfly.Widget

##Methods
###onStart()
###show()
###onShow()
###hide()
###onHide()
###toggle()
###close()
###onBeforeClose()
###setSize(width,height)
###setAutoGrow()


#Widgetfly.Panel

**Panel** is a module that ................ For example:


```
var myPanel = new Widgetfly.Panel({
    options....
});

```

##Options
* colorScheme: light / dark
* width : string
* height : string
* autoGrow : true / false / width / height
* url : URL
* show : true / false


##Methods
###show()
###hide()
###close()






#Widgetfly.Server

**Server** is a module that ................ For example:


```
Widgetfly.Server.close();
```


##Methods
###start()
###show()
###hide()
###close()
###setSize(width,height)




