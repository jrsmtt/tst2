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



//new thing

import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const PivotChart = ({ data, dimensions, reportingMonth, metric }) => {
    const chartInstance = useRef(null);
  useEffect(() => {
    if(chartInstance.current){
                chartInstance.current.destroy();
            }
    if (data.length === 0 || dimensions.length === 0 || !reportingMonth || !metric) return;

    const pivotTable = {};
    data.forEach(entry => {
      const key = dimensions.map(dim => entry[dim]).join('-');
      if (!pivotTable[key]) {
        pivotTable[key] = {};
      }
      const monthYear = new Date(entry[reportingMonth]).toLocaleString('en-us', { month: 'short' }) + '-' + new Date(entry[reportingMonth]).getFullYear();
      pivotTable[key][monthYear] = entry[metric];
    });

    const labels = Object.keys(pivotTable[Object.keys(pivotTable)[0]]);
    const datasets = Object.keys(pivotTable).map(label => ({
      label: label,
      data: labels.map(monthYear => pivotTable[label][monthYear] || 0),
      backgroundColor: getRandomColor(),
    }));

    const ctx = document.getElementById('pivotChart').getContext('2d');
    chartInstance.current  = new Chart(ctx, {
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
  }, [data, dimensions, reportingMonth, metric]);

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



//second Update

import React, { useRef,useEffect } from 'react';
import Chart from 'chart.js/auto';

const PivotChart = ({ data, dimensions, reportingMonth, metric, dimension1 }) => {
    const chartInstance = useRef(null);
  useEffect(() => {
    if(chartInstance.current){
                chartInstance.current.destroy();
            }
    if (data.length === 0 || !dimension1 || !reportingMonth || !metric) return;

    const pivotTable = {};
    data.forEach(entry => {
      const key = entry[dimension1];
      if (!pivotTable[key]) {
        pivotTable[key] = {};
      }
      const monthYear = new Date(entry[reportingMonth]).toLocaleString('en-us', { month: 'short' }) + '-' + new Date(entry[reportingMonth]).getFullYear();
      pivotTable[key][monthYear] = entry[metric];
    });

    const labels = Object.keys(pivotTable[Object.keys(pivotTable)[0]]);
    const datasets = Object.keys(pivotTable).map(label => ({
      label: label,
      data: labels.map(monthYear => pivotTable[label][monthYear] || 0),
      backgroundColor: getRandomColor(),
    }));

    const ctx = document.getElementById('pivotChart').getContext('2d');
    chartInstance.current = new Chart(ctx, {
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
  }, [data, dimensions, reportingMonth, metric, dimension1]);

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


onClick: (e, legendItem) => {
              const index = legendItem.datasetIndex;
              const chart = legendItem.chart;
              const meta = chart.getDatasetMeta(index);

              // Toggle visibility of dataset when legend item is clicked
              meta.hidden = meta.hidden === null ? !chart.data.datasets[index].hidden : null;
              chart.update();
            },
