/* global transparence */

'use strict';

transparence.controller('TransparenceController', ['$rootScope', '$scope', 'SpreadsheetService', 'Row', function ($rootScope, $scope, SpreadsheetService, Row) {

  function updateScope(data) {
    $rootScope.mensualSalary = data.mensualSalary;
    $rootScope.annualSalary = data.mensualSalary * 12;
    $rootScope.taxFreeRate = data.rate * 0.9;

    var rows = [];
    var currentMonth = new Date(data.startFrom);
    for (var i = 0; i < data.days.length; i++) {
      var day = data.days[i];

      rows.push(new Row({
        index: i,
        millis: currentMonth.getTime(),
        number: i + 1,
        rows: rows,
        taxFreeRate: i && $rootScope.taxFreeRate,
        workedDays: day
      }));

      currentMonth.setMonth(currentMonth.getMonth() + 1);
    }

    $scope.rows = rows;
  }

  SpreadsheetService
    .read('/data/sample.json')
    .then(function (d) {
      updateScope(d.data);
    });
}]);
