const vars = require('./variables');

const gulp = require('gulp');
const gulpif = require('gulp-if');
const concat = require('gulp-concat');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const plumber = require('gulp-plumber');
const dotenv = require('dotenv');
dotenv.config();

module.exports = () => {
	return gulp
		.src(vars.resources.sass.source)
		.pipe(plumber())
    .pipe(gulpif(process.env.prod == undefined, sourcemaps.init()))
		.pipe(
			sass({
				outputStyle: process.env.prod?'compressed':'expanded',
			})
		)
		.pipe(autoprefixer('last 2 versions'))
		.pipe(concat(vars.resources.sass.main))
    .pipe(gulpif(process.env.prod == undefined, sourcemaps.write()))
		.pipe(gulp.dest(vars.resources.sass.public))
};