(function() {
    const lat = 20.166833;
    const lng = -98.065267;
    const map = L.map('map').setView([lat, lng], 16);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright"> OpenStreetMap</a> contributors'
    }).addTo(map);
})();