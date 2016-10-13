const gulp        = require('gulp');
const browserSync = require('browser-sync').create();
const sass        = require('gulp-sass');
const plumber     = require('gulp-plumber');
const prefixer    = require('gulp-autoprefixer');
const rigger      = require('gulp-rigger');
const uglify      = require('gulp-uglify');
const watch       = require('gulp-watch');
const cleancss    = require('gulp-clean-css');
const rename      = require('gulp-rename');
const rimraf      = require('rimraf');
const importcss   = require('gulp-import-css');
const babel       = require('gulp-babel');
const path        = require('path');

/* Define custom error handler in order to prevent watcher from crashing */
const plumberOptions = {
    errorHandler: function(err) {
        console.log(err);
        this.emit('end');
    }
}

/* Serve dest directory with browsersync */
gulp.task('serve', ['sass', 'css.vendor', 'html', 'js', 'js.vendor', 'fonts', 'images'], () => {
    browserSync.init({
        server: {
            baseDir: './dest'
        }
    });
});

gulp.task('sass', () => {
    return gulp.src('src/css/*.scss')
        .pipe(plumber(plumberOptions))
        .pipe(sass())
        .pipe(prefixer({
            browsers: [
                'IE 8', 'IE 9', 'last 10 version', '> 5%', 'iOS 7'],
            cascade:  false
        }))
        .pipe(importcss())
        .pipe(gulp.dest('dest/css'))
        .pipe(cleancss())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dest/css'))
        .pipe(plumber.stop())
        .pipe(browserSync.stream());
});

gulp.task('css.vendor', () => {
    return gulp.src('src/css/vendor/*.scss')
        .pipe(plumber(plumberOptions))
        .pipe(sass())
        .pipe(importcss())
        .pipe(cleancss())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dest/css'))
        .pipe(plumber.stop())
        .pipe(browserSync.stream());
});

gulp.task('html', () => {
    return gulp.src('src/html/*.html')
        .pipe(plumber(plumberOptions))
        .pipe(rigger())
        .pipe(plumber.stop())
        .pipe(gulp.dest('dest'))
});

gulp.task('js', () => {
    return gulp.src('src/js/*.js')
        .pipe(plumber(plumberOptions))
        .pipe(rigger())
        .pipe(babel({presets: ['es2015']}))
        .pipe(gulp.dest('dest/js'))
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(plumber.stop())
        .pipe(gulp.dest('dest/js'))
});

gulp.task('js.vendor', () => {
    return gulp.src('src/js/vendor/**/*.js')
        .pipe(plumber(plumberOptions))
        .pipe(rigger())
        .pipe(gulp.dest('dest/js/vendor'))
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(plumber.stop())
        .pipe(gulp.dest('dest/js/vendor'))
});

gulp.task('fonts', () => {
    return gulp.src('src/fonts/*.*')
        .pipe(gulp.dest('dest/fonts'))
});

gulp.task('images', () => {
    gulp.src('src/images/**/*.*')
        .pipe(plumber(plumberOptions))
        .pipe(plumber.stop())
        .pipe(gulp.dest('dest/images'))
});

/* Delete dest folder */
gulp.task('clean', (cb) => {
    rimraf('./dest', cb);
});

/* Init watcher */
gulp.task('watch', () => {
    watch('src/css/vendor/*.scss',  () => {gulp.start('css.vendor');})
    watch('src/css/**/*.scss',      () => {gulp.start('sass');});
    watch('src/html/**/*.html',     () => {gulp.start('html-watch');});
    watch('src/js/**/*.js',         () => {gulp.start('js-watch');});
    watch('src/fonts/**/*',         () => {gulp.start('fonts-watch');});
    watch('src/images/**/*',        () => {gulp.start('images-watch');});
});

/* Watch tasks */
function watchHandler(cb) {browserSync.reload(); cb();}

gulp.task('html-watch',   ['html'],            watchHandler);
gulp.task('js-watch',     ['js', 'js.vendor'], watchHandler);
gulp.task('fonts-watch',  ['fonts'],           watchHandler);
gulp.task('images-watch', ['images'],          watchHandler);

/* Default */
gulp.task('default',        ['watch', 'serve']);