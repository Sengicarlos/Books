window.onload = function () {
  const ctx = document.getElementById('chart').getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Jun', 'Feb', 'May', 'July', 'Sep', 'Nov', 'Enc'],
      datasets: [
        {
          label: 'Checkouts',
          data: [120, 200, 180, 250, 230, 190, 260],
          borderColor: 'green',
          fill: false,
          tension: 0.1,
        },
        {
          label: 'Overdue',
          data: [80, 100, 120, 140, 180, 220, 190],
          borderColor: 'red',
          fill: false,
          tension: 0.1,
        }
      ]
    },
    options: {
      responsive: false,
      plugins: {
        legend: {
          position: 'top'
        }
      }
    }
  });
};
