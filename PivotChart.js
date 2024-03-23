//PivotChart.js
import React from 'react';
import Plot from 'react-plotly.js';

const PivotChart = ({ jsonData }) => {

    const data = JSON.parse(jsonData);
  // Transform data into pivot format
  const pivotData = processData(data);

  // Extract unique portfolios, products, and reporting months
  const portfolios = [...new Set(data.map(item => item.portfolio))];
  const products = [...new Set(data.map(item => item.product))];
  const reportingMonths = [...new Set(data.map(item => item.reporting_month))];

  // Prepare data for the pivot chart
  const chartData = portfolios.map(portfolio => ({
    x: reportingMonths,
    y: products.map(product => pivotData[portfolio][product] || 0),
    type: 'bar',
    name: portfolio
  }));

  return (
    <Plot
      data={chartData}
      layout={{
        title: 'Open Accounts by Portfolio and Product',
        barmode: 'stack', // Stack bars for different portfolios
        xaxis: { title: 'Reporting Month' },
        yaxis: { title: 'Open Accounts' },
        margin: { t: 50, r: 50, l: 50, b: 50 }
      }}
    />
  );
};

const processData = (data) => {
  // Initialize pivot data structure
  const pivotData = {};

  // Process data and populate pivot structure
  data.forEach(item => {
    if (!pivotData[item.portfolio]) {
      pivotData[item.portfolio] = {};
    }
    if (!pivotData[item.portfolio][item.product]) {
      pivotData[item.portfolio][item.product] = {};
    }
    pivotData[item.portfolio][item.product][item.reporting_month] = item.open_accounts;
  });

  return pivotData;
};

export default PivotChart;




import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';

const PivotChart = ({ jsonData }) => {
  const [pivotData, setPivotData] = useState(null);

  useEffect(() => {
    if (jsonData) {
      // Step 1: Parse JSON string into JavaScript object
      const data = JSON.parse(jsonData);

      // Step 2: Create pivot table structure
      const pivotTable = {};
      data.forEach(entry => {
        const month = new Date(entry.reporting_month).getMonth() + 1;
        const year = new Date(entry.reporting_month).getFullYear();
        const key = `${year}-${month}`;
        if (!pivotTable[key]) {
          pivotTable[key] = {};
        }
        if (!pivotTable[key][entry.portfolio]) {
          pivotTable[key][entry.portfolio] = {};
        }
        pivotTable[key][entry.portfolio][entry.product] = entry.open_accounts;
      });

      setPivotData(pivotTable);
    }
  }, [jsonData]);

  useEffect(() => {
    if (pivotData) {
      // Step 4: Create chart using pivot table data
      const labels = Object.keys(pivotData);
      const portfolios = Object.keys(pivotData[labels[0]]);
      const datasets = portfolios.map(portfolio => {
        return {
          label: portfolio,
          data: labels.map(label => {
            return Object.values(pivotData[label][portfolio]).reduce((acc, val) => acc + val, 0);
          }),
          backgroundColor: getRandomColor(),
        };
      });

      const ctx = document.getElementById('pivotChart').getContext('2d');
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: datasets,
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }, [pivotData]);

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





<table>
        <thead>
          <tr>
            <th>Month</th>
            {Object.keys(pivotData && pivotData[Object.keys(pivotData)[0]] || {}).map(portfolio => (
              <th key={portfolio}>{portfolio}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.keys(pivotData || {}).map(month => (
            <tr key={month}>
              <td>{month}</td>
              {Object.values(pivotData[month] || {}).map(portfolioData => (
                <td key={Object.keys(portfolioData).join('-')}>{Object.values(portfolioData).reduce((acc, val) => acc + val, 0)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

