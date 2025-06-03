document.addEventListener('DOMContentLoaded', function () {
  const members = JSON.parse(localStorage.getItem('members')) || [];

  // Populate members table
  const memberTableBody = document.getElementById('memberTableBody');
  memberTableBody.innerHTML = members
    .map(
      (member) =>
        `<tr>
          <td>${member.id}</td>
          <td>${member.registerId}</td>
          <td>${member.name}</td>
          <td>${member.email}</td>
          <td><button class="delete-member" data-id="${member.id}">Delete</button></td>
        </tr>`
    )
    .join('');

  // Add new member
  document.querySelector('.member-actions .green').addEventListener('click', function () {
    const newMember = {
      id: Date.now(),
      registerId: `REG${Date.now()}`,
      name: prompt('Enter member name:'),
      email: prompt('Enter member email:'),
    };
    members.push(newMember);
    localStorage.setItem('members', JSON.stringify(members));
    location.reload();
  });

  // Delete member
  document.querySelectorAll('.delete-member').forEach((button) =>
    button.addEventListener('click', function () {
      const id = this.dataset.id;
      const updatedMembers = members.filter((member) => member.id !== parseInt(id));
      localStorage.setItem('members', JSON.stringify(updatedMembers));
      location.reload();
    })
  );
});
