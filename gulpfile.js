var gulp = require('gulp');

var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var eslint = require('gulp-eslint');
var Server = require('karma').Server;
var sass = require('gulp-sass');
var minifyCss = require('gulp-clean-css');

// JS concat and minify
gulp.task('minifyJS', function() {
  gulp.src([
    'app/**/*.module.js',
    'app/**/*.controller.js',
    'app/app.js'
    ])
    .pipe(concat('vendor.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/scripts/'));
});

// Minify CSS task
gulp.task('minifyCss', ['sass'], function () {
  gulp.src('app/**/*.css')
    .pipe(concat('vendor.min.css'))
    .pipe(minifyCss())
    .pipe(gulp.dest('./dist/css/'));
});

gulp.task('bower-scripts', function() {
  gulp.src([
    'bower_components/angular/angular.js',
    'bower_components/angular-route/angular-route.js',
    'bower_components/ngstorage/ngStorage.min.js',
    'bower_components/jquery/dist/jquery.min.js'
    ])
    .pipe(concat('bower-script.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/scripts/'));
});

gulp.task('sass', function () {
  return gulp.src('./app/scss/**/*.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(concat('app.css'))
    .pipe(gulp.dest('./app/'));
});

gulp.task('lint', function() {
  return gulp.src('app/**/*.js')
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
