var gulp = require('gulp'),
    replace = require('gulp-replace');

gulp.task('default', function(){
  gulp.src(['./public/bundle.js'])
    .pipe(replace('swagger_ui_version', process.env.VERSION))
    .pipe(gulp.dest('public/'));
});
