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













import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const PivotChart = ({ jsonData }) => {
  const [pivotData, setPivotData] = useState(null);
  const [selectedOption, setSelectedOption] = useState('chart');
  const chartInstance = useRef(null);

  useEffect(() => {
    if (jsonData) {
      const data = JSON.parse(jsonData);

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
    const datasets = portfolios.map(portfolio => {
      const data = labels.map(label => {
        return Object.values(pivotData[label][portfolio]).reduce((acc, val) => acc + val, 0);
      });
      return {
        label: portfolio,
        data: data,
        backgroundColor: getRandomColor(),
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
      },
    });
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const renderTable = () => {
    return (
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
    );
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

export default PivotChart;



<table>
  <thead>
    <tr>
      <th>Portfolio</th>
      {Object.keys(pivotData || {}).map(month => (
        <th key={month}>{month}</th>
      ))}
    </tr>
  </thead>
  <tbody>
    {Object.keys(pivotData && pivotData[Object.keys(pivotData)[0]] || {}).map(portfolio => (
      <tr key={portfolio}>
        <td>{portfolio}</td>
        {Object.values(pivotData || {}).map(monthData => (
          <td key={portfolio + '-' + monthData}>{monthData[portfolio] || 0}</td>
        ))}
      </tr>
    ))}
  </tbody>
</table>




const renderTable = () => {
    // Extract months and portfolios from pivotData
    const months = Object.keys(pivotData || {});
    const portfolios = Object.keys(pivotData && pivotData[months[0]] || {});

    return (
      <table>
        <thead>
          <tr>
            <th>Portfolio</th>
            {months.map(month => (
              <th key={month}>{month}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {portfolios.map(portfolio => (
            <tr key={portfolio}>
              <td>{portfolio}</td>
              {months.map(month => (
                <td key={`${portfolio}-${month}`}>
                  {pivotData[month]?.[portfolio]
                    ? Object.values(pivotData[month][portfolio]).reduce((acc, val) => acc + val, 0)
                    : 0
                  }
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
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


const renderTable = () => {
  // Extract months and portfolios from pivotData
  const months = Object.keys(pivotData || {});
  const portfolios = Object.keys(pivotData && pivotData[months[0]] || {});

  return (
    <div style={{ maxWidth: '800px', overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ddd' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th style={{ padding: '8px', border: '1px solid #ddd' }}>Portfolio</th>
            {months.map(month => (
              <th key={month} style={{ padding: '8px', border: '1px solid #ddd' }}>{month}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {portfolios.map((portfolio, index) => (
            <tr key={portfolio} style={{ border: '1px solid #ddd', borderTop: index === 0 ? 'none' : '1px solid #ddd' }}>
              <td style={{ padding: '8px', borderRight: '1px solid #ddd' }}>{portfolio}</td>
              {months.map(month => (
                <td key={`${portfolio}-${month}`} style={{ padding: '8px', borderRight: '1px solid #ddd' }}>
                  {pivotData[month]?.[portfolio]
                    ? Object.values(pivotData[month][portfolio]).reduce((acc, val) => acc + val, 0)
                    : 0
                  }
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

