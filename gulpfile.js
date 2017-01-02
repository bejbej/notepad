/// <binding BeforeBuild='vet, optimize' />
var config = config = require('./gulp.config');
var $ = require('gulp-load-plugins')({ lazy: true, pattern: '*' });
var gulp = require('gulp');

gulp.task('default', ['build']);

gulp.task('build', ['link']);

gulp.task('clean', function(done) {
    $.del(config.dist.root, done);
});

gulp.task('link', ['index', 'fonts', 'css', 'lib', 'config', 'app'], function() {
    return gulp
        .src(config.dist.indexFile)
        .pipe($.inject(gulp.src(config.dist.cssFiles), {relative: true, removeTags: true}))
        .pipe($.inject(gulp.src(config.dist.jsFiles), {relative: true, removeTags: true}))
        .pipe($.minifyHtml({ empty: true }))
        .pipe(gulp.dest(config.dist.root));
});

gulp.task('index', function() {
    return gulp.src(config.src.index)
        .pipe(gulp.dest(config.dist.root));
});

gulp.task('fonts', function() {
    return gulp.src(config.src.fonts)
        .pipe(gulp.dest(config.dist.fonts));
});

gulp.task('css', function() {
    return gulp
        .src(config.src.sass)
        .pipe($.plumber())
        .pipe($.sass({includePaths: config.src.sassLib}))
        .pipe($.csso())
        .pipe($.concat("app.css"))
        .pipe(gulp.dest(config.dist.styles));
});

gulp.task('lib', function() {
    return gulp.src($.wiredep(config.wiredepOptions).js)
        .pipe($.concat('lib.js'))
        .pipe($.uglify())
        .pipe(gulp.dest(config.dist.scripts));
});

gulp.task('config', function() {
    return gulp.src(config.src.config)
        .pipe(gulp.dest(config.dist.scripts));
});

gulp.task('app', function() {
    var tsProject = $.typescript.createProject('tsconfig.json');

    var options = {
        standalone: true,
        transformUrl: function(url) {
            return url.match(/[^\\]+\\[^\\.]+.html/)[0];
        }
    };

    var app = gulp.src(config.src.typescript)
                .pipe($.plumber())
                .pipe($.typescript(tsProject))
                .pipe($.ngAnnotate({ add: true }));

    var templates = gulp.src(config.src.templates)
                .pipe($.minifyHtml({ empty: true }))
                .pipe($.angularTemplatecache(options));

    return $.eventStream.merge(app, templates)
            .pipe($.concat('app.js'))
            .pipe($.uglify())
            .pipe(gulp.dest(config.dist.scripts));
});
