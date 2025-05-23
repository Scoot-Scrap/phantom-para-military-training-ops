// File: components/VitalsChart.jsx

import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';                                           // D3 for high-performance charts 

export default function VitalsChart({ data }) {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const { width, height } = svg.node().getBoundingClientRect();

    const x = d3.scaleTime()
      .domain(d3.extent(data, d => new Date(d.timestamp)))
      .range([0, width]);

    const y = d3.scaleLinear()
      .domain(d3.extent(data, d => d.heartRate))
      .range([height, 0]);

    svg.selectAll('*').remove();

    const line = d3.line()
      .x(d => x(new Date(d.timestamp)))
      .y(d => y(d.heartRate));

    svg.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'var(--color-primary)')
      .attr('stroke-width', 2)
      .attr('d', line);
  }, [data]);

  return <svg ref={svgRef} style={{ width: '100%', height: 200 }} />;
}