// Shared CSS for forms (This can be moved to a separate style.css file)
const style = `
    .form-container {
        width: 300px;
        padding: 20px;
        background: white;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        text-align: center;
        margin: 20px auto;
    }
    .form-container h2 {
        color: #0a66c2;
        margin-bottom: 20px;
    }
    .form-container input {
        width: 90%;
        padding: 10px;
        margin-bottom: 15px;
        border: 1px solid #ccc;
        border-radius: 5px;
    }
    .form-container button {
        width: 100%;
        padding: 12px;
        background-color: #0a66c2;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s;
    }
    .form-container button:hover {
        background-color: #004b99;
    }
    .form-container a {
        color: #0a66c2;
        text-decoration: none;
    }
    .form-container a:hover {
        text-decoration: underline;
    }
    #registerMessage, #loginMessage {
        margin-bottom: 10px;
        color: red;
        font-weight: bold;
    }
`;

// Insert the shared CSS into the head of the document
const styleSheet = document.createElement("style");
styleSheet.innerText = style;
document.head.appendChild(styleSheet);


document.addEventListener('DOMContentLoaded', () => {
    // REGISTRATION LOGIC
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('regUsername').value;
            const password = document.getElementById('regPassword').value;
            const message = document.getElementById('registerMessage');

            if (localStorage.getItem(username)) {
                message.textContent = 'Username already exists.';
            } else {
                localStorage.setItem(username, password);
                message.style.color = 'green';
                message.textContent = 'Registration successful! You can now log in.';
                // Redirect after a short delay
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 2000); 
            }
        });
    }

    // LOGIN LOGIC
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('logUsername').value;
            const password = document.getElementById('logPassword').value;
            const message = document.getElementById('loginMessage');

            const storedPassword = localStorage.getItem(username);
            if (storedPassword === password) {
                sessionStorage.setItem('loggedInUser', username);
                window.location.href = 'profile.html';
            } else {
                message.textContent = 'Invalid username or password.';
            }
        });
    }

    // PROFILE PAGE LOGIC (Integrated here for simplicity)
    const loggedInUser = sessionStorage.getItem('loggedInUser');
    const profileUsernameSpan = document.getElementById('profileUsername');

    if (profileUsernameSpan) {
        if (loggedInUser) {
            profileUsernameSpan.textContent = loggedInUser;
        } else {
            // Redirect to login if not logged in
            window.location.href = 'login.html';
        }
    }

    // LOGOUT LOGIC
    window.logout = function() {
        sessionStorage.removeItem('loggedInUser');
        window.location.href = 'index.html';
    };
});
