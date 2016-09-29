var gulp = require("gulp");
var ts = require("gulp-typescript");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");
var Builder = require('systemjs-builder');
var rimraf = require('rimraf');
var tsProject = ts.createProject("tsconfig.json");

gulp.task("clean", function() {
	rimraf('./dist', function() {});
	rimraf('./karma_html/coverage', function() {});
	rimraf('./karma_html/summary', function() {});
})

gulp.task("compile", function () {
	gulp.src('./systemjs.config.js')
	.pipe(gulp.dest('dist'));

	return tsProject.src("./app")
		.pipe(tsProject())
		.js.pipe(gulp.dest("dist"));
});

gulp.task("bundle", ["compile"], function() {
	var builder = new Builder('./', './systemjs.config.js');

	builder
	.bundle('dist/main.js', 'dist/bundle/bundle.js')
	.then(function() {
		console.log('Bundle complete');
	})
	.catch(function(err) {
		console.log('Bundle error');
		console.log(err);
	});
})

gulp.task("minify", ["bundle"], function() {
	gulp.src('dist/systemjs.config.js')
	.pipe(uglify())
	.pipe(rename("systemjs.config.min.js"))
	.pipe(gulp.dest('dist'));

	gulp.src('dist/bundle/bundle.js')
	.pipe(uglify({
		//preserveComments: "license"
	}))
	.pipe(rename('bundle.min.js'))
	.pipe(gulp.dest('dist/bundle/'));
})

gulp.task("default", ["bundle"], function() {});
