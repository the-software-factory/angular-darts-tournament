var gulp = require('gulp');
var Server = require('karma').Server;


gulp.task('test', ['lint'], function (done) {
  new Server({
    configFile: (__dirname + '/../karma.conf.js'),
    singleRun: true
  }, done).start();
});
