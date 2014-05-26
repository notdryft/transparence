/* global angular, transparence */

'use strict';

transparence.factory('Spreadsheet', ['Commons', 'Sheet', function (Commons, Sheet) {

  return function (commons) {
    var spreadsheet = {
      commons: new Commons(commons),
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
