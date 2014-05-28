/* global d3, describe, it, spyOn, expect */

'use strict';

describe('Lines chart', function () {

  it('should exists', function () {
    expect(d3).not.toEqual(null);
    expect(d3.chart).not.toEqual(null);
    expect(d3.chart.lines).not.toEqual(null);
  });

  it('should not prematurely update on creation', function () {
    var lines = d3.chart.lines();
    spyOn(lines, 'update');

    lines(d3.select('svg'));
    expect(lines.update).not.toHaveBeenCalled();
  });
});
