var gulp = require('gulp');
var connect = require('gulp-connect');

gulp.task('connect', function () {
  connect.server({
    name: 'Dev App',
    root: ['dist/development'],
    port: 8000,
    livereload: true
  });
});
