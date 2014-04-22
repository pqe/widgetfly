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
	new Widgetfly.Modal({...});
});

```

#Usage

Include the Widgetfly SDK on your page once, ideally right after the opening <body> tag.

```
<div id="widgitfly-root"></div>
<script>(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//yourwebsite/wigetfly.min.js#xfbml=1&appId=430127053738244";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'widgetfly-sdk'));</script>

```



#Widgetfly.Panel

**Panel** is a module that ................ For example:


```
var myPanel = new Widgetfly.Panel({
    options....
});

```

##Options
* Color Scheme : light / dark
* Size : width / height (autoresize?)
* Type : Modal(center? overlay?) / Panel / Popover(left/bottom/right/top?)
* URL


##Methods
###show()
###hide()
###destroy()
###setSize(width,height)



#Widgetfly.Modal

**Modal** is a module that ................ For example:


```
var myModal = new Widgetfly.Modal({
    options....
});

```
##Options
* 1
* 2
* 3

##Methods
###show
###hide


#Widgetfly.Popover

**Popover** is a module that ................ For example:


```
var myPopover = new Widgetfly.Popover({
    options....
});


```
##Options
* 1
* 2
* 3

##Methods
###show
###hide

#Widgetfly.Server

**Server** is a module that ................ For example:


```
var myServer = new Widgetfly.Server({
    options....
});

```

##Options
* 1
* 2
* 3

##Methods
###on()
###off()
####trigger()

#Widgetfly.Widget

**Widget** is a module that ................ For example:


```
var myWidget = new Widgetfly.Widget({
    options....
});

```

##Options
* 1
* 2
* 3

##Methods
###on()
###off()
###trigger()



