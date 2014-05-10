/* global fixtures, module, describe, it, beforeEach, inject, expect */

'use strict';

describe('DateService', function () {

  var DateService;

  beforeEach(module('Transparence'));

  beforeEach(inject(function ($injector) {
    DateService = $injector.get('DateService');
  }));

  it('should contain a month service', function () {
    expect(DateService).not.toEqual(null);
  });

  function use(fn) {

    return {

      startFrom: function (date, days) {

        return {

          expect: function (expected) {
            var i;

            if (days === undefined) {
              for (i = 0; i < expected.length; i++) {
                expect(fn(date)).toBe(expected[i]);

                date.setMonth(date.getMonth() + 1);
              }
            } else {
              for (i = 0; i < days.length; i++) {
                expect(fn(date, days[i])).toBe(expected(days[i]));
              }
            }
          }
        };
      }
    };
  }

  it('should compute days in month', function () {
    var daysPerMonth = fixtures.date.expected.daysPerMonth;
    var daysPerMonthOnLeapYear = fixtures.date.expected.daysPerMonthOnLeapYear;

    var daysInMonth = use(DateService.daysInMonth);
    daysInMonth.startFrom(new Date(2011, 0))
      .expect(daysPerMonth);
    daysInMonth.startFrom(new Date(2012, 0))
      .expect(daysPerMonthOnLeapYear);
    daysInMonth.startFrom(new Date(2013, 0))
      .expect(daysPerMonth);
  });

  it('should compute week days', function () {
    var days = fixtures.date.sample.days;

    use(DateService.isWeekDay)
      .startFrom(new Date(2014, 4), days)
      .expect(fixtures.date.expected.days);
  });

  it('should compute easter day for any year', function () {
    var sample = fixtures.date.sample.easterYears;
    var expected = fixtures.date.expected.easterDays;

    expect(sample.length).toBe(expected.length);
    for (var i = 0; i < sample.length; i++) {
      var easterDay = DateService.easterDay(sample[i]);
      var expectation = new Date(expected[i]);

      expect(easterDay.getMonth()).toBe(expectation.getMonth());
      expect(easterDay.getDate()).toBe(expectation.getDate());
    }
  });

  it('should compute business days in months', function () {
    var weekDays = fixtures.date.expected.weekDays;
    var publicHolidays = fixtures.date.expected.publicHolidays;

    var businessDays = [];
    for (var i = 0; i < weekDays.length; i++) {
      businessDays[i] = weekDays[i] + publicHolidays[i]; // should be minus
    }

    use(DateService.businessDaysInMonth)
      .startFrom(new Date(2013, 9))
      .expect(businessDays);
  });
});
