document.addEventListener('DOMContentLoaded', function() {
    var userStr = localStorage.getItem('user');
    if (!userStr) {
        window.location.href = 'index.html';
        return;
    }

    var user = JSON.parse(userStr);

    // Show first letter of name as avatar
    var firstName = (user.name || 'U').charAt(0).toUpperCase();
    document.getElementById('avatar-letter').textContent = firstName;

    // Display name and email
    document.getElementById('display-name').textContent = user.name || 'Unknown User';
    document.getElementById('display-email').textContent = user.email || '';

    // Pre-fill edit form
    document.getElementById('edit-name').value = user.name || '';
    document.getElementById('edit-email').value = user.email || '';

    // Modal open/close
    var editModal = document.getElementById('editModal');

    document.getElementById('openEditModal').onclick = function() {
        editModal.style.display = 'flex';
        setTimeout(function() { editModal.style.opacity = '1'; }, 10);
    };

    document.getElementById('cancelBtn').onclick = function() {
        editModal.style.opacity = '0';
        setTimeout(function() { editModal.style.display = 'none'; }, 300);
    };

    // Save profile (name + email only)
    document.getElementById('saveProfileBtn').onclick = function() {
        var newName = document.getElementById('edit-name').value.trim();
        var newEmail = document.getElementById('edit-email').value.trim();

        if (!newName || !newEmail) {
            alert('Please fill in all fields.');
            return;
        }

        // Update localStorage
        user.name = newName;
        user.email = newEmail;
        localStorage.setItem('user', JSON.stringify(user));

        // Update displayed info
        document.getElementById('display-name').textContent = newName;
        document.getElementById('display-email').textContent = newEmail;
        document.getElementById('avatar-letter').textContent = newName.charAt(0).toUpperCase();

        // Close modal
        editModal.style.opacity = '0';
        setTimeout(function() { editModal.style.display = 'none'; }, 300);

        alert('Profile updated successfully!');
    };

    // Logout button
    document.getElementById('logoutBtn').onclick = function() {
        fetch('api_auth.php?logout=true', { credentials: 'include' })
            .then(function() {
                localStorage.removeItem('user');
                window.location.href = 'index.html';
            })
            .catch(function() {
                localStorage.removeItem('user');
                window.location.href = 'index.html';
            });
    };

    // Load items
    loadMyDonations();
    loadTakenItems();
});

// Switch tabs
function showTab(tab) {
    document.getElementById('tab-donations').style.display = tab === 'donations' ? 'block' : 'none';
    document.getElementById('tab-taken').style.display = tab === 'taken' ? 'block' : 'none';

    var btns = document.querySelectorAll('.tab-btn');
    btns.forEach(function(btn) { btn.classList.remove('active'); });
    event.target.classList.add('active');
}

// Load user's donated items
function loadMyDonations() {
    var container = document.getElementById('my-items-container');

    fetch('api_medicines.php?my_items=true', { credentials: 'include' })
        .then(function(res) { return res.json(); })
        .then(function(items) {
            document.getElementById('donations-count').textContent = items.length;
            container.innerHTML = '';

            if (items.length === 0) {
                container.innerHTML = '<p class="text-gray-500 col-span-2">No active listings yet.</p>';
                return;
            }

            items.forEach(function(item) {
                var statusColor, statusText;
                if (item.status === 'approved') {
                    statusColor = 'text-green-500';
                    statusText = 'Approved';
                } else if (item.status === 'taken') {
                    statusColor = 'text-blue-400';
                    statusText = 'Taken';
                } else if (item.status === 'rejected') {
                    statusColor = 'text-red-500';
                    statusText = 'Rejected by admin';
                } else {
                    statusColor = 'text-yellow-500';
                    statusText = 'Pending review';
                }


                var imgSrc = item.image_path ? 'img/' + item.image_path : 'img/default_med.jpg';

                container.innerHTML += '<div class="activity-box p-4 rounded-2xl">' +
                    '<div class="flex items-center gap-3 mb-3">' +
                    '<img src="' + imgSrc + '" class="w-16 h-16 rounded-xl object-cover" onerror="this.src=\'img/default_med.jpg\'">' +
                    '<div>' +
                    '<h4 class="font-bold text-sm">' + item.item_name + '</h4>' +
                    '<p class="text-[10px] text-gray-500">' + item.category + ' • ' + item.wilaya + '</p>' +
                    '<p class="text-[10px] font-bold ' + statusColor + '">' + statusText + '</p>' +
                    '</div></div>' +
                    '<button onclick="deleteItem(' + item.id + ')" class="w-full bg-red-50 text-red-500 text-xs py-2 rounded-xl font-bold hover:bg-red-500 hover:text-white transition">Delete</button>' +
                    '</div>';
            });
        })
        .catch(function(e) {
            container.innerHTML = '<p class="text-red-400">Could not load your items.</p>';
        });
}

// Load items the user has taken/requested
function loadTakenItems() {
    var container = document.getElementById('taken-items-container');

    fetch('api_medicines.php?taken_items=true', { credentials: 'include' })
        .then(function(res) { return res.json(); })
        .then(function(items) {
            document.getElementById('taken-count').textContent = items.length;
            container.innerHTML = '';

            if (items.length === 0) {
                container.innerHTML = '<p class="text-gray-500 col-span-2">You have not requested any items yet.</p>';
                return;
            }

            items.forEach(function(item) {
                var imgSrc = item.image_path ? 'img/' + item.image_path : 'img/default_med.jpg';

                container.innerHTML += '<div class="activity-box p-4 rounded-2xl">' +
                    '<div class="flex items-center gap-3">' +
                    '<img src="' + imgSrc + '" class="w-16 h-16 rounded-xl object-cover" onerror="this.src=\'img/default_med.jpg\'">' +
                    '<div>' +
                    '<h4 class="font-bold text-sm">' + item.item_name + '</h4>' +
                    '<p class="text-[10px] text-gray-500">' + item.category + ' • ' + item.wilaya + '</p>' +
                    '<p class="text-[10px] text-blue-400 font-bold">Received</p>' +
                    '</div></div>' +
                    '</div>';
            });
        })
        .catch(function(e) {
            container.innerHTML = '<p class="text-red-400">Could not load received items.</p>';
        });
}

// Delete a donated item
function deleteItem(id) {
    if (!confirm('Are you sure you want to delete this item?')) return;

    var userStr = localStorage.getItem('user');
    var userId = userStr ? JSON.parse(userStr).id : null;

    fetch('api_medicines.php', {
        method: 'DELETE',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: id, user_id: userId })
    })
    .then(function(res) { return res.json(); })
    .then(function(data) {
        if (data.status === 'success') {
            loadMyDonations();
        } else {
            alert('Error: ' + data.message);
        }
    })
    .catch(function() {
        alert('Failed to delete.');
    });
}
