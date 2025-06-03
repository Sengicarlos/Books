const books = [
  { id: "#48964", member: "Alena Workman", title: "Magnolia Palace", author: "Alfredo Bergson", borrowed: "12/2/2023", returned: "12/2/2023", status: "Available" },
  { id: "#48964", member: "Jaylon Vaccaro", title: "Don Quixoto", author: "Roger Schleifer", borrowed: "13/2/2023", returned: "13/2/2023", status: "Borrowed" },
  { id: "#48964", member: "Cheyenne Korsgaard", title: "Alice's Adventures in Wonderland", author: "Angel Calzoni", borrowed: "12/2/2023", returned: "", status: "Renewed" },
  { id: "#48964", member: "Jaydon Calzoni", title: "Pride and Prejudice", author: "Roger Schleifer", borrowed: "12/2/2023", returned: "", status: "Reserved" },
  { id: "#48964", member: "Tiana Rhiel Madsen", title: "Treasure Island", author: "Angel Calzoni", borrowed: "12/2/2023", returned: "", status: "Renewed" },
  { id: "#48964", member: "Miracle Westervelt", title: "Treasure Island", author: "Roger Schleifer", borrowed: "12/2/2023", returned: "", status: "Available" },
  { id: "#48964", member: "Hanna Levin", title: "Treasure Island", author: "Angel Calzoni", borrowed: "12/2/2023", returned: "", status: "Available" },
  { id: "#48964", member: "Gustavo Philips", title: "Treasure Island", author: "Angel Calzoni", borrowed: "12/2/2023", returned: "", status: "Available" },
  { id: "#48964", member: "Angel Calzoni", title: "Treasure Island", author: "Angel Calzoni", borrowed: "12/2/2023", returned: "", status: "Available" },
];

document.addEventListener('DOMContentLoaded', function () {
  const checkouts = JSON.parse(localStorage.getItem('checkouts')) || [];

  // Populate checkouts table
  const bookTableBody = document.getElementById('bookTableBody');
  bookTableBody.innerHTML = checkouts
    .map(
      (checkout) =>
        `<tr>
          <td>${checkout.memberId}</td>
          <td>${checkout.memberName}</td>
          <td>${checkout.title}</td>
          <td>${checkout.author}</td>
          <td>${checkout.borrowedDate}</td>
          <td>${checkout.returnedDate || 'N/A'}</td>
          <td>${checkout.status}</td>
          <td><button class="return-book" data-id="${checkout.id}">Return</button></td>
        </tr>`
    )
    .join('');

  // Return book
  document.querySelectorAll('.return-book').forEach((button) =>
    button.addEventListener('click', function () {
      const id = this.dataset.id;
      const updatedCheckouts = checkouts.map((checkout) =>
        checkout.id === parseInt(id) ? { ...checkout, status: 'Returned', returnedDate: new Date().toLocaleDateString() } : checkout
      );
      localStorage.setItem('checkouts', JSON.stringify(updatedCheckouts));
      location.reload();
    })
  );
});

const tableBody = document.getElementById('bookTableBody');

books.forEach(book => {
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${book.id}</td>
    <td>${book.member}</td>
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.borrowed}</td>
    <td>${book.returned || '-'}</td>
    <td><span class="status ${book.status}">${book.status}</span></td>
    <td class="action-buttons">
      ${book.status === "Borrowed" ? `<button class="Return">Return</button>` : ""}
      ${["Borrowed", "Renewed"].includes(book.status) ? `<button class="Renew">Renew</button>` : ""}
      <button class="Reserve">Reserve</button>
    </td>
  `;
  tableBody.appendChild(row);
});
