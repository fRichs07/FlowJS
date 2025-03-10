import React, {useEffect, useRef} from 'react';
import * as d3 from 'd3';

const MonthlyExpensesChart = ({ data, width = 800, height = 500 }) => {
    const chartRef = useRef();

    useEffect(() => {
        // Pulire eventuali contenuti precedenti
        d3.select(chartRef.current).selectAll('*').remove();

        // Definire i margini per il grafico
        const margin = { top: 20, right: 30, bottom: 40, left: 50 };

        // Creazione dell'SVG
        const svg = d3
            .select(chartRef.current)
            .append('svg')
            .attr('width', width)
            .attr('height', height);

        // 1. Estrai i mesi e i tag univoci dai dati
        const months = Array.from(new Set(data.map(d => d.month)));
        const tags = Array.from(new Set(data.map(d => d.tag)));

        // 2. Aggrega i dati per mese: per ogni mese crea un oggetto con la somma delle spese per ogni tag
        const aggregatedData = months.map(month => {
            const monthData = data.filter(d => d.month === month);
            const entry = { month };
            tags.forEach(tag => {
                entry[tag] = d3.sum(monthData.filter(d => d.tag === tag), d => d.value) || 0;
            });
            return entry;
        });

        // 3. Crea lo stack dei dati utilizzando i tag come chiavi
        const stackGenerator = d3.stack()
            .keys(tags);
        const stackedData = stackGenerator(aggregatedData);

        // 4. Crea le scale
        // Scala X: per i mesi
        const x = d3.scaleBand()
            .domain(months)
            .range([margin.left, width - margin.right])
            .padding(0.1);

        // Scala Y: da 0 al valore massimo (somma per ogni mese)
        const maxTotal = d3.max(aggregatedData, d => d3.sum(tags, tag => d[tag]));
        const y = d3.scaleLinear()
            .domain([0, maxTotal])
            .nice()
            .range([height - margin.bottom, margin.top]);

        // Scala colore: usa una palette di default o i colori definiti in Flow_colors
        const color = d3.scaleOrdinal()
            .domain(tags)
            .range(d3.schemeTableau10);

        // 5. Disegna le barre impilate e aggiungi il testo per il tag
        const groups = svg.append('g')
            .selectAll('g')
            .data(stackedData)
            .join('g')
            .attr('fill', d => color(d.key));

        // Disegna i rettangoli
        groups.selectAll('rect')
            .data(d => d)
            .join('rect')
            .attr('x', d => x(d.data.month))
            .attr('y', d => y(d[1]))
            .attr('height', d => y(d[0]) - y(d[1]))
            .attr('width', x.bandwidth());

        // Aggiungi i testi per il tag all'interno di ogni segmento
        groups.selectAll('text')
            .data(d => d)
            .join('text')
            .attr('x', d => x(d.data.month) + x.bandwidth() / 2)
            .attr('y', d => y(d[1]) + (y(d[0]) - y(d[1])) / 2)
            .attr('text-anchor', 'middle')
            // Imposta il colore del testo in base al contrasto
            .attr('fill', 'white')
            .style('font-size', '10px')
            .text(function(d) {
                // Calcola l'altezza del segmento
                const segmentHeight = Math.abs(y(d[0]) - y(d[1]));
                // Se il segmento è troppo piccolo (quindi il valore è zero o quasi), non mostrare il testo
                if (segmentHeight < 12) return "";
                // Recupera il tag dal gruppo padre
                return d3.select(this.parentNode).datum().key;
            });

        // 6. Aggiungi l'asse X
        svg.append('g')
            .attr('transform', `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(x));

        // 7. Aggiungi l'asse Y
        svg.append('g')
            .attr('transform', `translate(${margin.left},0)`)
            .call(d3.axisLeft(y));

    }, [data, width, height]);

    return <div ref={chartRef}></div>;
};

export default MonthlyExpensesChart;
