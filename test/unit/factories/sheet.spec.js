/* global fixtures, module, describe, it, beforeEach, afterEach, inject, expect */

'use strict';

describe('Sheet factory', function () {

  var Sheet;

  beforeEach(module('Transparence'));

  beforeEach(inject(function ($injector) {
    Sheet = $injector.get('Sheet');
  }));

  it('should exist', function () {
    expect(Sheet).not.toEqual(null);
  });
});
