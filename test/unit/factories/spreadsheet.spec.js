'use strict';

describe('Spreadsheet factory', function () {

  var Sheet;
  var Spreadsheet;

  beforeEach(module('Transparence'));

  beforeEach(inject(function ($injector) {
    Sheet = $injector.get('Sheet');
    Spreadsheet = $injector.get('Spreadsheet');
  }));

  it('should exist', function () {
    expect(Spreadsheet).not.toEqual(null);
  });

  it('should compute json data correctly', function () {
    var sample = fixtures.spreadsheet.sample;
    var expected = fixtures.spreadsheet.expected;

    var spreadsheet = new Spreadsheet(sample.commons);
    expect(spreadsheet.commons.salary.annual()).toBe(expected.commons.salary.annual);
    expect(spreadsheet.commons.salary.taxFreeRate()).toBe(expected.commons.salary.taxFreeRate);

    for (var i = 0; i < sample.simulations.length; i++) {
      var simulation = sample.simulations[i];

      expect(spreadsheet.sheetCount()).toBe(i);

      var sheet = spreadsheet.createSheet(i);
      expect(spreadsheet.sheetCount()).toBe(i + 1);

      spyOn(sheet, 'update');

      spreadsheet.updateSheet(i, simulation);
      expect(sheet.update).toHaveBeenCalledWith(simulation);
    }
  });

  it('should create a new sheet when updating a non existing one', function () {
    var sample = fixtures.spreadsheet.sample;

    var spreadsheet = new Spreadsheet(sample.commons);
    spyOn(spreadsheet, 'createSheet').and.callFake(function (index) {
      var sheet = new Sheet(spreadsheet);
      spreadsheet.sheets[index] = sheet;
      spyOn(sheet, 'update');

      return sheet;
    });

    for (var i = 0; i < sample.simulations.length; i++) {
      var simulation = sample.simulations[i];

      expect(spreadsheet.sheetCount()).toBe(i);

      spreadsheet.updateSheet(i, simulation);
      expect(spreadsheet.sheetCount()).toBe(i + 1);
      expect(spreadsheet.createSheet).toHaveBeenCalledWith(i);
      expect(spreadsheet.sheets[i].update).toHaveBeenCalledWith(simulation);
    }
  });
});
