/* global transparence */

'use strict';

transparence.controller('TransparenceController', ['$scope', 'DaysService', 'SpreadsheetService', function ($scope, DaysService, SpreadsheetService) {

  function updateScope(data) {
    var spreadsheet = SpreadsheetService.compute(data.commons);

    var sheet = spreadsheet.createSheet(0);
    sheet.update(data.simulations[0]);
    for (var i = 0; i < sheet.monthCount(); i++) {
      var month = sheet.monthAt(i);

      month.businessDays = DaysService.businessDaysInMonth(new Date(month.millis));
    }

    $scope.spreadsheet = spreadsheet;
  }

  SpreadsheetService
    .read('data/sample.json')
    .then(function (d) {
      updateScope(d.data);
    });
}]);
