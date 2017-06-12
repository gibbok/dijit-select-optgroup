var gulp = require('gulp');
var connect = require('gulp-connect');
var open = require('open');
var jscs = require('gulp-jscs');
var jshint = require('gulp-jshint');
var stylish = require('gulp-jscs-stylish');

gulp.task('connect', function () {
    // runs connect server
    connect.server({
        root: ""
    });
});

gulp.task('index', function () {
    // open browser
    var uri = 'http://localhost:8080/index.html';
    open(uri);
});

gulp.task('checkcode', function () {
    // validate source code using jscs and jshint
    gulp.src('.')
        .pipe(jshint())
        .pipe(jscs())
        .on('error', function () { })
        .pipe(stylish.combineWithHintResults())
        .pipe(jshint.reporter('jshint-stylish'));
});
