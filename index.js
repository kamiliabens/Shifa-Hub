/**
 * Shifa Hub - Home Page Logic
 * Features: Dark/Light Theme Persistence, Authentication Modal Transitions, Scroll Animations
 */

// UI Elements
const themeBtn = document.getElementById('theme-toggle');
const scrollArrow = document.getElementById('scrollArrow');
const loginOverlay = document.getElementById('loginOverlay');
const openLoginBtn = document.getElementById('openLogin');
const closeLoginBtn = document.getElementById('closeLogin');
const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

/* --- Theme Management Logic --- */

/**
 * Updates the theme toggle icon based on current state
 * @param {boolean} isLight - True if light theme is active
 */
const updateIcon = (isLight) => {
    const icon = themeBtn.querySelector('i');
    if (isLight) {
        icon.classList.replace('fa-sun', 'fa-moon');
    } else {
        icon.classList.replace('fa-moon', 'fa-sun');
    }
};

// Check localStorage for saved theme on page load
if (localStorage.getItem('theme') === 'light') {
    updateIcon(true);
}

// Handle Theme Toggle Button
themeBtn.onclick = () => {
    // Toggle the 'light-theme' class on the HTML element
    const isLightNow = document.documentElement.classList.toggle('light-theme');
    
    // Persist user selection in LocalStorage
    if (isLightNow) {
        localStorage.setItem('theme', 'light');
    } else {
        localStorage.setItem('theme', 'dark');
    }
    
    updateIcon(isLightNow);
};

/* --- Navigation & Interaction Logic --- */

// Smooth visibility for scroll arrow indicator
window.onscroll = () => {
    if (window.scrollY > 200) {
        scrollArrow.style.opacity = '0';
        scrollArrow.style.pointerEvents = 'none';
    } else {
        scrollArrow.style.opacity = '1';
        scrollArrow.style.pointerEvents = 'auto';
    }
};

/* --- Authentication Modal Controls --- */

// Open Modal
openLoginBtn.onclick = () => {
    loginOverlay.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
};

// Close Modal
closeLoginBtn.onclick = () => {
    loginOverlay.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore background scrolling
};

// Modal Sliding Animation (Toggle Sign-up/Sign-in)
signUpButton.onclick = () => container.classList.add("active");
signInButton.onclick = () => container.classList.remove("active");

// Close Modal when clicking on the overlay background
window.onclick = (event) => {
    if (event.target == loginOverlay) {
        loginOverlay.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
};

/* --- Form Submission (Simulation) --- */
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert("Action successful! Welcome to Shifa Hub community.");
        loginOverlay.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
});
