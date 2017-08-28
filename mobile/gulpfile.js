// TODO uncomment "production" parts when able to make it work properly with "ionic cordova run ..." command

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
  scripts: [appDir + '/**/*.module.js', appDir + '/**/*.js', '!' + appDir + '/**/*.spec.js', appDir + '/app.js'],
  html: [appDir + '/**/*.html']
};

gulp.task('html', function() {
  // gulp.src(srcDir + '/index.html')
  //   .pipe(preprocess({context: { NODE_ENV: 'production'}}))
  //   .pipe(gulp.dest('./www/production/'));
  gulp.src(srcDir + '/index.html')
    .pipe(preprocess({context: { NODE_ENV: 'development'}}))
    .pipe(gulp.dest('./www/'));
});

gulp.task('copy', function() {
  gulp.src([
    appDir + '/**/*.html',
    appDir + '/**/*.jpg'
  ])
    .pipe(copy())
    // .pipe(gulp.dest('www/production/app/'))
    .pipe(gulp.dest('www/app/'));

  gulp.src([
    'bower_components/bootstrap/fonts/**/*'
  ])
  //   .pipe(copy())
  //   .pipe(gulp.dest('www/production/fonts/'))
    .pipe(gulp.dest('www/fonts/'));
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
    .pipe(gulp.dest('./www/app/'));

  // gulp.src([
  //   appDir + '/**/*.module.js',
  //   appDir + '/**/*.js',
  //   '!' + appDir + '/**/*.spec.js',
  //   appDir + '/app.js'
  // ])
  //   .pipe(concat('app.min.js'))
  //   .pipe(uglify())
  //   .pipe(gulp.dest('./www/production/app/'));
});


gulp.task('sass', function () {
  return gulp.src(appDir + '/style/**/*.scss')
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(concat('app.css'))
    .pipe(gulp.dest('./www/app/'));
});

// Minify CSS task
gulp.task('vendorStyle', ['sass'], function () {
  // gulp.src([
  //   'bower_components/bootstrap/dist/css/bootstrap.min.css'
  // ])
  //   .pipe(concat('vendor.min.css'))
  //   .pipe(gulp.dest('./www/production/app/'));

  gulp.src([
    'bower_components/bootstrap/dist/css/bootstrap.css'
  ])
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest('./www/app/'));

  // gulp.src('./www/app/app.css')
  //   .pipe(concat('app.min.css'))
  //   .pipe(minifyCss())
  //   .pipe(gulp.dest('./www/production/app/'));
});

gulp.task('vendorScript', function() {
  gulp.src([
    'bower_components/angular/angular.js',
    'bower_components/angular-route/angular-route.js',
    'bower_components/jquery/www/jquery.js',
    'bower_components/ngstorage/ngStorage.js',
    'bower_components/bootstrap/www/js/bootstrap.js',
    'bower_components/ionic/js/ionic.bundle.js'
  ])
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('./www/app/'));

  // gulp.src([
  //   'bower_components/angular/angular.min.js',
  //   'bower_components/angular-route/angular-route.min.js',
  //   'bower_components/jquery/www/jquery.min.js',
  //   'bower_components/bootstrap/www/js/bootstrap.min.js',
  //   'bower_components/ngstorage/ngStorage.min.js',
  //   'bower_components/ionic/js/ionic.bundle.min.js'
  // ])
  //   .pipe(concat('vendor.min.js'))
  //   .pipe(uglify())
  //   .pipe(gulp.dest('./www/production/app/'));
});

gulp.task('lint', function() {
  return gulp.src(appDir + '/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});

// gulp.task('test', ['lint'], function (done) {
//   new Server({
//     configFile:__dirname + '/karma.conf.js',
//     singleRun: true
//   }, done).start();
// });

gulp.task('connect', function () {
  connect.server({
    name: 'Dev App',
    root: ['www'],
    port: 8100,
    livereload: true
  });
});

gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['script']);
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.html, ['copy']);
});

// Executes tasks when "gulp" command is executed
gulp.task('default', ['html', 'copy', 'script', 'vendorStyle', 'vendorScript']);

// Executes tasks when run "ionic serve" command
gulp.task('browserRun', ['html', 'copy', 'script', 'vendorStyle', 'vendorScript', 'watch', 'connect']);
gulp.task('ionic:watch:before', ['browserRun']);
