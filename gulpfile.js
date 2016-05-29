
var gulp = require('gulp');
var concat = require('gulp-concat');
var addStream = require('add-stream');
var config = require('./src/config/config.json');
var nodemon = require('gulp-nodemon');

// Develop Task to start the development server
gulp.task('develop',['buildJS','run-app']);


// Build all JS
gulp.task('buildJS', function() {
    console.log(config.paths.dist);
    return gulp.src(config.paths.scripts)
        //.pipe(concat('server.js'))
        //.pipe(ng annotate, minify, etc)
        .pipe(gulp.dest(config.paths.dist));
});

// Run application
gulp.task('run-app', function () {
    console.log('starting development mode :) FTW!');
    nodemon({ script: './dist/server.js', ext: 'html js' })
        .on('restart', function () {
            console.log('a file has changed, restarted server!');
        });
});


