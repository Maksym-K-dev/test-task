let project_folder = "assets";
let source_folder = "src";

let path = {
  build: {
    css: project_folder + "/css/",
    html:  project_folder + "/",
    js: project_folder + "/js/",
    images: project_folder + "/images/",
    fonts: project_folder + "/fonts/"
  },
  src: {
    html: [source_folder + "/**/*.html", "!" + source_folder + "/_*.html"],
    css: [source_folder + "/scss/**/*.scss", "!" + source_folder + "/scss/**/_*.scss"],
    js: [
      source_folder + "/js/libs/*.js",
      source_folder + "/js/*.js",
      "!" + source_folder + "/js/gartner_reviews.js",
    ],
    js_folders: source_folder + "/js/**/*.js",
    images: source_folder + "/images/**/*",
    fonts: source_folder + "/fonts/**/*"
  },
  watch: {
    html: source_folder + "/**/*.html",
    css: source_folder + "/scss/**/*.scss",
    js: source_folder + "/js/**/*.js",
    images: source_folder + "/images/**/*"
  },
  clean: "./" + project_folder + "/"
};

let { src, dest } = require('gulp'),
    gulp = require('gulp'),
    fileinclude = require('gulp-file-include'),
    del = require('del'),
    sass = require('gulp-sass')(require('sass')),
    autoprefixer = require('gulp-autoprefixer'),
    gulp_media = require('gulp-group-css-media-queries'),
    clean_css = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    imagemin = require('gulp-imagemin'),
    webp = require('gulp-webp'),
    webp_html = require('gulp-webp-html'),
    woff2 = require('gulp-ttf2woff2'),
    woff = require('gulp-ttf2woff'),
    uglify = require('gulp-uglify-es').default,
    browserSync = require('browser-sync').create(),
    concat = require('gulp-concat');



function browsersync() {
  browserSync.init({
    proxy: "http://test-task.loc",
    notify: false,
    open: true,
    files: [
      "**/*.php",
      "assets/css/*.css",
      "assets/js/*.js"
    ]
  });
}

function html() {
  return src(path.src.html)
      .pipe(fileinclude({ prefix: '@@', basepath: 'src/' }))
      .pipe(dest(path.build.html))
      .pipe(browserSync.stream());
}

function img() {
  return src(path.src.images)
      .pipe(webp({ quality: 70 }))
      .pipe(dest(path.build.images))
      .pipe(src(path.src.images))
      .pipe(dest(path.build.images))
      .pipe(browserSync.stream());
}

function js() {
  // ToDo: finish js_folders compiling settings
  src(path.src.js_folders)
      .pipe(dest(path.build.js))

  return src(path.src.js)
      // .pipe(fileinclude())
      .pipe(concat('main.js'))
      .pipe(dest(path.build.js))
      .pipe(uglify())
      .pipe(rename({
        extname: ".min.js"
      }))
      .pipe(dest(path.build.js))
      .pipe(browserSync.stream())
}

function css() {
  return src(path.src.css, { base: source_folder + "/scss" })
      .pipe(sass({ outputStyle: "expanded" }).on('error', sass.logError))
      .pipe(autoprefixer({
        overrideBrowserslist: ["last 5 versions"],
        cascade: true
      }))
      .pipe(gulp_media())
      .pipe(dest(path.build.css))
      .pipe(rename({ extname: ".min.css" }))
      .pipe(dest(path.build.css))
      .pipe(browserSync.stream());
}


function watchFiles() {
  gulp.watch([path.watch.html], html);
  gulp.watch([path.watch.css], css);
  gulp.watch([path.watch.js], js);
  gulp.watch([path.watch.images], img);
}

function clean() {
  return del(path.clean);
}

function fonts() {
  return src(path.src.fonts)
      .pipe(woff())
      .pipe(dest(path.build.fonts))
      .pipe(src(path.src.fonts))
      .pipe(woff2())
      .pipe(dest(path.build.fonts))
      .pipe(browserSync.stream());
}

let build = gulp.series(clean, gulp.parallel(js, css, html, img, fonts));
let watch = gulp.parallel(build, watchFiles, browsersync);

exports.js = js;
exports.img = img;
exports.css = css;
exports.html = html;
exports.watch = watch;
exports.fonts = fonts;
exports.build = build;
exports.default = watch;