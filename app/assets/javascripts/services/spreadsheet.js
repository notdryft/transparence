'use strict';

transparence.service('SpreadsheetService', ['Spreadsheet', function (Spreadsheet) {

  var me = this;

  me.compute = function (commons) {
    return new Spreadsheet(commons);
  };
}]);
