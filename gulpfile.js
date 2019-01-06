const { series, gulp,src, dest } = require('gulp');
const minify = require('gulp-minify');



function defaultTask(cb) {
  src(['src/sr-analytics.js'])
  .pipe(minify())
  .pipe(dest('dist'))
  // place code for your default task here
  cb();
}

exports.default = defaultTask