import React, { useEffect } from 'react';
import Chart from 'chart.js/auto';

const PivotChart = ({ data, dimension1, metric }) => {
  useEffect(() => {
    if (data.length === 0 || !dimension1 || !metric) return;

    const pivotTable = {};
    data.forEach(entry => {
      const reportingMonth = new Date(entry.reporting_month);
      const monthYear = `${reportingMonth.toLocaleString('en-us', { month: 'short' })}-${reportingMonth.getFullYear()}`;
      if (!pivotTable[entry[dimension1]]) {
        pivotTable[entry[dimension1]] = {};
      }
      pivotTable[entry[dimension1]][monthYear] = entry[metric];
    });

    const labels = Object.keys(pivotTable[Object.keys(pivotTable)[0]]);
    const datasets = Object.keys(pivotTable).map(label => ({
      label: label,
      data: labels.map(monthYear => pivotTable[label][monthYear] || 0),
      backgroundColor: getRandomColor(),
    }));

    const ctx = document.getElementById('pivotChart').getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: datasets,
      },
      options: {
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true,
            beginAtZero: true,
          },
        },
      },
    });
  }, [data, dimension1, metric]);

  return (
    <div>
      <canvas id="pivotChart" width="400" height="400"></canvas>
    </div>
  );
};

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export default PivotChart;
