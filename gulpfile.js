'use strict';
var gulp = require('gulp'),
	clean = require('gulp-clean'),
	less = require('gulp-less'),
	css2js = require('gulp-css2js'),
	rename = require('gulp-rename'),
	jshint = require('gulp-jshint'),
	stylish = require('jshint-stylish'),
	jscs = require('gulp-jscs'),
	preprocess = require('gulp-preprocess'),
	uglify = require('gulp-uglify'),
	sourcemaps = require('gulp-sourcemaps'),
	runSequence = require('run-sequence'),
	bower = require('gulp-bower');

gulp.task('clean', function(){
	return gulp.src(['.tmp', 'dist'])
        .pipe(clean({force: true}));
});

gulp.task('clean:bower', function(){
	return gulp.src(['bower_components'])
        .pipe(clean({force: true}));
});

gulp.task('less2js', function() {
	return gulp.src(['src/css/*.less', '!src/css/_*.less']).pipe(less({
		paths : ['src/css'],
		compress : true,
		yuicompress : true,
		strictImports : true
	})).pipe(css2js()).pipe(rename('widgetfly.css.js')).pipe(gulp.dest('.tmp'));
});

gulp.task('lint', function() {
	return gulp.src(['src/**/*.js','gulpfile.js','Gruntfile.js'])
    .pipe(jshint({lookup: true}))
    .pipe(jshint.reporter(stylish))
    .pipe(jshint.reporter('fail'));
});

gulp.task('jscs', function() {
	return gulp.src(['src/**/*.js'])
	.pipe(jscs());
});

gulp.task('preprocess', function() {
	return gulp.src('src/build/amd.core.js')
    .pipe(preprocess()) //To set environment variables in-line
    .pipe(rename('widgetfly.js'))
    .pipe(gulp.dest('.tmp'));
});

gulp.task('uglify', function() {
	return gulp.src('.tmp/widgetfly.js')
	.pipe(sourcemaps.init())
	.pipe(uglify({
		mangle: false
	}))
	.pipe(rename('widgetfly.min.js'))
	.pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist'));
});

gulp.task('copy', function() {
	return gulp.src('.tmp/widgetfly.js').pipe(gulp.dest('dist'));
});

gulp.task('bower', function() {
  bower();
});


gulp.task('default',function (cb) {
	runSequence('clean',['lint', 'jscs'],'less2js','preprocess','uglify', 'copy', cb);
});

gulp.task('release',['clean:bower'],function (cb) {
  runSequence('bower','default', cb);
});