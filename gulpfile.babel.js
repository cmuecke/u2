import gulp from 'gulp';
import gls from 'gulp-live-server';
import postcss from 'gulp-postcss';
import sass from 'gulp-sass';
import gutil from 'gulp-util';
import rename from 'gulp-rename';
import del from 'del';
import runSequence from 'run-sequence';

// POST CSS
import autoprefixer from 'autoprefixer-core';
import mqpacker from 'css-mqpacker';
import cssnano from 'cssnano';

const server = gls.new('index.js');

gulp.task('styles', () =>
    gulp.src('theme/src/styles/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(
            postcss([
                autoprefixer(),
                mqpacker(),
                cssnano()
            ])
        )
        .on('error', (error) => gutil.log(gutil.colors.red(error.message)))
        .pipe(rename('main.css'))
        .pipe(gulp.dest('theme/dist/styles'))
        .pipe(server.notify.apply(server))
);

gulp.task('clean', cb =>
    del('theme/dist', {dot: true}, cb)
);

gulp.task('server', () => {
    server.start();

    gulp.watch(['theme/**/*.hbs'], (file) => server.notify.apply(server, [file]));
    gulp.watch(['mock-data/**/*.*'], () => server.start.bind(server));
    gulp.watch('theme/src/**/*.scss', ['styles']);
});

gulp.task('default', ['clean'], cb => runSequence('server', 'styles', cb));
