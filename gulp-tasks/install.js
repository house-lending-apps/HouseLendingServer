'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var package_json = './package.json';

gulp.task('install', function() {
    return gulp.src(package_json)
        .pipe($.install());
});
