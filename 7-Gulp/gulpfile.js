let gulp = require("gulp");
let ts = require("gulp-typescript");

let tsProject = ts.createProject("tsconfig.json");

gulp.task("typescript", () =>
  tsProject
    .src()
    .pipe(tsProject())
    .pipe(gulp.dest("./js"))
);

gulp.task("watch", () => {
  gulp.watch("*.ts", gulp.series("typescript"));
});

gulp.task("default", gulp.series("watch"));
