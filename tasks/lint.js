var gulp = require('gulp');
var eslint = require('gulp-eslint');
var srcDir = 'src';
var appDir = srcDir + '/app';

gulp.task('lint', function() {
  return gulp.src(appDir + '/**/*.js')
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failOnError());
});
