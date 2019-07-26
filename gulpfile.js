var gulp = require("gulp"),
    sass = require("gulp-sass"),
    postcss = require("gulp-postcss"),
    autoprefixer = require("autoprefixer"),
    cssnano = require("cssnano"),
    sourcemaps = require("gulp-sourcemaps"),
    browserSync = require("browser-sync").create();


// Put this after including our dependencies
var paths = {
    styles: {
        src: "assets/scss/**/*.scss",
        dest: "assets/css"
    }
};
     
function style() {
    return (
        gulp
            .src(paths.styles.src)
            .pipe(sourcemaps.init())
            .pipe(sass())
            .on("error", sass.logError)
            .pipe(postcss([autoprefixer(), cssnano()]))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(paths.styles.dest))
            .pipe(browserSync.stream())
    );
}
    
function reload() {
    browserSync.reload();
}
 
function watch() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch(paths.styles.src, style);
    gulp.watch("*.html", reload);
}


exports.style = style;
exports.watch = watch
exports.default = watch
