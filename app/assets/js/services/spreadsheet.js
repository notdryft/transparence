/* global transparence */

'use strict';

transparence.service('SpreadsheetService', ['$q', '$http', '$timeout', function ($q, $http, $timeout) {

  this.read = function (path) {
    var deferred = $q.defer();

    $http.get(path)
      .success(function (data) {
        $timeout(function () { // to test deferring
          deferred.resolve(data);
        }, 1000);
      })
      .error(function (data) {
        deferred.reject(data);
      });

    return deferred.promise;
  };
}]);
