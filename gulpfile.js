var gulp = require('gulp');

var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var eslint = require('gulp-eslint');
var Server = require('karma').Server;

// JS concat and minify
gulp.task('scripts', function() {
  gulp.src([
    'app/**/*.module.js',
    'app/**/*.controller.js',
    'app/app.js'
    ])
    .pipe(concat('script.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/scripts/'));
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

gulp.task('lint', function() {
  return gulp.src('app/**/*.js')
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failOnError());
});

gulp.task('test', function (done) {
  new Server({
    configFile:__dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});
