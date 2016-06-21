
'use strict';

const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const rename = require("gulp-rename");
const sass = require('gulp-ruby-sass');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');

module.exports = () => {
    return sass('src/styles/main.scss', {sourcemap: true})
        .on('error', sass.logError)
        .pipe(sourcemaps.write())
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(rename('ReactContexify.css'))
        .pipe(gulp.dest('dist'))
        .pipe(cssnano())
        .pipe(rename('ReactContexify.min.css'))
        .pipe(gulp.dest('dist'));
};
