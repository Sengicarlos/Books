document.addEventListener('DOMContentLoaded', () => {
    const memberTableBody = document.getElementById('memberTableBody');
    const addMemberModal = document.getElementById('addMemberModal');
    const addMemberForm = document.getElementById('addMemberForm');
    const addMemberButton = document.querySelector('.member-actions .green');
    const closeModalButton = document.getElementById('closeModal');

    const editMemberModal = document.getElementById('editMemberModal');
    const editMemberForm = document.getElementById('editMemberForm');
    const closeEditModalButton = document.getElementById('closeEditModal');

    const deleteConfirmModal = document.getElementById('deleteConfirmModal');
    const cancelDeleteButton = document.getElementById('cancelDelete');
    const confirmDeleteButton = document.getElementById('confirmDelete');

    let currentEditId = null;
    let currentDeleteId = null;

    // Fetch and display members
    async function fetchMembers() {
        try {
            const res = await fetch('http://localhost:3000/api/users/all');
            const users = await res.json();
            renderMembers(users);
        } catch (err) {
            console.error('Failed to load members:', err);
        }
    }

    // Render member rows
    function renderMembers(users) {
        memberTableBody.innerHTML = '';

        users.forEach((user, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${user.registeredId}</td>
                <td>${user.firstName} ${user.lastName}</td>
                <td>${user.email}</td>
                <td>${user.phone}</td>
                <td>
                    <button class="edit-button" data-id="${user._id}">Edit</button>
                    <button class="delete-button" data-id="${user._id}">Delete</button>
                </td>
            `;
            memberTableBody.appendChild(row);
        });

        document.querySelectorAll('.edit-button').forEach(button =>
            button.addEventListener('click', openEditModal)
        );

        document.querySelectorAll('.delete-button').forEach(button =>
            button.addEventListener('click', openDeleteModal)
        );
    }

    // Open edit modal with data
    async function openEditModal(event) {
        currentEditId = event.target.dataset.id;

        try {
            const res = await fetch(`http://localhost:3000/api/users/${currentEditId}`);
            const user = await res.json();

            document.getElementById('editMemberId').value = currentEditId;
            document.getElementById('editRegisterId').value = user.registeredId;
            document.getElementById('editMemberName').value = `${user.firstName} ${user.lastName}`;
            document.getElementById('editEmailId').value = user.email;
            document.getElementById('editPhoneNumber').value = user.phone;

            showModal(editMemberModal);
        } catch (err) {
            console.error('Error loading member for editing:', err);
        }
    }

    // Submit edit form
    editMemberForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const [firstName, ...lastParts] = document.getElementById('editMemberName').value.split(' ');
        const lastName = lastParts.join(' ') || '';

        const updatedData = {
            registeredId: document.getElementById('editRegisterId').value,
            firstName,
            lastName,
            email: document.getElementById('editEmailId').value,
            phone: document.getElementById('editPhoneNumber').value,
        };

        try {
            const res = await fetch(`http://localhost:3000/api/users/${currentEditId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedData),
            });

            if (res.ok) {
                hideModal(editMemberModal);
                fetchMembers();
            } else {
                console.error('Failed to update member');
            }
        } catch (err) {
            console.error('Error updating member:', err);
        }
    });

    // Open delete confirmation modal
    function openDeleteModal(event) {
        currentDeleteId = event.target.dataset.id;
        showModal(deleteConfirmModal);
    }

    // Confirm delete
    confirmDeleteButton.addEventListener('click', async () => {
        try {
            const res = await fetch(`http://localhost:3000/api/users/${currentDeleteId}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                hideModal(deleteConfirmModal);
                fetchMembers();
            } else {
                console.error('Failed to delete member');
            }
        } catch (err) {
            console.error('Error deleting member:', err);
        }
    });

    // Cancel delete
    cancelDeleteButton.addEventListener('click', () => {
        hideModal(deleteConfirmModal);
        currentDeleteId = null;
    });

    // Open Add Member Modal
    addMemberButton.addEventListener('click', () => {
        showModal(addMemberModal);
    });

    // Close Add Member Modal
    closeModalButton.addEventListener('click', (e) => {
        e.preventDefault();
        hideModal(addMemberModal);
        addMemberForm.reset();
    });

    // Close Edit Modal
    closeEditModalButton.addEventListener('click', (e) => {
        e.preventDefault();
        hideModal(editMemberModal);
    });

    // Function to show a modal and activate the backdrop
    function showModal(modal) {
        const modalBackdrop = document.querySelector('.modal-backdrop');
        modal.style.display = 'flex'; // Show the modal
        modalBackdrop.classList.add('active'); // Activate the backdrop
    }

    // Function to hide a modal and deactivate the backdrop
    function hideModal(modal) {
        const modalBackdrop = document.querySelector('.modal-backdrop');
        modal.style.display = 'none'; // Hide the modal
        modalBackdrop.classList.remove('active'); // Deactivate the backdrop
    }

    // Initial fetch
    fetchMembers();

    addMemberForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = {
            firstName: document.getElementById('firstName').value, // Corrected ID
            lastName: document.getElementById('lastName').value,   // Corrected ID
            registeredId: document.getElementById('registerId').value,
            email: document.getElementById('emailId').value,
            phone: document.getElementById('phoneNumber').value,
            password: document.getElementById('password').value,
        };

        try {
            const res = await fetch('http://localhost:3000/api/users/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                hideModal(addMemberModal);
                addMemberForm.reset();
                fetchMembers(); // Refresh the members list
            } else {
                console.error('Failed to add member');
            }
        } catch (err) {
            console.error('Error adding member:', err);
        }
    });
});
