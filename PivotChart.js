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
