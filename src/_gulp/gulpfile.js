var gulp = require('gulp');
var newer = require('gulp-newer');
var htmlclean = require('gulp-htmlclean');
var concat = require('gulp-concat');
var deporder = require('gulp-deporder');
var stripdebug = require('gulp-strip-debug');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var postcss = require('post-css-assets');
var assets = require('postcss-assets');
var autoprefixer = require('autoprefixer');
var mqpacker = require('css-mqpacker');
var cssnano = require('cssnano');

var devBuild = (process.env.NODE_ENV !== 'production');

var folder = {
  src: 'src/',
  build: 'build/'
};

// html files
gulp.task('html', function () {
  var out = folder.build + 'html/';
  var page = gulp.src(folder.src + 'html/**/*')
    .pipe(newer(out));

  if (!devBuild) {
    page = page.pipe(htmlclean());
  }

  return page.pipe(gulp.dest(out));
});

// js files
gulp.task('js', function () {
  var jsbuild = gulp.src(folder.src + 'js/**/*')
    .pipe(deporder())
    .pipe(concat('main.js'));

  if (!devBuild) {
    jsbuild = jsbuild
      .pipe(stripdebug())
      .pipe(uglify());
  }
  return jsbuild.pipe(gulp.dest(folder.build + 'js/'));
});

// scss/css files
gulp.task('css', function () {
  var postCssOpts = [
    assets({ loadPaths: ['img/'] }),
    autoprefixer({ browsers: ['last 2 versions', '> 2%'] }),
    mqpacker
  ];

  if (!devBuild) {
    postCssOpts.push(cssnano);
  }

  return gulp.src(folder.src + 'scss/main.scss')
    .pipe(sass({
      outputStyle: 'nested',
      imagePath: 'img/',
      precision: 3,
      errLogToConsole: true
    }))
    .pipe(postcss(postCssOpts))
    .pipe(gulp.dest(folder.build + 'css/'));
});

gulp.task('run', ['html', 'css', 'js']);

gulp.task('watch', function () {
  gulp.watch(folder.src + 'html/**/*', ['html']);
  gulp.watch(folder.src + 'js/**/*', ['js']);
  gulp.watch(folder.src + 'scss/**/*', ['css']);
});
