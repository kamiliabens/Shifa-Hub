// Category configs - only medicine and equipment
var categoryConfigs = {
    'medicine':   { id: 'medicine',   title: 'Medicine',         icon: 'fa-pills',       items: [] },
    'equipment':  { id: 'equipment',  title: 'Medical Equipment', icon: 'fa-stethoscope', items: [] }
};

var currentCategoryFilter = 'all';

// Load items from server
function loadItems() {
    fetch('api_medicines.php')
        .then(function(res) { return res.json(); })
        .then(function(items) {
            // Reset items
            categoryConfigs['medicine'].items = [];
            categoryConfigs['equipment'].items = [];

            items.forEach(function(item) {
                var cat = item.category.toLowerCase();

                // Map old categories to new ones
                if (cat === 'equipment' || cat === 'devices') {
                    cat = 'equipment';
                } else {
                    cat = 'medicine';
                }

                var cardData = {
                    id: item.id,
                    name: item.item_name,
                    donor: item.donor_name || 'Anonymous',
                    wilaya: item.wilaya || 'Algeria',
                    expiry: item.expiry_date || '-',
                    img: 'img/' + item.image_path,
                    date: item.created_at || ''
                };

                categoryConfigs[cat].items.push(cardData);
            });

            renderSections();
        })
        .catch(function(e) {
            console.error('Error loading items:', e);
        });
}

// Render all sections
function renderSections() {
    var container = document.getElementById('sections-container');
    container.innerHTML = '';

    var keys = Object.keys(categoryConfigs);

    keys.forEach(function(key, idx) {
        var cat = categoryConfigs[key];
        if (cat.items.length === 0) return;

        var sId = 'scroll-' + idx;

        var cardsHtml = '';
        cat.items.forEach(function(item) {
            cardsHtml += '<div class="med-card" data-name="' + item.name.toLowerCase() + '" data-wilaya="' + item.wilaya.toLowerCase() + '" data-category="' + key + '">' +
                '<div class="qty-badge">Available</div>' +
                '<div class="img-container">' +
                '<img src="' + item.img + '" class="med-img" onerror="this.outerHTML=\'<i class=\\"fas fa-box-medical text-[#ff8fa3] text-5xl opacity-20\\"></i>\'">' +
                '</div>' +
                '<h3 class="font-extrabold text-xl mb-4 h-14 overflow-hidden">' + item.name + '</h3>' +
                '<div class="space-y-2 mb-6 text-sm">' +
                '<div class="flex justify-between border-b border-pink-50 pb-1 font-bold">' +
                '<span class="text-pink-300 uppercase text-[10px]">Donor</span>' +
                '<span class="text-gray-600">' + item.donor + '</span>' +
                '</div>' +
                '<div class="flex justify-between border-b border-pink-50 pb-1 font-bold">' +
                '<span class="text-pink-300 uppercase text-[10px]">Wilaya</span>' +
                '<span class="text-gray-600">' + item.wilaya + '</span>' +
                '</div>' +
                '<div class="flex justify-between border-b border-pink-50 pb-1 font-bold">' +
                '<span class="text-pink-300 uppercase text-[10px]">Date Added</span>' +
                '<span class="status-badge"><i class="fas fa-check-circle"></i> ' + item.expiry + '</span>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<button onclick="requestItem(this, ' + item.id + ')" class="bg-[#fdf2f4] text-[#ff8fa3] w-full py-4 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-[#ff8fa3] hover:text-white transition-all active:scale-95">Request Now</button>' +
                '</div>';
        });

        container.innerHTML += '<section id="' + cat.id + '" class="category-section group">' +
            '<div class="flex items-center gap-5 mb-8">' +
            '<div class="w-14 h-14 bg-white border-2 border-[#ffd1dc] rounded-2xl flex items-center justify-center text-[#ff8fa3] transition-all group-hover:bg-[#ff8fa3] group-hover:text-white group-hover:rotate-12">' +
            '<i class="fas ' + cat.icon + ' text-2xl"></i>' +
            '</div>' +
            '<h2 class="text-3xl font-extrabold">' + cat.title + '</h2>' +
            '</div>' +
            '<div class="relative px-2">' +
            '<button class="nav-btn btn-prev" onclick="scrollSection(\'' + sId + '\', -400)"><i class="fas fa-chevron-left"></i></button>' +
            '<div class="horizontal-scroll" id="' + sId + '">' + cardsHtml + '</div>' +
            '<button class="nav-btn btn-next" onclick="scrollSection(\'' + sId + '\', 400)"><i class="fas fa-chevron-right"></i></button>' +
            '</div>' +
            '</section>';
    });
}

// Filter by search text only
function filterItems() {
    var searchText = document.getElementById('mainSearch').value.toLowerCase();
    var resultsDiv = document.getElementById('resultsContainer');
    var count = 0;

    document.querySelectorAll('.med-card').forEach(function(card) {
        var nameMatch = card.dataset.name.includes(searchText);
        var categoryMatch = (currentCategoryFilter === 'all' || card.dataset.category === currentCategoryFilter);
        var show = nameMatch && categoryMatch;

        card.classList.toggle('hidden-item', !show);
        if (show) count++;
    });

    if (searchText) {
        resultsDiv.classList.remove('hidden');
        resultsDiv.style.opacity = '1';
        document.getElementById('searchTermText').textContent = searchText;
        document.getElementById('resCount').textContent = count;
    } else {
        resultsDiv.classList.add('hidden');
    }

    // Hide empty sections
    document.querySelectorAll('.category-section').forEach(function(section) {
        var hasVisible = section.querySelectorAll('.med-card:not(.hidden-item)').length > 0;
        section.style.display = hasVisible ? 'block' : 'none';
    });

    document.getElementById('noResults').classList.toggle('hidden', count > 0 || !searchText);
}

// Filter by category tab
function filterByCategory(cat, btn) {
    currentCategoryFilter = cat;

    // Update tab styles
    document.querySelectorAll('.cat-tab').forEach(function(b) { b.classList.remove('active'); });
    btn.classList.add('active');

    // Apply filter
    document.querySelectorAll('.med-card').forEach(function(card) {
        var searchText = document.getElementById('mainSearch').value.toLowerCase();
        var nameMatch = !searchText || card.dataset.name.includes(searchText);
        var catMatch = (cat === 'all' || card.dataset.category === cat);
        card.classList.toggle('hidden-item', !(nameMatch && catMatch));
    });

    // Hide empty sections
    document.querySelectorAll('.category-section').forEach(function(section) {
        var hasVisible = section.querySelectorAll('.med-card:not(.hidden-item)').length > 0;
        section.style.display = hasVisible ? 'block' : 'none';
    });
}

// Scroll carousel
function scrollSection(id, amount) {
    document.getElementById(id).scrollBy({ left: amount, behavior: 'smooth' });
}

// Request an item
function requestItem(btn, itemId) {
    var userData = localStorage.getItem('user');
    if (!userData) {
        alert('You must login first to request an item!');
        window.location.href = 'index.html';
        return;
    }

    fetch('take_item.php?id=' + itemId)
        .then(function(res) { return res.json(); })
        .then(function(result) {
            if (result.status === 'success') {
                alert('Request sent! You will be contacted by the donor soon.');
                btn.innerText = 'Requested';
                btn.disabled = true;
                btn.style.background = '#e2e8f0';
                btn.style.color = '#94a3b8';
            } else if (result.status === 'own_item') {
                alert('You cannot request your own donated item.');
            } else if (result.status === 'not_logged_in') {
                alert('Session expired. Please login again.');
                window.location.href = 'index.html';
            } else {
                alert('This item is no longer available.');
            }
        })
        .catch(function() {
            alert('Connection error. Please try again.');
        });
}

// Animate counter numbers
function animateCounters() {
    document.querySelectorAll('.counter').forEach(function(counter) {
        var target = parseInt(counter.getAttribute('data-target'));
        var count = 0;

        var timer = setInterval(function() {
            count += Math.ceil(target / 40);
            if (count >= target) {
                counter.innerText = target;
                clearInterval(timer);
            } else {
                counter.innerText = count;
            }
        }, 40);
    });
}

// Typing animation
var phrases = ['Connecting hearts through healing.', 'Your extra medicine is someone\'s hope.', 'Share the health, share the love.'];
var pIdx = 0, cIdx = 0, deleting = false;

function type() {
    var cur = phrases[pIdx];
    var el = document.getElementById('typing-container');
    if (!el) return;

    el.textContent = deleting ? cur.substring(0, cIdx - 1) : cur.substring(0, cIdx + 1);
    cIdx += deleting ? -1 : 1;

    if (!deleting && cIdx === cur.length) {
        deleting = true;
        setTimeout(type, 2000);
    } else if (deleting && cIdx === 0) {
        deleting = false;
        pIdx = (pIdx + 1) % phrases.length;
        setTimeout(type, 500);
    } else {
        setTimeout(type, deleting ? 50 : 100);
    }
}

// Start everything on page load
window.onload = function() {
    animateCounters();
    type();
    loadItems();
};
