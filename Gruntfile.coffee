module.exports = (grunt) ->

  # Project configuration
  grunt.initConfig

    pkg: grunt.file.readJSON('package.json')

    clean:
      after:
        src: 'dist/assets/js/transparence.js'
      all:
        src: 'dist'
      package:
        src: [
          '*.tar.gz'
          'build'
        ]

    jshint:
      all: [
        'karma.conf.js'
        'app/assets/javascripts/**/*.js'
        'test/unit/**/*.js'
      ]
      options:
        jshintrc: true

    concat:
      options:
        process: (src, path) ->
          '// Source: ' + path + '\n' + src.replace(/'use strict';\n/g, '')
      all:
        src: [
          'app/assets/javascripts/lib/*.js'
          'app/assets/javascripts/bootstrap.js'
          'app/assets/javascripts/filters/*.js'
          'app/assets/javascripts/factories/*.js'
          'app/assets/javascripts/directives/*.js'
          'app/assets/javascripts/services/*.js'
          'app/assets/javascripts/controllers/**/*.js'
          'app/assets/javascripts/routes.js'
        ]
        dest: 'dist/assets/javascripts/transparence.js'

    uglify:
      all:
        files:
          'dist/assets/javascripts/transparence.min.js': ['dist/assets/javascripts/transparence.js']

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
        options:
          context:
            version: '<%= pkg.version %>'
        src: 'app/views/index.html'
        dest: 'dist/index.html'

    copy:
      templates:
        files: [
          # html
          {
            expand: true
            cwd: 'app'
            src: 'views/*/**/*.html'
            dest: 'dist/assets'
          }
        ]
      development:
        files: [
          # css
          {
            expand: true
            flatten: true
            cwd: 'bower_components/'
            src: '**/bootstrap.min.css'
            dest: 'dist/vendor/css/'
          }
          # js
          {
            expand: true
            flatten: true
            cwd: 'bower_components/'
            src: [
              '**/*.min.js'
              '!**/sizzle.min.js'
            ]
            dest: 'dist/vendor/javascripts/'
          }
          # map
          {
            expand: true
            flatten: true
            cwd: 'bower_components/'
            src: [
              '**/angular.min.js.map'
              '**/angular-route.min.js.map'
              '**/jquery.min.map'
            ]
            dest: 'dist/vendor/javascripts/'
          }
          # data
          {
            src: 'app/data/sample.json'
            dest: 'dist/data/sample.json'
          }
        ]
      production:
        files: [
          # css
          {
            expand: true
            flatten: true
            cwd: 'bower_components/'
            src: '**/bootstrap.min.css'
            dest: 'dist/vendor/css/'
          }
          # js
          {
            expand: true
            flatten: true
            cwd: 'bower_components/'
            src: [
              '**/*.min.js'
              '!**/sizzle.min.js'
            ]
            dest: 'dist/vendor/javascripts/'
          }
          # data
          {
            src: 'app/data/sample.json'
            dest: 'dist/data/sample.json'
          }
        ]

    karma:
      unit:
        options:
          autoWatch: false
          singleRun: true
          configFile: 'karma.conf.js'

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

  grunt.loadNpmTasks('grunt-env')
  grunt.loadNpmTasks('grunt-contrib-clean')
  grunt.loadNpmTasks('grunt-contrib-jshint')
  grunt.loadNpmTasks('grunt-contrib-concat')
  grunt.loadNpmTasks('grunt-contrib-uglify')
  grunt.loadNpmTasks('grunt-contrib-less')
  grunt.loadNpmTasks('grunt-preprocess')
  grunt.loadNpmTasks('grunt-contrib-copy')
  grunt.loadNpmTasks('grunt-karma')
  grunt.loadNpmTasks('grunt-shell')
  grunt.loadNpmTasks('grunt-contrib-connect')

  # Development tasks

  grunt.registerTask('compile', [
    'clean:all'
    'clean:package'
    'jshint'
    'concat'
    'less:development'
    'preprocess:index'
    'copy:templates'
    'copy:development'
  ])
  grunt.registerTask('test', ['compile', 'karma:unit'])

  # Production tasks

  grunt.registerTask('prepare', [
    'clean:all'
    'clean:package'
    'jshint'
    'concat'
    'uglify'
    'less:production'
    'preprocess:index'
    'copy:templates'
    'copy:production'
    'clean:after'
  ])
  grunt.registerTask('confirm', ['prepare', 'karma:unit'])
  grunt.registerTask('package', ['confirm', 'shell:package'])

  # Default task

  grunt.registerTask('default', ['compile'])

  return
