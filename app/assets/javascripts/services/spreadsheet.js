'use strict';

transparence.service('SpreadsheetService', ['$http', '$rootScope', 'Spreadsheet', function ($http, $rootScope, Spreadsheet) {

  var me = this;

  me.gist = function (id) {
    return $http.get('https://api.github.com/gists/' + escape(id));
  };

  me.read = function (path) {
    return $http.get(path);
  };

  me.compute = function (commons) {
    return new Spreadsheet(commons);
  };
}]);
