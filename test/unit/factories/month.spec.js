/* global fixtures, module, describe, it, beforeEach, afterEach, inject, spyOn, expect */
/* jshint loopfunc: true */

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

  it('should compute json data correctly', function () {
    var sample = fixtures.spreadsheet.sample;
    var expected = fixtures.spreadsheet.expected;

    var spreadsheet = new Spreadsheet(sample.commons);
    var sheet = new Sheet(spreadsheet);
    spyOn(sheet, 'mean');
    spyOn(sheet.ideal, 'mean');

    for (var i = 0; i < sample.simulations.length; i++) {
      var simulation = sample.simulations[i];
      var expectedSheet = expected.sheets[i];

      for (var j = 0; j < simulation.workedDays.length; j++) {
        var workedDays = simulation.workedDays[j];
        var businessDays = simulation.businessDays[j];

        var month = new Month(sheet, {
          businessDays: businessDays,
          commons: sample.commons,
          index: j,
          taxFreeRate: function () {
            return this.index && sample.commons.salary.taxFreeRate();
          },
          workedDays: workedDays
        });

        var expectedMonth = expectedSheet.months[j];
        expect(Math.round(month.sales())).toBe(expectedMonth.sales);
        expect(Math.round(month.delta())).toBe(expectedMonth.delta);

        month.mean();
        expect(sheet.mean).toHaveBeenCalledWith(j);

        month.bonus();
        expect(sheet.mean).toHaveBeenCalledWith(j);

        expect(Math.round(month.ideal.sales())).toBe(expectedMonth.ideal.sales);
        expect(Math.round(month.ideal.delta())).toBe(expectedMonth.ideal.delta);

        month.ideal.mean();
        expect(sheet.ideal.mean).toHaveBeenCalledWith(j);

        month.ideal.bonus();
        expect(sheet.ideal.mean).toHaveBeenCalledWith(j);
      }
    }
  });
});
