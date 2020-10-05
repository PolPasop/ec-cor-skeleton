const gulp = require('gulp');
const sass = require('gulp-sass');
const sassGlob = require('gulp-sass-glob');
const del = require("del");
const taskArguments = require('./task-arguments')

sass.compiler = require('node-sass');


function css() {
  console.log("css done");
  return gulp.src('src/styles.scss')
    .pipe(sassGlob())
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
}

function deleteOldMainStyles() {
  return del("./css/style.css")
}

exports.styles = function () {
  console.log("default");
  gulp.watch('components/**/*.scss', css);
};