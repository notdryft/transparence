/* global transparence */

'use strict';

transparence.controller('TransparenceController', ['$scope', 'DaysService', 'SpreadsheetService', function ($scope, DaysService, SpreadsheetService) {

  function updateScope(data) {
    $scope.spreadsheet = SpreadsheetService.compute(data);

    for (var i = 0; i < $scope.spreadsheet.rows.length; i++) {
      var row = $scope.spreadsheet.rows[i];

      row.businessDays = DaysService.businessDaysInMonth(new Date(row.millis));
    }
  }

  SpreadsheetService
    .read('/data/sample.json')
    .then(function (d) {
      updateScope(d.data);
    });
}]);
