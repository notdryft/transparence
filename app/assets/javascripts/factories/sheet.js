/* global angular, transparence */
/* jshint loopfunc: true */

'use strict';

transparence.factory('Sheet', ['Month', function (Month) {

  return function (commons) {

    var sheet = {
      commons: commons,
      months: []
    };

    function _meanHelper(index, ideal) {
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
        var me = this;

        me.months = [];

        var currentMonth = new Date(me.commons.startFrom);
        for (var i = 0; i < simulation.workedDays.length; i++) {
          me.months.push(new Month(sheet, {
            index: i,
            commons: commons,
            millis: currentMonth.getTime(),
            taxFreeRate: function () {
              return this.index && this.commons.salary.taxFreeRate();
            },
            workedDays: simulation.workedDays[i]
          }));

          currentMonth.setMonth(currentMonth.getMonth() + 1);
        }
      },

      mean: function (index) {
        return _meanHelper(index);
      }
    };

    parent.ideal = {

      mean: function (index) {
        return _meanHelper(index, 'ideal');
      }
    };

    return angular.extend(sheet, parent);
  };
}]);
