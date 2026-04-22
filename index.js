/**
 * Shifa Hub Main JavaScript Logic
 * Contains: Auth Toggle, Dark Mode, Counters, and Smooth Scrolling.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Auth Modal Toggle Logic ---
    const authModal = document.getElementById('auth-modal');
    const authContainer = document.getElementById('auth-container');
    const openLoginBtn = document.getElementById('open-login');
    const closeLoginBtn = document.getElementById('close-modal');
    const toSignupBtn = document.getElementById('to-signup');
    const toLoginBtn = document.getElementById('to-login');

    // Open Modal
    openLoginBtn.addEventListener('click', () => {
        authModal.style.display = 'flex';
    });

    // Close Modal
    closeLoginBtn.addEventListener('click', () => {
        authModal.style.display = 'none';
    });

    // Toggle Flip Effect (Sign In <-> Sign Up)
    toSignupBtn.addEventListener('click', () => {
        authContainer.classList.add('active');
    });

    toLoginBtn.addEventListener('click', () => {
        authContainer.classList.remove('active');
    });

    // Close when clicking outside the container
    window.addEventListener('click', (e) => {
        if (e.target === authModal) {
            authModal.style.display = 'none';
        }
    });

    // --- 2. Dark Mode Toggle ---
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
        const icon = themeToggle.querySelector('i');
        if (body.classList.contains('dark-theme')) {
            icon.classList.replace('fa-moon', 'fa-sun');
        } else {
            icon.classList.replace('fa-sun', 'fa-moon');
        }
    });

    // --- 3. Statistical Counters ---
    const counters = document.querySelectorAll('.counter');
    const speed = 200;

    const startCounters = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 1);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    };

    // Trigger counter when section is visible
    const observer = new IntersectionObserver((entries) => {
        if(entries[0].isIntersecting) startCounters();
    }, { threshold: 0.5 });
    
    observer.observe(document.querySelector('#home'));

    // --- 4. Smooth Scrolling for Nav Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
