const gulp = require("gulp");
const browserSync = require("browser-sync").create();
const sass = require("gulp-sass");
let ts = require("gulp-typescript");
const sourcemaps = require("gulp-sourcemaps");
let tsProject = ts.createProject("tsconfig.json");

/**
 * -- TOP LEVEL FUNCTIONS --
 *   gulp.task  - Define task
 *   gulp.src   - Point to files to use
 *   gulp.dest  - Points to folder to output
 *   gulp.watch - Watch files and folders for change
 */

gulp.task("js", () => {
  let reporter = ts.reporter.fullReporter();
  let tsResult = tsProject
    .src()
    .pipe(sourcemaps.init())
    .pipe(tsProject(reporter));

  return tsResult.js.pipe(sourcemaps.write()).pipe(gulp.dest("dist/js"));
});

gulp.task("copyHtml", done => {
  gulp.src("src/*.html").pipe(gulp.dest("dist"));
  done();
});

gulp.task("sass", () => {
  return gulp
    .src("src/scss/*.scss")
    .pipe(sass())
    .pipe(gulp.dest("dist/css"))
    .pipe(browserSync.stream());
});

// Watch & Serve
gulp.task("serve", gulp.series("sass"), done => {
  browserSync.init({
    server: "./dist"
  });

  gulp.watch("src/scss/*.scss", ["sass"]);
  gulp.watch("src/*.html", ["copyHtml"]);
  gulp.watch("src/js/*.ts", ["js"]);
  gulp.watch("src/*.html").on("change", browserSync.reload);
  gulp.watch("src/js/*.ts").on("change", browserSync.reload);
  done();
});

gulp.task("default", gulp.series("js", "copyHtml", "serve"));
