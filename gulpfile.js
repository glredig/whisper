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

gulp.task('dist-combined', function() {
	gulp.src('.src/whisper.js')
		.pipe(plugins.rename('whisper.js'))
		.pipe(gulp.dest('./dist'))
		.pipe(plugins.uglify())
		.pipe(plugins.rename('whisper.min.js'))
      	.pipe(gulp.dest('./dist'));
})