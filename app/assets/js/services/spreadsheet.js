/* global transparence */

'use strict';

transparence.service('SpreadsheetService', ['$http', 'Spreadsheet', function ($http, Spreadsheet) {

  var me = this;

  me.read = function (path) {
    return $http.get(path);
  };

  me.compute = function (data) {
    return new Spreadsheet(data);
  };
}]);
