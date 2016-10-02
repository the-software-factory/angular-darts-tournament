var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

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
