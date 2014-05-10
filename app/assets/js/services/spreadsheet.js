/* global transparence */

'use strict';

transparence.service('SpreadsheetService', ['$http', function ($http) {

  var me = this;

  me.read = function (path) {

    return $http.get(path);
  };
}]);
