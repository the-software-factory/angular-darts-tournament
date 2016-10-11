var gulp = require('gulp');
var preprocess = require('gulp-preprocess');
var srcDir = 'src';

gulp.task('html', function() {
  gulp.src(srcDir + '/index.html')
    .pipe(preprocess({context: { NODE_ENV: 'production'}}))
    .pipe(gulp.dest('./dist/production/'));
  gulp.src(srcDir + '/index.html')
    .pipe(preprocess({context: { NODE_ENV: 'development'}}))
    .pipe(gulp.dest('./dist/development/'));
});
