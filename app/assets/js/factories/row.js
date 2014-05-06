/* global angular, transparence */

'use strict';

transparence.factory('Row', ['$rootScope', function ($rootScope) {

  return function (month) {

    return angular.extend(month, {

      sales: function () {
        return $rootScope.taxFreeRate * month.workedDays;
      },

      delta: function () {
        return this.sales() * 0.6 - 1.58 * $rootScope.mensualSalary;
      },

      mean: function () {
        if (month.index === 0) {
          return 0;
        }

        var start = month.index - 6;
        start = (start < 0) ? 0 : start;

        var sum = 0;
        var availableRows = this.rows.slice(start, month.index);
        for (var i = 0; i < availableRows.length; i++) {
          sum += availableRows[i].delta();
        }

        return sum / availableRows.length;
      },

      bonus: function () {
        return Math.max(0, this.mean()) / 1.58;
      }
    });
  };
}]);
