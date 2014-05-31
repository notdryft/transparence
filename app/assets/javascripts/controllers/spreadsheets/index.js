'use strict';

transparence.controller('SpreadsheetIndexController', ['$location', '$scope',
  function ($location, $scope) {

    $scope.newSpreadsheet = function () {
      $location.path('/spreadsheets/new');
    };
  }]);
