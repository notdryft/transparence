/* global angular, transparence */

'use strict';

transparence.factory('Sheet', ['Month', function (Month) {

  return function (spreadsheet) {

    var sheet = {
      months: [],
      spreadsheet: spreadsheet
    };

    return angular.extend(sheet, {

      monthCount: function () {
        return this.months.length;
      },

      monthAt: function (index) {
        return this.months[index];
      },

      update: function (simulation) {
        this.months = [];

        var currentMonth = new Date(this.spreadsheet.startFrom);
        for (var i = 0; i < simulation.workedDays.length; i++) {
          this.months.push(new Month({
            index: i,
            millis: currentMonth.getTime(),
            sheet: this,
            spreadsheet: this.spreadsheet,
            taxFreeRate: i && this.spreadsheet.salary.taxFreeRate,
            workedDays: simulation.workedDays[i]
          }));

          currentMonth.setMonth(currentMonth.getMonth() + 1);
        }
      },

      mean: function (index) {
        if (index === 0) {
          return 0;
        }

        var start = index - 6;
        start = (start < 0) ? 0 : start;

        var sum = 0;
        var availableMonths = this.months.slice(start, index);
        for (var i = 0; i < availableMonths.length; i++) {
          sum += availableMonths[i].delta();
        }

        return sum / availableMonths.length;
      }
    });
  };
}]);
