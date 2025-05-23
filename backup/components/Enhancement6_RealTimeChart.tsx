// components/Enhancement6_RealTimeChart.tsx
import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

type DataPoint = { time: Date; value: number };

export default function RealTimeChart({ data }: { data: DataPoint[] }) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const width = 500,
      height = 200;
    const x = d3
      .scaleTime()
      .domain(d3.extent(data, (d) => d.time) as [Date, Date])
      .range([0, width]);
    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value)!])
      .range([height, 0]);
    const line = d3
      .line<DataPoint>()
      .x((d) => x(d.time))
      .y((d) => y(d.value));

    svg.selectAll("*").remove();
    svg
      .attr("viewBox", `0 0 ${width} ${height}`)
      .append("path")
      .datum(data)
      .attr("d", line as any)
      .attr("fill", "none")
      .attr("stroke", "steelblue");
  }, [data]);

  return <svg ref={svgRef} />;
}
