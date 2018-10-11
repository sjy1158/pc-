var gulp = require('gulp');

// css压缩
var minifycss = require('gulp-minify-css');
var rename = require('gulp-rename');
var notify = require('gulp-notify');
var del = require('del');
//js压缩
var minifyjs = require('gulp-uglify');
var concat = require('gulp-concat');
// 图片压缩
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');

// var gulpbabel = require('gulp-babel');
// html压缩
var htmlmin = require('gulp-htmlmin');

gulp.task('htmlmin',function () {
    return gulp.src('home.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('dist'))
        .pipe(notify({
            message: ' task complete'
        }))
});
gulp.task('htmlmini',function () {
    return gulp.src('html/**/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('dist/html'))
        .pipe(notify({
            message: ' html complete'
        }))
})
// 建立任务
gulp.task('styles',function () {
    return gulp.src('css/*.css')
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
// gulp.task('scripts',function () {
//     return gulp.src('js/*.js')
//         .pipe(rename({
//             suffix:'.min'
//         }))
//         .pipe(minifyjs())
//         .pipe(gulp.dest('dist/scripts'))
//         .pipe(notify({
//             message: 'scripts task complete'
//         }))
// });

gulp.task('images',function () {
    return gulp.src('img/**/*')
        .pipe(cache(imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest('dist/images'))
        .pipe(notify({
            message: 'Images task complete'
        }))
});
gulp.task('clean', function(cb) {
    del(['dist/stylus', 'dist/*.html', 'dist/images','dist/html/','dist/scripts'], cb)
});
// 设置默认任务
gulp.task('default',function () {
    gulp.start('styles','htmlmin','htmlmini','images');
});


gulp.task('watch', function() {
           // Watch .scss files
            gulp.watch('css/**/*.css', ['styles']);
            gulp.watch('home.html',['htmlmin']);
            gulp.watch('html/**/*.html',['htmlmini']);
            // gulp.watch('js/**/*.js',['scripts']);
         // Watch .js files
            gulp.watch('img/**/*',['images']);

});