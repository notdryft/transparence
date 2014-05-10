/* global transparence */

'use strict';

transparence.controller('TransparenceController', ['$scope', 'SpreadsheetService', function ($scope, SpreadsheetService) {

  function updateScope(data) {
    $scope.spreadsheet = SpreadsheetService.compute(data);
  }

  SpreadsheetService
    .read('/data/sample.json')
    .then(function (d) {
      updateScope(d.data);
    });
}]);
