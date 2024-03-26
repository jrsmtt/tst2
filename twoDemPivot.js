function buildPivotChart(data, dimension1, dimension2, metric) {
  // Process data to build pivot table
  const pivotTable = {};
  data.forEach(entry => {
    const key = `${entry[dimension1]}-${entry[dimension2]}`;
    if (!pivotTable[key]) {
      pivotTable[key] = [];
    }
    pivotTable[key].push(entry[metric]);
  });

  // Generate chart data from pivot table
  const labels = Object.keys(pivotTable);
  const datasets = labels.map(label => ({
    label: label,
    data: pivotTable[label],
    backgroundColor: getRandomColor(),
  }));

  // Render chart using Chart.js or any other chart library
  renderChart(labels, datasets);
}

function renderChart(labels, datasets) {
  // Render chart using Chart.js or any other chart library
  // Example with Chart.js
  const ctx = document.getElementById('pivotChart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: datasets,
    },
    options: {
      // Add chart options as needed
    },
  });
}

function getRandomColor() {
  // Function to generate random color
}

// Example usage:
const data = [
  { dimension1: 'A', dimension2: 'X', metric: 10 },
  { dimension1: 'A', dimension2: 'Y', metric: 20 },
  { dimension1: 'B', dimension2: 'X', metric: 15 },
  // Add more data as needed
];

// Call the function with your data and parameters
buildPivotChart(data, 'dimension1', 'dimension2', 'metric');
