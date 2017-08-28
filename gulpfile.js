var gulp = require('gulp');

var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var eslint = require('gulp-eslint');
var Server = require('karma').Server;
var sass = require('gulp-sass');
var preprocess = require('gulp-preprocess');
var connect = require('gulp-connect');
var watch = require('gulp-watch');

var srcDir = 'src';
var appDir = srcDir + '/app';

gulp.task('lint', function() {
  return gulp.src(appDir + '/**/*.js')
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failOnError());
});

gulp.task('test', ['lint'], function (done) {
  new Server({
    configFile:__dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

gulp.task('default', ['test']);
