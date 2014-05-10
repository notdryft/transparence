/* global angular, transparence */

'use strict';

transparence.factory('Row', function () {

  return function (row) {

    return angular.extend(row, {

      sales: function () {
        return row.taxFreeRate * row.workedDays;
      },

      delta: function () {
        return this.sales() * 0.6 - 1.58 * this.spreadsheet.salary.mensual;
      },

      mean: function () {
        return this.spreadsheet.mean(this.index);
      },

      bonus: function () {
        return Math.max(0, this.mean()) / 1.58;
      }
    });
  };
});
