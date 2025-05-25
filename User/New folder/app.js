// Example: Highlight today's reading
document.addEventListener('DOMContentLoaded', () => {
  const today = new Date().getDate();
  const calendarDays = document.querySelectorAll('.calendar span');

  calendarDays.forEach((day, index) => {
    if (parseInt(day.textContent) === today) {
      day.style.fontWeight = 'bold';
      day.style.color = 'crimson';
    }
  });
});
