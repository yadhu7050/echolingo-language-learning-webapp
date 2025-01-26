const API_URL = 'http://localhost:8000';

async function login(email, password) {
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        if (response.ok) {
            localStorage.setItem('user', JSON.stringify(data));
            closeAuthModal();
            updateUIForLoggedInUser();
        } else {
            throw new Error(data.detail);
        }
    } catch (error) {
        alert(error.message);
    }
}

function showAuthModal() {
    document.getElementById('authModal').style.display = 'block';
}

function closeAuthModal() {
    document.getElementById('authModal').style.display = 'none';
}

document.getElementById('loginBtn').addEventListener('click', showAuthModal);