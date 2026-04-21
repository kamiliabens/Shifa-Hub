/* --- Theme Sync with Home --- */
const syncTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
};
syncTheme();

/* --- UI Interactions --- */
const addNotesBtn = document.getElementById('addNotesBtn');
const notesArea = document.getElementById('notesArea');

addNotesBtn.onclick = () => {
    notesArea.classList.toggle('hidden');
    addNotesBtn.querySelector('span').innerText = notesArea.classList.contains('hidden') 
        ? "Add extra notes..." 
        : "Hide notes";
};

const categorySelect = document.getElementById('categorySelect');
const conditionInput = document.getElementById('conditionInput');

categorySelect.onchange = (e) => {
    if (e.target.value === 'equipment') {
        conditionInput.placeholder = "e.g. Used - Good condition";
    } else {
        conditionInput.placeholder = "e.g. Expiry Date: 12/2026";
    }
};

/* --- Form Submission Simulation --- */
const fakeSubmit = document.getElementById('fakeSubmit');
const successMsg = document.getElementById('success-msg');

fakeSubmit.onclick = () => {
    const originalText = fakeSubmit.innerText;
    fakeSubmit.innerText = "Processing...";
    fakeSubmit.style.opacity = "0.7";
    
    setTimeout(() => {
        fakeSubmit.innerText = originalText;
        fakeSubmit.style.opacity = "1";
        
        successMsg.style.display = "block";
        
        setTimeout(() => {
            successMsg.style.display = "none";
        }, 3000);
    }, 1000);
};