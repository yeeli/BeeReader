const gulp = require('gulp')
const webpack = require('webpack')
const webpackStream = require('webpack-stream')
const webpackConfig = require('./webpack/production.js')

gulp.task('default', () => {
  return gulp.src('./src')
    .pipe(webpackStream(webpackConfig), webpack)
    .pipe(gulp.dest("./build"))
})
