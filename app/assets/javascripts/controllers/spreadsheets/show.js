'use strict';

transparence.controller('SpreadsheetShowController', ['$routeParams', '$scope', 'GistService', 'SpreadsheetService',
  function ($routeParams, $scope, GistService, SpreadsheetService) {

    function updateScope(data) {
      var spreadsheet = SpreadsheetService.compute(data.commons);

      var sheet = spreadsheet.createSheet(0);
      sheet.update(data.simulations[0]);

      $scope.spreadsheet = spreadsheet;
    }

    GistService
      .read($routeParams.id)
      .then(updateScope);
  }]);
