'use strict';

transparence.directive('chart', function () {

  return {
    restrict: 'C',
    scope: {
      data: '='
    },

    link: function (scope, elements, attributes) {
      var svg = d3.select(elements[0])
        .append('svg')
        .attr({
          width: attributes.width,
          height: attributes.height
        });

      var lgroup = svg.append('g')
        .classed('lines-container', true);

      var lines =
        d3.chart.lines()
          .width(attributes.width)
          .height(attributes.height)
          .thickness(attributes.thickness);

      lines(lgroup);

      scope.$watch('data', function (newValue) {
        if (newValue) {
          lines.data(newValue.sheetAt(0).months);

          lines.update();
        }
      }, true);
    }
  };
});
