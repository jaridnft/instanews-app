var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    browserSync = require('browser-sync').create();

gulp.task('scripts', function () {
    return gulp
      .src("./js/*.js") // these are the files gulp will consume
      .pipe( uglify() ) // call uglify function on these files
      .pipe( rename ({ extname: ".min.js"}) ) // change file extension after uglified
      .pipe( gulp.dest("./build/js") ); // send built files to ./build/js/
});

gulp.task("watch", function() {
    gulp.watch("./*", gulp.series("scripts"));
});

gulp.task("browser-sync", function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch('./').on('change', browserSync.reload);
});

gulp.task("default", gulp.parallel("browser-sync","watch"));
