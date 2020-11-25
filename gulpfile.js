const { src, dest, parallel, watch } = require('gulp');
const gulpSass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const cleanCss = require('gulp-clean-css');

function sass() {
    return src('./sass/import.scss')
    .pipe(gulpSass())
    //.pipe(cleanCss()) //TODO penser à enlever ce commentaire avant le rendu
    .pipe(dest('./css/'))
    .pipe(browserSync.stream());
}

function watcher(done) {
    watch('./sass/**/*.scss', sass);
    browserSync.reload();
    done();
}

function browser() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    watch('*.html').on('change', browserSync.reload);
}

module.exports = {
    sass,
    browser: parallel(browser, watcher)
}