/* global angular, transparence */

'use strict';

transparence.controller('TransparenceController', ['$rootScope', '$scope', 'Row', function ($rootScope, $scope, Row) {

  var rate = 750;
  var mensualSalary = 2917;

  $rootScope.mensualSalary = mensualSalary;
  $rootScope.annualSalary = mensualSalary * 12;
  $rootScope.taxFreeRate = rate * 0.9;

  var days = [
    0, //    Month 1
    10, //   Month 2
    13, //   Month 3
    15, //   Month 4
    19.5, // Month 5
    21, //   Month 6

    13, //   Month 7
    19, //   Month 8
    20, //   Month 9
    22, //   Month 10
    20, //   Month 11
    22  //   Month 12
  ];

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
}]);
