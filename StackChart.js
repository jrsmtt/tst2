import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const PivotChart = ({ jsonData, pivotTableKey }) => {
  const [pivotData, setPivotData] = useState(null);
  const [selectedOption, setSelectedOption] = useState('chart');
  const chartInstance = useRef(null);

  useEffect(() => {
    if (jsonData) {
      const data = JSON.parse(jsonData);

      const pivotTable = {};
      data.forEach(entry => {
        const month = new Date(entry.reporting_month).toLocaleString('en-us', { month: 'short' });
        const year = new Date(entry.reporting_month).getFullYear();
        const key = `${year}-${month}`;
        const pivotKey = generatePivotKey(entry, pivotTableKey);
        
        if (!pivotTable[key]) {
          pivotTable[key] = {};
        }
        if (!pivotTable[key][pivotKey]) {
          pivotTable[key][pivotKey] = {};
        }
        pivotTable[key][pivotKey][entry.product] = entry.open_accounts;
      });

      setPivotData(pivotTable);
    }
  }, [jsonData, pivotTableKey]);

  useEffect(() => {
    if (pivotData) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      if (selectedOption === 'chart') {
        renderChart();
      }
    }
  }, [pivotData, selectedOption]);

  const renderChart = () => {
    const labels = Object.keys(pivotData);
    const portfolios = labels.length > 0 ? Object.keys(pivotData[labels[0]]) : [];
    const datasets = portfolios.map((portfolio, index) => {
      const data = labels.map(label => {
        return Object.values(pivotData[label][portfolio]).reduce((acc, val) => acc + val, 0);
      });
      return {
        label: portfolio,
        data: data,
        backgroundColor: getRandomColor(),
        borderColor: getRandomColor(),
        borderWidth: 1,
      };
    });

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
        legend: {
          display: true,
          position: 'bottom',
        },
        plugins: {
          title: {
            display: true,
            text: 'Pivot Chart',
          },
        },
      },
    });
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      <select value={selectedOption} onChange={handleOptionChange}>
        <option value="chart">Chart</option>
        <option value="table">Table</option>
      </select>
      {selectedOption === 'chart' && (
        <canvas id="pivotChart" width="400" height="400"></canvas>
      )}
      {selectedOption === 'table' && renderTable()}
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

function generatePivotKey(entry, pivotTableKey) {
  if (Array.isArray(pivotTableKey)) {
    return pivotTableKey.map(key => entry[key]).join('-');
  } else {
    return entry[pivotTableKey];
  }
}

export default PivotChart;
