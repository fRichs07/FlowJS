import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import Flow_colors from "../js_styles/colors.js";

const LineChart = ({ data, width, height }) => {
    const chartRef = useRef();

    useEffect(() => {
        // Margini per il grafico
        const margin = { top: 20, right: 30, bottom: 40, left: 40 };

        // Pulire il contenuto precedente del grafico (se esistente)
        d3.select(chartRef.current).selectAll('*').remove();

        // Creare un SVG
        const svg = d3
            .select(chartRef.current)
            .append('svg')
            .attr('width', width)
            .attr('height', height);

        // Scala per l'asse X (tempo)
        const x = d3
            .scaleTime()
            .domain(d3.extent(data, (d) => new Date(d.date)))
            .range([margin.left, width - margin.right]);

        // Scala per l'asse Y (valori delle spese)
        const y = d3
            .scaleLinear()
            .domain([0, d3.max(data, (d) => d.value)])
            .nice()
            .range([height - margin.bottom, margin.top]);

        // Linea per il grafico
        const line = d3
            .line()
            .x((d) => x(new Date(d.date)))
            .y((d) => y(d.value))
            .curve(d3.curveMonotoneX);

        // Aggiungere la linea
        svg
            .append('path')
            .datum(data)
            .attr('fill', 'none')
            .attr('stroke', Flow_colors.secondary_color)
            .attr('stroke-width', 4)
            .attr('d', line);

        // Aggiungere asse X
        svg
            .append('g')
            .attr('transform', `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(x).ticks(width / 80).tickFormat(d3.timeFormat('%b %d')))
            .call((g) => g.selectAll('path, line').style('stroke', 'white').style('fill', 'none').style('stroke-width', '3px'))
            .selectAll('text')
            .style('text-anchor', 'end')
            .style("font-size", "12px")
            .style("font-weight", "bold")
            .attr('transform', 'rotate(-45)');

        // Aggiungere asse Y
        svg
            .append('g')
            .attr('transform', `translate(${margin.left},0)`)
            .call(d3.axisLeft(y))
            .call((g) => g.selectAll('path, line').style('stroke', 'white').style('fill', 'none').style('stroke-width', '3px'))
            .selectAll('text')
            .style("font-size", "12px")
            .style("font-weight", "bold");

    }, [data, width, height]);

    return <div ref={chartRef}></div>;
};

export default LineChart;

