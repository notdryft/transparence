/* global fixtures, module, describe, it, beforeEach, afterEach, inject, expect */

'use strict';

describe('Spreadsheet factory', function () {

  var Spreadsheet;

  beforeEach(module('Transparence'));

  beforeEach(inject(function ($injector) {
    Spreadsheet = $injector.get('Spreadsheet');
  }));

  it('should exist', function () {
    expect(Spreadsheet).not.toEqual(null);
  });
});
