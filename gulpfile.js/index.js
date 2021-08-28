const vars = require('./variables');

// Importing main tasks
const compilePug = async () => { return require('./compilePug')() };
const compileScss = async () => { return require('./compileScss')() };
const minifyJs = async () => { return require('./minifyJs')() };
const minifyPics = async () => { return require('./minifyPics')() };

// Watchers, initialization and custom tasks, and live-reload server
const gulp = require('gulp');
const { doesNotMatch } = require('assert/strict');
const browserSync = require('browser-sync').create();

const setEnv = (done) => {
  process.env.prod = true;
  done();
}



const generateDist = gulp.parallel(
	compilePug,
  compileScss,
  minifyJs,
  minifyPics
);

const deployment = gulp.series(setEnv, compilePug, compileScss, minifyJs, minifyPics)

const watcher = async () => {
	browserSync.init({ server: { baseDir: vars.path.public } });
	gulp.watch(vars.resources.pug.source, compilePug);
  gulp.watch(vars.resources.sass.source, compileScss);
  gulp.watch(vars.resources.js.source, minifyJs);
  gulp.watch(vars.resources.images.source, minifyPics);
	gulp.watch(vars.resources.all).on('change', browserSync.reload);
};

// Export all tasks
module.exports = {
	compilePug,
  generateDist,
  compileScss,
  minifyJs,
  minifyPics,
  deployment,
	default: watcher
};