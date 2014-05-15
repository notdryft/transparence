/* global fixtures, module, describe, it, beforeEach, afterEach, inject, expect */

'use strict';

describe('Spreadsheet service', function () {

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

  function _checkFixturesConsistency(sample, expected) {
    expect(sample.simulations.length).toBe(expected.sheets.length);
    for (var i = 0; i < sample.simulations.length; i++) {
      expect(sample.simulations[i].workedDays.length)
        .toBe(expected.sheets[i].months.length);
    }
  }

  it('should compute json data correctly', function () {
    var sample = fixtures.spreadsheet.sample;
    var expected = fixtures.spreadsheet.expected;
    _checkFixturesConsistency(sample, expected);

    var spreadsheet = SpreadsheetService.compute(sample.commons);
    expect(spreadsheet.salary.annual).toBe(expected.commons.salary.annual);
    expect(spreadsheet.salary.taxFreeRate).toBe(expected.commons.salary.taxFreeRate);

    for (var i = 0; i < sample.simulations.length; i++) {
      var simulation = sample.simulations[i];
      var expectedSheet = expected.sheets[i];

      var sheet = spreadsheet.createSheet(i);
      expect(sheet.monthCount()).toBe(0);

      spreadsheet.updateSheet(i, simulation);
      expect(sheet.monthCount()).toBe(simulation.workedDays.length);

      for (var j = 0; j < sheet.monthCount(); j++) {
        var month = sheet.monthAt(j);

        var expectedMonth = expectedSheet.months[j];
        expect(Math.round(month.sales())).toBe(expectedMonth.sales);
        expect(Math.round(month.delta())).toBe(expectedMonth.delta);
        expect(Math.round(month.mean())).toBe(expectedMonth.mean);
        expect(Math.round(month.bonus())).toBe(expectedMonth.bonus);
      }
    }
  });
});
