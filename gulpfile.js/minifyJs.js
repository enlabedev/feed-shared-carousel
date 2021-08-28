const vars = require('./variables');

const gulp = require('gulp');
const concat = require('gulp-concat');
const gulpif = require('gulp-if');
const uglify = require('gulp-uglify');
const plumber = require('gulp-plumber');

module.exports = () => {
	return gulp
		.src(vars.resources.js.source)
		.pipe(plumber())
		.pipe(concat(vars.resources.js.main))
    .pipe(gulpif(process.env.prod, uglify()))
		.pipe(gulp.dest(vars.resources.js.public))
};