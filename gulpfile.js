var gulp  = require('gulp'),
    gutil = require('gulp-util'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify');


var codeMirrorBuildConfig = require('./js/code_mirror_build_config.js');

gulp.task('clean', function () {
    return del('static/build/pms/**/*.*');
});


gulp.task('codemirror-build', [], function () {

    for(var key in codeMirrorBuildConfig){
        if (codeMirrorBuildConfig.hasOwnProperty(key)) {
            var current = codeMirrorBuildConfig[key];

            gulp.src(current.src, {base: 'node_modules'})
                .pipe(concat(current.dest))
                .pipe(uglify({
                    compress: {
                        drop_console: true
                    }
                }))
                .pipe(gulp.dest("build/js/codemirror"));

        }
    }


});