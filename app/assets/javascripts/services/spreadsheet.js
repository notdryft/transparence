/* global transparence */

'use strict';

transparence.service('SpreadsheetService', ['$http', 'Spreadsheet', function ($http, Spreadsheet) {

  var me = this;

  me.read = function (path) {
    return $http.get(path);
  };

  me.compute = function (commons) {
    return new Spreadsheet(commons);
  };
}]);
