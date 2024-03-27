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
