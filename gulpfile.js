const gulp = require("gulp");
const sass = require("gulp-sass");
const sassGlob = require("gulp-sass-glob");
const del = require("del");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const uglify = require("gulp-uglify");
const postcssCustomProperties = require("postcss-custom-properties");
const cssvariables = require("postcss-css-variables");
const purgecss = require("@fullhuman/postcss-purgecss");
const path = require("path");
const { rollup } = require("rollup");
const { babel } = require("@rollup/plugin-babel");
const imagemin = require("gulp-imagemin");
const imageminWebp = require("imagemin-webp");
const pipeline = require("readable-stream").pipeline;

sass.compiler = require('node-sass');

const paths = {
  styles: {
    src: "./assets/scss/*.scss",
    dest: "./public/css/styles.css",
  },
  scripts: {
    src: ["./js/*.js", "./js/libs/*.js", "!./js/min/*.js"],
    dest: "./js/min",
  },
  svg: {
    src: "./icons/*.svg",
  },
  images: {
    src: "public/images/speakers/*.{jpg,png}",
    dest: "public/images/speakers/webp",
  },
};

async function bundle() {
  const bundle = await rollup({
    input: "assets/app.js",
    plugins: [babel({ babelHelpers: "bundled" })],
  });

  return bundle.write({
    file: "public/js/bundle.js",
    format: "iife",
  });
}

async function bundleEuropcom() {
  const bundle = await rollup({
    input: "assets/europcom.js",
    plugins: [babel({ babelHelpers: "bundled" }), uglify()],
  });

  return bundle.write({
    file: "public/js/europcom.js",
    format: "iife",
  });
}

function deleteOldBundle() {
  return del("public/js");
}

function compress() {
  return pipeline(
    gulp.src("public/js/bundle.js"),
    uglify(),
    gulp.dest("public/js")
  );
}

function css() {
  return gulp
    .src("assets/styles.scss")
    .pipe(sassGlob())
    .pipe(sass())
    .on("error", sass.logError)
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(gulp.dest("public/css"));
}

function cssPlenary() {
  return gulp
    .src("assets/plenary.scss")
    .pipe(sassGlob())
    .pipe(sass())
    .on("error", sass.logError)
    .pipe(postcss([autoprefixer(), postcssCustomProperties()]))
    .pipe(gulp.dest("public/css"));
}

function cssEuropcom() {
  return gulp
    .src("assets/europcom2020.scss")
    .pipe(sassGlob())
    .pipe(sass())
    .on("error", sass.logError)
    .pipe(
      postcss([
        purgecss({
          content: ["./**/*.html"],
        }),
        autoprefixer(),
        postcssCustomProperties(),
      ])
    )
    .pipe(gulp.dest("public/css"));
}

function deleteOldMainStyles() {
  return del("public/css");
}

/**
 * Images
 */
async function convertImagesToWebp() {
  gulp
    .src(paths.images.src)
    .pipe(imagemin([imageminWebp({ quality: 50 })]))
    .pipe(gulp.dest(paths.images.dest));

  console.log("Images optimized");
}

/*
 * Configure a Fractal instance.
 */

const fractal = require("./fractal.config.js");
const { image } = require("faker");

const logger = fractal.cli.console; // keep a reference to the fractal CLI console utility

/*
 * Start the Fractal server
 *
 * In this example we are passing the option 'sync: true' which means that it will
 * use BrowserSync to watch for changes to the filesystem and refresh the browser automatically.
 * Obviously this is completely optional!
 *
 * This task will also log any errors to the console.
 */
function fractalStart() {
  const server = fractal.web.server({
    sync: true,
  });
  server.on("error", (err) => logger.error(err.message));
  return server.start().then(() => {
    logger.success(`Fractal server is now running at ${server.url}`);
  });
}

/*
 * Run a static export of the project web UI.
 *
 * This task will report on progress using the 'progress' event emitted by the
 * builder instance, and log any errors to the terminal.
 *
 * The build destination will be the directory specified in the 'builder.dest'
 * configuration option set above.
 */

gulp.task("fractalBuild", function () {
  const builder = fractal.web.builder();
  builder.on("progress", (completed, total) =>
    logger.update(`Exported ${completed} of ${total} items`, "info")
  );
  builder.on("error", (err) => logger.error(err.message));
  return builder.build().then(() => {
    logger.success("Fractal build completed!");
  });
});

function watch() {
  gulp.watch(
    ["components/**/*.scss", "assets/*.scss"],
    gulp.series(deleteOldMainStyles, css, cssPlenary)
  );
  gulp.watch(
    ["components/**/*.js", "assets/*.js"],
    gulp.series(deleteOldBundle, bundle, compress)
  );
}

exports.images = convertImagesToWebp;
exports.buildCssPlenary = cssPlenary;
// exports.default = gulp.series(fractalStart, css, watch);
exports.default = gulp.series(fractalStart, css, watch);
