const chats = {
    chahed: {
        id: 'chahed',
        name: "Chahed Wissal",
        avatar: "https://ui-avatars.com/api/?name=Chahed+Wissal&background=ff8fa3&color=fff",
        status: "Online",
        lastMsg: "Is paracetamol 1g available?",
        messages: [
            { type: 'received', text: "Hello! Is paracetamol 1g available at Shifa Hub today?", time: "10:30 AM" },
            { type: 'sent', text: "Hi Wissal! Yes, we have some packs ready for donation.", time: "10:32 AM" }
        ]
    },
    chahra: {
        id: 'chahra',
        name: "Hattabi Chahra",
        avatar: "https://ui-avatars.com/api/?name=Hattabi+Chahra&background=1a1a2e&color=ff8fa3",
        status: "Active",
        lastMsg: "Thank you for the help!",
        messages: [
            { type: 'received', text: "I just received the package. Thank you so much for the help!", time: "09:15 AM" },
            { type: 'sent', text: "You're welcome! Glad we could assist you.", time: "09:20 AM" }
        ]
    },
    safia: {
        id: 'safia',
        name: "Safia Rahmani",
        avatar: "https://ui-avatars.com/api/?name=Safia+Rahmani&background=ff8fa3&color=fff",
        status: "Away",
        lastMsg: "Searching for glucose meter",
        messages: [
            { type: 'received', text: "Hello, do you have any glucose meters in stock for a patient?", time: "Yesterday" },
            { type: 'sent', text: "Let me check the inventory for you right now.", time: "Yesterday" }
        ]
    },
    imane: {
        id: 'imane',
        name: "Imane Kouidri",
        avatar: "https://ui-avatars.com/api/?name=Imane+Kouidri&background=1a1a2e&color=ff8fa3",
        status: "Online",
        lastMsg: "Feroglobin capsules query",
        messages: [
            { type: 'received', text: "Hi! Are there any Feroglobin capsules left?", time: "08:00 AM" },
            { type: 'sent', text: "Yes Imane, we have two boxes available.", time: "08:05 AM" }
        ]
    },
    ahmed: {
        id: 'ahmed',
        name: "Ahmed Reda",
        avatar: "https://ui-avatars.com/api/?name=Ahmed+Reda&background=ff8fa3&color=fff",
        status: "Active",
        lastMsg: "I'm at the reception...",
        messages: [
            { type: 'received', text: "Hello Kamilia, I've arrived at the reception area.", time: "14:00" },
            { type: 'sent', text: "Wait for me there, I'll be down in 2 minutes.", time: "14:02" }
        ]
    },
    sara: {
        id: 'sara',
        name: "Sara Ben",
        avatar: "https://ui-avatars.com/api/?name=Sara+Ben&background=1a1a2e&color=ff8fa3",
        status: "Last seen 2h ago",
        lastMsg: "How can I donate?",
        messages: [
            { type: 'received', text: "I have some extra medicine. How can I donate through the hub?", time: "11:00 AM" },
            { type: 'sent', text: "You can create a new listing in the 'Donate' section!", time: "11:10 AM" }
        ]
    }
};

let currentChatId = 'chahed';

function renderChatList() {
    const list = document.getElementById('chat-list');
    list.innerHTML = '';
    Object.values(chats).forEach(chat => {
        const active = chat.id === currentChatId;
        list.innerHTML += `
            <div onclick="openChat('${chat.id}')" class="chat-item ${active ? 'active' : ''} p-5 flex items-center gap-4 cursor-pointer">
                <img src="${chat.avatar}" class="w-12 h-12 rounded-2xl object-cover shadow-sm border border-pink-100">
                <div class="flex-1 overflow-hidden">
                    <div class="flex justify-between items-center mb-1">
                        <h4 class="font-bold text-sm truncate">${chat.name}</h4>
                        <span class="text-[9px] opacity-50 font-black">12:45</span>
                    </div>
                    <p class="text-xs opacity-60 truncate font-medium">${chat.lastMsg}</p>
                </div>
            </div>`;
    });
}

function openChat(id) {
    currentChatId = id;
    const chat = chats[id];
    document.getElementById('header-name').innerText = chat.name;
    document.getElementById('header-avatar').src = chat.avatar;
    document.getElementById('header-status').innerText = chat.status;
    renderChatList();
    renderMessages();
}

function renderMessages() {
    const container = document.getElementById('messages-container');
    container.innerHTML = '';
    chats[currentChatId].messages.forEach(msg => {
        const isSent = msg.type === 'sent';
        container.innerHTML += `
            <div class="flex ${isSent ? 'justify-end' : 'justify-start'} message-animate">
                <div class="max-w-[75%]">
                    <div class="${isSent ? 'bg-[#ff8fa3] text-white rounded-[25px] rounded-tr-none shadow-lg' : 'bg-[var(--msg-received)] rounded-[25px] rounded-tl-none border border-pink-100/20'} p-4">
                        <p class="text-sm font-semibold leading-relaxed">${msg.text}</p>
                    </div>
                    <p class="text-[9px] opacity-50 font-black mt-2 uppercase tracking-wider ${isSent ? 'text-right' : ''}">${msg.time}</p>
                </div>
            </div>`;
    });
    container.scrollTop = container.scrollHeight;
}

document.getElementById('chat-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const input = document.getElementById('msg-input');
    if (input.value.trim()) {
        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        chats[currentChatId].messages.push({ type: 'sent', text: input.value, time });
        chats[currentChatId].lastMsg = input.value;
        input.value = '';
        renderMessages();
        renderChatList();
    }
});

window.onload = () => openChat('chahed');