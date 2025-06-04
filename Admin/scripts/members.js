document.addEventListener('DOMContentLoaded', () => {
    const memberTableBody = document.getElementById('memberTableBody');
    const addMemberForm = document.getElementById('addMemberForm');
    const addMemberModal = document.getElementById('addMemberModal');
    const closeModalButton = document.getElementById('closeModal');
    const addMemberButton = document.querySelector('.member-actions .green');
    const editMemberModal = document.getElementById('editMemberModal');
    const editMemberForm = document.getElementById('editMemberForm');
    const closeEditModalButton = document.getElementById('closeEditModal');
    const deleteConfirmModal = document.getElementById('deleteConfirmModal');
    const cancelDeleteButton = document.getElementById('cancelDelete');
    const confirmDeleteButton = document.getElementById('confirmDelete');

    // Load members from localStorage or initialize an empty array
    let members = JSON.parse(localStorage.getItem('members')) || [];
    let memberToDeleteIndex = null; // Store the index of the member to delete

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

    // Function to generate a unique Member ID
    const generateMemberId = () => {
        return `M-${Date.now()}`; // Example: M-1622547800000
    };

    // Handle Add Member form submission
    addMemberForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const newMember = {
            memberId: generateMemberId(), // Automatically generate Member ID
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
        memberToDeleteIndex = event.target.dataset.index; // Store the index
        deleteConfirmModal.style.display = 'flex'; // Show the modal
    };

    // Confirm Delete
    confirmDeleteButton.addEventListener('click', () => {
        if (memberToDeleteIndex !== null) {
            members.splice(memberToDeleteIndex, 1); // Remove the member
            saveToLocalStorage(); // Save to localStorage
            renderMembers(); // Re-render the table
            memberToDeleteIndex = null; // Reset the index
        }
        deleteConfirmModal.style.display = 'none'; // Hide the modal
    });

    // Cancel Delete
    cancelDeleteButton.addEventListener('click', () => {
        memberToDeleteIndex = null; // Reset the index
        deleteConfirmModal.style.display = 'none'; // Hide the modal
    });

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
