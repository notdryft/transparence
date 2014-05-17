/* global angular, transparence */

'use strict';

transparence.factory('Sheet', ['Month', function (Month) {

  return function (spreadsheet) {

    var sheet = {
      months: [],
      spreadsheet: spreadsheet
    };

    function _mean(index, ideal) {
      if (index === 0) {
        return 0;
      }

      var start = index - 6;
      start = (start < 0) ? 0 : start;

      var sum = 0;
      var availableMonths = sheet.months.slice(start, index);
      for (var i = 0; i < availableMonths.length; i++) {
        var availableMonth =
          ideal ? availableMonths[i][ideal] : availableMonths[i];

        sum += availableMonth.delta();
      }

      return sum / availableMonths.length;
    }

    var parent = {

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
        return _mean(index);
      }
    };

    parent.ideal = {

      mean: function (index) {
        return _mean(index, 'ideal');
      }
    };

    return angular.extend(sheet, parent);
  };
}]);
