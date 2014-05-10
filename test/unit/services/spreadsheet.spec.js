/* global console, module, describe, it, beforeEach, afterEach, inject, expect */

'use strict';

describe('SpreadsheetService', function () {

  var $httpBackend;
  var $timeout;
  var SpreadsheetService;

  beforeEach(module('Transparence'));

  beforeEach(inject(function ($injector) {
    $httpBackend = $injector.get('$httpBackend');
    $timeout = $injector.get('$timeout');
    SpreadsheetService = $injector.get('SpreadsheetService');
  }));

  afterEach(function () {
    $timeout(function () { // Error: [$rootScope:inprog]
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    }, 0);
  });

  it('should contain a spreadsheet service', function () {
    expect(SpreadsheetService).not.toEqual(null);
  });

  it('should return json content when read', function (done) {
    var path = '/data/sample.json';
    var message = {
      key: 'value'
    };

    $httpBackend.expect('GET', path)
      .respond(200, message);

    SpreadsheetService.read(path)
      .then(function (d) {
        expect(d.data.key).toBe('value');
      })
      .finally(done);

    $httpBackend.flush();
  });
});
