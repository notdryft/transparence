'use strict';

transparence.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

  function templateFor(type, action) {
    return ['assets', 'views', type , action].join('/') + '.html';
  }

  $routeProvider
    .when('/', {
      templateUrl: templateFor('spreadsheets', 'index'),
      controller: 'SpreadsheetController'
    })
    .when('/new', {
      templateUrl: templateFor('spreadsheets', 'new'),
      controller: 'SpreadsheetController'
    })
    .when('/:id', {
      templateUrl: templateFor('spreadsheets', 'show'),
      controller: 'SpreadsheetController'
    })
    .otherwise({redirectTo: '/'});

  $locationProvider.html5Mode(true);
}]);
