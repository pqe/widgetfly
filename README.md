Widgetfly
==============

A javascript library for building cross-site(cross domain) web widgets.

About
--------------

Website URL: [http://pqe.github.io/widgetfly/](http://pqe.github.io/widgetfly/)

**Widgetfly** SDK is a javascript framework that helps you to building cross-site(cross domain) web widgets. It gives architecture to web widgets by providing cross-site **Events** model and basic **UI Features**.

Documentation
--------------
Read the [documentation](docs/README.md) to learn about the Widgetfly.

Demo
--------------
[http://pqe.github.io/widgetfly/](http://pqe.github.io/widgetfly/)


Build from source
--------------

In order to build your generated AMD module from its source, you will also need Grunt. To install Grunt globally on the command line (and run the above build task), run:

```shell
npm install -g grunt-cli
```

Once you have generated your AMD module skeleton, you can build the minified files, the documentation and the example with Grunt:

```shell
grunt
```

Development
--------------

bower install dependencies

```shell
grunt bower-install
```

You can also launch the `grunt serve` task to load the "examples/dev" folder in your browser and benefit from livereload of the page in the browser once you edit one of your source file or one of the example files:

```shell
grunt serve
```

[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)
[![Build Status](https://travis-ci.org/pqe/widgetfly.svg?branch=master)](https://travis-ci.org/pqe/widgetfly)


Browser compatibility
--------------

 - Newer versions of Google Chrome, Safari, Firefox
 - IE10+

## Release History
 * 2014-09-03   v0.1.3 New autoStart option supports Server trigger start event manually.


License
--------------

[License](https://github.com/pqe/widgetfly/blob/master/LICENSE)
