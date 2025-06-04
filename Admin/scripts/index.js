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

  const logoffButton = document.querySelector('.logoff-button');
  const logoutConfirmModal = document.getElementById('logoutConfirmModal');
  const cancelLogoutButton = document.getElementById('cancelLogout');
  const confirmLogoutButton = document.getElementById('confirmLogout');

  // Show the logout confirmation modal
  logoffButton.addEventListener('click', (event) => {
      event.preventDefault(); // Prevent default link behavior
      logoutConfirmModal.style.display = 'block';
  });

  // Close the modal when cancel is clicked
  cancelLogoutButton.addEventListener('click', () => {
      logoutConfirmModal.style.display = 'none';
  });

  // Handle logout confirmation
  confirmLogoutButton.addEventListener('click', () => {
      window.location.href = '/login.html'; // Redirect to the login page
  });
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
