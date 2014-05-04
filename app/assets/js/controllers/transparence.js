/* global transparence */

'use strict';

transparence.controller('TransparenceController', ['$rootScope', '$scope', 'SpreadsheetService', 'Row', function ($rootScope, $scope, SpreadsheetService, Row) {

  function updateScope(data) {
    var mensualSalary = data.mensualSalary;
    var rate = data.rate;
    var days = data.days;

    $rootScope.mensualSalary = mensualSalary;
    $rootScope.annualSalary = mensualSalary * 12;
    $rootScope.taxFreeRate = rate * 0.9;

    var rows = [];
    for (var i = 0; i < days.length; i++) {
      var day = days[i];

      rows.push(new Row({
        index: i,
        number: i + 1,
        workedDays: day,
        taxFreeRate: (i === 0) ? 0 : $rootScope.taxFreeRate,
        rows: rows
      }));
    }

    $scope.rows = rows;
  }

  var promise = SpreadsheetService.read('../data/sample.json');
  promise.then(updateScope);
}]);
