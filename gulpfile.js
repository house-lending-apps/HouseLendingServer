
var gulp = require('gulp');
var concat = require('gulp-concat');
var addStream = require('add-stream');
var requireDir = require('require-dir');
var runSequence = require('run-sequence');
var config = require('./src/config/config.json');
var nodemon = require('gulp-nodemon');

requireDir('gulp-tasks');

// Develop Task to start the development server
gulp.task('develop', function(cb) {
    runSequence(
       // 'install',
        'analyze',
        'build',
        //'run-app',
        cb
    );
});


// Run application
gulp.task('run-app', function () {
    console.log('starting development mode :) FTW!');

    nodemon({
            script: 'dist/server.js',
            watch: config.paths.dist,
            ext: 'js' })
        .on('restart', function () {
            console.log('a file has changed, restarted server!');
        });
});
/*


gulp.task('watch-js', function(cb) {
    gulp.watch([config.paths.scripts], []);
    cb();
});

*/

