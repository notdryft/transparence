/* global fixtures, module, describe, it, beforeEach, afterEach, inject, expect */

'use strict';

describe('Fixtures', function () {

  var spreadsheet = fixtures.spreadsheet;

  it('should deliver consistent data for spreadsheet commons', function () {
    var sample = spreadsheet.sample;
    var expected = spreadsheet.expected;

    expect(sample.commons.salary.annual()).toBe(expected.commons.salary.annual);
    expect(sample.commons.salary.taxFreeRate()).toBe(expected.commons.salary.taxFreeRate);
  });

  it('should deliver consistent data for spreadsheet testing', function () {
    var sample = spreadsheet.sample;
    var expected = spreadsheet.expected;

    expect(sample.simulations.length).toBe(expected.sheets.length);
    for (var i = 0; i < sample.simulations.length; i++) {
      expect(sample.simulations[i].workedDays.length).toBe(sample.simulations[i].businessDays.length);
      expect(sample.simulations[i].workedDays.length).toBe(expected.sheets[i].months.length);
    }
  });
});
