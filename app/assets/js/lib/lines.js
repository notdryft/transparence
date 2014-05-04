/* global d3 */

'use strict';

if (!d3.chart) {
  d3.chart = {};
}

d3.chart.lines = function () {
  var g;
  var data;
  var width;
  var height;
  var thickness;

  var _innerWidth;
  var _innerHeight;

  function chart(container) {
    g = container;

    g.append('g')
      .classed('lines', true)
      .attr('transform', 'translate(' + [thickness * 2, thickness] + ')');

    update();
  }

  function update() {
    var xScale = d3.scale.ordinal()
      .domain(d3.range(data.length))
      .rangeBands([0, _innerWidth]);

    var maxBonus = d3.max(data, function (d) {
      return d.bonus();
    });

    var yScale = d3.scale.linear()
      .domain([0, maxBonus])
      .range([_innerHeight, 0]);

    var line = d3.svg.line()
      .interpolate('basis')
      .x(function (d, index) {
        return xScale(index) + xScale.rangeBand() / 2;
      })
      .y(function (d) {
        return yScale(d.bonus());
      });

    g.select('.lines')
      .append('path')
      .attr('d', line(data));
  }

  chart.update = update;

  chart.axis = function () {
    g.append('g')
      .classed('xaxis axis', true)
      .attr('transform', 'translate(' + [thickness * 2, height - thickness * 2] + ')');

    g.append('g')
      .classed('yaxis axis', true)
      .attr('transform', 'translate(' + [thickness * 2, thickness] + ')');

    updateAxis();
  };

  function updateAxis() {
    var xScale = d3.scale.ordinal()
      .domain(data.map(function (d) {
        return d.number;
      }))
      .rangeBands([0, _innerWidth]);

    var maxBonus = d3.max(data, function (d) {
      return d.bonus();
    });

    var yScale = d3.scale.linear()
      .domain([0, maxBonus])
      .range([_innerHeight, 0]);

    var xAxis = d3.svg.axis()
      .scale(xScale)
      .orient('bottom')
      .ticks(data.length);

    g.select('.xaxis')
      .transition()
      .call(xAxis);

    var yAxis = d3.svg.axis()
      .scale(yScale)
      .orient('left')
      .ticks(10);

    g.select('.yaxis')
      .transition()
      .call(yAxis);
  }

  chart.axis.update = updateAxis;

  chart.data = function (value) {
    if (!arguments.length) {
      return data;
    }

    data = value;

    return chart;
  };

  chart.width = function (value) {
    if (!arguments.length) {
      return data;
    }

    width = value;
    _innerWidth = value;

    return chart;
  };

  chart.height = function (value) {
    if (!arguments.length) {
      return data;
    }

    height = value;
    _innerHeight = value;

    return chart;
  };

  chart.thickness = function (value) {
    if (!arguments.length) {
      return data;
    }

    thickness = value;
    _innerWidth = width - thickness * 2 - 1;
    _innerHeight = height - thickness * 3;

    return chart;
  };

  return chart;
};
