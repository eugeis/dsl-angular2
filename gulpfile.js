var gulp = require("gulp");
var ts = require("gulp-typescript");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");
var rimraf = require('gulp-rimraf');
var Builder = require('systemjs-builder');
var tsProject = ts.createProject("tsconfig.json");
var sourcemaps = require('gulp-sourcemaps');
var gutil = require('gulp-util');
var html = require("gulp-html-replace");
var concat = require("gulp-concat");

let vendors = [
	{
		path: "node_modules/core-js/client/",
		name: "shim.min.js"
	},
	{
		path: "node_modules/zone.js/dist/",
		name: "zone.min.js"
	},
	{
		path: "node_modules/reflect-metadata/",
		name: "Reflect.js"
	},
	{
		path: "node_modules/systemjs/dist/",
		name: "system.src.js"
	}
];

let css_vendors = [
	{
		path: "node_modules/node_modules/bootstrap/dist/css",
		name: "bootstrap.min.css"
	},
	{
		path: "./",
		name: "style.css"
	}
]

gulp.task("clean:dist", function() {
	return gulp.src('dist', { read: false })
		.pipe(rimraf({ force: true }));
});

gulp.task("clean:karma_html", function() {
	return gulp.src('karma_html', { read: false })
		.pipe(rimraf({ force: true }));
});

gulp.task("clean:app:js", function() {
	return gulp.src('app/**/*.js', { read: false })
		.pipe(rimraf({ force: true }));
});

gulp.task("clean:app:jsmap", function() {
	return gulp.src('app/**/*.js.map', { read: false })
		.pipe(rimraf({ force: true }))
});

gulp.task("clean:templates:index", function() {
	return gulp.src('./index.html', { read: false })
		.pipe(rimraf({ force: true }));
});

gulp.task("clean:templates:main", function() {
	return gulp.src('./app/main.ts', { read: false })
		.pipe(rimraf({ force: true }));
});

gulp.task("clean", ["clean:dist", "clean:karma_html", "clean:app:js", "clean:app:jsmap", "clean:templates:index", "clean:templates:main"], function() {

});

gulp.task("css:style", function() {
	return gulp.src('style.css')
	.pipe(gulp.dest('dist/css'));
});

gulp.task("css:bootstrap", function() {
	return gulp.src('node_modules/bootstrap/dist/@(css|fonts)/*')
	.pipe(gulp.dest('dist/'));
});

gulp.task("css", ["css:style", "css:bootstrap"], function() {
});

/*
 * Development
 */


gulp.task("template:dev:index", function() {
	return gulp.src("./templates/index.html.template")
	.pipe(html({
		bundle: {
			src: './systemjs.config.js',
			tpl: '\t\t<script src="%s"></script>'
		},
		vendors: {
			src: vendors.map(function(d) {
				return d.name
			}),
			tpl: "\t\t<script src='./dist/vendors/%s'></script>"
		}
	}))
	.pipe(rename("index.html"))
	.pipe(gulp.dest('./'))
});

gulp.task("template:dev:main", function() {
	return gulp.src("./templates/main.ts.template")
	.pipe(html({
		prod: ""
	}))
	.pipe(rename("main.ts"))
	.pipe(gulp.dest('./app'));
});

gulp.task("template:dev", ["template:dev:index", "template:dev:main"], function() {

});

gulp.task("vendor:dev", function() {
	return gulp.src(vendors.map(function(d) { return d.path + d.name }))
	.pipe(gulp.dest('./dist/vendors'));
});

gulp.task("config:dev", function() {
	return gulp.src('./systemjs.config.js')
	.pipe(gulp.dest('dist'));
});

gulp.task("compile:dev", ["template:dev"], function() {
	return gulp.src('./app')
	.pipe(sourcemaps.init())
	.pipe(tsProject())
	.js.pipe(sourcemaps.write())
	.pipe(gulp.dest('app'));
});

/*
 * Production
 */

gulp.task("template:prod:index", function() {
	return gulp.src("./templates/index.html.template")
	.pipe(html({
		bundle: {
			src: ["./dist/bundle/bundle.min.js", "./dist/systemjs.config.min.js"],
			tpl: '\t\t<script src="%s"></script>',
		},
		vendors: {
			src: ["./dist/vendors/vendors.min.js"],
			tpl: "\t\t<script src='%s'></script>"
		}
	}))
	.pipe(rename("index.html"))
	.pipe(gulp.dest('./'));
});

gulp.task("template:prod:main", function() {
	return gulp.src("./templates/main.ts.template")
	.pipe(html({
		prod: "import { enableProdMode } from '@angular/core';\nenableProdMode();\n"
	}))
	.pipe(rename("main.ts"))
	.pipe(gulp.dest('./app'));
});

gulp.task("template:prod", ["template:prod:index", "template:prod:main"], function() {

});

gulp.task("vendor:prod", function() {
	return gulp.src(vendors.map(function(d) { return d.path + d.name }))
	.pipe(uglify())
	.pipe(concat('vendors.min.js'))
	.pipe(gulp.dest('./dist/vendors'));
});

gulp.task("config:prod", function() {
	return gulp.src('./systemjs.config.js')
	.pipe(uglify())
	.pipe(rename("systemjs.config.min.js"))
	.pipe(gulp.dest('dist'));
});

gulp.task("compile:prod", ["template:prod"], function() {
	return gulp.src('./app')
	.pipe(sourcemaps.init())
	.pipe(tsProject())
	.js.pipe(sourcemaps.write())
	.pipe(gulp.dest('app'));
});

gulp.task("bundle", ["compile:prod"], function() {
	return new Builder('./', './systemjs.config.js').bundle('app/main.js', 'dist/bundle/bundle.js');
});

gulp.task("minify", ["bundle"], function() {
	return gulp.src('./dist/bundle/bundle.js')
	.pipe(uglify())
	.pipe(rename('bundle.min.js'))
	.pipe(gulp.dest('dist/bundle/'));
});

/*
 * Production and Development Script
 */

gulp.task("prod", ["css", "vendor:prod", "config:prod", "minify"], function() {
});

gulp.task("dev", ["css", "template:dev", "vendor:dev", "config:dev", "compile:dev"], function() {
});

gulp.task("default", function() {
	if (!gutil.env.production) {
		if (gulp.hasTask("dev")) {
			gutil.log("****************************");
			gutil.log("**Building for development**");
			gutil.log("****************************");
			return gulp.start("dev");
		} else {
			throw "No 'dev'-task";
		}
	} else {
		if (gulp.hasTask("prod")) {
			gutil.log("***************************");
			gutil.log("**Building for production**");
			gutil.log("***************************");
			return gulp.start("prod");
		} else {
			throw "No 'prod'-task";
		}
	}
});
