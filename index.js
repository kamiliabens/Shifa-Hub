/**
 * Shifa Hub - Main Application Script
 * Features: Auth Modal Switcher, Dark Mode Toggle, Stats Counters.
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Auth Modal Switch Logic ---
    const modal = document.getElementById('modal-overlay');
    const authContainer = document.getElementById('auth-container');
    const triggerBtn = document.getElementById('login-trigger');
    const closeBtn = document.getElementById('close-modal');
    
    const showSignup = document.getElementById('show-signup');
    const showLogin = document.getElementById('show-login');

    // Show the whole modal
    triggerBtn.addEventListener('click', () => {
        modal.style.display = 'flex';
    });

    // Close modal when clicking X
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        authContainer.classList.remove('active'); // Reset to login view on close
    });

    // Toggle between Sign In and Sign Up (The Flip Effect)
    showSignup.addEventListener('click', () => {
        authContainer.classList.add('active');
    });

    showLogin.addEventListener('click', () => {
        authContainer.classList.remove('active');
    });

    // Close when clicking outside the box
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            authContainer.classList.remove('active');
        }
    });


    // --- 2. Dark Mode Functionality ---
    const darkModeBtn = document.getElementById('dark-mode-btn');
    const body = document.body;

    darkModeBtn.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const icon = darkModeBtn.querySelector('i');
        
        // Switch icons between Moon and Sun
        if (body.classList.contains('dark-mode')) {
            icon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            icon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'light');
        }
    });

    // Check for saved theme preference
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
        darkModeBtn.querySelector('i').classList.replace('fa-moon', 'fa-sun');
    }


    // --- 3. Statistical Counter Animation ---
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // Lower is slower

    const runCounters = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const increment = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + increment);
                    setTimeout(updateCount, 15);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    };

    // Trigger counters when the section is visible
    const observer = new IntersectionObserver((entries) => {
        if(entries[0].isIntersecting) {
            runCounters();
        }
    }, { threshold: 0.5 });

    observer.observe(document.querySelector('#home'));
});
