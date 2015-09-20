module.exports = function (grunt) {
  'use strict';

  var testFiles = ['tests/**/*.js'],
      srcFiles = ['src/**/*.js'],
      buildFiles = 'build/',
      jsFiles = srcFiles.concat(testFiles);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Delete all files in the build dir, to ensure clean builds everytime
    clean: {
      build: {
        src: buildFiles
      }
    },

    copy: {
      main: {
        src: 'src/index.html',
        dest: 'build/index.html'
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
            'babel/register'
          ]
        },
        src: testFiles
      }
    },

    // Write node require() code in the browser
    // Convert ES6 to ES5 before hand with Babel
    browserify: {
      options: {
        transform: [
          'reactify',
          'babelify',
        ]
      },
      dev: {
        files: {
          'build/app.js': srcFiles
        }
      },
      prod: {
        files: {
          'build/app.js': srcFiles
        }
      }
    },

    // Uglify support for minifying output coming soon
    // uglify: {
    //   prod: {
    //     files: {
    //       'build/app.js': ['src/input1.js', 'src/input2.js']
    //     }
    //   }
    // },

    watch: {
      js: {
        options: { spawn: false, },
        files: jsFiles,
        tasks: ['default']
      }
    }
  });

  // Load plugins
  require('load-grunt-tasks')(grunt);

  grunt.registerTask('default', ['build', 'test']);

  grunt.registerTask('build-dev', ['clean', 'browserify:dev', 'copy']);
  grunt.registerTask('build-prod', ['clean', 'browserify:prod', 'copy']);
  grunt.registerTask('build', 'build-dev');

  grunt.registerTask('lint', ['eslint']);
  grunt.registerTask('test', ['mochaTest']);

  grunt.registerTask('prod', ['lint', 'build-prod', 'test']);
};
