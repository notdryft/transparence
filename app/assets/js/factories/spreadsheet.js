/* global angular, transparence */

'use strict';

transparence.factory('Spreadsheet', ['Sheet', function (Sheet) {

  return function (commons) {
    var salary = commons.salary;
    var spreadsheet = {
      commons: {
        salary: {
          mensual: salary.mensual,
          annual: function () {
            return this.mensual * 12;
          },
          rate: salary.rate,
          taxFreeRate: function () {
            return this.rate * 0.9;
          }
        },
        startFrom: commons.startFrom
      },
      sheets: []
    };

    return angular.extend(spreadsheet, {

      sheetCount: function () {
        return this.sheets.length;
      },

      sheetAt: function (index) {
        return this.sheets[index];
      },

      createSheet: function (index) {
        var sheet = new Sheet(this.commons);
        this.sheets[index] = sheet;

        return sheet;
      },

      updateSheet: function (index, data) {
        if (!this.sheets.hasOwnProperty(index)) {
          this.createSheet(index);
        }

        this.sheetAt(index).update(data);
      }
    });
  };
}]);
