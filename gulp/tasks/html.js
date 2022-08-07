import fileInclude from "gulp-file-include";

export const html = () => {
    return global.app.gulp.src(global.app.path.src.html)
        .pipe(fileInclude())
        .pipe(global.app.plugins.replace(/img\//g,'../src/img/'))
        .pipe(global.app.gulp.dest(global.app.path.build.html));
};