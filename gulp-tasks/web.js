'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var package_json = '../package.json';
var config = require('../config/config.json');
var nodemon = require('gulp-nodemon');
var watch = require('gulp-watch');

// Run application
gulp.task('run-app', function () {
    console.log('starting development mode :) FTW!');

    nodemon({
        script: 'dist/server.js',
        watch: config.paths.dist,
        ext: 'js'
    })
        .on('restart', function () {
            console.log('a file has changed, restarted server!');
        });
});


gulp.task('watch-js', function() {
    return gulp.watch([config.paths.scripts, 'gulp-tasks/*.js'],
        ['analyze', 'build']);

});
