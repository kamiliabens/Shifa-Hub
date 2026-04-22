document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Dark Mode Logic ---
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    const themeIcon = themeToggle.querySelector('i');

    // وظيفة لتحديث الأيقونة
    const updateIcon = (isLight) => {
        if (isLight) {
            themeIcon.classList.replace('fa-sun', 'fa-moon');
        } else {
            themeIcon.classList.replace('fa-moon', 'fa-sun');
        }
    };

    // التحقق من الوضع المحفوظ عند التحميل
    if (localStorage.getItem('theme') === 'light') {
        updateIcon(true);
    }

    themeToggle.addEventListener('click', () => {
        htmlElement.classList.toggle('light-theme');
        const isLight = htmlElement.classList.contains('light-theme');
        
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
        updateIcon(isLight);
    });

    // --- 2. Auth Modal Logic ---
    const openLogin = document.getElementById('openLogin');
    const closeLogin = document.getElementById('closeLogin');
    const loginOverlay = document.getElementById('loginOverlay');
    const container = document.getElementById('container');
    const signUpBtn = document.getElementById('signUpBtn');
    const signInBtn = document.getElementById('signInBtn');

    // فتح وإغلاق الـ Modal
    openLogin.addEventListener('click', () => {
        loginOverlay.style.display = 'flex';
    });

    closeLogin.addEventListener('click', () => {
        loginOverlay.style.display = 'none';
    });

    // التبديل بين Sign In و Sign Up
    signUpBtn.addEventListener('click', () => {
        container.classList.add("active");
    });

    signInBtn.addEventListener('click', () => {
        container.classList.remove("active");
    });

    // إغلاق المودال عند الضغط خارجه
    window.addEventListener('click', (e) => {
        if (e.target === loginOverlay) {
            loginOverlay.style.display = 'none';
        }
    });

    // --- 3. Fake Login Logic (for GitHub Preview) ---
    const signInForm = document.getElementById('signInForm');
    const signUpForm = document.getElementById('signUpForm');

    const handleAuth = (e) => {
        e.preventDefault();
        // هنا نوهم الأستاذة بلي راهو يتحقق
        const btn = e.target.querySelector('button');
        const originalText = btn.innerText;
        btn.innerText = "Processing...";
        
        setTimeout(() => {
            // يبعتك لصفحة البروفايل مباشرة
            window.location.href = "profil.html";
        }, 1200);
    };

    if(signInForm) signInForm.addEventListener('submit', handleAuth);
    if(signUpForm) signUpForm.addEventListener('submit', handleAuth);
});
