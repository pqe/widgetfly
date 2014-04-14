/*
 * widgetfly
 * Description of the module
 * @link https://github.com/hsfeng/widgetfly
 * @author hsfeng
 * @version 0.1.0
 * @license https://github.com/hsfeng/widgetfly/blob/master/LICENSE
 * @copyright hsfeng
 */

'use strict';

/* global define */

define([

], function () {
	console.log('Module Widgetfly loaded');
	/** 
	 * My AMD module: Widgetfly
	 * @module Widgetfly
	 * @namespace Widgetfly
	 * @version 0.1.0
	 * @author hsfeng
	 */
	
	/**
	 * @constructor
	 * @since 0.1.0
	 */
	var Widgetfly = function () {
		this.params = [];
		
		/**
		 * my method
		 * @method myMethod
		 * @memberof Widgetfly
		 * @param {string|Object|number} param
		 * @since 0.1.0
		 * @returns {String} returns params
		 */
		this.myMethod = function (param) {
			console.log('Method: myMethod | ' + param);
			return param;
		};
		return this;
	};
	
	/**
	 * my prototype
	 * @method myPrototype
	 * @memberof Widgetfly
	 * @param {string} name
	 * @param {string} value
	 * @since 0.1.0
	 * @returns {String} returns name | value
	 */
	Widgetfly.prototype.myPrototype = function (name, value) {
		console.log('Method: myPrototype');
		return name + ' | ' + value;
	};

	return Widgetfly;
});
