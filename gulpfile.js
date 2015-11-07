var gulp = require('gulp');
var mochaPhantomJS = require('gulp-mocha-phantomjs');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var bump = require('gulp-bump');
var replace = require('gulp-replace');

gulp.task('test', function () {
  return gulp
    .src('./specs/runner.html')
    .pipe(mochaPhantomJS());
});

gulp.task('dist-combined', function() {
  var pkg = require('./package.json');
	
  gulp.src('./src/whisper.js')
	.pipe(replace('{{ version }}', pkg.version))
	.pipe(rename('whisper.js'))
	.pipe(gulp.dest('./dist'))
	.pipe(uglify())
	.pipe(rename('whisper.min.js'))
  	.pipe(gulp.dest('./dist'));
});

function updateVersion(importance) {
  return gulp.src('./package.json')
    .pipe(bump({ type: importance }))
    .pipe(gulp.dest('./'));
}

gulp.task('patch-release', function() { return updateVersion('patch'); });
gulp.task('minor-release', function() { return updateVersion('minor'); });
gulp.task('major-release', function() { return updateVersion('major'); });