document.getElementById('signup-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    const firstName = document.querySelector('input[name="member-names"]').value;
    const lastName = document.querySelectorAll('input[name="member-names"]')[1].value;
    const registeredId = document.getElementById('registered-id').value;
    const email = document.getElementById('email-id').value;
    const phone = document.getElementById('phone-no').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const dob = document.getElementById('dob').value;

    if (password !== confirmPassword) {
        alert('Passwords do not match. Please try again.');
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/api/users/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                firstName,
                lastName,
                registeredId,
                email,
                phone,
                password,
                dob
            })
        });

        const data = await response.json();

        if (response.ok) {
            alert('Sign-up successful!');
            window.location.href = '/login.html';
        } else {
            alert('Error: ' + data.error);
        }
    } catch (err) {
        console.error(err);
        alert('An error occurred during sign-up.');
    }
});

const nextStepButton = document.getElementById('next-step');
const backStepButton = document.getElementById('back-step');
const step1 = document.getElementById('step-1');
const step2 = document.getElementById('step-2');

nextStepButton.addEventListener('click', function () {
    step1.style.display = 'none';
    step2.style.display = 'block';
});

backStepButton.addEventListener('click', function () {
    step2.style.display = 'none';
    step1.style.display = 'block';
});

document.getElementById('signup-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission

    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (password !== confirmPassword) {
        alert('Passwords do not match. Please try again.');
        return;
    }

    alert('Sign-up successful!');
    // Redirect or perform further actions
    window.location.href = '/login.html';
});