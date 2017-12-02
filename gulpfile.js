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
tingpng = require('gulp-tinypng'),
htmlmin = require('gulp-htmlmin'),
wait = require('wait-stream');


gulp.task('html-include', function() {
  gulp.src('src/*.html')
  .pipe(fileinclude({
    prefix: '@@',
    basepath: '@file'
  }))
  .pipe(htmlmin({
        collapseWhitespace: true,
        ignoreCustomFragments: [ /<%[\s\S]*?%>/, /<\?[=|php]?[\s\S]*?\?>/ ]
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
  .pipe(rename({suffix: '.min', prefix : ''}))
  .pipe(uglify())
  .on('error', function (err) {
    console.log('=======================================js-include ERROR=======================================');
    console.log(err.message);
  })
  .pipe(gulp.dest('bin/js'));
});

gulp.task('sass-main', function () {
  return gulp.src('src/*.sass')
  .pipe(plumber())
  .pipe(wait(100))//prevent sass file unreadable error
  .pipe(sass({
    errLogToConsole: true,
    includePaths: [bourbon.includePaths, 'src/helpers/', 'assets/css/']
  }).on('error', sass.logError))
  .pipe(rename({suffix: '.min', prefix : ''}))
  .pipe(cleanCSS())
  .pipe(plumber.stop())
  .pipe(gulp.dest('bin/'));
  // .pipe(browserSync.stream());
});

gulp.task('img-min', function () {
  const API_KEY = 'OsuYZkcIp_oBUt2BjgdqJVh-rqp89Pmf';
  gulp.src(['assets/img/*.png','assets/img/*.jpg'])
  .pipe(tingpng(API_KEY))
  .pipe(gulp.dest('bin/img'));
});


gulp.task('critical-css', function () {
  //1.add style.css to head for fast loading
  //2. make all element visible
  //html body 
  //  opacity:1 !important
  //3. turn off animations
  //div.animated, span.animated, h1.animated, h2.animated, li.animated{
  //     opacity: 1 !important;
  // }
  var critical = require('critical');

  critical.generate({
      inline: true,
      base: 'bin/',
      src: 'index.html',
      dest: 'index.html',
      css: ['bin/style.min.css'],
      minify: true,
      width: 1300,
      height: 900,
      ignore: [/url\(data:image\/gif;base64/]
  });
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

var timer = null;
function runBrowserSync() {
    browserSync.reload();
}

gulp.task('watch', function() {

  gulp.watch(['src/**/*.html'], ['html-include']);
  gulp.watch(['src/**/*.js'], ['jscomm-include']);
  gulp.watch(['src/**/*.sass'], ['sass-main']);
  gulp.watch('bin/**').on('change', function (argument) {
    //preventing frequent reloads if changed many files
    if (timer) {
        clearTimeout(timer);
        timer = null;
    }
    timer = setTimeout(runBrowserSync, 1000);
  });

});

gulp.task('default', ['browser-sync', 'watch'], function() {});

gulp.task('init', ['html-include', 'jscomm-include', 'sass-main','browser-sync', 'watch'], function() {});
