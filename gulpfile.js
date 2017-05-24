var gulp = require('gulp');
var bump = require('gulp-bump');


var updateVersion = function(type){
  gulp.src('./package.json')
    .pipe(bump({type: type}))
    .pipe(gulp.dest('./'));

  gulp.src('./src/manifest.json')
    .pipe(bump({type: type}))
    .pipe(gulp.dest('./src'));
};



gulp.task('default', function() {
  // ...
  if(gulp.env.build){
    // update version --build major|minor|patch
    updateVersion(gulp.env.build);
}else{
    updateVersion('patch');
}



});
