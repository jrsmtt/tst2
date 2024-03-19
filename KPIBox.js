/* styles.css */
.kpi-box {
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 8px;
  width: 300px;
  margin: 0 10px;
}

.kpi-box h3 {
  margin-top: 0;
}

.kpi-box .volume-container {
  display: flex;
  align-items: center;
}

.kpi-box .arrow {
  margin-left: 5px;
}

.kpi-box .latest-month {
  margin-top: 5px;
}

.kpi-box-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}


// App.js
import React from 'react';
import KPIBox from './KPIBox';
import './styles.css'; // Import the CSS file

const App = () => {
  const kpiData = [
    {
      kpi_name: 'KPI 1',
      latest_month_name: 'January 2024',
      latest_volume: 1000,
      mom_percent: 0.05,
      mom_volume: 1050,
      yoy_percent: -0.1,
      yoy_volume: 900,
      yoy_performance: 'good'
    },
    {
      kpi_name: 'KPI 2',
      latest_month_name: 'February 2024',
      latest_volume: 1200,
      mom_percent: 0.03,
      mom_volume: 1236,
      yoy_percent: 0.15,
      yoy_volume: 1380,
      yoy_performance: 'average'
    },
    {
      kpi_name: 'KPI 3',
      latest_month_name: 'March 2024',
      latest_volume: 1100,
      mom_percent: 0.02,
      mom_volume: 1122,
      yoy_percent: -0.05,
      yoy_volume: 1050,
      yoy_performance: 'good'
    }
  ];

  return (
    <div className="kpi-box-container"> {/* Use the class from CSS file */}
      {kpiData.map((kpi, index) => (
        <KPIBox key={index} data={kpi} />
      ))}
    </div>
  );
};

export default App;


// KPIBox.js
import React from 'react';

const KPIBox = ({ data }) => {
  const { kpi_name, latest_month_name, latest_volume, mom_percent, mom_volume, yoy_percent, yoy_volume, yoy_performance } = data;

  const arrowDirection = yoy_percent < 0 ? '↓' : '↑';
  const arrowColor = yoy_performance === 'good' ? 'green' : 'red';

  return (
    <div className="kpi-box"> {/* Use the class from CSS file */}
      <h3>{kpi_name}</h3>
      <div className="volume-container"> {/* Use the class from CSS file */}
        <span>Latest Month Volume: {latest_volume}</span>
        <span className="arrow" style={{ color: arrowColor }}>{arrowDirection}</span>
      </div>
      <div className="latest-month"> {/* Use the class from CSS file */}
        <span>Latest Month Name: {latest_month_name}</span>
      </div>
    </div>
  );
};

export default KPIBox;



/* KPIDataBox.css */

.kpi-data-box {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
}

.kpi-name {
  font-weight: bold;
  margin-bottom: 5px;
}

.latest-month-volume {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}

.arrow {
  margin-left: 5px;
}

.arrow.up {
  border: solid black;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 3px;
  transform: rotate(-135deg);
}

.arrow.down {
  border: solid black;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 3px;
  transform: rotate(45deg);
}

.latest-month-name {
  font-style: italic;
}

