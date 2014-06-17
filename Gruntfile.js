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
			tmp: 'tmp',
			bower : ['bower_components'],
			dist: ['dist'],
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
					{src: ['tmp/widgetfly.js'], dest: 'dist/widgetfly.js'}
				]
			},
			images : {
				expand: true,
				cwd: 'src/css/img/',
				src: ['**'],
				dest: 'dist/css/img'
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
		},
		bower : {
			install : {
				options : {
			        targetDir : './',
					cleanTargetDir : false,
					cleanBowerDir : false,
					verbose : true
				}
			}
		},
		less : {
			production : {
				options : {
					paths : ['src/css'],
					compress : true,
					yuicompress : true,
					strictImports : true
				},
				
				files : [{
			        // no need for files, the config below should work
			        expand: true,
			        cwd:    'src/css',
			        src:    ['*.less','!_*.less'],
			        ext:    '.css',
			        dest : 'dist/css'
				}]
				
			}
		}
	});
	
	grunt.registerTask('bower-install', ['clean:bower','bower:install']);
	
	grunt.registerTask('release', [
		'bower-install',
		'default'
	]);

	// Register tasks
	grunt.registerTask('default', [
		'clean:dist',
		'version:js',
		'version:json',
		'jshint',
		'jscs',
		'preprocess:amd',
		'uglify',
		'copy:main',
		'less:production',
		'copy:images'
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
