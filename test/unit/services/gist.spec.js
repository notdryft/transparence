'use strict';

describe('Gist service', function () {

  var $httpBackend;
  var $timeout;

  var GistService;

  beforeEach(module('Transparence'));

  beforeEach(inject(function ($injector) {
    $httpBackend = $injector.get('$httpBackend');
    $timeout = $injector.get('$timeout');
    GistService = $injector.get('GistService');
  }));

  afterEach(function () {
    $timeout(function () { // Error: [$rootScope:inprog]
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    }, 0);
  });

  it('should exist', function () {
    expect(GistService).not.toEqual(null);
  });

  it('should return json content when read', function (done) {
    var sample = fixtures.gist.sample;
    var expected = fixtures.gist.expected;

    $httpBackend.expectGET(sample.url)
      .respond(200, sample.full);

    GistService.read(sample.id)
      .then(function (content) {
        expect(content).toEqual(expected.full);

        done();
      });

    $httpBackend.flush();
  });

  it('should reject data on any http error', function (done) {
    var sample = fixtures.gist.sample;

    $httpBackend.expectGET(sample.url)
      .respond(500);

    GistService.read(sample.id)
      .catch(done);

    $httpBackend.flush();
  });

  it('should handle empty data', function (done) {
    var sample = fixtures.gist.sample;

    $httpBackend.expectGET(sample.url)
      .respond(200, {});

    GistService.read(sample.id)
      .catch(done);

    $httpBackend.flush();
  });

  it('should handle data malformation', function (done) {
    var sample = fixtures.gist.sample;

    $httpBackend.expectGET(sample.url)
      .respond(200, sample.malformed);

    GistService.read(sample.id)
      .catch(done);

    $httpBackend.flush();
  });
});
