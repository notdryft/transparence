fixtures = {
  sample: {
    salary: {
      mensual: 2917,
      rate: 750
    },
    startFrom: "2013/10",
    workedDays: [
      0,
      10,
      13,
      15,
      19.5,
      21,
      13,
      19,
      20,
      22,
      20,
      22,
      23,
      20,
      22,
      21,
      20,
      22,
      22,
      21,
      22,
      23,
      21,
      22
    ]
  },
  expected: {
    salary: {
      annual: 35004,
      taxFreeRate: 675
    },
    rows: [
      {
        sales: 0,
        delta: -4609,
        mean: 0,
        bonus: 0
      },
      {
        sales: 6750,
        delta: -559,
        mean: -4609,
        bonus: 0
      },
      {
        sales: 8775,
        delta: 656,
        mean: -2584,
        bonus: 0
      },
      {
        sales: 10125,
        delta: 1466,
        mean: -1504,
        bonus: 0
      },
      {
        sales: 13163,
        delta: 3289,
        mean: -761,
        bonus: 0
      },
      {
        sales: 14175,
        delta: 3896,
        mean: 49,
        bonus: 31
      },
      {
        sales: 8775,
        delta: 656,
        mean: 690,
        bonus: 437
      },
      {
        sales: 12825,
        delta: 3086,
        mean: 1567,
        bonus: 992
      },
      {
        sales: 13500,
        delta: 3491,
        mean: 2175,
        bonus: 1377
      },
      {
        sales: 14850,
        delta: 4301,
        mean: 2647,
        bonus: 1676
      },
      {
        sales: 13500,
        delta: 3491,
        mean: 3120,
        bonus: 1975
      },
      {
        sales: 14850,
        delta: 4301,
        mean: 3154,
        bonus: 1996
      },
      {
        sales: 15525,
        delta: 4706,
        mean: 3221,
        bonus: 2039
      },
      {
        sales: 13500,
        delta: 3491,
        mean: 3896,
        bonus: 2466
      },
      {
        sales: 14850,
        delta: 4301,
        mean: 3964,
        bonus: 2509
      },
      {
        sales: 14175,
        delta: 3896,
        mean: 4099,
        bonus: 2594
      },
      {
        sales: 13500,
        delta: 3491,
        mean: 4031,
        bonus: 2551
      },
      {
        sales: 14850,
        delta: 4301,
        mean: 4031,
        bonus: 2551
      },
      {
        sales: 14850,
        delta: 4301,
        mean: 4031,
        bonus: 2551
      },
      {
        sales: 14175,
        delta: 3896,
        mean: 3964,
        bonus: 2509
      },
      {
        sales: 14850,
        delta: 4301,
        mean: 4031,
        bonus: 2551
      },
      {
        sales: 15525,
        delta: 4706,
        mean: 4031,
        bonus: 2551
      },
      {
        sales: 14175,
        delta: 3896,
        mean: 4166,
        bonus: 2637
      },
      {
        sales: 14850,
        delta: 4301,
        mean: 4234,
        bonus: 2680
      }
    ]
  }
};
