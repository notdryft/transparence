/* global fixtures, module, describe, it, beforeEach, afterEach, inject, expect */

'use strict';

describe('SpreadsheetService', function () {

  var $httpBackend;
  var $timeout;
  var SpreadsheetService;

  beforeEach(module('Transparence'));

  beforeEach(inject(function ($injector) {
    $httpBackend = $injector.get('$httpBackend');
    $timeout = $injector.get('$timeout');
    SpreadsheetService = $injector.get('SpreadsheetService');
  }));

  afterEach(function () {
    $timeout(function () { // Error: [$rootScope:inprog]
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    }, 0);
  });

  it('should exist', function () {
    expect(SpreadsheetService).not.toEqual(null);
  });

  var path = '/data/sample.json';

  it('should return json content when read', function (done) {
    var message = {
      key: 'value'
    };

    $httpBackend.expectGET(path)
      .respond(200, message);

    SpreadsheetService.read(path)
      .then(function (d) {
        expect(d.data.key).toBe('value');
      })
      .finally(done);

    $httpBackend.flush();
  });

  it('should compute json data correctly', function () {
    var spreadsheet = SpreadsheetService.compute(fixtures.spreadsheet.sample);
    var expected = fixtures.spreadsheet.expected;

    expect(spreadsheet.salary.annual).toBe(expected.salary.annual);
    expect(spreadsheet.salary.taxFreeRate).toBe(expected.salary.taxFreeRate);

    expect(spreadsheet.rows.length).toBe(expected.rows.length);
    for (var i = 0; i < spreadsheet.rows.length; i++) {
      var row = spreadsheet.rows[i];
      var expectedRow = expected.rows[i];

      expect(Math.round(row.sales())).toBe(expectedRow.sales);
      expect(Math.round(row.delta())).toBe(expectedRow.delta);
      expect(Math.round(row.mean())).toBe(expectedRow.mean);
      expect(Math.round(row.bonus())).toBe(expectedRow.bonus);
    }
  });
});
