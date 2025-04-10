// Handle form submission to send data to backend using fetch
document.getElementById('signup-form').onsubmit = function(event) {
    event.preventDefault(); // Prevent default form submission

    const Username = document.getElementById('name').value;
    const Email = document.getElementById('email').value;
    const Password = document.getElementById('password').value;
    //const phone = document.getElementById('phone').value;
    //const address = document.getElementById('address').value;

    const userData = {
        Username,
        Email,
        Password,
        //phone,
        //address
    };

    // Send user data to the backend via POST request
    fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('User signed up successfully:', data);
        alert('Your account has been created!');
        window.location.href = "login.html"; // Redirect to login page after successful signup
    })
    .catch(error => {
        console.error('Error signing up:', error);
        alert('There was an error with your sign-up. Please try again.');
    });
};
