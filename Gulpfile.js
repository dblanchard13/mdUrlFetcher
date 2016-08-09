'use strict';

const gulp = require('gulp');
const sync = require('run-sequence');
const path = require('path');
const nodemon = require('gulp-nodemon');
const todo = require('gulp-todoist');

const paths = {
  app: ['db/**/*.**', 'server/**/*.**', 'config/**/*.**' 'index.js']
};

gulp.task('todo', () => {
  return gulp.src(paths.app)
    .pipe(todo({silent: false, verbose: true}));
});

gulp.task('nodemon', () => {
  nodemon({
    script: 'index.js',
    env: {
      'NODE_ENV': process.env.NODE_ENV || 'development'
    }
  })
  .on('restart');
});

gulp.task('watch', () => {
  gulp.watch(paths.app, ['todo']);  
});

gulp.task('default', (done) => {
  sync('nodemon', 'watch', done)
});
