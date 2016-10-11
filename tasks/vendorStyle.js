var gulp = require('gulp');
var concat = require('gulp-concat');
var minifyCss = require('gulp-clean-css');

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
