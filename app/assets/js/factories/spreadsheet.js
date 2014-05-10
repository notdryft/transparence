/* global angular, transparence */

'use strict';

transparence.factory('Spreadsheet', ['Row', function (Row) {

  return function (data) {
    var salary = data.salary;
    var spreadsheet = {
      rows: [],
      salary: {
        mensual: salary.mensual,
        annual: salary.mensual * 12,
        rate: salary.rate,
        taxFreeRate: salary.rate * 0.9
      },
      startFrom: data.startFrom
    };

    var currentMonth = new Date(spreadsheet.startFrom);
    for (var i = 0; i < data.workedDays.length; i++) {
      spreadsheet.rows.push(new Row({
        index: i,
        millis: currentMonth.getTime(),
        spreadsheet: spreadsheet,
        taxFreeRate: i && spreadsheet.salary.taxFreeRate,
        workedDays: data.workedDays[i]
      }));

      currentMonth.setMonth(currentMonth.getMonth() + 1);
    }

    return angular.extend(spreadsheet, {

      mean: function (index) {
        if (index === 0) {
          return 0;
        }

        var start = index - 6;
        start = (start < 0) ? 0 : start;

        var sum = 0;
        var availableRows = this.rows.slice(start, index);
        for (var i = 0; i < availableRows.length; i++) {
          sum += availableRows[i].delta();
        }

        return sum / availableRows.length;
      }
    });
  };
}]);
