'use strict';

transparence.service('GistService', ['$q', '$http', function ($q, $http) {

  var me = this;

  function endsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
  }

  function urlFor(gistId) {
    return 'https://api.github.com/gists/' + escape(gistId);
  }

  me.read = function (gistId) {
    var deferred = $q.defer();

    $http.get(urlFor(gistId))
      .success(function (gist) {
        if (gist.id === gistId && gist.hasOwnProperty('files')) {
          var files = gist.files;

          var keys = Object.keys(files);
          if (keys.length === 1 && endsWith(keys[0], '.json')) {
            var file = files[keys[0]];

            if (file.hasOwnProperty('content')) {
              // Return so the flow stops right here
              return deferred.resolve(JSON.parse(files[keys[0]].content));
            }
          }
        }

        deferred.reject(gist);
      })
      .error(function (data) {
        deferred.reject(data);
      });

    return deferred.promise;
  };
}]);
