// LineChart.js
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const LineChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!chartRef.current || !data) return;

    const labels = data.map(point => point.x);
    const values = data.map(point => point.y);

    const chart = new Chart(chartRef.current, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Line Chart',
          data: values,
          borderColor: 'blue',
          fill: false
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });

    return () => chart.destroy();
  }, [data]);

  return <canvas ref={chartRef}></canvas>;
};

export default LineChart;



import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const LineChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!chartRef.current || typeof data !== 'string') return;

    // Parse the JSON string into a JavaScript object
    const parsedData = JSON.parse(data);

    if (!Array.isArray(parsedData)) return;

    // Extract unique reporting months
    const reportingMonths = [...new Set(parsedData.map(item => item.reportingMonth))];

    // Create datasets for each product
    const datasets = {};

    parsedData.forEach(item => {
      if (!datasets[item.product]) {
        datasets[item.product] = {
          label: item.product,
          data: [],
          borderColor: getRandomColor(), // Function to generate random colors
          fill: false
        };
      }

      const index = reportingMonths.indexOf(item.reportingMonth);
      datasets[item.product].data[index] = item.value;
    });

    const chart = new Chart(chartRef.current, {
      type: 'line',
      data: {
        labels: reportingMonths,
        datasets: Object.values(datasets)
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });

    return () => chart.destroy();
  }, [data]);

  return <canvas ref={chartRef}></canvas>;
};

export default LineChart;

