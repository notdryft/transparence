/* global angular, transparence */

'use strict';

transparence.factory('Spreadsheet', ['Sheet', function (Sheet) {

  return function (commons) {
    var salary = commons.salary;
    var spreadsheet = {
      salary: {
        mensual: salary.mensual,
        annual: salary.mensual * 12,
        rate: salary.rate,
        taxFreeRate: salary.rate * 0.9
      },
      sheets: [],
      startFrom: commons.startFrom
    };

    return angular.extend(spreadsheet, {

      sheetCount: function () {
        return this.sheets.length;
      },

      sheetAt: function (index) {
        return this.sheets[index];
      },

      createSheet: function (index) {
        var sheet = new Sheet(this);
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
