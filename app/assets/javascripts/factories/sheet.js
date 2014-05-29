'use strict';

transparence.factory('Sheet', ['Month', 'DaysService', function (Month, DaysService) {

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
        this.months = [];

        var currentMonth = new Date(this.commons.startFrom);
        for (var i = 0; i < simulation.workedDays.length; i++) {
          this.months.push(new Month(sheet, {
            businessDays: DaysService.businessDaysInMonth(currentMonth),
            commons: commons,
            index: i,
            millis: currentMonth.getTime(),
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
