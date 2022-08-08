import dartSass from "sass";
import gulpSass from "gulp-sass";
import rename from "gulp-rename";
const sass = gulpSass(dartSass);


export const scss = () => {
    return global.app.gulp.src(global.app.path.src.scss, { sourcemaps: true })
        .pipe(global.app.plugins.plumber(
        global.app.plugins.notify.onError({
            title: "SCSS",
            message: "Error: <%= error.message %>"
        }))
        )
        .pipe(global.app.plugins.replace(/img\//g,'../src/img/'))
        .pipe(sass({
            outputStyle: "expanded"
        }))
        .pipe(rename({
            extname: ".min.css"
        }))
        .pipe(global.app.gulp.dest(global.app.path.build.css))
        .pipe(global.app.plugins.browserSync.stream());
};