/* global d3, transparence */

'use strict';

transparence.directive('chart', function () {

  return {
    restrict: 'A',
    scope: {
      data: '='
    },

    link: function (scope, element, attributes) {

      var svg = d3.select(element[0]);

      var lgroup = svg.append('g')
        .classed('lines-container', true);

      var lines =
        d3.chart.lines()
          .data([])
          .width(attributes.width)
          .height(attributes.height)
          .thickness(attributes.thickness);

      lines(lgroup);
      lines.axis();

      scope.$watch('data', function (value) {
        if (value) {
          lines.data(value);

          lines.update();
          lines.axis.update();
        }
      });
    }
  };
});
