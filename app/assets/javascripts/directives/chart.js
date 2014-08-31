'use strict';

transparence.directive('chart', ['$document', '$window', function ($document, $window) {

  return {
    restrict: 'E',
    scope: {
      data: '='
    },

    link: function (scope, elements, attributes) {
      var chart = d3.select(elements[0]);
      var svg = chart.append('svg')
        .attr({
          width: attributes.width,
          height: attributes.height,
          viewBox: '0 0 ' + attributes.width + ' ' + attributes.height,
          preserveAspectRatio: "xMidYMid"
        });

      var wrapper = d3.select('.chart-wrapper');
      var aspectRatio = attributes.width / attributes.height;

      function updateSize() {
        var targetWidth = parseInt(wrapper.style('width')) -
          parseInt(wrapper.style('padding-left')) -
          parseInt(wrapper.style('padding-right'));

        svg.attr({
          width: targetWidth,
          height: targetWidth / aspectRatio
        });
      }

      $document.ready(updateSize);
      angular.element($window).bind('resize', function () {
        updateSize();

        scope.$apply();
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
}]);
