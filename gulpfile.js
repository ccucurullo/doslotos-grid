const gulp = require('gulp');
const clean = require('del');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const plumber = require('gulp-plumber');
const autoprefixer = require('gulp-autoprefixer');
const pixrem = require('gulp-pixrem');
const concat = require('gulp-concat');
const cssnano = require('gulp-cssnano');
const runSequence = require('run-sequence');

// ##################################################################
// DEVELOPMENT TASKS
// ##################################################################

gulp.task('clean:dev', () => {
  return clean(['dist/examples/**/*']);
});

gulp.task('browserSync', () => {
  browserSync.init({
    server: 'dist/examples'
  });
});

gulp.task('styles:dev', () => {
  return gulp
    .src('src/scss/doslotos-grid.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(plumber())
    .pipe(autoprefixer({
      browsers: ['last 2 version']
    }))
    .pipe(pixrem())
    .pipe(concat('doslotos-grid.css'))
    .pipe(gulp.dest('dist/examples/styles'))
    .pipe(browserSync.stream());
});

gulp.task('html:dev', () => {
  return gulp
    .src(['examples/**/*.html'])
    .pipe(gulp.dest('dist/examples'))
    .pipe(browserSync.stream());
});

gulp.task('default', () => {
  runSequence('clean:dev', ['styles:dev', 'html:dev'], 'browserSync');
});

gulp.task('watch', ['default'], () => {
  gulp.watch('src/scss/**/*.scss', ['styles:dev']);
  gulp.watch(['examples/**/*.html'], ['html:dev']);
});

// ##################################################################
// BUILD TASKS
// ##################################################################

gulp.task('clean:build', () => {
  return clean(['dist/css/**/*']);
});

gulp.task('styles:build', () => {
  return gulp
    .src('src/scss/doslotos-grid.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(plumber())
    .pipe(autoprefixer({
      browsers: ['last 2 version']
    }))
    .pipe(pixrem())
    .pipe(concat('doslotos-grid.css'))
    .pipe(cssnano())
    .pipe(gulp.dest('dist/css'));
});

gulp.task('build', () => {
	runSequence('clean:build', 'styles:build');
});
