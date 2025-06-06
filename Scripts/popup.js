function showModal(title, message) {
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';

    modalOverlay.innerHTML = `
        <div class="modal">
            <h2>${title}</h2>
            <p>${message}</p>
            <button id="close-modal">Close</button>
        </div>
    `;

    document.body.appendChild(modalOverlay);

    // Show the modal
    modalOverlay.classList.add('active');

    // Close the modal on button click
    document.getElementById('close-modal').addEventListener('click', () => {
        modalOverlay.classList.remove('active');
        setTimeout(() => modalOverlay.remove(), 300); // Wait for animation to finish
    });
}

// Example usage
// showModal('Error', 'Passwords do not match. Please try again.');