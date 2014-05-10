/* global transparence */

'use strict';

transparence.service('DateService', function () {

  var me = this;

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
  me.easterDay = function (year) {
    var int = Math.floor;

    // Cycle de Méton
    var n = year % 19;
    // Centaine et range de l'année
    var c = int(year / 100);
    var u = year % 100;
    // Sicèle bissextil
    var s = int(c / 4);
    var t = c % 4;
    // Proemptose
    var p = int((c + 8) / 25);
    // Métemptose
    var q = int((c - p + 1) / 3);
    // Épacte
    var e = (19 * n + c - s - q + 15) % 30;
    // Année bissextile
    var b = int(u / 4);
    var d = u % 4;
    // Lettre dominicale
    var L = (32 + 2 * t + 2 * b - e - d) % 7;
    // Correction
    var h = int((n + 11 * e + 22 * L) / 451);
    // Mois et quantième du Samedi saint
    var mj = e + L - 7 * h + 114;
    var m = int(mj / 31);
    var j = mj % 31;

    return new Date(year, m - 1, j + 2);
  };

  me.businessDaysInMonth = function (date) {
    var businessDays = 0;
    var days = me.daysInMonth(date);
    for (var day = 1; day <= days; day++) {
      if (me.isWeekDay(date, day)) {
        businessDays++;
      }
    }

    return businessDays;
  };
});
