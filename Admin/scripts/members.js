document.addEventListener('DOMContentLoaded', () => {
    const memberTableBody = document.getElementById('memberTableBody');
    const addMemberForm = document.getElementById('addMemberForm');
    const addMemberModal = document.getElementById('addMemberModal');
    const closeModalButton = document.getElementById('closeModal');
    const addMemberButton = document.querySelector('.member-actions .green');
    const editMemberModal = document.getElementById('editMemberModal');
    const editMemberForm = document.getElementById('editMemberForm');
    const closeEditModalButton = document.getElementById('closeEditModal');

    // Load members from localStorage or initialize an empty array
    let members = JSON.parse(localStorage.getItem('members')) || [];

    // Function to save members to localStorage
    const saveToLocalStorage = () => {
        localStorage.setItem('members', JSON.stringify(members));
    };

    // Function to render members in the table
    const renderMembers = () => {
        memberTableBody.innerHTML = ''; // Clear existing rows
        members.forEach((member, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${member.memberId}</td>
                <td>${member.registerId}</td>
                <td>${member.name}</td>
                <td>${member.email}</td>
                <td>${member.phone}</td>
                <td>
                    <button class="edit-btn" data-index="${index}">Edit</button>
                    <button class="delete-btn" data-index="${index}">Delete</button>
                </td>
            `;
            memberTableBody.appendChild(row);
        });

        // Add event listeners for buttons
        document.querySelectorAll('.edit-btn').forEach(button => {
            button.addEventListener('click', handleEdit);
        });
        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', handleDelete);
        });
    };

    // Handle Add Member form submission
    addMemberForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const newMember = {
            memberId: document.getElementById('memberId').value,
            registerId: document.getElementById('registerId').value,
            name: document.getElementById('memberName').value,
            email: document.getElementById('emailId').value,
            phone: document.getElementById('phoneNumber').value,
        };
        members.push(newMember);
        saveToLocalStorage(); // Save to localStorage
        renderMembers();
        addMemberModal.style.display = 'none'; // Close modal
        addMemberForm.reset(); // Reset form fields
    });

    // Handle Edit action
    const handleEdit = (event) => {
        const index = event.target.dataset.index;
        const member = members[index];

        // Populate the form with member data
        document.getElementById('editMemberId').value = member.memberId;
        document.getElementById('editRegisterId').value = member.registerId;
        document.getElementById('editMemberName').value = member.name;
        document.getElementById('editEmailId').value = member.email;
        document.getElementById('editPhoneNumber').value = member.phone;

        // Open the modal
        editMemberModal.style.display = 'block';

        // Handle form submission
        editMemberForm.onsubmit = (e) => {
            e.preventDefault();
            members[index] = {
                memberId: document.getElementById('editMemberId').value,
                registerId: document.getElementById('editRegisterId').value,
                name: document.getElementById('editMemberName').value,
                email: document.getElementById('editEmailId').value,
                phone: document.getElementById('editPhoneNumber').value,
            };
            saveToLocalStorage(); // Save to localStorage
            renderMembers();
            editMemberModal.style.display = 'none';
        };
    };

    // Handle Delete action
    const handleDelete = (event) => {
        const index = event.target.dataset.index;
        if (confirm('Are you sure you want to delete this member?')) {
            members.splice(index, 1);
            saveToLocalStorage(); // Save to localStorage
            renderMembers();
        }
    };

    // Open Add Member modal
    addMemberButton.addEventListener('click', () => {
        addMemberModal.style.display = 'block';
    });

    // Close modal
    closeModalButton.addEventListener('click', () => {
        addMemberModal.style.display = 'none';
    });

    // Close Edit Member modal
    closeEditModalButton.addEventListener('click', () => {
        editMemberModal.style.display = 'none';
    });

    // Initial render
    renderMembers();
});
