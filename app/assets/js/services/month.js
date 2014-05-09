/* global transparence */

'use strict';

transparence.service('MonthService', function () {

  var me = this;

  function _copyDate(date, dayInMonth) {
    return new Date(date.getFullYear(), date.getMonth(), dayInMonth);
  }

  me.daysInMonth = function (date) {
    var copy = _copyDate(date, 32);

    return 32 - copy.getDate();
  };

  me.isWeekDay = function (date, dayInMonth) {
    var copy = _copyDate(date, dayInMonth);
    var day = copy.getDay();

    return day !== 0 && day !== 6;
  };

  me.businessDaysInMonth = function (date) {
    var businessDays = 0;
    var days = me.daysInMonth(date);
    for (var day = 1; day <= days; day++) {
      if (me.isWeekDay(date, day)) {
        businessDays++;
      }
    }

    return businessDays;
  };
});
