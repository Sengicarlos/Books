// Open the modal when "Admin Login" is clicked
document.getElementById('admin-login-link').addEventListener('click', function (event) {
    event.preventDefault(); // Prevent default link behavior
    document.getElementById('otp-modal').style.display = 'block';
});

// Close the modal when the close button is clicked
document.querySelector('.close-btn').addEventListener('click', function () {
    document.getElementById('otp-modal').style.display = 'none';
});

// Automatically move focus to the next input box
document.querySelectorAll('.otp-box').forEach((input, index, inputs) => {
    input.addEventListener('input', function () {
        if (this.value.length === 1 && index < inputs.length - 1) {
            inputs[index + 1].focus();
        }
    });
});

// Handle OTP form submission
document.getElementById('otp-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission
    const otp = Array.from(document.querySelectorAll('.otp-box'))
        .map(input => input.value)
        .join('');

    // Validate OTP (example: check if it's "123456")
    if (otp === '123456') {
        window.location.href = '/Admin/index.html'; // Redirect to /index.html
    } else {
        alert('Invalid OTP. Please try again.');
    }
});

document.getElementById('login-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:3000/api/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (response.ok) {
            alert('Login successful!');
            window.location.href = '/User/responsive-book-website-main/index.html';
        } else {
            alert(data.error || 'Login failed');
        }
    } catch (err) {
        console.error(err);
        alert('An error occurred during login.');
    }
});
