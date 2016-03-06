module.exports = function (grunt) {
  'use strict';

  var testFiles = ['tests/**/*.js'],
      srcFiles = ['src/**/*.js'],
      sassFiles = ['src/**/*.scss'],
      buildFiles = 'build/',
      jsFiles = srcFiles.concat(testFiles),
      watchFiles = jsFiles.concat(sassFiles);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Delete all files in the build dir, to ensure clean builds everytime
    clean: {
      build: {
        src: buildFiles
      }
    },
    // Copy index file
    copy: {
      main: {
        src: 'src/index.html',
        dest: 'build/index.html'
      },
      images: {
        expand: true,
        src: 'assets/*.png',
        dest: 'build/'
      },
    },
    // Compile sass to css
    sass: {
      dist: {
        files: {
          'build/style.css': 'src/sass/theme.scss',
        }
      }
    },
    // Lint our test and src files with ESlint
    eslint: {
      target: jsFiles
    },

    // Run the tests through the Mocha framework
    // Convert ES6 to ES5 before hand with Babel
    mochaTest: {
      test: {
        options: {
          require: [
            'babel-core/register'
          ]
        },
        src: testFiles
      }
    },

    // Write node require() code in the browser
    // Convert ES6 to ES5 before hand with Babel
    browserify: {
      dev: {
        options: {
          transform: [
            'babelify',
          ],
          keepAlive: true,
          watch: true,
          browserifyOptions: {
            fast: true,
          },
        },
        files: {
          'build/app.js': srcFiles
        }
      },
      prod: {
        options: {
          transform: [
            'babelify',
          ],
        },
        files: {
          'build/app.js': srcFiles
        }
      }
    },
  });

  // Load plugins
  require('load-grunt-tasks')(grunt);

  grunt.registerTask('default', ['lint', 'build', 'test']);

  grunt.registerTask('build-dev', ['clean', 'copy', 'sass', 'browserify:dev']);
  grunt.registerTask('build-prod', ['clean', 'copy', 'sass', 'browserify:prod']);
  grunt.registerTask('build-watch', 'build-dev');
  grunt.registerTask('build', 'build-dev');

  grunt.registerTask('lint', ['eslint']);
  grunt.registerTask('test', ['eslint', 'mochaTest']);

  grunt.registerTask('prod', ['lint', 'build-prod', 'test']);
};
