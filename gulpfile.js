var gulp = require('gulp');
var stylus = require('gulp-stylus');
var inject = require('gulp-inject');
var jshint = require('gulp-jshint');
var csslint = require('gulp-csslint');

gulp.task('compress', function () {
  return gulp.src('css/*.styl')
    .pipe(stylus({
      compress: true
    }))
    .pipe(gulp.dest('css/build'));
});
/*gulp.task('include-css', function() {
  return gulp.src('./css/*.styl')
    .pipe(stylus({
      'include css': true
    }))
    .pipe(gulp.dest('./'));
});*/

gulp.task('insertJS', function () {
  var target = gulp.src('index.html');
  // It's not necessary to read the files (will speed up things), we're only after their paths:
  var sources = gulp.src(['js/*.js', 'css/build/*.css'], {read: false});

  return target.pipe(inject(sources))
    .pipe(gulp.dest('./'));
});

gulp.task('jslint', function() {
  return gulp.src('js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'));
});

gulp.task('csslint', function() {
  gulp.src('client/css/*.css')
    .pipe(csslint())
    .pipe(csslint.reporter('text'));
});

gulp.task('default', ['compress','insertJS','jslint','csslint']);
