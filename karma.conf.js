module.exports = function (config) {

  'use strict';

  config.set({

    basePath: '',

    frameworks: ['jasmine'],

    plugins: [
      'karma-jasmine',
      'karma-chrome-launcher',
      'karma-coverage',
      'karma-firefox-launcher',
      'karma-safari-launcher'
    ],

    files: [
      // vendor
      'bower_components/jquery/dist/jquery.min.js',
      'bower_components/bootstrap/dist/js/bootstrap.min.js',
      'bower_components/angular/angular.min.js',
      'bower_components/angular-route/angular-route.min.js',
      'bower_components/d3/d3.min.js',
      // tests dependencies
      'bower_components/angular-mocks/angular-mocks.js',
      // librairies
      'app/assets/javascripts/lib/*.js',
      // application
      'app/assets/javascripts/bootstrap.js',
      'app/assets/javascripts/directives/*.js',
      'app/assets/javascripts/factories/*.js',
      'app/assets/javascripts/services/*.js',
      'app/assets/javascripts/controllers/*.js',
      // fixtures
      'test/unit/fixtures/fixtures.js',
      // tests
      'test/unit/fixtures/*.spec.js',
      'test/unit/factories/*.spec.js',
      'test/unit/services/*.spec.js',
      'test/unit/controllers/*.spec.js'
    ],

    preprocessors: {
      '**/app/assets/**/*.js': 'coverage'
    },

    exclude: [],

    // test results reporter to use
    // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
    reporters: ['progress', 'coverage'],

    coverageReporter: {
      type: 'lcovonly',
      dir: 'coverage'
    },

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
    browsers: ['Chrome', 'Firefox', 'Safari'],

    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000,

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false
  });
};
