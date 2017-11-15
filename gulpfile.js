const gulp = require('gulp'),
sass = require('gulp-sass'),
autoprefixer = require('gulp-autoprefixer'),
cleanCSS = require('gulp-clean-css'),
rename = require('gulp-rename'),
fileinclude = require('gulp-file-include'),
plumber = require('gulp-plumber'),
bourbon = require('node-bourbon'),
uglify = require('gulp-uglify'),
browserSync = require('browser-sync').create(),
tingpng = require('gulp-tinypng');


gulp.task('html-include', function() {
  gulp.src('src/*.html')
  .pipe(fileinclude({
    prefix: '@@',
    basepath: '@file'
  }))
  .on('error', function (err) {
    console.log('=======================================html-include ERROR=======================================');
    console.log(err.message);
  })
  .pipe(gulp.dest('bin'));
});

gulp.task('jscomm-include', function() {
  gulp.src(['src/*.js'])
  .pipe(fileinclude({
    prefix: '@@',
    basepath: '@file'
  }))
  // .pipe(uglify())
  .on('error', function (err) {
    console.log('=======================================js-include ERROR=======================================');
    console.log(err.message);
  })
  .pipe(gulp.dest('bin/js'));
});

gulp.task('sass-main', function () {
  return gulp.src('src/*.sass')
  .pipe(plumber())
  .pipe(sass({
    errLogToConsole: true,
    includePaths: [bourbon.includePaths, 'src/helpers/', 'assets/css/']
  }).on('error', sass.logError))
  // .pipe(rename({suffix: '.min', prefix : ''}))
  // .pipe(cleanCSS())
  .pipe(plumber.stop())
  .pipe(gulp.dest('bin/'))
  .pipe(browserSync.stream());
});

gulp.task('img-min', function () {
  const API_KEY = 'OsuYZkcIp_oBUt2BjgdqJVh-rqp89Pmf';
  gulp.src(['assets/img/*.png','assets/img/*.jpg'])
  .pipe(tingpng(API_KEY))
  .pipe(gulp.dest('bin/img'));
});


gulp.task('browser-sync', function() {

    gulp.task('browser-sync', function() {
      browserSync.init({
        server: {
          baseDir: "./bin/"
        }
      });
    });


});

gulp.task('watch', function() {

  gulp.watch(['src/**/*.html'], ['html-include']);
  gulp.watch(['src/**/*.js'], ['jscomm-include']);
  gulp.watch(['src/**/*.sass'], ['sass-main']);
  gulp.watch('bin/**').on('change', browserSync.reload);

});

gulp.task('default', ['browser-sync', 'watch'], function() {});

gulp.task('init', ['img-min', 'html-include', 'jscomm-include', 'sass-main'], function() {});
