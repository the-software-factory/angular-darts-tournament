var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var srcDir = 'src';
var appDir = srcDir + '/app';

gulp.task('sass', function () {
  return gulp.src(appDir + '/style/**/*.scss')
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(concat('app.css'))
    .pipe(gulp.dest('./dist/development/app/'));
});
