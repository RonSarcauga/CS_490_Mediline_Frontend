/// <binding BeforeBuild='compileSass' />
import gulp from 'gulp';
import gulpSass from 'gulp-sass';
import * as sass from 'sass';
import autoprefixer from 'gulp-autoprefixer';
import cleanCSS from 'gulp-clean-css';
import sourcemaps from 'gulp-sourcemaps';
import plumber from 'gulp-plumber';
import { deleteAsync } from 'del';

const sassCompiler = gulpSass(sass);

const paths = {
    scss: './src/assets/scss/**/*.scss',
    css: './src/assets/css/'
};

// Clean CSS directory
export function cleanCSSDir(done) {
    deleteAsync([paths.css]).then(() => {
        console.log('CSS directory cleaned');
        done();
    });
}

// Compile Sass
export function compileSass(done) {
    gulp.src(paths.scss)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sassCompiler({
            includePaths: [
                './node_modules/bootstrap/scss'
            ]
        }).on('error', sassCompiler.logError))
        .pipe(autoprefixer({
            overrideBrowserslist: ['> 1%', 'last 2 versions', 'not dead'],
            cascade: false
        }))
        .pipe(cleanCSS())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.css))
        .on('end', () => {
            console.log('Sass compiled');
            done();
        });
}

// Watch for changes
export function watchFiles() {
    gulp.watch(paths.scss, gulp.series(cleanCSSDir, compileSass));
}

export default gulp.series(
    gulp.parallel(cleanCSSDir),
    gulp.parallel(
        compileSass
    ),
    watchFiles
);