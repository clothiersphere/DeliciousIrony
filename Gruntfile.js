module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['spec/**/*.js']
      }
    },

    nodemon: {
      dev: {
        options: {
          file: 'index.js',
          env: {
            PORT: '1337'
          }
        },
        script: 'index.js'
      }
    },

    jshint: {
      files: [
        'Gruntfile.js',
        'server/**/*.js',
        'spec/**/*.js',
        './*.js'
      ],
      options: {
        force: 'true',
        jshintrc: '.jshintrc',
        ignores: [
          'client/www/lib/**/*.js',
          'client/hooks/**/*.js',
          'client/www/js/openfb/*.js'
        ]
      }
    },

    watch: {
      scripts: {
        files: [
          'server/**/*.js',
        ]
      }
    },

    shell: {
      prodServer: {
        command: 'git push heroku master'
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodemon');

  grunt.registerTask('server-dev', function () {
    // Running nodejs in a different process and displaying output on the main console
    var nodemon = grunt.util.spawn({
      cmd: 'grunt',
      grunt: true,
      args: 'nodemon'
    });
    nodemon.stdout.pipe(process.stdout);
    nodemon.stderr.pipe(process.stderr);

    grunt.task.run([ 'watch' ]);
  });

  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////

  grunt.registerTask('test', [
    'jshint', 'mochaTest'
  ]);


  grunt.registerTask('upload', function () {
    if (grunt.option('prod')) {
      grunt.task.run([ 'shell' ]);
    } else {
      grunt.task.run([ 'server-dev' ]);
    }
  });

  grunt.registerTask('deploy', [
    'test', 'upload'
  ]);


};
