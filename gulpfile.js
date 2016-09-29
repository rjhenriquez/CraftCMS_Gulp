var _          = require('lodash');
var gulp       = require('gulp');
var jshint     = require('gulp-jshint');
var sass       = require('gulp-sass');
var uglify     = require('gulp-uglify');
var concat     = require('gulp-concat');
var htmlmin    = require('gulp-htmlmin');
var prefix     = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var minify     = require('gulp-minify-css');
var imagemin   = require('gulp-imagemin');

// Lint Task
gulp.task('lint', function() {
    return gulp.src('src/js/custom.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Minimize HTML
gulp.task('html', function() {
    return gulp.src('src/templates/**/*.html')
    // .pipe(htmlmin({
    //     collapseWhitespace: true,
    //     removeComments: true
    // }))
    .pipe(gulp.dest('craft/templates'))
});

gulp.task('images', function () {
    return gulp.src('src/img/**/*')
        .pipe(imagemin({
            progressive: true,
        }))
        .pipe(gulp.dest('public/img'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
  return gulp.src([
    'src/js/main.js'
    ])
    .pipe(concat({ path: 'all.js', stat: { mode: 0666 }}))
    .pipe(gulp.dest('public/js'));
});

// Compile SASS Task
gulp.task('sass', function () {
    gulp.src('src/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({errLogToConsole: true}))
    .pipe(minify())
    .pipe(prefix({browsers: ['last 10 version', 'iOS 6'], cascade: false}))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('public/css'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('src/scss/**/*.scss', ['sass']);
    gulp.watch('src/templates/**/*.html', ['html']);
});

// Default Task
gulp.task('default', ['lint', 'images', 'scripts', 'html', 'sass', 'watch']);