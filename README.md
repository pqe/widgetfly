Widgetfly
==============

A javascript library for building cross-site(cross domain) web widgets.

About
--------------

Website URL: [https://github.com/pqe/widgetfly](https://github.com/pqe/widgetfly)

**Widgetfly** SDK is a javascript framework that helps you to building cross-site(cross domain) web widgets. It gives architecture to web widgets by providing cross-site **Events** model and basic **UI Features**.

Documentation
--------------
Read the [documentation](docs/README.md) to learn about the Widgetfly.


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

You can also launch the `grunt serve` task to load the "examples/dev" folder in your browser and benefit from livereload of the page in the browser once you edit one of your source file or one of the example files:

```shell
grunt serve
```

[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)
[![Build Status](https://travis-ci.org/pqe/widgetfly.svg?branch=master)](https://travis-ci.org/pqe/widgetfly)

Credits
--------------

Widgetfly was initiated with [generator-amd](https://github.com/T1st3/generator-amd), a [Yeoman](http://yeoman.io) generator that builds an AMD module boilerplate.

This project uses the following as development dependencies:

* [JSHint](http://jshint.com)
* [JSCS](https://npmjs.org/package/jscs)
* [UglifyJS](http://marijn.haverbeke.nl/uglifyjs)
* [JSDoc](http://usejsdoc.org)



License
--------------

[License](https://github.com/pqe/widgetfly/blob/master/LICENSE)
