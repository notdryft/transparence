/* global fixtures, module, describe, it, beforeEach, afterEach, inject, spyOn, expect */

'use strict';

describe('Month factory', function () {

  var Month;
  var Sheet;
  var Spreadsheet;

  beforeEach(module('Transparence'));

  beforeEach(inject(function ($injector) {
    Month = $injector.get('Month');
    Sheet = $injector.get('Sheet');
    Spreadsheet = $injector.get('Spreadsheet');
  }));

  it('should exist', function () {
    expect(Month).not.toEqual(null);
    expect(Sheet).not.toEqual(null);
    expect(Spreadsheet).not.toEqual(null);
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

    var taxFreeRate = sample.commons.salary.rate * sample.commons.tax;
    expect(taxFreeRate).toBe(expected.commons.salary.taxFreeRate);

    var spreadsheet = new Spreadsheet(sample.commons);
    var sheet = new Sheet(spreadsheet);
    spyOn(sheet, 'mean');

    for (var i = 0; i < sample.simulations.length; i++) {
      var simulation = sample.simulations[i];
      var expectedSheet = expected.sheets[i];

      for (var j = 0; j < simulation.workedDays.length; j++) {
        var workedDays = simulation.workedDays[j];

        var month = new Month({
          index: j,
          sheet: sheet,
          spreadsheet: spreadsheet,
          taxFreeRate: j && taxFreeRate,
          workedDays: workedDays
        });

        var expectedMonth = expectedSheet.months[j];
        expect(Math.round(month.sales())).toBe(expectedMonth.sales);
        expect(Math.round(month.delta())).toBe(expectedMonth.delta);

        month.mean();
        expect(sheet.mean).toHaveBeenCalledWith(j);

        month.bonus();
        expect(sheet.mean).toHaveBeenCalledWith(j);
      }
    }
  });
});
