var gulp = require('gulp');
var concat = require('gulp-concat');
var requireDir = require('require-dir');
var runSequence = require('run-sequence');
var config = require('./config/config.json');
var nodemon = require('gulp-nodemon');
var watch = require('gulp-watch');

requireDir('gulp-tasks');

// Develop Task to start the development server
gulp.task('develop', function (cb) {
    runSequence(
        //'install',
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


