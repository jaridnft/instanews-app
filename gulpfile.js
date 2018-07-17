var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    browserSync = require('browser-sync').create(),
    eslint = require('gulp-eslint');

gulp.task("lint", function () {
    return gulp
            .src('js/*.js')
                // eslint() attaches the lint output to the "eslint" property
                // of the file object so it can be used by other modules.
            .pipe(eslint())
                // eslint.format() outputs the lint results to the console.
                // Alternatively use eslint.formatEach() (see Docs).
            .pipe(eslint.format())
                // To have the process exit with an error code (1) on
                // lint error, return the stream and pipe to failAfterError last.
            .pipe(eslint.failAfterError());
});

gulp.task('scripts', gulp.series("lint", function () {
    return gulp
      .src("./js/*.js") // these are the files gulp will consume
      .pipe( uglify() ) // call uglify function on these files
      .pipe( rename ({ extname: ".min.js"}) ) // change file extension after uglified
      .pipe( gulp.dest("./build/js") ); // send built files to ./build/js/
}));

gulp.task("watch", function() {
    // pass in files that need to be uglified
    gulp.watch("js/*.js", gulp.series("scripts"));
});

gulp.task("browser-sync", function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    // pass in files you want to refresh on
    gulp.watch('./').on('change', browserSync.reload);
});

gulp.task("default", gulp.parallel("browser-sync","watch"));
