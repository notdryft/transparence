'use strict';

describe('Spreadsheet service', function () {

  var SpreadsheetService;

  beforeEach(module('Transparence'));

  beforeEach(inject(function ($injector) {
    SpreadsheetService = $injector.get('SpreadsheetService');
  }));

  it('should exist', function () {
    expect(SpreadsheetService).not.toEqual(null);
  });

  it('should compute json data correctly', function () {
    var sample = fixtures.spreadsheet.sample;
    var expected = fixtures.spreadsheet.expected;

    var spreadsheet = SpreadsheetService.compute(sample.commons);
    expect(spreadsheet.commons.salary.annual()).toBe(expected.commons.salary.annual);
    expect(spreadsheet.commons.salary.taxFreeRate()).toBe(expected.commons.salary.taxFreeRate);

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

        month.businessDays = simulation.businessDays[j];
        expect(Math.round(month.ideal.sales())).toBe(expectedMonth.ideal.sales);
        expect(Math.round(month.ideal.delta())).toBe(expectedMonth.ideal.delta);
        expect(Math.round(month.ideal.mean())).toBe(expectedMonth.ideal.mean);
        expect(Math.round(month.ideal.bonus())).toBe(expectedMonth.ideal.bonus);
      }
    }
  });
});
