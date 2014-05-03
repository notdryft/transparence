module.exports = (grunt) ->

  # Project configuration
  grunt.initConfig

    pkg: grunt.file.readJSON('package.json')

    clean:
      all:
        src: [
          'dist/index.html'
          'dist/assets/css'
          'dist/assets/js'
          'dist/vendor'
        ]
      package:
        src: [
          '*.tar.gz'
          'build'
        ]

    jshint:
      all: [
        'Gruntfile.js'
        'app/assets/js/**/*.js'
        'test/**/*.js'
      ]
      options:
        globalstrict: true

    concat:
      options:
        process: (src, path) ->
          '// Source: ' + path + '\n' + src.replace(/\/\* .* \*\/\n*'use strict';\n/g, '')
      all:
        src: [
          'app/assets/js/lib/*.js'
          'app/assets/js/bootstrap.js'
          'app/assets/js/filters/*.js'
          'app/assets/js/factories/*.js'
          'app/assets/js/directives/*.js'
          'app/assets/js/controllers/*.js'
        ]
        dest: 'dist/assets/js/transparence.js'

    uglify:
      all:
        files:
          'dist/assets/js/transparence.min.js': ['dist/assets/js/transparence.js']

    less:
      development:
        options:
          paths: ['app/assets/less']
        files:
          'dist/assets/css/transparence.css': 'app/assets/less/**/*.less'
      production:
        options:
          paths: ['app/assets/less']
          cleancss: true
        files:
          'dist/assets/css/transparence.min.css': 'app/assets/less/**/*.less'

    preprocess:
      index:
        src: 'app/views/index.html'
        dest: 'dist/index.html'

    copy:
      css:
        expand: true
        flatten: true
        src: 'bower_components/**/*.min.css'
        dest: 'dist/vendor/css/'
      js:
        expand: true
        flatten: true
        src: ['bower_components/**/*.min.js', '!**/sizzle.min.js']
        dest: 'dist/vendor/js/'
      map:
        cwd: 'bower_components/'
        expand: true
        flatten: true
        src: ['**/angular.min.js.map', '**/jquery.min.map']
        dest: 'dist/vendor/js/'

    shell:
      package:
        command: 'tar cvzf <%= pkg.name %>-<%= pkg.version %>.tar.gz dist && mkdir build && mv *.tar.gz build'
        options:
          stdout: true

    connect:
      server:
        options:
          base: 'dist'
          port: 3000
          keepalive: true

  # Tasks

  grunt.loadNpmTasks('grunt-contrib-clean')
  grunt.loadNpmTasks('grunt-contrib-jshint')
  grunt.loadNpmTasks('grunt-contrib-concat')
  grunt.loadNpmTasks('grunt-contrib-uglify')
  grunt.loadNpmTasks('grunt-contrib-less')
  grunt.loadNpmTasks('grunt-preprocess')
  grunt.loadNpmTasks('grunt-contrib-copy')
  grunt.loadNpmTasks('grunt-shell')
  grunt.loadNpmTasks('grunt-contrib-connect')

  # Default task

  grunt.registerTask('default', ['clean', 'jshint', 'concat', 'uglify', 'less', 'preprocess:index', 'copy'])
  grunt.registerTask('package', ['clean:package', 'shell:package'])

  return
