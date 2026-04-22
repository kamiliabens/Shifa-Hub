/**
 * Shifa Hub - Home Page Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    // UI Elements
    const themeBtn = document.getElementById('theme-toggle');
    const scrollArrow = document.getElementById('scrollArrow');
    const loginOverlay = document.getElementById('loginOverlay');
    const openLoginBtn = document.getElementById('openLogin');
    const closeLoginBtn = document.getElementById('closeLogin');
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');

    /* --- Theme Management --- */
    const updateIcon = (isLight) => {
        const icon = themeBtn.querySelector('i');
        if (isLight) {
            icon.className = 'fas fa-moon';
        } else {
            icon.className = 'fas fa-sun';
        }
    };

    // Initialize Icon
    if (document.documentElement.classList.contains('light-theme')) {
        updateIcon(true);
    }

    themeBtn.addEventListener('click', () => {
        const isLightNow = document.documentElement.classList.toggle('light-theme');
        localStorage.setItem('theme', isLightNow ? 'light' : 'dark');
        updateIcon(isLightNow);
    });

    /* --- Modal Controls --- */
    if (openLoginBtn) {
        openLoginBtn.onclick = (e) => {
            e.preventDefault();
            loginOverlay.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        };
    }

    if (closeLoginBtn) {
        closeLoginBtn.onclick = () => {
            loginOverlay.style.display = 'none';
            document.body.style.overflow = 'auto';
        };
    }

    signUpButton.onclick = () => container.classList.add("active");
    signInButton.onclick = () => container.classList.remove("active");

    window.onclick = (event) => {
        if (event.target == loginOverlay) {
            loginOverlay.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    };

    /* --- Scroll Logic --- */
    window.addEventListener('scroll', () => {
        if (window.scrollY > 200) {
            scrollArrow.style.opacity = '0';
            scrollArrow.style.pointerEvents = 'none';
        } else {
            scrollArrow.style.opacity = '1';
            scrollArrow.style.pointerEvents = 'auto';
        }
    });
});
