'use strict';

describe('Fixtures', function () {

  var spreadsheet = fixtures.spreadsheet;

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
