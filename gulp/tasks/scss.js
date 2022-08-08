import dartSass from "sass";
import gulpSass from "gulp-sass";
import rename from "gulp-rename";

import cleanCss from "gulp-clean-css";
import webpcss from "gulp-webpcss";
import autoprefixer from "gulp-autoprefixer";
import groupCssMediaQueries from "gulp-group-css-media-queries";




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
        .pipe(groupCssMediaQueries())
        .pipe(webpcss(
            {
                webpClass: ".webp",
                noWebpClass: ".no-webp"
            }
        ))
        .pipe(autoprefixer(
            {
                grid: true,
                overrideBrowserslist: ["last 3 versions"],
                cascade: true,
            }
        ))
        .pipe(global.app.gulp.dest(global.app.path.build.css))
        .pipe(cleanCss())
        .pipe(rename({
            extname: ".min.css"
        }))
        .pipe(global.app.gulp.dest(global.app.path.build.css))
        .pipe(global.app.plugins.browserSync.stream());
};