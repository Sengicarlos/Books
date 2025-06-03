document.addEventListener('DOMContentLoaded', function () {
  // Load statistics from local storage
  const stats = JSON.parse(localStorage.getItem('libraryStats')) || {
    totalBooks: 32245,
    newMembers: 150,
    checkedOutBooks: 2045,
    overdueBooks: 34,
  };

  // Update statistics on the dashboard
  document.querySelector('.Totalbm h3').textContent = stats.totalBooks;
  document.querySelector('.Totalbm + div h3').textContent = stats.newMembers;
  document.querySelector('.bookss div:first-child h3').textContent = stats.checkedOutBooks;
  document.querySelector('.bookss div:last-child h3').textContent = stats.overdueBooks;

  // Load recent activity from local storage
  const recentActivity = JSON.parse(localStorage.getItem('recentActivity')) || [];
  const activityTableBody = document.querySelector('.activity table tbody');
  activityTableBody.innerHTML = recentActivity
    .map(
      (activity) =>
        `<tr>
          <td>${activity.id}</td>
          <td>${activity.member}</td>
          <td><em>${activity.title}</em></td>
          <td>${activity.author}</td>
          <td>${activity.borrowed}</td>
          <td>${activity.due}</td>
          <td><span class="${activity.status.toLowerCase()}">${activity.status}</span></td>
        </tr>`
    )
    .join('');
});

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
