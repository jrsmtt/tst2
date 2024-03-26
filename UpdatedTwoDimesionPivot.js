import React, { useEffect } from 'react';
import Chart from 'chart.js/auto';

const PivotChart = ({ data }) => {
  useEffect(() => {
    if (data.length === 0) return;

    const pivotTable = {};
    data.forEach(entry => {
      if (!pivotTable[entry.dimension1]) {
        pivotTable[entry.dimension1] = {};
      }
      const reportingMonth = new Date(entry.reporting_month);
      const monthYear = `${reportingMonth.toLocaleString('en-us', { month: 'short' })}-${reportingMonth.getFullYear()}`;
      pivotTable[entry.dimension1][monthYear] = entry.metric;
    });

    const labels = Object.keys(pivotTable[Object.keys(pivotTable)[0]]);
    const datasets = Object.keys(pivotTable).map(dimension1 => ({
      label: dimension1,
      data: labels.map(monthYear => pivotTable[dimension1][monthYear] ? pivotTable[dimension1][monthYear] : 0),
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
  }, [data]);

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
