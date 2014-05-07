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
    var xScale = d3.time.scale()
      .domain(d3.extent(data, function (d) {
        return d.millis;
      }))
      .range([0, _innerWidth]);

    var maxBonus = d3.max(data, function (d) {
      return d.bonus();
    });

    var yScale = d3.scale.linear()
      .domain([0, maxBonus])
      .range([_innerHeight, 0]);

    var line = d3.svg.line()
      .interpolate('basis')
      .x(function (d) {
        return xScale(d.millis);
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

  function dateFormat(date) {
    if (date.getMonth() === 0) {
      return d3.time.format('%b %y')(date);
    }

    return d3.time.format('%b')(date);
  }

  function lineWrapIfContains(text, regex) {
    text.each(function () {
      var textNode = d3.select(this);
      var originalContent = textNode.text();

      if (originalContent.match(regex)) {
        var y = textNode.attr('y');
        var dy = parseFloat(textNode.attr('dy'));

        var words = originalContent.split(regex);

        var content = textNode.text(null);
        for (var i = 0; i < words.length; i++) {
          var word = words[i];

          content.append('tspan')
            .attr({
              x: 0,
              y: y,
              dy: i * 1.1 + dy + 'em'
            })
            .text(word);
        }
      }
    });
  }

  function updateAxis() {
    var xScale = d3.time.scale()
      .domain(d3.extent(data, function (d) {
        return d.millis;
      }))
      .range([0, _innerWidth]);

    var maxBonus = d3.max(data, function (d) {
      return d.bonus();
    });

    var yScale = d3.scale.linear()
      .domain([0, maxBonus])
      .range([_innerHeight, 0]);

    var xAxis = d3.svg.axis()
      .scale(xScale)
      .orient('bottom')
      .ticks(data.length)
      .tickFormat(dateFormat);

    g.select('.xaxis')
      .transition()
      .call(xAxis)
      .selectAll('.tick text')
      .call(lineWrapIfContains, /\s+/);

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
    _innerWidth = width - thickness * 3 - 1;
    _innerHeight = height - thickness * 3;

    return chart;
  };

  return chart;
};
