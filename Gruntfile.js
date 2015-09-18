module.exports = function (grunt) {
  'use strict';

  var testFiles = ['tests/**/*.js'],
      srcFiles = ['src/**/*.js'],
      jsFiles = srcFiles.concat(testFiles);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    eslint: {
      target: jsFiles
    },

    mochaTest: {
      test: {
        src: testFiles
      }
    },

    browserify: {
      dist: {
        files: {
          'build/app.js': ['src/**/*.js']
        }
      }
    }
  });

  // Load plugins
  require('load-grunt-tasks')(grunt);

  grunt.registerTask('default', ['build', 'test']);

  grunt.registerTask('build', ['eslint', 'browserify']);
  grunt.registerTask('test', ['mochaTest']);
};

