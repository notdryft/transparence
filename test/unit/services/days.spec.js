'use strict';

describe('Days service', function () {

  var DaysService;

  beforeEach(module('Transparence'));

  beforeEach(inject(function ($injector) {
    DaysService = $injector.get('DaysService');
  }));

  it('should exist', function () {
    expect(DaysService).not.toEqual(null);
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

  function _checkDaysInMonth(year, daysPerMonth) {
    use(DaysService.daysInMonth)
      .startFrom(new Date(year, 0))
      .expect(daysPerMonth);
  }

  it('should compute days in month', function () {
    var daysPerMonth = fixtures.date.expected.daysPerMonth;
    var daysPerMonthOnLeapYear = fixtures.date.expected.daysPerMonthOnLeapYear;

    _checkDaysInMonth(2011, daysPerMonth);
    _checkDaysInMonth(2012, daysPerMonthOnLeapYear);
    _checkDaysInMonth(2013, daysPerMonth);
  });

  it('should compute week days', function () {
    var days = fixtures.date.sample.days;

    use(DaysService.isWeekDay)
      .startFrom(new Date(2014, 4), days)
      .expect(fixtures.date.expected.days);
  });

  it('should compute easter day for any year', function () {
    var sample = fixtures.date.sample.easterYears;
    var expected = fixtures.date.expected.easterDays;

    expect(sample.length).toBe(expected.length);
    for (var i = 0; i < sample.length; i++) {
      var easterDay = DaysService.easterDayInYear(sample[i]);
      var expectation = new Date(expected[i]);

      expect(easterDay.getMonth()).toBe(expectation.getMonth());
      expect(easterDay.getDate()).toBe(expectation.getDate());
    }
  });

  function _checkPublicHolidays(year, expected) {
    var publicHolidays = DaysService.publicHolidaysInYear(year);

    expect(publicHolidays.length).toBe(expected.length);
    for (var i = 0; i < publicHolidays.length; i++) {
      expect(publicHolidays[i]).toBe(expected[i]);
    }
  }

  it('should compute public holidays for each year', function () {
    var publicHolidays = fixtures.date.expected.publicHolidays;

    _checkPublicHolidays(2014, publicHolidays.year2014);
    _checkPublicHolidays(2015, publicHolidays.year2015);
    _checkPublicHolidays(2016, publicHolidays.year2016);
  });

  function _checkBusinessDays(year, weekDays, publicHolidays) {
    var businessDays = [];
    expect(weekDays.length, publicHolidays.length);
    for (var i = 0; i < weekDays.length; i++) {
      businessDays[i] = weekDays[i] - publicHolidays[i];
    }

    use(DaysService.businessDaysInMonth)
      .startFrom(new Date(year, 0))
      .expect(businessDays);
  }

  it('should compute business days in months', function () {
    var weekDays = fixtures.date.expected.weekDays;
    var publicHolidays = fixtures.date.expected.publicHolidays;

    _checkBusinessDays(2014, weekDays.year2014, publicHolidays.year2014);
    _checkBusinessDays(2015, weekDays.year2015, publicHolidays.year2015);
    _checkBusinessDays(2016, weekDays.year2016, publicHolidays.year2016);
  });

  it("should make efficient use of it's inner cache while computing business days", function () {
    var publicHolidays = fixtures.date.expected.publicHolidays;

    spyOn(DaysService, 'publicHolidaysInYear')
      .and.callFake(function (year) {
        switch (year) {
          case 2014:
            return publicHolidays.year2014;
          case 2015:
            return publicHolidays.year2015;
          case 2016:
            return publicHolidays.year2016;
        }
      });

    for (var year = 2014; year <= 2016; year++) {
      for (var month = 0; month < 12; month++) {
        var currentMonth = new Date(year, month);

        DaysService.businessDaysInMonth(currentMonth);
      }

      var calls = DaysService.publicHolidaysInYear.calls;
      expect(calls.count()).toBe(1);

      calls.reset();
    }
  });
});
