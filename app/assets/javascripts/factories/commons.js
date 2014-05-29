'use strict';

transparence.factory('Commons', function () {

  return function (commons) {

    var parent = {
      startFrom: commons.startFrom
    };

    var salary = commons.salary;
    parent.salary = {

      mensual: salary.mensual,

      annual: function () {
        return this.mensual * 12;
      },

      rate: salary.rate,

      taxFreeRate: function () {
        return this.rate * 0.9;
      }
    };

    return parent;
  };
});
