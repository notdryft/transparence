/* global fixtures, module, describe, it, beforeEach, afterEach, inject, spyOn, expect */

'use strict';

describe('Sheet factory', function () {

  var Sheet;
  var Spreadsheet;

  beforeEach(module('Transparence'));

  beforeEach(inject(function ($injector) {
    Sheet = $injector.get('Sheet');
    Spreadsheet = $injector.get('Spreadsheet');
  }));

  it('should exist', function () {
    expect(Sheet).not.toEqual(null);
    expect(Spreadsheet).not.toEqual(null);
  });

  function _checkFixturesConsistency(sample, expected) {
    expect(sample.simulations.length).toBe(expected.sheets.length);
    for (var i = 0; i < sample.simulations.length; i++) {
      expect(sample.simulations[i].workedDays.length).toBe(sample.simulations[i].businessDays.length);
      expect(sample.simulations[i].workedDays.length).toBe(expected.sheets[i].months.length);
    }
  }

  it('should compute json data correctly', function () {
    var sample = fixtures.spreadsheet.sample;
    var expected = fixtures.spreadsheet.expected;
    _checkFixturesConsistency(sample, expected);

    var spreadsheet = new Spreadsheet(sample.commons);
    for (var i = 0; i < sample.simulations.length; i++) {
      var simulation = sample.simulations[i];
      var expectedSheet = expected.sheets[i];

      var sheet = new Sheet(spreadsheet);
      expect(sheet.monthCount()).toBe(0);

      sheet.update(simulation);
      expect(sheet.monthCount()).toBe(simulation.workedDays.length);

      for (var j = 0; j < sheet.monthCount(); j++) {
        var month = sheet.monthAt(j);

        var expectedMonth = expectedSheet.months[j];
        expect(Math.round(month.sales())).toBe(expectedMonth.sales);
        expect(Math.round(month.delta())).toBe(expectedMonth.delta);
        expect(Math.round(month.mean())).toBe(expectedMonth.mean);
        expect(Math.round(month.bonus())).toBe(expectedMonth.bonus);

        month.businessDays = simulation.businessDays[j];
        expect(Math.round(month.ideal.sales())).toBe(expectedMonth.ideal.sales);
        expect(Math.round(month.ideal.delta())).toBe(expectedMonth.ideal.delta);
        expect(Math.round(month.ideal.mean())).toBe(expectedMonth.ideal.mean);
        expect(Math.round(month.ideal.bonus())).toBe(expectedMonth.ideal.bonus);
      }
    }
  });
});
