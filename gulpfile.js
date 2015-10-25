var gulp = require('gulp');
var mochaPhantomJS = require('gulp-mocha-phantomjs');

gulp.task('default', function() {
  // place code for your default task here
});

gulp.task('test', function () {
  return gulp
    .src('./specs/runner.html')
    .pipe(mochaPhantomJS());
});