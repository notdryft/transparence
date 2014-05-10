/* global module, describe, it, beforeEach, inject, expect */

'use strict';

describe('MonthService', function () {

  var MonthService;

  beforeEach(module('Transparence'));

  beforeEach(inject(function ($injector) {
    MonthService = $injector.get('MonthService');
  }));

  it('should contain a month service', function () {
    expect(MonthService).not.toEqual(null);
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
    var daysPerMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    var daysInMonth = use(MonthService.daysInMonth);
    daysInMonth.startFrom(new Date(2011, 0))
      .expect(daysPerMonth);
    daysInMonth.startFrom(new Date(2013, 0))
      .expect(daysPerMonth);

    daysPerMonth[1] = 29;
    daysInMonth.startFrom(new Date(2012, 0))
      .expect(daysPerMonth);
  });

  it('should compute week days', function () {
    var days = [5, 6, 7, 8, 9, 10, 11];
    var expected = function (value) {
      return value !== 10 && value !== 11;
    };

    use(MonthService.isWeekDay)
      .startFrom(new Date(2014, 4), days)
      .expect(expected);
  });

  it('should compute business days in months', function () {
    var weekDays = [23, 19, 21, 22, 20, 21, 21, 19, 20, 22, 20, 22, 23, 20, 22];
    var publicHolidays = [0, 2, 1, 1, 0, 0, 1, 3, 1, 1, 1, 0, 0, 0, 1];

    var businessDays = [];
    for (var i = 0; i < weekDays.length; i++) {
      businessDays[i] = weekDays[i] + publicHolidays[i]; // should be minus
    }

    use(MonthService.businessDaysInMonth)
      .startFrom(new Date(2013, 9))
      .expect(businessDays);
  });
});
