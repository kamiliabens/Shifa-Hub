/* --- Theme Auto-Sync --- */
const syncTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.removeAttribute('data-theme');
    }
};
syncTheme();

const donorData = {
    'Kamilia B': 'Tizi Ouzou', 'Chahra H': 'Laghouat', 'Safia R': 'Sétif', 'Wissal C': 'Laghouat', 'Imane K': 'Blida', 'Islem H': 'Skikda', 'Yanis S': 'Guelma', 'Ilyes W': 'Souk Ahras', 'Mehdi L': 'Khenchela', 'Lilia O': 'Boumerدès', 'Taher M': 'Illizi', 'RahiL S': 'Mostaganem', 'Selma B': 'Oran', 'Wassim Z': 'Jijel', 'Ritaje N': 'Djelfa', 'Safa B': 'Annaba', 'Zakaria R': 'Alger', 'Meriem H': 'Bouira', 'Karim G': 'Laghouat', 'Sara B': 'Tlemcen', 'Abdel raouf W': 'In Salah', 'Amine J': 'Béjaïa', 'Farida L': 'Alger', 'Mohammed M': 'Djelfa', 'Farouk D': 'Laghouat', 'Ranim S': 'Constantine', 'Djihene H': 'Béchar', 'Toufik A': 'Tindouf'
};

const categories = [
    { id: 'antibiotics', title: 'Antibiotics', icon: 'fa-pills', items: [
        { name: 'Amoxicillin 1g', donor: 'Zakaria R', extra: 'EXP: 10/2027', qty: 2, img: 'amoxicilline-hub.jpg' },
        { name: 'Augmentin 1g', donor: 'Imane K', extra: 'EXP: 05/2027', qty: 1, img: 'augmentin-hub.jpg' },
        { name: 'Clamoxyl 250mg', donor: 'Lilia O', extra: 'EXP: 09/2026', qty: 3, img: 'clamoxyl-hub.jpg' },
        { name: 'Zithromax 250mg', donor: 'Wassim Z', extra: 'EXP: 01/2028', qty: 1, img: 'zithromax-hub.jpg' },
        { name: 'Cefixime 400mg', donor: 'Safa B', extra: 'EXP: 11/2026', qty: 4, img: 'cefixime-hub.jpg' },
        { name: 'Doxycycline 100mg', donor: 'Islem H', extra: 'EXP: 03/2027', qty: 2, img: 'doxycycline-hub.jpg' }
    ]},
    { id: 'vitamins', title: 'Vitamins', icon: 'fa-apple-alt', items: [
        { name: 'Vitamin C 1000mg', donor: 'Wissal C', extra: 'EXP: 08/2027', qty: 3, img: 'vitamin C -hub.jpg' },
        { name: 'Magnesium + B6', donor: 'Chahra H', extra: 'EXP: 03/2026', qty: 2, img: 'magnesium B6-hub.jpg' },
        { name: 'Vitamin D3', donor: 'Safia R', extra: 'EXP: 11/2026', qty: 1, img: 'vitamine D3-hub.jpg' },
        { name: 'feroglobin', donor: 'Kamilia B', extra: 'EXP: 08/2027', qty: 4, img: 'feroglobin-hub.jpg' },
        { name: 'Omega-3 Devlor', donor: 'Selma B', extra: 'EXP: 01/2027', qty: 2, img: 'omega3-hub.jpg' },
        { name: 'Multi Vitamin Complex', donor: 'Yanis S', extra: 'EXP: 12/2026', qty: 1, img: 'multivitamin complex-hub.jpg' }
    ]},
    { id: 'devices', title: 'Medical Devices', icon: 'fa-stethoscope', isDev: true, items: [
        { name: 'Glucose Meter', donor: 'Kamilia B', extra: 'Perfect State', qty: 1, img: 'Glucose Meter-hub.jpg' },
        { name: 'Nebulizer', donor: 'Taher M', extra: 'New Condition', qty: 2, img: 'Nebulizer-hub.jpg' },
        { name: 'Wheelchair', donor: 'Mehdi L', extra: 'Good State', qty: 1, img: 'Wheelchair-hub.jpg' },
        { name: 'Blood Pressure', donor: 'Ranim S', extra: 'Tested', qty: 1, img: 'Blood Pressure-hub.jpg' },
        { name: 'Thermometer', donor: 'Djihene H', extra: 'New', qty: 3, img: 'Thermometer-hub.jpg' },
        { name: 'Crutches', donor: 'Toufik A', extra: 'Working', qty: 1, img: 'Crutches-hub.jpg' }
    ]},
    { id: 'chronic', title: 'Chronic Care', icon: 'fa-heart-pulse', items: [
        { name: 'Glucophage 850mg', donor: 'Ritaje N', extra: 'EXP: 09/2027', qty: 2, img: 'Glucophage 850mg-hub.jpg' },
        { name: 'Aprovel 150mg', donor: 'Meriem H', extra: 'EXP: 12/2026', qty: 3, img: 'Aprovel 150mg-hub.jpg' },
        { name: 'Ventolin Spray', donor: 'Farouk D', extra: 'EXP: 03/2028', qty: 1, img: 'Ventolin Spray-hub.jpg' },
        { name: 'Amlodipine 5mg', donor: 'Sara B', extra: 'EXP: 06/2027', qty: 4, img: 'Amlodipine 5mg-hub.jpg' },
        { name: 'Lipitor 20mg', donor: 'RahiL S', extra: 'EXP: 10/2026', qty: 1, img: 'Lipitor 20mg-hub.jpg' },
        { name: 'Insulin Pen', donor: 'Mohammed M', extra: 'EXP: 04/2027', qty: 2, img: 'Insulin Pen-hub.jpg' }
    ]},
    { id: 'painkillers', title: 'Painkillers', icon: 'fa-head-side-virus', items: [
        { name: 'Doliprane 1g', donor: 'Farida L', extra: 'EXP: 06/2028', qty: 4, img: 'Doliprane 1g-hub.jpg' },
        { name: 'Advil 200mg', donor: 'Amine J', extra: 'EXP: 10/2027', qty: 2, img: 'Advil 200mg-hub.jpg' },
        { name: 'Aspirin 500mg', donor: 'Abdel raouf W', extra: 'EXP: 02/2027', qty: 1, img: 'Aspirin 500mg.jpg' },
        { name: 'Nurofen 200mg', donor: 'Karim G', extra: 'EXP: 08/2026', qty: 3, img: 'Nurofen 200mg-hub.jpg' },
        { name: 'Panadol Extra', donor: 'Wissal C', extra: 'EXP: 04/2027', qty: 2, img: 'Panadol Extra-hub.jpg' },
        { name: 'Paracetamol 1g', donor: 'Kamilia B', extra: 'EXP: 12/2027', qty: 4, img: 'paracetamol-hub.jpg' }
    ]}
];

const container = document.getElementById('sections-container');
categories.forEach((cat, idx) => {
    const sId = `scroll-${idx}`;
    container.innerHTML += `
        <section id="${cat.id}" class="category-section group">
            <div class="flex items-center gap-5 mb-8">
                <div class="w-14 h-14 bg-white border-2 border-[#ffd1dc] rounded-2xl flex items-center justify-center text-[#ff8fa3] transition-all group-hover:bg-[#ff8fa3] group-hover:text-white group-hover:rotate-12"><i class="fas ${cat.icon} text-2xl"></i></div>
                <h2 class="text-3xl font-extrabold">${cat.title}</h2>
            </div>
            <div class="relative px-2">
                <button class="nav-btn btn-prev" onclick="scrollSection('${sId}', -400)"><i class="fas fa-chevron-left"></i></button>
                <div class="horizontal-scroll" id="${sId}">
                    ${cat.items.map(i => `
                        <div class="med-card" data-name="${i.name.toLowerCase()}" data-donor="${i.donor.toLowerCase()}" data-location="${(donorData[i.donor] || '').toLowerCase()}">
                            <div class="qty-badge">Stock: ${i.qty}</div>
                            <div class="img-container"><img src="${i.img}" class="med-img" onerror="this.outerHTML='<i class=\'fas fa-box-medical text-[#ff8fa3] text-5xl opacity-20\'></i>'"></div>
                            <h3 class="font-extrabold text-xl mb-4 h-14 overflow-hidden">${i.name}</h3>
                            <div class="space-y-2 mb-6 text-sm">
                                <div class="flex justify-between border-b border-pink-50 pb-1 font-bold"><span class="text-pink-300 uppercase text-[10px]">Donor</span><span class="text-gray-600">${i.donor}</span></div>
                                <div class="flex justify-between border-b border-pink-50 pb-1 font-bold"><span class="text-pink-300 uppercase text-[10px]">Location</span><span class="text-gray-600">${donorData[i.donor] || 'Algeria'}</span></div>
                                <div class="flex justify-between font-bold"><span class="text-pink-300 uppercase text-[10px]">Status</span><span class="status-badge"><i class="fas fa-check-circle"></i> ${i.extra}</span></div>
                            </div>
                            <button class="bg-[#fdf2f4] text-[#ff8fa3] w-full py-4 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-[#ff8fa3] hover:text-white transition-all active:scale-95">Request Now</button>
                        </div>
                    `).join('')}
                </div>
                <button class="nav-btn btn-next" onclick="scrollSection('${sId}', 400)"><i class="fas fa-chevron-right"></i></button>
            </div>
        </section>`;
});

function filterMedicine() {
    const inp = document.getElementById('mainSearch').value.toLowerCase();
    const wil = document.getElementById('wilayaFilter').value.toLowerCase();
    const res = document.getElementById('resultsContainer');
    let totalFoundCount = 0;

    document.querySelectorAll('.med-card').forEach(card => {
        const nameMatch = card.dataset.name.includes(inp);
        const donorMatch = card.dataset.donor.includes(inp);
        const locationMatch = (wil === "" || card.dataset.location.includes(wil));
        
        const isVisible = (nameMatch || donorMatch) && locationMatch;
        card.classList.toggle('hidden-item', !isVisible);
        
        if (isVisible && (inp !== "" || wil !== "")) {
            totalFoundCount++; 
        }
    });

    if (inp || wil) {
        res.classList.remove('hidden');
        res.style.opacity = "1";
        document.getElementById('searchTermText').textContent = inp || wil;
        document.getElementById('resCount').textContent = totalFoundCount;
    } else {
        res.classList.add('hidden');
    }
    
    document.querySelectorAll('.category-section').forEach(s => {
        const hasVisible = s.querySelectorAll('.med-card:not(.hidden-item)').length > 0;
        s.style.display = hasVisible ? 'block' : 'none';
    });
    document.getElementById('noResults').classList.toggle('hidden', totalFoundCount > 0 || (inp === "" && wil === ""));
}

function animateCounters() {
    document.querySelectorAll('.counter').forEach(counter => {
        const target = +counter.getAttribute('data-target');
        let count = 0;
        const updateCount = () => {
            const speed = target / 40;
            if (count < target) {
                count += speed;
                counter.innerText = Math.ceil(count);
                setTimeout(updateCount, 40);
            } else { counter.innerText = target; }
        };
        updateCount();
    });
}

const phrases = ["Connecting hearts through healing.", "Your extra medicine is someone's hope.", "Share the health, share the love."];
let pIdx = 0, cIdx = 0, deleting = false;
function type() {
    const cur = phrases[pIdx], el = document.getElementById('typing-container');
    if(!el) return;
    el.textContent = deleting ? cur.substring(0, cIdx - 1) : cur.substring(0, cIdx + 1);
    cIdx += deleting ? -1 : 1;
    if (!deleting && cIdx === cur.length) { deleting = true; setTimeout(type, 2000); }
    else if (deleting && cIdx === 0) { deleting = false; pIdx = (pIdx + 1) % phrases.length; setTimeout(type, 500); }
    else { setTimeout(type, deleting ? 50 : 100); }
}

function scrollSection(id, amt) { document.getElementById(id).scrollBy({ left: amt, behavior: 'smooth' }); }

window.onload = () => { animateCounters(); type(); };