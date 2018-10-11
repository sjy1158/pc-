var gulp = require('gulp');

// css压缩
var minifycss = require('gulp-minify-css');
var rename = require('gulp-rename');
var notify = require('gulp-notify');
var del = require('del');
//js压缩
var minifyjs = require('gulp-uglify');
var concat = require('gulp-concat');
// 建立任务
gulp.task('styles',function () {
    return gulp.src('css/*css')
        .pipe(rename({
            suffix:'.min'
        }))
        .pipe(minifycss())
        .pipe(gulp.dest('dist/stylus'))
        .pipe(notify({
            message: 'Styles task complete'
        }))
});

// js压缩
gulp.task('scripts',function () {
    return gulp.src('js/*js')
        .pipe(rename({
            suffix:'.min'
        }))
        .pipe(minifyjs())
        .pipe(gulp.dest('dist/scripts'))
        .pipe(notify({
              message: 'Scripts task complete'
        }));
});
// 设置默认任务
gulp.task('default',function () {
    gulp.start('styles');
});