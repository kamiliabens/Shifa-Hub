// Wait for page to load
document.addEventListener('DOMContentLoaded', function() {

    var themeBtn    = document.getElementById('theme-toggle');
    var loginOverlay = document.getElementById('loginOverlay');
    var openLoginBtn = document.getElementById('openLogin');
    var closeLoginBtn = document.getElementById('closeLogin');
    var signUpButton = document.getElementById('signUp');
    var signInButton = document.getElementById('signIn');
    var container   = document.getElementById('container');

    // Theme toggle
    themeBtn.onclick = function() {
        var isLight = document.documentElement.classList.toggle('light-theme');
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
        var icon = themeBtn.querySelector('i');
        icon.className = isLight ? 'fas fa-moon' : 'fas fa-sun';
    };

    // Open login modal
    if (openLoginBtn) {
        openLoginBtn.onclick = function(e) {
            e.preventDefault();
            loginOverlay.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        };
    }

    // Close login modal
    if (closeLoginBtn) {
        closeLoginBtn.onclick = function() {
            loginOverlay.style.display = 'none';
            document.body.style.overflow = 'auto';
        };
    }

    // Click outside modal to close
    window.onclick = function(e) {
        if (e.target == loginOverlay) {
            loginOverlay.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    };

    // Switch between sign-up and sign-in panels
    signUpButton.onclick = function() { container.classList.add('active'); };
    signInButton.onclick = function() { container.classList.remove('active'); };

    // Register form
    var signUpForm = document.querySelector('.sign-up-container form');
    if (signUpForm) {
        signUpForm.onsubmit = function(e) {
            e.preventDefault();

            var name     = signUpForm.querySelector('input[type="text"]').value;
            var email    = signUpForm.querySelector('input[type="email"]').value;
            var password = signUpForm.querySelector('input[type="password"]').value;

            fetch('api_auth.php?action=register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: name, email: email, password: password })
            })
            .then(function(res) { return res.json(); })
            .then(function(data) {
                if (data.status === 'success') {
                    alert('Registration successful! Please login.');
                    container.classList.remove('active');
                } else {
                    alert(data.message || 'Registration failed.');
                }
            })
            .catch(function() {
                alert('Connection error. Please try again.');
            });
        };
    }

    // Login form
    var signInForm = document.querySelector('.sign-in-container form');
    if (signInForm) {
        signInForm.onsubmit = function(e) {
            e.preventDefault();

            var email    = signInForm.querySelector('input[type="email"]').value;
            var password = signInForm.querySelector('input[type="password"]').value;

            fetch('api_auth.php?action=login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email, password: password })
            })
            .then(function(res) { return res.json(); })
            .then(function(data) {
                if (data.status === 'success') {
                    localStorage.setItem('user', JSON.stringify(data.user));
                    window.location.href = 'profil.html';
                } else {
                    alert('Invalid email or password.');
                }
            })
            .catch(function() {
                alert('Connection error. Please try again.');
            });
        };
    }
});
