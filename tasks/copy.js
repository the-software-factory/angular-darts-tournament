var gulp = require('gulp');
var copy = require('gulp-contrib-copy');
var srcDir = 'src';
var appDir = srcDir + '/app';

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
