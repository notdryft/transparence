'use strict';

transparence.controller('SpreadsheetController', ['$routeParams', '$scope', 'SpreadsheetService', function ($routeParams, $scope, SpreadsheetService) {

  function updateScope(data) {
    var spreadsheet = SpreadsheetService.compute(data.commons);

    var sheet = spreadsheet.createSheet(0);
    sheet.update(data.simulations[0]);

    $scope.spreadsheet = spreadsheet;
  }

  if ($routeParams.id) {
    SpreadsheetService
      .gist($routeParams.id)
      .then(function (gist) {
        var data = JSON.parse(gist.data.files['whatever.json'].content);

        updateScope(data);
      });
  }
}]);
