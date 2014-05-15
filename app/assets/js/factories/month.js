/* global angular, transparence */

'use strict';

transparence.factory('Month', function () {

  return function (month) {

    return angular.extend(month, {

      sales: function () {
        return month.taxFreeRate * month.workedDays;
      },

      delta: function () {
        return this.sales() * 0.6 - 1.58 * this.spreadsheet.salary.mensual;
      },

      mean: function () {
        return this.sheet.mean(this.index);
      },

      bonus: function () {
        return Math.max(0, this.mean()) / 1.58;
      }
    });
  };
});
