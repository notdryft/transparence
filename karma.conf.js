module.exports = function (config) {

  'use strict';

  config.set({

    basePath: '',

    frameworks: ['jasmine'],

    plugins: [
      'karma-jasmine',
      'karma-chrome-launcher'
    ],

    files: [
      // vendor
      'bower_components/jquery/dist/jquery.min.js',
      'bower_components/bootstrap/dist/js/bootstrap.min.js',
      'bower_components/angular/angular.min.js',
      'bower_components/d3/d3.min.js',
      // tests dependencies
      'bower_components/angular-mocks/angular-mocks.js',
      // librairies
      'app/assets/js/lib/*.js',
      // application
      'app/assets/js/bootstrap.js',
      'app/assets/js/directives/*.js',
      'app/assets/js/factories/*.js',
      'app/assets/js/services/*.js',
      'app/assets/js/controllers/*.js',
      // fixtures
      'test/unit/fixtures/fixtures.js',
      // tests
      'test/unit/services/*.spec.js'
    ],

    exclude: [],

    // test results reporter to use
    // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
    reporters: ['progress'],

    // web server port
    port: 9876,

    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    autoWatch: true,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['Chrome'],

    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000,

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false
  });
};
