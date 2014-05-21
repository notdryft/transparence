/* global transparence */

'use strict';

transparence.service('DaysService', function () {

  var me = this;

  var _publicHolidaysCache = {};

  function _copyDate(date, dayInMonth) {
    return new Date(date.getFullYear(), date.getMonth(), dayInMonth);
  }

  me.daysInMonth = function (date) {
    var copy = _copyDate(date, 32);

    return 32 - copy.getDate();
  };

  me.isWeekDay = function (date, dayInMonth) {
    var copy = _copyDate(date, dayInMonth);
    var day = copy.getDay();

    return day !== 0 && day !== 6;
  };

  // See http://fr.wikipedia.org/wiki/Calcul_de_la_date_de_P%C3%A2ques_selon_la_m%C3%A9thode_de_Meeus
  me.easterDayInYear = function (year) {
    var int = Math.floor;

    // Cycle de Meton
    var n = year % 19;
    // Centaine et range de l'annee
    var c = int(year / 100);
    var u = year % 100;
    // Siecle bissextil
    var s = int(c / 4);
    var t = c % 4;
    // Proemptose
    var p = int((c + 8) / 25);
    // Metemptose
    var q = int((c - p + 1) / 3);
    // Epacte
    var e = (19 * n + c - s - q + 15) % 30;
    // Annee bissextile
    var b = int(u / 4);
    var d = u % 4;
    // Lettre dominicale
    var L = (32 + 2 * t + 2 * b - e - d) % 7;
    // Correction
    var h = int((n + 11 * e + 22 * L) / 451);
    // Mois et quantieme du Samedi saint
    var mj = e + L - 7 * h + 114;
    var m = int(mj / 31);
    var j = mj % 31;

    // Easter day    = j + 2
    // Ascension day = j + 40
    // Whit monday   = j + 51
    return new Date(year, m - 1, j + 2);
  };

  function zeros(n) {
    var array = [];
    for (var i = 0; i < n; i++) {
      array[i] = 0;
    }

    return array;
  }

  me.publicHolidaysInYear = function (year) {
    var months = [0, 4, 4, 6, 7, 10, 10, 11];
    var days = [1, 1, 8, 14, 15, 1, 11, 25];

    var publicHolidays = zeros(12);
    for (var i = 0; i < months.length; i++) {
      var date = new Date(year, months[i]);

      if (me.isWeekDay(date, days[i])) {
        publicHolidays[months[i]] += 1;
      }
    }

    var easterDay = me.easterDayInYear(year);
    var ascensionDay = new Date(year, easterDay.getMonth(), easterDay.getDate() + 38);
    var whitMonday = new Date(year, easterDay.getMonth(), easterDay.getDate() + 49);

    publicHolidays[easterDay.getMonth()] += 1;
    publicHolidays[ascensionDay.getMonth()] += 1;
    publicHolidays[whitMonday.getMonth()] += 1;

    return publicHolidays;
  };

  me.businessDaysInMonth = function (date) {
    var businessDays = 0;
    var days = me.daysInMonth(date);
    for (var day = 1; day <= days; day++) {
      if (me.isWeekDay(date, day)) {
        businessDays++;
      }
    }

    var year = date.getFullYear();
    if (!_publicHolidaysCache[year]) {
      _publicHolidaysCache[year] = me.publicHolidaysInYear(year);
    }

    return businessDays - _publicHolidaysCache[year][date.getMonth()];
  };
});
