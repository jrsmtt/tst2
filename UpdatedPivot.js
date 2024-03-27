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
