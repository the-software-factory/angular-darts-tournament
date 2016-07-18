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
  .pipe(eslint({
    "rules": {
      "linebreak-style": [
        "error",
        "unix"
      ],
      "semi": [
        "error",
        "always"
      ],
      "angular/di": [
        0,
        "array"
      ],
      "keyword-spacing": ["error"],
      "dot-notation": ["error"],
      "array-bracket-spacing": ["error", "never"],
      "no-multiple-empty-lines": ["error", {"max": 1, "maxBOF": 0, "maxEOF": 0}],
      "space-in-parens": ["error", "never"],
      "object-curly-spacing": ["error", "never"],
      "comma-spacing": ["error", {"before": false, "after": true}],
      "computed-property-spacing": ["error", "never"],
      "space-before-function-paren": [2, "never"],
      "brace-style": ["error", "stroustrup"],
      "space-before-blocks": [2],
      "space-infix-ops": [2]
    }
  }))
  .pipe(eslint.format())
  .pipe(eslint.failOnError());
});

gulp.task('test', function (done) {
  new Server({
    configFile:__dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});
