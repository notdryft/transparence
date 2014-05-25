'use strict';

var fixtures = {
  date: {
    sample: {
      days: [5, 6, 7, 8, 9, 10, 11],
      easterYears: [2006, 2014, 2015, 2016]
    },
    expected: {
      days: function (value) {
        return value !== 10 && value !== 11;
      },
      daysPerMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
      daysPerMonthOnLeapYear: [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
      easterDays: ['2006/04/17', '2014/04/21', '2015/04/06', '2016/03/28'],
      publicHolidays: {
        year2014: [1, 0, 0, 1, 3, 1, 1, 1, 0, 0, 1, 1],
        year2015: [1, 0, 0, 1, 4, 0, 1, 0, 0, 0, 1, 1],
        year2016: [1, 0, 1, 0, 2, 0, 1, 1, 0, 0, 2, 0]
      },
      weekDays: {
        year2014: [23, 20, 21, 22, 22, 21, 23, 21, 22, 23, 20, 23],
        year2015: [22, 20, 22, 22, 21, 22, 23, 21, 22, 22, 21, 23],
        year2016: [21, 21, 23, 21, 22, 22, 21, 23, 22, 21, 22, 22]
      }
    }
  },
  spreadsheet: {
    sample: {
      commons: {
        salary: {
          annual: function () {
            return this.mensual * 12;
          },
          mensual: 2917,
          rate: 750,
          taxFreeRate: function () {
            return this.rate * 0.9;
          }
        },
        startFrom: "2013/10"
      },
      simulations: [
        {
          workedDays: [0, 10, 13, 15, 19.5, 21, 13, 19, 20, 22, 20, 22, 23, 19, 22, 21, 20, 22, 21, 17, 22, 22, 21, 22],
          businessDays: [23, 19, 21, 22, 20, 21, 21, 19, 20, 22, 20, 22, 23, 19, 22, 21, 20, 22, 21, 17, 22, 22, 21, 22]
        }
      ]
    },
    expected: {
      commons: {
        salary: {
          annual: 35004,
          taxFreeRate: 675
        }
      },
      sheets: [
        {
          months: [
            // Month 1
            {
              sales: 0,
              delta: -4609,
              mean: 0,
              bonus: 0,
              ideal: {
                sales: 0,
                delta: -4609,
                mean: 0,
                bonus: 0
              }
            },
            // Month 2
            {
              sales: 6750,
              delta: -559,
              mean: -4609,
              bonus: 0,
              ideal: {
                sales: 12825,
                delta: 3086,
                mean: -4609,
                bonus: 0
              }
            },
            // Month 3
            {
              sales: 8775,
              delta: 656,
              mean: -2584,
              bonus: 0,
              ideal: {
                sales: 14175,
                delta: 3896,
                mean: -761,
                bonus: 0
              }
            },
            // Month 4
            {
              sales: 10125,
              delta: 1466,
              mean: -1504,
              bonus: 0,
              ideal: {
                sales: 14850,
                delta: 4301,
                mean: 791,
                bonus: 501
              }
            },
            // Month 5
            {
              sales: 13163,
              delta: 3289,
              mean: -761,
              bonus: 0,
              ideal: {
                sales: 13500,
                delta: 3491,
                mean: 1669,
                bonus: 1056
              }
            },
            // Month 6
            {
              sales: 14175,
              delta: 3896,
              mean: 49,
              bonus: 31,
              ideal: {
                sales: 14175,
                delta: 3896,
                mean: 2033,
                bonus: 1287
              }
            },
            // Month 7
            {
              sales: 8775,
              delta: 656,
              mean: 690,
              bonus: 437,
              ideal: {
                sales: 14175,
                delta: 3896,
                mean: 2344,
                bonus: 1483
              }
            },
            // Month 8
            {
              sales: 12825,
              delta: 3086,
              mean: 1567,
              bonus: 992,
              ideal: {
                sales: 12825,
                delta: 3086,
                mean: 3761,
                bonus: 2380
              }
            },
            // Month 9
            {
              sales: 13500,
              delta: 3491,
              mean: 2175,
              bonus: 1377,
              ideal: {
                sales: 13500,
                delta: 3491,
                mean: 3761,
                bonus: 2380
              }
            },
            // Month 10
            {
              sales: 14850,
              delta: 4301,
              mean: 2647,
              bonus: 1676,
              ideal: {
                sales: 14850,
                delta: 4301,
                mean: 3694,
                bonus: 2338
              }
            },
            // Month 11
            {
              sales: 13500,
              delta: 3491,
              mean: 3120,
              bonus: 1975,
              ideal: {
                sales: 13500,
                delta: 3491,
                mean: 3694,
                bonus: 2338
              }
            },
            // Month 12
            {
              sales: 14850,
              delta: 4301,
              mean: 3154,
              bonus: 1996,
              ideal: {
                sales: 14850,
                delta: 4301,
                mean: 3694,
                bonus: 2338
              }
            },
            // Month 13
            {
              sales: 15525,
              delta: 4706,
              mean: 3221,
              bonus: 2039,
              ideal: {
                sales: 15525,
                delta: 4706,
                mean: 3761,
                bonus: 2380
              }
            },
            // Month 14
            {
              sales: 12825,
              delta: 3086,
              mean: 3896,
              bonus: 2466,
              ideal: {
                sales: 12825,
                delta: 3086,
                mean: 3896,
                bonus: 2466
              }
            },
            // Month 15
            {
              sales: 14850,
              delta: 4301,
              mean: 3896,
              bonus: 2466,
              ideal: {
                sales: 14850,
                delta: 4301,
                mean: 3896,
                bonus: 2466
              }
            },
            // Month 16
            {
              sales: 14175,
              delta: 3896,
              mean: 4031,
              bonus: 2551,
              ideal: {
                sales: 14175,
                delta: 3896,
                mean: 4031,
                bonus: 2551
              }
            },
            // Month 17
            {
              sales: 13500,
              delta: 3491,
              mean: 3964,
              bonus: 2509,
              ideal: {
                sales: 13500,
                delta: 3491,
                mean: 3964,
                bonus: 2509
              }
            },
            // Month 18
            {
              sales: 14850,
              delta: 4301,
              mean: 3964,
              bonus: 2509,
              ideal: {
                sales: 14850,
                delta: 4301,
                mean: 3964,
                bonus: 2509
              }
            },
            // Month 19
            {
              sales: 14175,
              delta: 3896,
              mean: 3964,
              bonus: 2509,
              ideal: {
                sales: 14175,
                delta: 3896,
                mean: 3964,
                bonus: 2509
              }
            },
            // Month 20
            {
              sales: 11475,
              delta: 2276,
              mean: 3829,
              bonus: 2423,
              ideal: {
                sales: 11475,
                delta: 2276,
                mean: 3829,
                bonus: 2423
              }
            },
            // Month 21
            {
              sales: 14850,
              delta: 4301,
              mean: 3694,
              bonus: 2338,
              ideal: {
                sales: 14850,
                delta: 4301,
                mean: 3694,
                bonus: 2338
              }
            },
            // Month 22
            {
              sales: 14850,
              delta: 4301,
              mean: 3694,
              bonus: 2338,
              ideal: {
                sales: 14850,
                delta: 4301,
                mean: 3694,
                bonus: 2338
              }
            },
            // Month 23
            {
              sales: 14175,
              delta: 3896,
              mean: 3761,
              bonus: 2380,
              ideal: {
                sales: 14175,
                delta: 3896,
                mean: 3761,
                bonus: 2380
              }
            },
            // Month 24
            {
              sales: 14850,
              delta: 4301,
              mean: 3829,
              bonus: 2423,
              ideal: {
                sales: 14850,
                delta: 4301,
                mean: 3829,
                bonus: 2423
              }
            }
          ]
        }
      ]
    }
  }
};
