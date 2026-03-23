// Section Switching Logic
function showSection(id) {
    document.querySelectorAll('.page-section').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    // Hide search bar if not on Home
    document.getElementById('navSearch').style.visibility = (id === 'home') ? 'visible' : 'hidden';
}

const resultContainer = document.getElementById('resultContainer');

// Task 10: Local Time
function getTime(name) {
    let tz = name.includes("Australia") ? "Australia/Sydney" : 
             name.includes("Japan") ? "Asia/Tokyo" : 
             name.includes("Brazil") ? "America/Sao_Paulo" : "";
    if(!tz) return "";
    return new Date().toLocaleTimeString('en-US', {timeZone: tz, hour12:true, hour:'numeric', minute:'numeric'});
}

// Task 6/7/8: Search Logic
function handleSearch() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    resultContainer.innerHTML = "";

    fetch('travel_recommendation_api.json')
        .then(res => res.json())
        .then(data => {
            let results = [];
            if (query.includes('beach')) results = data.beaches;
            else if (query.includes('temple')) results = data.temples;
            else if (query.includes('countr') || query.includes('japan') || query.includes('brazil') || query.includes('australia')) {
                results = data.countries.flatMap(c => c.cities);
            }

            results.forEach(item => {
                const time = getTime(item.name);
                resultContainer.innerHTML += `
                    <div class="result-card">
                        <img src="${item.imageUrl}" alt="${item.name}">
                        <h3>${item.name}</h3>
                        ${time ? `<p style="color:#2d5a5c; font-weight:bold;">Local Time: ${time}</p>` : ''}
                        <p>${item.description}</p>
                        <button class="book-now" style="width:100%; border-radius:0;">Visit</button>
                    </div>`;
            });
        });
}

// Task 9: Clear
document.getElementById('btnReset').addEventListener('click', () => {
    document.getElementById('searchInput').value = "";
    resultContainer.innerHTML = "";
});

document.getElementById('btnSearch').addEventListener('click', handleSearch);
