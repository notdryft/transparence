/* global d3, fixtures, describe, it, spyOn, expect */

'use strict';

describe('Lines chart', function () {

  it('should exists', function () {
    expect(d3).not.toEqual(null);
    expect(d3.chart).not.toEqual(null);
    expect(d3.chart.lines).not.toEqual(null);
  });

  it('should not be initialized by default', function () {
    var lines = d3.chart.lines();

    expect(lines.data()).toBe(undefined);
    expect(lines.height()).toBe(undefined);
    expect(lines.width()).toBe(undefined);
    expect(lines.thickness()).toBe(undefined);
  });

  it('should have mutators that can be used as accessors', function () {
    var lines = d3.chart.lines();

    lines.data(fixtures.lines.sample.empty);
    expect(lines.data()).toEqual(fixtures.lines.expected.empty);

    lines.height(1);
    expect(lines.height()).toBe(1);

    lines.width(2);
    expect(lines.width()).toBe(2);

    lines.thickness(3);
    expect(lines.thickness()).toBe(3);
  });

  it("should have chainable mutators", function () {
    var lines = d3.chart.lines();

    var l1 = lines.data([]);
    expect(l1).toEqual(lines);

    var l2 = l1.height(1);
    expect(l2).toEqual(l1);

    var l3 = l2.width(2);
    expect(l3).toEqual(l2);

    var l4 = l3.thickness(3);
    expect(l4).toEqual(l3);
  });

  it('should not prematurely update on creation', function () {
    var lines = d3.chart.lines();
    spyOn(lines, 'update');

    lines(d3.select('svg'));
    expect(lines.update).not.toHaveBeenCalled();
  });
});
