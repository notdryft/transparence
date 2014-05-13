/* global fixtures, module, describe, it, beforeEach, afterEach, inject, expect */

'use strict';

describe('Row factory', function () {

  var Row;

  beforeEach(module('Transparence'));

  beforeEach(inject(function ($injector) {
    Row = $injector.get('Row');
  }));

  it('should exist', function () {
    expect(Row).not.toEqual(null);
  });
});
