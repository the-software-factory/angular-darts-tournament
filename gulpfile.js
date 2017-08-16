var gulp = require('gulp');

var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var eslint = require('gulp-eslint');
var Server = require('karma').Server;
var sass = require('gulp-sass');
var minifyCss = require('gulp-clean-css');
var preprocess = require('gulp-preprocess');
var copy = require('gulp-contrib-copy');
var connect = require('gulp-connect');
var watch = require('gulp-watch');

var srcDir = 'src';
var appDir = srcDir + '/app';

var paths = {
  sass: [appDir + '/style/**/*.scss'],
  scripts: [appDir + '/**/*.module.js', appDir + '/**/*.js', '!' + appDir + '/**/*.spec.js', appDir + '/app.js']
};

gulp.task('html', function() {
  gulp.src(srcDir + '/index.html')
    .pipe(preprocess({context: { NODE_ENV: 'production'}}))
    .pipe(gulp.dest('./dist/production/'));
  gulp.src(srcDir + '/index.html')
    .pipe(preprocess({context: { NODE_ENV: 'development'}}))
    .pipe(gulp.dest('./dist/development/'));
});

gulp.task('copy', function() {
  gulp.src([
    appDir + '/**/*.html',
    appDir + '/**/*.jpg'
  ])
    .pipe(copy())
    .pipe(gulp.dest('dist/production/app/'))
    .pipe(gulp.dest('dist/development/app/'));

  gulp.src([
    'bower_components/bootstrap/fonts/**/*'
  ])
    .pipe(copy())
    .pipe(gulp.dest('dist/production/fonts/'))
    .pipe(gulp.dest('dist/development/fonts/'));
});

// JS concat and minify
gulp.task('script', function() {
  gulp.src([
    appDir + '/**/*.module.js',
    appDir + '/**/*.js',
    '!' + appDir + '/**/*.spec.js',
    appDir + '/app.js'
    ])
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./dist/development/app/'));

  gulp.src([
    appDir + '/**/*.module.js',
    appDir + '/**/*.js',
    '!' + appDir + '/**/*.spec.js',
    appDir + '/app.js'
  ])
    .pipe(concat('app.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/production/app/'));
});


gulp.task('sass', function () {
  return gulp.src(appDir + '/style/**/*.scss')
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(concat('app.css'))
    .pipe(gulp.dest('./dist/development/app/'));
});

// Minify CSS task
gulp.task('vendorStyle', ['sass'], function () {
  gulp.src([
    'bower_components/bootstrap/dist/css/bootstrap.min.css'
  ])
    .pipe(concat('vendor.min.css'))
    .pipe(gulp.dest('./dist/production/app/'));

  gulp.src([
    'bower_components/bootstrap/dist/css/bootstrap.css'
  ])
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest('./dist/development/app/'));

  gulp.src('./dist/development/app/app.css')
    .pipe(concat('app.min.css'))
    .pipe(minifyCss())
    .pipe(gulp.dest('./dist/production/app/'));
});

gulp.task('vendorScript', function() {
  gulp.src([
      'bower_components/angular/angular.js',
      'bower_components/angular-route/angular-route.js',
      'bower_components/jquery/dist/jquery.js',
      'bower_components/ngstorage/ngStorage.js',
      'bower_components/bootstrap/dist/js/bootstrap.js'
    ])
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('./dist/development/app/'));

  gulp.src([
    'bower_components/angular/angular.min.js',
    'bower_components/angular-route/angular-route.min.js',
    'bower_components/jquery/dist/jquery.min.js',
    'bower_components/bootstrap/dist/js/bootstrap.min.js',
    'bower_components/ngstorage/ngStorage.min.js'
  ])
    .pipe(concat('vendor.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/production/app/'));
});

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

gulp.task('connect', function () {
  connect.server({
    name: 'Dev App',
    root: ['dist/development'],
    port: 8000,
    livereload: true
  });
});

gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['script']);
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('default', ['html', 'copy', 'script', 'vendorStyle', 'vendorScript', 'connect','watch']);
