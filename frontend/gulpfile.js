//Text Variables
var strt = '>---Starting ',
	end = ' Task---<';

//Dependencies Needed
var gulp = require('gulp');
var rename = require('gulp-rename');// not sure I need this
var concat = require('gulp-concat');
var srcMaps = require('gulp-sourcemaps');
var del = require('del');
var zip = require('gulp-zip');

//HTML Dependencies
var htmlMinify = require('gulp-html-minifier');
var plumber = require('gulp-plumber'); //Only good with HTML & CSS files

//Scripts Dependencies
var eslint = require('gulp-eslint');
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');

//Styles Dependencies
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var sass = require('gulp-sass');

//Image Dependencies
var imgS = require('gulp-image');

//Servers Dependencies
var browserSync = require('browser-sync').create();

/*============
= File Paths =
=============*/


//Source
var SCRIPTS_PATH = 'src/js/{libs,**}/*.js',
	HTML_PATH = 'src/{*.html,**/*.html}',
	IMG_PATH = 'src/**/images/*.{png,jpeg,jpg,gif,svg}',
	SCSS_PATH = 'src/styles/{reset,**}/*.scss',
	AUD_PATH = 'src/audio/*.mp3';
//	CSS_PATH = 'src/css/**/*.css', /*No Longer needed as styles are created in SASS*/ */


//Distribution
var DIST_DIR = 'dist',
	DIST_CSS = 'dist/styles',
	DIST_JS = 'dist/js',
	DIST_IMG = 'dist/images',
	DIST_AUD = 'dist/audio';

//Testing
var TEST_DIR = 'test',
	TEST_CSS = 'test/styles',
	TEST_JS = 'test/js',
	TEST_IMG = 'test/images/*.{png,jpeg,jpg,gif,svg}',
	TEST_AUD = 'dist/audio';

/*==========
=     JSON          =
=    for Test       =
==========*/
gulp.task('json-test', function () {
		console.log(strt + 'JSON for TEST' + end);

		return gulp.src('src/database/*.json')
		.pipe(gulp.dest(TEST_DIR + '/database'));
});

/*==========
=     JSON          =
=    for DIST       =
==========*/
gulp.task('json-dist', function () {
		console.log(strt + 'JSON for DIST' + end);

		return gulp.src('src/database/*.json')
		.pipe(gulp.dest(DIST_DIR + '/database'));
});

/*============
=   Styles   =
=  for Dist  =
=============*/
gulp.task('sass-dist', function () {
	console.log(strt + 'SASS Styles for DIST' + end);

	return gulp.src(SCSS_PATH)
	.pipe(sass({
		outputStyle: 'compressed'
		}).on('error', sass.logError))
	.pipe(autoprefixer())
	.pipe(gulp.dest(DIST_CSS));
});


/*============
=   Styles   =
=  for Dev   =
=============*/
gulp.task('sass-dev', function () {
	console.log(strt + 'SASS Styles for DEV' + end);

	return gulp.src(SCSS_PATH)
	.pipe(srcMaps.init())
	.pipe(sass().on('error', sass.logError))
	.pipe(autoprefixer())
	.pipe(srcMaps.write())
	.pipe(gulp.dest(TEST_CSS));
});

/*============
=   Scripts  =
=  for Dist  =
=============*/
gulp.task('scripts-dist', ['lint'], function () {
	console.log(strt + 'SCRIPTS for DIST' + end);

	return gulp.src(SCRIPTS_PATH)
	.pipe(concat('all.js'))
	.pipe(uglify())
	.pipe(gulp.dest(DIST_JS));
});

/*============
=   Scripts  =
=   for Dev  =
=============*/
gulp.task('scripts-dev', ['lint'], function () {
	console.log(strt + 'SCRIPTS DEV' + end);

	return gulp.src(SCRIPTS_PATH)
	.pipe(srcMaps.init())
	.pipe(babel())
	.pipe(concat('all.js'))
	.pipe(srcMaps.write())
	.pipe(gulp.dest(TEST_JS));
});

/*============
=    Lint    =
=============*/
gulp.task('lint', function () {
	console.log(strt + 'Linting' + end);
	return gulp.src(SCRIPTS_PATH)
	.pipe(eslint())
	.pipe(eslint.format())
	.pipe(eslint.failOnError());
})

/*============
=    HTML    =
=  for Dist   =
=============*/

gulp.task('html-dist', function () {
	console.log(strt + 'HTML for DIST' + end);

	return gulp.src(HTML_PATH)
	.pipe(plumber(function (err) {
		console.log('---HTML Task Error');
		console.log(err);
		console.log('----Error End');
		this.emit('end');
		}))
	.pipe(htmlMinify({
		collapseWhitespace: true,
		minifyCSS: true,
		minifyJS: true,
		removeComments: true
		}))
	.pipe(gulp.dest(DIST_DIR));
});

/*============
=    HTML    =
=  for Dev   =
=============*/

gulp.task('html-dev', function () {
	console.log(strt + 'HTML for DEV' + end);

	return gulp.src(HTML_PATH)
	.pipe(plumber(function (err) {
		console.log('---HTML Task Error');
		console.log(err);
		console.log('----Error End');
		this.emit('end');
		}))
	.pipe(htmlMinify({
		collapseWhitespace: true,
		minifyCSS: false,
		minifyJS: false,
		removeComments: true
		}))
	.pipe(gulp.dest(TEST_DIR));
});

/*============
=   IMAGES   =
=  for Dist  =
=============*/

gulp.task('images-dist', function () {
	console.log(strt + 'Images for DIST' + end);

	return gulp.src(IMG_PATH)
	.pipe(imgS())
	.pipe(gulp.dest(DIST_DIR));
});

/*============
=   IMAGES   =
=  for Dev   =
=============*/
gulp.task('images-dev', function () {
	console.log(strt + 'Images for DEV' + end);

	return gulp.src(IMG_PATH)
	.pipe(gulp.dest(TEST_DIR));
});

/*============
=   Server   =
=  for Dist  =
=============*/
gulp.task('serve:dist', function() {

	gulp.watch(SCRIPTS_PATH, ['scripts-dist']);
	gulp.watch(HTML_PATH, ['html-dist']);
	gulp.watch(SCSS_PATH, ['sass-dist']);
	gulp.watch(IMG_PATH, ['images-dist']);
	gulp.watch('src/database/*.json', ['json-dist']);

	browserSync.init({
	server: {
		baseDir: './dist/',
		domain: 'local.dev'
	}
	});

	gulp.watch(['dist/{*.html,**/*.html}', 'dist/**/*.css', 'dist/**/*.js', 'dist/**/*.{png,jpeg,jpg,gif,svg}','dist/database/*.json']).on('change', browserSync.reload);
});

/*============
=   Server   =
=  for Dev   =
=============*/
gulp.task('serve:dev', function() {

	gulp.watch(SCRIPTS_PATH, ['scripts-dev']);
	gulp.watch(HTML_PATH, ['html-dev']);
	gulp.watch(SCSS_PATH, ['sass-dev']);
	gulp.watch(IMG_PATH, ['images-dev']);
	gulp.watch('src/database/*.json', ['json-dist']);

	browserSync.init({
	server: {
		baseDir: './test/',
		domain: 'local.dev'
	}
	});

	gulp.watch(['test/{*.html,**/*.html}', 'test/**/*.css', 'test/**/*.js', 'test/**/*.{png,jpeg,jpg,gif,svg}','dist/database/*.json]).on('change', browserSync.reload);
});

/*============
=   Delete   =
=    Task    =
=============*/
gulp.task('clean', function () {
	return del.sync([
	DIST_DIR,
	TEST_DIR
	]);
});

/*=====================
=   Create Production =
=      Ready Site     =
=         Task        =
=====================*/
gulp.task('dist', ['html-dist', 'sass-dist', 'scripts-dist', 'images-dist'], function () {
	console.log('>---- Distribution  folder Created ----<');
});

/*=====================
=   Export Production =
=      Ready Site     =
=         Task        =
=====================*/
gulp.task('export', ['html-dist', 'sass-dist', 'scripts-dist', 'images-dist'], function () {
	return gulp.src('{dist,src}/**')
	.pipe(zip('website.zip'))
	.pipe(gulp.dest('./'));
});

/*============
=  Default   =
=  Function  =
=============*/
//This function will clean out your distribution folder, and then update it with all the recent changes. After running this, it's best to run 'gulp serve' to get your live preview playing.
gulp.task('default', [
	'clean',
	'html-dev',
	'sass-dev',
	'scripts-dev',
	'images-dev',
	'serve:dev'
]);
