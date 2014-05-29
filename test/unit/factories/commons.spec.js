'use strict';

describe('Commons factory', function () {

  var Commons;

  beforeEach(module('Transparence'));

  beforeEach(inject(function ($injector) {
    Commons = $injector.get('Commons');
  }));

  it('should exist', function () {
    expect(Commons).not.toEqual(null);
  });

  it('should compute annual salary and taxFreeRate', function () {
    var sample = fixtures.spreadsheet.sample;
    var expected = fixtures.spreadsheet.expected;

    expect(sample.commons.salary.annual()).toBe(expected.commons.salary.annual);
    expect(sample.commons.salary.taxFreeRate()).toBe(expected.commons.salary.taxFreeRate);
  });
});
