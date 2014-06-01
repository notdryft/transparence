'use strict';

transparence.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

  function templateFor(controller, action) {
    return ['assets', 'views', controller , action].join('/') + '.html';
  }

  $routeProvider
    .when('/spreadsheets', {
      templateUrl: templateFor('spreadsheets', 'index'),
      controller: 'SpreadsheetIndexController'
    })
    .when('/spreadsheets/new', {
      templateUrl: templateFor('spreadsheets', 'new'),
      controller: 'SpreadsheetNewController'
    })
    .when('/spreadsheets/:id', {
      templateUrl: templateFor('spreadsheets', 'show'),
      controller: 'SpreadsheetShowController'
    })
    .otherwise({redirectTo: '/spreadsheets'});

  $locationProvider.html5Mode(true).hashPrefix('!');
}]);
