/* global transparence */

'use strict';

transparence.service('SpreadsheetService', ['$http', '$timeout', function ($http, $timeout) {

  var me = this;

  me.read = function (path) {

    return $http.get(path);
  };
}]);
