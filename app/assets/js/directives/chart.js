/* global angular, d3, transparence */

'use strict';

transparence.directive('chart', ['$timeout', function ($timeout) {

  return {
    restrict: 'A',
    scope: {
      data: '='
    },

    link: function (scope, element, attributes) {

      $timeout(function () {
        var svg = d3.select(element[0]);

        var lgroup = svg.append('g')
          .classed('lines-container', true);

        var lines =
          d3.chart.lines()
            .data(scope.data)
            .width(attributes.width)
            .height(attributes.height)
            .thickness(attributes.thickness);

        lines(lgroup);
        lines.axis();
      });
    }
  };
}]);
