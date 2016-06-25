var gulp = require('gulp');
var concat = require('gulp-concat');
var requireDir = require('require-dir');
var runSequence = require('run-sequence');
var config = require('./config/config.json');
var nodemon = require('gulp-nodemon');
var watch = require('gulp-watch');

requireDir('gulp-tasks');

// Develop Task to start the development server
gulp.task('run', function (cb) {
    runSequence(
        'analyze',
        'build',
        'run-app',
        'watch-js',
        cb
    );
});

// Develop Task to start the development server
gulp.task('run-prod', function (cb) {
    runSequence(
        'analyze',
        'build',
        cb
    );
});



