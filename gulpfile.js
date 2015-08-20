var path = require('path');
var gulp = require('gulp');
var gutil = require('gulp-util');
var duration = require('gulp-duration');
var source = require('vinyl-source-stream');
var gulp = require('gulp');
var gulpif = require('gulp-if');
var zip = require('gulp-zip');
var prefix = require('gulp-autoprefixer');
var browserify = require('browserify');
var watchify = require('watchify');
var less = require('gulp-less');
var notifier = require('node-notifier');
var sourcemaps = require('gulp-sourcemaps');
var streamify = require('gulp-streamify');
var uglify = require('gulp-uglify');
var babelify = require('babelify');
var stringify = require('stringify');
var watch = require('gulp-watch');

var production = process.env.NODE_ENV === 'production';
var optimize = production;
var version = require('./manifest.json').version;

var paths = {
  scripts: {
    source: './panel/app.js',
    destination: './panel/',
    filename: 'bundle.js'
  },
  styles: {
    source: 'panel/app.less',
    watch: 'panel/**/*.less',
    destination: 'panel/'
  }
};

function handleError(err) {
  gutil.log(err);
  gutil.beep();
  notifier.notify({
    title: 'Compile Error',
    message: err.message
  });
  return this.emit('end');
}

var browserifyConfig = {
  entries: [paths.scripts.source],
  debug: !production,
  cache: {},
  packageCache: {}
};

var browserifyAppBundle = function () {
  return browserify(browserifyConfig)
    .transform(stringify(['.html', '.svg', '.vue', '.template', '.tmpl']))
    .transform(babelify.configure({stage: 1, optional: ['runtime']}));
};

gulp.task('scripts', function() {
  var pipeline = browserifyAppBundle()
    .bundle()
    .on('error', handleError)
    .pipe(source(paths.scripts.filename));

  if(production) {
    pipeline = pipeline.pipe(streamify(uglify()));
  }

  return pipeline.pipe(gulp.dest(paths.scripts.destination));
});

gulp.task('styles', function () {
  return gulp
    .src(paths.styles.source)
    .pipe(sourcemaps.init())
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .on('error', handleError)
    .pipe(prefix('last 2 versions'))
    .pipe(gulpif(!optimize, sourcemaps.write('.')))
    .pipe(gulp.dest(paths.styles.destination));
    // .pipe(gulpif(!optimize, browserSync.stream({match: '**/*.css'})));
});

gulp.task('watch', function() {
  gulp.watch(paths.styles.watch, ['styles']);

  var bundle = watchify(browserifyAppBundle());

  bundle.on('update', function() {
    var build = bundle.bundle()
      .on('error', handleError)
      .pipe(source(paths.scripts.filename))
      .pipe(gulp.dest(paths.scripts.destination))
      .pipe(duration('Rebundling browserify bundle'));
  }).emit('update');
});

/*
 * I use this to make a zip for the chrome store
 */
gulp.task('package', ['build'], function () {
  return gulp.src([
      // './dist/**',
      // './images/**',
      './panel/**',
      'background.js',
      'devtoolsBackground.*',
      // 'inject.js',
      'manifest.json'
    ], {base: '.'})
    .pipe(gulp.dest('./package'));
});

gulp.task('zip', ['package'], function () {
  return gulp.src('package/**')
      .pipe(zip('batarang-' + version + '.zip'))
      .pipe(gulp.dest('.'));
});

var buildTasks = ['styles'];

gulp.task('build', function() {
  return gulp.start(buildTasks.concat(['scripts']));
});

gulp.task('default', buildTasks.concat(['watch']));