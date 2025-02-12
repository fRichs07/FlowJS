import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import Flow_colors from "../js_styles/colors.js";

const GaugeChart = ({ width = 400, percentage = 0 }) => {
    const chartRef = useRef();

    useEffect(() => {
        const height = Math.min(400, width / 2);
        const outerRadius = height / 2 - 10;
        const innerRadius = outerRadius * 0.75;
        const tau = 2 * Math.PI;

        // Clear previous content
        d3.select(chartRef.current).selectAll('*').remove();

        // Create SVG
        const svg = d3
            .select(chartRef.current)
            .append('svg')
            .attr('viewBox', `0 0 ${width} ${outerRadius*2+10}`)

        // Create group element and center it
        const g = svg
            .append('g')
            .attr('transform', `translate(${width / 2}, ${height / 2})`);

        // Arc generator
        const arc = d3
            .arc()
            .innerRadius(innerRadius)
            .outerRadius(outerRadius)
            .startAngle(0);

        // Background arc
        g.append('path')
            .datum({ endAngle: tau })
            .style('fill', Flow_colors.background_color)
            .attr('d', arc);

        // Foreground arc
        g.append('path')
            .datum({ endAngle: percentage * tau })
            .style('fill', Flow_colors.secondary_color)
            .attr('d', arc);

        // Add percentage text
        g.append('text')
            .attr('text-anchor', 'middle')
            .attr('dy', '.35em') // Adjust vertical alignment
            .style('font-size', '.5em')
            .style('font-weight', 'bold')
            .style('fill', Flow_colors.text_color)
            .text(`${Math.round(percentage * 100)}%`);
    }, [width, percentage]);

    return <div style={{ marginBottom: '15px' }}  ref={chartRef}></div>;
};

export default GaugeChart;
