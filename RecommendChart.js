import React, { useState, useEffect } from 'react';
import LineChart from './LineChart';
import BarChart from './BarChart';
import StackedBarChart from './StackedBarChart';
import PivotChart from './PivotChart';

const ChartContainer = ({ recommendedChartType, data }) => {
  const [selectedChartType, setSelectedChartType] = useState(recommendedChartType);

  // Render the chart based on the selected chart type
  const renderChart = () => {
    switch (selectedChartType) {
      case 'line':
        return <LineChart data={data} />;
      case 'bar':
        return <BarChart data={data} />;
      case 'stackedBar':
        return <StackedBarChart data={data} />;
      case 'pivot':
        return <PivotChart data={data} />;
      default:
        return <div>No chart selected</div>;
    }
  };

  useEffect(() => {
    // Fetch data from backend based on the recommended chart type
    // Update the state with the fetched data
    // setSelectedChartType(recommendedChartType);
  }, [recommendedChartType]);

  return (
    <div>
      {/* Render the chart */}
      {renderChart()}

      {/* Allow the user to choose other chart types */}
      <select value={selectedChartType} onChange={(e) => setSelectedChartType(e.target.value)}>
        <option value="line">Line Chart</option>
        <option value="bar">Bar Chart</option>
        <option value="stackedBar">Stacked Bar Chart</option>
        <option value="pivot">Pivot Chart</option>
      </select>
    </div>
  );
};

export default ChartContainer;
