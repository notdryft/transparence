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

  var _data;
  var _innerWidth;
  var _innerHeight;

  function chart(container) {
    g = container;

    var twice = thickness * 2;

    // chart

    g.append('g')
      .classed('bonuses', true)
      .attr('transform', 'translate(' + [twice, thickness] + ')');

    // axis

    g.append('g')
      .classed('xaxis axis', true)
      .attr('transform', 'translate(' + [twice, height - twice] + ')');

    g.append('g')
      .classed('yaxis axis', true)
      .attr('transform', 'translate(' + [twice, thickness] + ')');

    update();
  }

  function update() {
    var xScale = d3.time.scale()
      .domain(d3.extent(_data, function (d) {
        return d.millis;
      }))
      .range([0, _innerWidth]);

    var maxBonus = d3.max(data, function (d) {
      return d3.max(d.values, function (dd) {
        return dd.bonus;
      });
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
        return yScale(d.bonus);
      });

    var colorScale = d3.scale.category20()
      .domain(data.map(function (d) {
        return d.name;
      }));

    _updateAxis(xScale, yScale);
    _updateChart(line, colorScale);
  }

  function _updateChart(line, colorScale) {
    var bonus =
      g.select('.bonuses')
        .selectAll('.bonus')
        .data(data);

    var bonusEnter =
      bonus.enter()
        .append('g')
        .classed('bonus', true);

    bonusEnter.append('path')
      .style('stroke', function (d) {
        return colorScale(d.name);
      });

    var transition =
      g.select('.bonuses')
        .selectAll('.bonus')
        .transition()
        .duration(1000);

    transition.select('path')
      .attr('d', function (d) {
        return line(d.values);
      });
  }

  function _dateFormat(date) {
    if (date.getMonth() === 0) {
      return d3.time.format('%b %y')(date);
    }

    return d3.time.format('%b')(date);
  }

  function _lineWrapIfMatch(text, regex) {
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

  function _updateAxis(xScale, yScale) {
    var xAxis = d3.svg.axis()
      .scale(xScale)
      .orient('bottom')
      .ticks(_data.length)
      .tickFormat(_dateFormat);

    g.select('.xaxis')
      .transition()
      .call(xAxis)
      .selectAll('.tick text')
      .call(_lineWrapIfMatch, /\s+/);

    var yAxis = d3.svg.axis()
      .scale(yScale)
      .orient('left')
      .ticks(10);

    g.select('.yaxis')
      .transition()
      .call(yAxis);
  }

  chart.update = update;

  function _mapData(data) {
    function _mapValues(data, ideal) {
      return data.map(function (d) {

        return {
          bonus: ideal ? d[ideal].bonus() : d.bonus(),
          millis: d.millis
        };
      });
    }

    var bonus = {
      name: 'Real bonus',
      values: _mapValues(data)
    };

    var ideal = {
      name: 'Ideal bonus',
      values: _mapValues(data, 'ideal')
    };

    return [bonus, ideal];
  }

  chart.data = function (value) {
    if (!arguments.length) {
      return data;
    }

    _data = value;
    data = _mapData(_data);

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
