/* global transparence */

'use strict';

transparence.controller('TransparenceController', ['$scope', 'SpreadsheetService', function ($scope, SpreadsheetService) {

  function updateScope(data) {
    var spreadsheet = SpreadsheetService.compute(data.commons);

    var sheet = spreadsheet.createSheet(0);
    sheet.update(data.simulations[0]);

    $scope.spreadsheet = spreadsheet;
  }

  SpreadsheetService
    .read('data/sample.json')
    .then(function (d) {
      updateScope(d.data);
    });
}]);
