var gulp = require('gulp');
var clear = require('del');
var path = require('path');
var less = require('gulp-less');
var open = require('gulp-open');
var watch = require('gulp-watch');
var connect = require('gulp-connect');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var notify = require('gulp-notify');
var annotate = require('gulp-ng-annotate')
var minifycss = require('gulp-minify-css');
var sourcemaps = require('gulp-sourcemaps');
var parallelize = require("concurrent-transform");
var livereload = require('gulp-livereload');
var cleanCSS = require('gulp-clean-css');
var minify = require('gulp-minify');

var font = [
  "bower_components/font-awesome/fonts/**"
]

// App Files
var appScripts = [
    'app/app.module.js',
    'app/app.constants.js',
    'app/app.config.js',
    'app/app.routes.js',
    'app/app.run.js',
    'app/**/**.js',
    'app/**/**/**.js',
];

var appStyles = [
    'app/**.less',
    'app/**/*.less',
    'app/**/**/*.less'
];

var appViews = [
    'app/**/**.html'
];

var api = [
    'app/**/**.json',
    'app/**/**/**.json'
];


var appImages = [
    'app/images/**'
];

var appTemplates = [
    'app/**/**/**.html'
];

var BaseVendors = 'bower_components/';
// Vendor Files
var vendorScripts = [
    BaseVendors + 'jquery/dist/jquery.min.js',
    BaseVendors + 'lodash/lodash.min.js',
    BaseVendors + 'angular/angular.min.js',
    BaseVendors + 'angular-sanitize/angular-sanitize.min.js',
    BaseVendors + 'angular-ui-router/release/angular-ui-router.min.js',
    BaseVendors + 'bootstrap/dist/js/bootstrap.min.js',
    BaseVendors + 'angular-toastr/dist/angular-toastr.min.js',
    BaseVendors + 'angular-animate/angular-animate.min.js',
    BaseVendors + 'angular-bootstrap/ui-bootstrap-tpls.min.js',
    BaseVendors + 'moment/min/moment.min.js'
];
var vendorStyles = [
    BaseVendors + 'bootstrap/dist/css/bootstrap.min.css',
    BaseVendors + 'font-awesome/css/font-awesome.min.css',
    BaseVendors + 'angular-toastr/dist/angular-toastr.min.css'
];


// Start the server
gulp.task('server', ['default'], function() {
    connect.server({
        root: "www",
        port: 2000,
        host: '127.0.0.1',
        livereload: true
    });
});

gulp.task('scripts', function() {
    gulp.src(appScripts)
        .pipe(sourcemaps.init())
        .pipe(concat('app.min.js'))
        .pipe(minify({
            ext: {
                min: '.js'
            },
            ignoreFiles: ['.combo.js', '-min.js']
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('www/'))
        .pipe(livereload());
});
// Styles
gulp.task('styles', function() {
    gulp.src('app/app.less')
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }))
        .pipe(concat('app.min.css'))
        .pipe(cleanCSS({
            compatibility: 'ie8'
        }))
        .pipe(gulp.dest('www/'))
        .pipe(livereload());
});

// Images
gulp.task('images', function() {
    gulp.src(appImages)
        .pipe(gulp.dest('www/assets/images/'))
});
gulp.task('font', function() {
    gulp.src(font)
        .pipe(gulp.dest('www/fonts'))
});

// Vendor
gulp.task('vendors', function() {
    gulp.src(vendorScripts)
        .pipe(sourcemaps.init())
        .pipe(concat('vendor.min.js'))
        .pipe(minify({
            ext: {
                min: '.js'
            },
            ignoreFiles: ['.combo.js', '-min.js']
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('www/'))
    gulp.src(vendorStyles)
        .pipe(concat('vendor.min.css'))
        .pipe(cleanCSS({
            compatibility: 'ie8'
        }))
        .pipe(gulp.dest('www/'))
});

// Views
gulp.task('views', function() {
    gulp.src(['index.html'])
    // gulp.src(['index.html'])
        .pipe(gulp.dest('www/'));
    gulp.src(appViews)
        .pipe(gulp.dest('www/app'))
        .pipe(livereload());
});

// Templates
gulp.task('templates', function() {
    gulp.src(appTemplates)
        .pipe(gulp.dest('www/app/'))
        .pipe(livereload());
});


// Default task
gulp.task('default', function() {
    gulp.start('scripts', 'vendors', 'views', 'styles', 'images', 'templates','font','watch');
});


// Watch
gulp.task('watch', ['server'], function() {

    // Watch app style and JS files
    gulp.watch(appScripts, ['scripts']);
    gulp.watch(appStyles, ['styles']);
    gulp.watch(appTemplates, ['templates']);

    // Watch HTML files
    gulp.watch(['index.html', 'assets/views/**/*.html'], ['views']);

    // Watch any files in www/, reload on change
    watch("www/**").pipe(connect.reload());

});
