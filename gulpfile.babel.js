import gulp from 'gulp';
import server from 'gulp-express';
import postcss from 'gulp-postcss';

// POST CSS
import nested from 'postcss-nested';
import autoprefixer from 'autoprefixer-core';
import mqpacker from 'css-mqpacker';
import cssnano from 'cssnano';
import simplevars from 'postcss-simple-vars';

gulp.task('css', () =>
    gulp.src('theme/src/**/*.css')
        .pipe(
            postcss([
                nested(),
                simplevars({silent: true}),
                autoprefixer(),
                mqpacker(),
                cssnano()
            ])
        )
        .pipe(gulp.dest('theme/dist'))
        .pipe(server.notify())
);

gulp.task('server', () => {
    server.run(['index.js']);
    gulp.watch(['theme/**/*.hbs', 'mock-data/**/*'], server.notify);
    gulp.watch('theme/src/**/*.css', ['css']);
});

gulp.task('default', ['server', 'css']);
