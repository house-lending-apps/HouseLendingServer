'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var runSequence = require('run-sequence');

var dev_srcs = ['src/**/*.js', 'gulp-tasks/*.js'];
var plato_srcs = ['src/**/*.js', '!src/**/*.mock.js', '!src/**/*.spec.js'];
var plato_dist = 'reports/plato_dist';
var plato_dist_src = plato_dist + '/**';

gulp.task('eslint', function() {
    // ESLint ignores files with "node_modules" paths.
    // So, it's best to have gulp ignore the directory as well.
    // Also, Be sure to return the stream from the task;
    // Otherwise, the task may end before the stream has finished.
    return gulp.src(dev_srcs)
      // eslint() attaches the lint output to the "eslint" property
      // of the file object so it can be used by other modules.
      .pipe($.eslint())
      // eslint.format() outputs the lint results to the console.
      // Alternatively use eslint.formatEach() (see Docs).
      .pipe($.eslint.format())
      // To have the process exit with an error code (1) on
      // lint error, return the stream and pipe to failAfterError last.
      .pipe($.eslint.failAfterError());
});

gulp.task('plato-transpile', function() {
    return gulp.src(plato_srcs)

        // uncomment this to enable ES6 transpilation
        //.pipe($.babel())

        .pipe(gulp.dest(plato_dist));
});

gulp.task('plato', ['plato-transpile'], function() {
    var DEST_DIR = 'reports/plato';
    return gulp.src(plato_dist_src)
        .pipe($.plato(DEST_DIR));
});

gulp.task('analyze', function(cb) {
    runSequence(['eslint', 'plato'], cb);
});


gulp.task('analyze-ci', function() {
    return gulp.watch(dev_srcs, ['analyze']);
});
