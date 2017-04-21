var gulp = require('gulp');
var sass = require('gulp-sass');
var $ = require('gulp-load-plugins')();
var autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function () {

  return gulp.src('./scss/*.scss')
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('./src/styles'));
});

gulp.task('watch', function () {
  gulp.watch('./scss/**/*.scss', ['sass']);
});

gulp.task('default', ['watch', 'sass']);
