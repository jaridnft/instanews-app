var gulp = require('gulp'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  browserSync = require('browser-sync').create(),
  eslint = require('gulp-eslint'),
  sass = require('gulp-sass'),
  babel = require('gulp-babel'),
  autoprefixer = require('gulp-autoprefixer'),
  cssnano = require('gulp-cssnano'),
  prettyError = require('gulp-prettyerror');

gulp.task('sass', () => {
  return gulp
    .src('./src/sass/style.scss')
    .pipe(prettyError())
    .pipe(sass())
    .pipe(
      autoprefixer({
        browsers: ['last 2 versions']
      })
    )
    .pipe(gulp.dest('./build/css'))
    .pipe(cssnano())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('./build/css'));
});

gulp.task('lint', () => {
  return (
    gulp
      .src('src/js/*.js')
      // eslint() attaches the lint output to the "eslint" property
      // of the file object so it can be used by other modules.
      .pipe(eslint())
      // eslint.format() outputs the lint results to the console.
      // Alternatively use eslint.formatEach() (see Docs).
      .pipe(eslint.format())
      // To have the process exit with an error code (1) on
      // lint error, return the stream and pipe to failAfterError last.
      .pipe(eslint.failAfterError())
  );
});

gulp.task(
  'scripts',
  gulp.series('lint', () => {
    return gulp
      .src('./src/js/*.js') // these are the files gulp will consume
      .pipe(babel()) // transcompile ES6 to ES5
      .pipe(uglify()) // call uglify function on these files
      .pipe(
        rename({
          extname: '.min.js'
        })
      ) // change file extension after uglified
      .pipe(gulp.dest('./build/js')); // send built files to ./build/js/
  })
);

gulp.task('watch', () => {
  // pass in files that need to be uglified
  gulp.watch('src/js/*.js', gulp.series('scripts'));
  gulp.watch('src/sass/**/*.scss', gulp.series('sass'));
});

gulp.task('browser-sync', () => {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });
  // pass in files you want to refresh on
  gulp.watch(['./build/**/*', '*.html']).on('change', browserSync.reload);
});

gulp.task('default', gulp.series('watch'));
//to turn on browser sync as well use:
//gulp.task("default", gulp.parallel("browser-sync", "watch"));
