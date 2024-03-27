Updated Pivot
import React from 'react';

const PivotTable = ({ data }) => {
  // Function to extract unique values from an array of objects for a given key
  const getUniqueValues = (arr, key) => {
    return Array.from(new Set(arr.map(item => item[key])));
  };

  // Function to calculate the sum of metrics for each dimension and reporting month
  const calculateMetrics = (arr, dimensionValues, reportingMonths) => {
    const pivotTable = {};

    // Initialize pivot table
    dimensionValues.forEach(dimensionValue => {
      pivotTable[dimensionValue] = {};
      reportingMonths.forEach(month => {
        pivotTable[dimensionValue][month] = 0;
      });
    });

    // Calculate metrics
    arr.forEach(item => {
      pivotTable[item.dimension1][item.reporting_month] += item.metric;
    });

    return pivotTable;
  };




  //final Ouput

  const PivotTable = ({ jsonData, dimensions, reportingMonth, metric }) => {
  // Function to generate the pivot table data
  const data = JSON.parse(jsonData);
  const generatePivotTableData = () => {
    const pivotTable = {};
    // Loop through the data to create the pivot table
    data.forEach(entry => {
      const key = entry[dimensions[0]]; // Dimension 1 as key
      const monthYear = new Date(entry[reportingMonth]).toLocaleString('en-us', { month: 'short' }) + '-' + new Date(entry[reportingMonth]).getFullYear(); // Reporting month
      // Initialize the pivot table object if key does not exist
      if (!pivotTable[key]) {
        pivotTable[key] = {};
      }
      // Assign metric value to the pivot table
      pivotTable[key][monthYear] = entry[metric];
    });
    return pivotTable;
  };

  // Function to render the pivot table header
  const renderTableHeader = () => {
    return (
      <tr>
        <th>{dimensions[0]}</th>
        {Object.keys(pivotTable[Object.keys(pivotTable)[0]]).map(monthYear => (
          <th key={monthYear}>{monthYear}</th>
        ))}
      </tr>
    );
  };

  // Function to render the pivot table body
  const renderTableBody = () => {
    return Object.entries(pivotTable).map(([label, data]) => (
      <tr key={label}>
        <td>{label}</td>
        {Object.values(data).map((value, index) => (
          <td key={index}>{value || 0}</td>
        ))}
      </tr>
    ));
  };

  const pivotTable = generatePivotTableData(); // Generate pivot table data

  return (
    <div>
      <table style={{ border: '1px solid black', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          {renderTableHeader()}
        </thead>
        <tbody>
          {renderTableBody()}
        </tbody>
      </table>
    </div>
  );
};

export default PivotTable;




//special
  import React, { useState, useEffect } from 'react';

const PivotTable = ({ data, dimensions, reportingMonth, metric, dimension1 }) => {
  const [pivotData, setPivotData] = useState([]);
  const [pivotTable, setPivotTable] = useState({}); // Initialize empty object

  useEffect(() => {
    if (data.length === 0 || !dimension1 || !reportingMonth || !metric) return;

    const newPivotTable = {}; // Create a new object for each update
    data.forEach(entry => {
      const key = entry[dimension1];
      if (!newPivotTable[key]) {
        newPivotTable[key] = {};
      }
      const monthYear = new Date(entry[reportingMonth]).toLocaleString('en-us', { month: 'short' }) + '-' + new Date(entry[reportingMonth]).getFullYear();
      newPivotTable[key][monthYear] = (newPivotTable[key][monthYear] || 0) + entry[metric];
    });

    setPivotTable(newPivotTable); // Update pivotTable state
    const tableData = Object.keys(newPivotTable).map(rowLabel => ({
      [dimension1]: rowLabel,
      ...Object.entries(newPivotTable[rowLabel]).reduce((acc, [monthYear, value]) => {
        acc[monthYear] = value;
        return acc;
      }, {}),
    }));

    setPivotData(tableData);
  }, [data, dimensions, reportingMonth, metric, dimension1]);

  return (
    <div className="pivot-table">
      <table>
        <thead>
          <tr>
            <th>{dimension1}</th>
            {Object.keys(pivotData.length > 0 ? pivotData[0] : {}) // Handle empty data gracefully
              .map(monthYear => (
                <th key={monthYear}>{monthYear}</th>
              ))}
          </tr>
        </thead>
        <tbody>
          {pivotData.map((row, index) => (
            <tr key={index}>
              {Object.entries(row).map(([key, value]) => (
                <td key={key}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PivotTable;


  if (!data || data.length === 0) {
    return <div>No data available</div>;
  }

  // Extract unique dimension values and reporting months
  const dimensionValues = getUniqueValues(data, 'dimension1');
  const reportingMonths = getUniqueValues(data, 'reporting_month');

  // Calculate metrics for the pivot table
  const pivotTable = calculateMetrics(data, dimensionValues, reportingMonths);

  return (
    <table border="1">
      <thead>
        <tr>
          <th>Dimension</th>
          {reportingMonths.map(month => (
            <th key={month}>{month}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {dimensionValues.map(dimensionValue => (
          <tr key={dimensionValue}>
            <td>{dimensionValue}</td>
            {reportingMonths.map(month => (
              <td key={`${dimensionValue}-${month}`}>{pivotTable[dimensionValue][month]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PivotTable;




//Updated One plus

import React, { useEffect, useRef } from 'react';

const PivotTable = ({ data, reportingMonth, metric, dimension1 }) => {
    const chartInstance = useRef(null);

    useEffect(() => {
        if (chartInstance.current) {
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

        renderPivotTable(pivotTable);
    }, [data, reportingMonth, metric, dimension1]);

    const renderPivotTable = (pivotTable) => {
        const table = document.createElement('table');
        const thead = document.createElement('thead');
        const tbody = document.createElement('tbody');

        // Create header row
        const headerRow = document.createElement('tr');
        const headerCell = document.createElement('th');
        headerCell.textContent = dimension1;
        headerRow.appendChild(headerCell);
        for (const monthYear in pivotTable[Object.keys(pivotTable)[0]]) {
            const monthYearParts = monthYear.split('-');
            const month = monthYearParts[0];
            const year = monthYearParts[1];
            const monthYearCell = document.createElement('th');
            monthYearCell.textContent = `${month} ${year}`;
            headerRow.appendChild(monthYearCell);
        }
        thead.appendChild(headerRow);

        // Create body rows
        for (const dimensionValue in pivotTable) {
            const bodyRow = document.createElement('tr');
            const dimensionCell = document.createElement('td');
            dimensionCell.textContent = dimensionValue;
            bodyRow.appendChild(dimensionCell);
            for (const monthYear in pivotTable[dimensionValue]) {
                const metricValue = pivotTable[dimensionValue][monthYear];
                const metricCell = document.createElement('td');
                metricCell.textContent = metricValue;
                bodyRow.appendChild(metricCell);
            }
            tbody.appendChild(bodyRow);
        }

        table.appendChild(thead);
        table.appendChild(tbody);

        const pivotChartContainer = document.getElementById('pivotChart');
        pivotChartContainer.innerHTML = '';
        pivotChartContainer.appendChild(table);
    };

    return (
        <div id="pivotChart"></div>
    );
};

export default PivotTable;




//special One

import React, { useState, useEffect } from 'react';

const PivotTable = ({ data, dimensions, reportingMonth, metric, dimension1 }) => {
  const [pivotData, setPivotData] = useState([]);
  const [pivotTable, setPivotTable] = useState({}); // Initialize empty object

  useEffect(() => {
    if (data.length === 0 || !dimension1 || !reportingMonth || !metric) return;

    const newPivotTable = {}; // Create a new object for each update
    data.forEach(entry => {
      const key = entry[dimension1];
      if (!newPivotTable[key]) {
        newPivotTable[key] = {};
      }
      const monthYear = new Date(entry[reportingMonth]).toLocaleString('en-us', { month: 'short' }) + '-' + new Date(entry[reportingMonth]).getFullYear();
      newPivotTable[key][monthYear] = (newPivotTable[key][monthYear] || 0) + entry[metric];
    });

    setPivotTable(newPivotTable); // Update pivotTable state
    const tableData = Object.keys(newPivotTable).map(rowLabel => ({
      [dimension1]: rowLabel,
      ...Object.entries(newPivotTable[rowLabel]).reduce((acc, [monthYear, value]) => {
        acc[monthYear] = value;
        return acc;
      }, {}),
    }));

    setPivotData(tableData);
  }, [data, dimensions, reportingMonth, metric, dimension1]);

  return (
    <div className="pivot-table">
      <table>
        <thead>
          <tr>
            <th>{dimension1}</th>
            {Object.keys(pivotData.length > 0 ? pivotData[0] : {}) // Handle empty data gracefully
              .map(monthYear => (
                <th key={monthYear}>{monthYear}</th>
              ))}
          </tr>
        </thead>
        <tbody>
          {pivotData.map((row, index) => (
            <tr key={index}>
              {Object.entries(row).map(([key, value]) => (
                <td key={key}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PivotTable;


//final one

const PivotTable = ({ jsonData, dimensions, reportingMonth, metric }) => {
  // Function to generate the pivot table data
  const data = JSON.parse(jsonData);
  const generatePivotTableData = () => {
    const pivotTable = {};
    // Loop through the data to create the pivot table
    data.forEach(entry => {
      const key = entry[dimensions[0]]; // Dimension 1 as key
      const monthYear = new Date(entry[reportingMonth]).toLocaleString('en-us', { month: 'short' }) + '-' + new Date(entry[reportingMonth]).getFullYear(); // Reporting month
      // Initialize the pivot table object if key does not exist
      if (!pivotTable[key]) {
        pivotTable[key] = {};
      }
      // Assign metric value to the pivot table
      pivotTable[key][monthYear] = entry[metric];
    });
    return pivotTable;
  };

  // Function to render the pivot table header
  const renderTableHeader = () => {
    return (
      <tr>
        <th>{dimensions[0]}</th>
        {Object.keys(pivotTable[Object.keys(pivotTable)[0]]).map(monthYear => (
          <th key={monthYear}>{monthYear}</th>
        ))}
      </tr>
    );
  };

  // Function to render the pivot table body
  const renderTableBody = () => {
    return Object.entries(pivotTable).map(([label, data]) => (
      <tr key={label}>
        <td>{label}</td>
        {Object.values(data).map((value, index) => (
          <td key={index}>{value || 0}</td>
        ))}
      </tr>
    ));
  };

  const pivotTable = generatePivotTableData(); // Generate pivot table data

  return (
    <div>
      <table style={{ border: '1px solid black', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          {renderTableHeader()}
        </thead>
        <tbody>
          {renderTableBody()}
        </tbody>
      </table>
    </div>
  );
};

export default PivotTable;





<div className="pivot-table">
      <table style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ border: '1px solid black' }}>
            <th style={{ border: '1px solid black' }}>{dimension1}</th>
            {Object.keys(pivotData.length > 0 ? pivotData[0] : {}) // Handle empty data gracefully
              .map(monthYear => (
                <th key={monthYear} style={{ border: '1px solid black' }}>{monthYear}</th>
              ))}
          </tr>
        </thead>
        <tbody>
          {pivotData.map((row, index) => (
            <tr key={index}>
              {Object.entries(row).map(([key, value]) => (
                <td key={key} style={{ border: '1px solid black', padding: '8px' }}>
                  {typeof value === 'number' ? formatToMillions(value) : value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
