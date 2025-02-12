import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import Flow_colors from "../js_styles/colors.js";

const BarChart = ({ data, width, height }) => {
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

        // Scala per l'asse X
        const x = d3
            .scaleBand()
            .domain(data.map((d) => d.label))
            .range([margin.left, width - margin.right])
            .padding(0.1);

        // Scala per l'asse Y
        const y = d3
            .scaleLinear()
            .domain([0, d3.max(data, (d) => d.value)])
            .nice()
            .range([height - margin.bottom, margin.top]);

        // Aggiungere le barre
        svg
            .selectAll('.bar')
            .data(data)
            .join('rect')
            .attr('class', 'bar')
            .attr('x', (d) => x(d.label))
            .attr('y', (d) => y(d.value))
            .attr('height', (d) => y(0) - y(d.value))
            .attr('width', x.bandwidth())
            .attr('fill', Flow_colors.secondary_color);

        // Aggiungere asse X
        svg
            .append('g')
            .attr('transform', `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(x));

        // Aggiungere asse Y
        svg
            .append('g')
            .attr('transform', `translate(${margin.left},0)`)
            .call(d3.axisLeft(y));
    }, [data, width, height]);

    return <div ref={chartRef}></div>;
};

export default BarChart;
