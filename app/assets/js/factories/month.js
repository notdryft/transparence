/* global console, angular, transparence */

'use strict';

transparence.factory('Month', function () {

  return function (sheet, month) {

    function _deltaHelper(sales) {
      return sales * 0.6 - 1.58 * month.commons.salary.mensual;
    }

    function _bonusHelper(mean) {
      return Math.max(0, mean) / 1.58;
    }

    var parent = {

      sales: function () {
        return month.taxFreeRate() * month.workedDays;
      },

      delta: function () {
        return _deltaHelper(this.sales());
      },

      mean: function () {
        return sheet.mean(month.index);
      },

      bonus: function () {
        return _bonusHelper(this.mean());
      }
    };

    parent.ideal = {

      sales: function () {
        return month.taxFreeRate() * month.businessDays;
      },

      delta: function () {
        return _deltaHelper(this.sales());
      },

      mean: function () {
        return sheet.ideal.mean(month.index);
      },

      bonus: function () {
        return _bonusHelper(this.mean());
      }
    };

    return angular.extend(month, parent);
  };
});
