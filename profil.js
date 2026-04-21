/**
 * Shifa Hub - Profile Page Logic
 * Features: Automatic Theme Sync, Profile Management Modal, Dynamic Interaction
 */

/* --- Theme Synchronization --- */
// Automatically matches the theme from Home page using LocalStorage
const syncTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
};

// Run sync on load
syncTheme();

/* --- Modal Logic --- */
const modal = document.getElementById('editModal');

const toggleModal = (show) => {
    if(show) {
        modal.style.display = 'flex';
        // Auto-fill form from current display
        const names = document.getElementById('display-name').innerText.split(' ');
        document.getElementById('edit-last').value = names[0] || '';
        document.getElementById('edit-first').value = names[1] || '';
        document.getElementById('edit-email').value = document.getElementById('display-email').innerText;
        document.getElementById('edit-phone').value = document.getElementById('display-phone').innerText;
        document.getElementById('edit-loc').value = document.getElementById('display-location').innerText;
        
        setTimeout(() => { modal.style.opacity = '1'; }, 10);
    } else {
        modal.style.opacity = '0';
        setTimeout(() => { modal.style.display = 'none'; }, 300);
    }
};

// Event Listeners
document.getElementById('openEditModal').onclick = () => toggleModal(true);
document.getElementById('cancelBtn').onclick = () => toggleModal(false);

document.getElementById('savePlaceholder').onclick = () => {
    // Apply changes locally (Simulation)
    const first = document.getElementById('edit-first').value;
    const last = document.getElementById('edit-last').value;
    document.getElementById('display-name').innerText = `${last} ${first}`;
    document.getElementById('display-email').innerText = document.getElementById('edit-email').value;
    document.getElementById('display-phone').innerText = document.getElementById('edit-phone').value;
    document.getElementById('display-location').innerText = document.getElementById('edit-loc').value;
    
    toggleModal(false);
};

/* --- Actions --- */
document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.onclick = function(e) {
        e.preventDefault();
        if(confirm("Are you sure you want to remove this item?")) {
            this.closest('.medicine-card').style.transform = "scale(0)";
            setTimeout(() => { this.closest('.medicine-card').remove(); }, 300);
        }
    };
});