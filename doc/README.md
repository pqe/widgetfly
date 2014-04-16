Widgetfly
==============

A javascript library for building cross-site web widgets.


#Installation

Install using bower:

```shell
$ bower install widgetfly --save
```

Configure RequireJS 

```javascript
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
}
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
###show
###hide


