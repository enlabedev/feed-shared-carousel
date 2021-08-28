const vars = require('./variables');

const gulp = require('gulp');
const pug = require('gulp-pug');
const plumber = require('gulp-plumber');
const dotenv = require('dotenv');
dotenv.config();

module.exports = () => {
	return gulp
		.src(vars.resources.pug.source)
		.pipe(plumber())
		.pipe(
			pug({
				pretty: process.env.prod?false:true,
				data: {
					firebasePath: process.env.prod?vars.resources.prod.firebase:vars.resources.dev.firebase,
					domainPath: process.env.prod?vars.resources.prod.domain:vars.resources.dev.domain
				},
			})
		)
		.pipe(gulp.dest(vars.path.public));
};