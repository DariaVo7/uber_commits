const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');

gulp.task('server', function() {  /* запуск лайв-сервера */
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch("./*.html").on('change', browserSync.reload);  /* отслеживание изменений в файле index.html в реальном времени */
});

gulp.task('styles', function() { /* преобразование sass кода в css */
    return gulp.src('./sass/**/*.+(scss|sass)')
        .pipe(sass.sync({outputStyle: 'compressed'}).on('error', sass.logError)) /* сжатие файла */
        .pipe(rename({suffix: '.min', prefix: ''})) /* добавление в название файла "min" */
        .pipe(autoprefixer()) /* добавление автопрефиксов */
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('./css')) /* сохранение файла в папку css */
        .pipe(browserSync.stream()); /* показать обновления в браузере */
});

gulp.task('watch', function() {
    gulp.watch('./sass/**/*.+(scss|sass)', gulp.parallel('styles')); /* отслеживание изменений в файлах css и sass */
});

gulp.task('default', gulp.parallel('watch', 'server', 'styles')); /* выполнение всех команд при вызове gulp */