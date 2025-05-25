const members = [
    { id: "#48964", reg: "3234", name: "Alfredo Bergson", email: "Alfredobergson@example.com" },
    { id: "#48964", reg: "3234", name: "Roger Schleifer", email: "Rogerschleifer@example.com" },
    { id: "#48964", reg: "3234", name: "Angel Calzoni", email: "Angelcalzoni@example.com" },
    { id: "#48964", reg: "3234", name: "Roger Schleifer", email: "Rogerschleifer@example.com" },
    { id: "#48964", reg: "3234", name: "Angel Calzoni", email: "Angelcalzoni@example.com" },
    { id: "#48964", reg: "3234", name: "Roger Schleifer", email: "Rogerschleifer@example.com" },
    { id: "#48964", reg: "3234", name: "Angel Calzoni", email: "Angelcalzoni@example.com" },
];

const tableBody = document.getElementById('memberTableBody');

members.forEach(member => {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${member.id}</td>
        <td>${member.reg}</td>
        <td>${member.name}</td>
        <td>${member.email}</td>
        <td class="action-buttons">
            <button class="edit">Edit</button>
            <button class="cancel">Cancel</button>
        </td>
    `;
    tableBody.appendChild(row);
});
