'use strict';

var LIVERELOAD_PORT = 35729;
var SERVER_PORT = 9000;
var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {

	require('time-grunt')(grunt);

	require('load-grunt-tasks')(grunt, {
		scope: 'devDependencies',
		config: 'package.json',
		pattern: ['grunt-*']
	});

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		
		clean: {
			tmp: 'tmp'
		},
    
		jshint: {
			options: {
				jshintrc: true,
				reporter: require('jshint-stylish')
			},
			all: [
				'src/**/*.js',
				'example/app.js',
				'Gruntfile.js',
				'!src/prototype/**',
				'!src/demo/**'
			]
		},
		
		preprocess: {
			amd: {
				src: 'src/build/amd.core.js',
				dest: 'tmp/widgetfly.js'
			}
	    },
    
		uglify: {
			options: {
				mangle: false,
				sourceMap: true,
				sourceMapName: 'dist/widgetfly.min.map'
			},
			myTarget: {
				files: {
					'dist/widgetfly.min.js': ['tmp/widgetfly.js']
				}
			}
		},
		copy: {
			main: {
				files: [
					{src: ['tmp/widgetfly.js'], dest: 'dist/widgetfly.js'},
					{src: ['dist/widgetfly.min.js'], dest: 'example/widgetfly.min.js'},
					{src: ['dist/widgetfly.min.map'], dest: 'example/widgetfly.min.map'},
					{src: ['bower_components/jquery/jquery.min.js'], dest: 'example/jquery.min.js'},
					{src: ['bower_components/jquery/jquery.min.map'], dest: 'example/jquery.min.map'}
				]
			}
		},
		jsdoc : {
			dist : {
				src: ['src/**/*.js'],
				options: {
					destination: 'doc'
				}
			}
		},
		jscs: {
			src: ['src/**/*.js', 'Gruntfile.js', 'example/app.js'],
			options: {
				config: '.jscs.json'
			}
		},
		version: {
			js: {
				options: {
					prefix: '@version\\s*'
				},
				src: ['src/build/amd.core.js']
			},
			json: {
				options: {
					prefix: '"version":\\s"*'
				},
				src: ['bower.json']
			}
		},
		watch: {
			options: {
				nospawn: true,
				livereload: true
			},
			js: {
				files: ['src/**/*.js', 'example/**/*', 'Gruntfile.js'],
				tasks: ['jshint', 'jscs', 'uglify', 'copy:main'],
				options: {
					livereload: {
						port: LIVERELOAD_PORT
					}
				},
			},
		},
		connect: {
			options: {
				port: SERVER_PORT,
				hostname: 'localhost'
			},
			livereload: {
				options: {
					base: 'example',
					middleware: function (connect) {
						return [
							lrSnippet,
							mountFolder(connect, 'example')
						];
					}
				}
			}
		},
		open: {
			server: {
				path: 'http://localhost:' + SERVER_PORT
			}
		}
	});

	// Register tasks
	grunt.registerTask('build', [
		'clean',
		'version:js',
		'version:json',
		'jshint',
		'jscs',
		'preprocess:amd',
		'uglify',
		'copy:main'
	]);

	grunt.registerTask('serve', [
		'connect:livereload',
		'open',
		'watch:js'
	]);
	
	grunt.registerTask('doc', [
		'jsdoc:dist'
	]);
};
