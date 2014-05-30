'use strict';

transparence.controller('SpreadsheetController', ['$routeParams', '$scope', 'GistService', 'SpreadsheetService', function ($routeParams, $scope, GistService, SpreadsheetService) {

  function updateScope(data) {
    var spreadsheet = SpreadsheetService.compute(data.commons);

    var sheet = spreadsheet.createSheet(0);
    sheet.update(data.simulations[0]);

    $scope.spreadsheet = spreadsheet;
  }

  if ($routeParams.id) {
    GistService
      .read($routeParams.id)
      .then(updateScope);
  }
}]);
