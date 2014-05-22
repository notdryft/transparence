/* global angular, transparence */

'use strict';

transparence.factory('Month', function () {

  return function (month) {

    function _delta(sales) {
      return sales * 0.6 - 1.58 * month.spreadsheet.salary.mensual;
    }

    function _bonus(mean) {
      return Math.max(0, mean) / 1.58;
    }

    var parent = {

      sales: function () {
        return month.taxFreeRate() * month.workedDays;
      },

      delta: function () {
        return _delta(this.sales());
      },

      mean: function () {
        return month.sheet.mean(month.index);
      },

      bonus: function () {
        return _bonus(this.mean());
      }
    };

    parent.ideal = {

      sales: function () {
        return month.taxFreeRate() * month.businessDays;
      },

      delta: function () {
        return _delta(this.sales());
      },

      mean: function () {
        return month.sheet.ideal.mean(month.index);
      },

      bonus: function () {
        return _bonus(this.mean());
      }
    };

    return angular.extend(month, parent);
  };
});
