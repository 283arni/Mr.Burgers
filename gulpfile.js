const {
  src,
  dest,
  task,
  series,
  watch,
  parallel
} =require('gulp');
var rm = require('gulp-rm');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');
var gcmq = require('gulp-group-css-media-queries');
let cleanCSS = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
var rename = require("gulp-rename");
let uglify = require('gulp-uglify-es').default;

sass.compiler = require('node-sass');

task('clean', function () {
  return src('dist/**/*', {read: false}).pipe(rm())
});

task('copy:html', function () {
  return src('index.html')
  .pipe(dest('dist'))
  .pipe(reload({stream:true}))
});

task('normal', function(){
  return src('node_modules/normalize.css/normalize.css')
  .pipe(cleanCSS())
  .pipe(dest('dist/sass/'));
})


task('css', function () {
  return src('css/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sassGlob())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gcmq())
    .pipe(cleanCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write())
    .pipe(dest('dist/sass/'))
    .pipe(reload({stream:true}))
});

var lib = [
  'node_modules/jquery/dist/jquery.min.js',
  'node_modules/jquery-touchswipe/jquery.touchSwipe.min.js',
  'node_modules/mobile-detect/mobile-detect.min.js'
]

task('library', function(){
  return src(lib)
  .pipe(concat('library.min.js'))
  .pipe(dest('dist/js/lib'));
})



task('script', function(){
  return src('js/*.js')
  .pipe(sourcemaps.init())
  .pipe(concat('main.min.js',{newLine: ";"}))
  // // .pipe(
  // //   babel({
  // //   presets:['@babel/env']
  // // })
  // // )
  .pipe(uglify())
  .pipe(sourcemaps.write())
  .pipe(dest('dist/js/'))
  .pipe(reload({stream:true}))
})

var img = [
  'images/**/*.png',
  'images/**/*.jpg',
  'images/**/*.svg',
  'images/*.svg',
  'images/**/*.mp4',
  'images/favicon.ico'
]

task('images', function(){
  return src(img)
  .pipe(dest('dist/images'));
})

var font = [
  'fonts/*woff',
  'fonts/*woff2'
]

task('fonts', function(){
  return src(font)
  .pipe(dest('dist/fonts'));
})

task('server', function() {
  browserSync.init({
      server: {
          baseDir: "dist"
      }
  });
});

watch("css/**/*.scss", series('css'))
watch("index.html", series('copy:html'))
watch("js/*.js", series('script'))
watch("images/*", series('images'))
task('default',series('clean',parallel('copy:html','normal','css','library','script','images','fonts'),'server'))