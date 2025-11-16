import { useEffect, useRef } from "react";
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

export default function Graph({ data }) {
    const svgRef = useRef();

    useEffect(() => {
        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove(); // Clear old content

        const width = 600;
        const height = 200;

        svg.attr("width", width).attr("height", height);

        // Define scales
        const x = d3.scaleLinear().domain([0, data.length]).range([0, width]);
        const y = d3.scaleLinear().domain([0, d3.max(data)]).range([height, 0]);

        // Create line generator
        const line = d3.line()
            .x((d, i) => x(i))
            .y((d) => y(d))
            .curve(d3.curveMonotoneX);

        // Append path to SVG
        svg.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 2)
            .attr("d", line);
    }, [data]); // Re-run effect when data updates

    return (
        <svg ref={svgRef} className="border border-secondary rounded mt-3"></svg>
    );
}
