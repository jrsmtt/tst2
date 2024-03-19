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
