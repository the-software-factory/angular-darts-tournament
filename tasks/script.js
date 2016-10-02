var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var srcDir = 'src';
var appDir = srcDir + '/app';

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
