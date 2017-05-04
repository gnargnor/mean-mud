module.exports = function(grunt){
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      build: {
        src: ['client/scripts/*.js',
              'client/scripts/**/*.js',
              'client/scripts/**/**/*.js',
              'client/scripts/**/**/**/*.js'],
        dest: 'server/public/scripts/client.min.js'
      }
    },
    copy: {
      // scripts: {
      //   expand: true,
      //   cwd: 'client/scripts/',
      //   src: ['*.js', '**/*.js'],
      //   dest: 'server/public/scripts/'
      // },
      html: {
        expand: true,
        cwd: 'client/views',
        src: ['index.html',
              '**/*.html',
              '**/**/*.html',
              '**/**/**/*.html'],
        dest: 'server/public/views/'
      },
      css: {
        expand: true,
        cwd: 'client/styles',
        src: ['style.css'],
        dest: 'server/public/styles/'
      },
      bootstrap: {
        expand: true,
        cwd: 'node_modules/bootstrap/dist/',
        src: ['css/bootstrap.css',
              'fonts/*.*'],
        dest: 'server/public/vendors/bootstrap/'
      },
      angular: {
        expand: true,
        cwd: 'node_modules/angular/',
        src: ['angular.js',
              'angular.min.js',
              'angular.min.js.map'],
        dest: 'server/public/vendors/angular/'
      },
      angularRoute: {
        expand: true,
        cwd: 'node_modules/angular-route/',
        src: ['angular-route.js',
              'angular-route.min.js',
              'angular-route.min.js.map'],
        dest: 'server/public/vendors/angular-route/'
      },
      angularbootstrap: {
        expand: true,
        cwd: 'node_modules/angular-ui-bootstrap/dist',
        src: 'ui-bootstrap.js',
        dest: 'server/public/vendors/angular-ui-bootstrap/'
      },
    },
    watch: {
      options: {
        livereload: true
      },
      files: [
        'client/**/*.*',
        'client/**/**/*.*',
        'client/**/**/**/*.*'
      ],
      //'uglify',
      tasks: ['uglify', 'copy']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');

  //'uglify',
  grunt.registerTask('default', ['uglify', 'copy', 'watch']);
};
