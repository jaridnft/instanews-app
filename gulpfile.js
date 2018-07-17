var gulp = require('gulp');

gulp.task('default', defaultTask); //default = the word gulp in cli

function defaultTask(done) {
  // place code for your default task here
  console.log("hello world");
  done();
}
