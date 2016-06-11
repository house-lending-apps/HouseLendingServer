'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var runSequence = require('run-sequence');
var config = require('../src/config/config.json');


// Build Application
gulp.task('build', function (cb) {
    runSequence(
        'clean-dist',
        'build-js',
        'copy-config',
        cb
    );
});

// Clean the dist before starting
gulp.task('clean-dist', function () {
    return gulp.src(config.paths.dist + '/*.*', {read: false})
        .pipe($.clean());
});

// Build all JS
gulp.task('build-js', function () {
    return gulp.src(config.paths.scripts)
        //.pipe(concat('server.js'))
        //.pipe(ng annotate, minify, etc)
        .pipe(gulp.dest(config.paths.dist));
});

// Build all JS
gulp.task('copy-config', function () {
    return gulp.src(config.paths.configPath)
        //.pipe(concat('server.js'))
        //.pipe(ng annotate, minify, etc)
        .pipe(gulp.dest(config.paths.dist + '/config'));
});
