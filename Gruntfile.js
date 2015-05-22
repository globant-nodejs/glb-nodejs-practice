module.exports = function(grunt) {

  grunt.initConfig({
    env: {
      dev: {
        NODE_ENV:'development'
      },
      prod:{
        NODE_ENV:'production'
      }
    },
    nodemon: {
        dev:{
          script: './app.js'
        },
        env: {
          PORT: '3000'
        }
    },
    mochaTest: {
      test: {
        src: ['./tests/tests.js']
      }
    }
  });

  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-env');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.registerTask('development', ['env:dev','nodemon']);
  grunt.registerTask('production', ['env:prod','nodemon']);
  grunt.registerTask('tests', 'mochaTest');
  

};


  