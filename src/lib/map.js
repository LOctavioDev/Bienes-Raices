(function() {
    const lat = 20.166833;
    const lng = -98.065267;
    const map = L.map('map').setView([lat, lng], 16);
    let marker
    // const geocodeService = L.esri.Ge

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright"> OpenStreetMap</a> contributors'
    }).addTo(map);
    
    marker = new  L.marker([lat, lng], {
        draggable: false,
        autoPan: true
    }).addTo(map)

    marker.on('moveen', function(e){
        marker = e.target
        position= marker.getLatLng()
        console.log(`EL USUARIO SOLTO EL MARCADOR EN LAS COORDENADAS: ${position.lat}, ${position.lng}`);
        map.panTo(new L.LatLng(position.lat,position.lng))
    })
// TODO: OBTENER LA INFROMACIO  DE LA DIRECCION FISICA 
    geocodeService.reverse().latlng(position, 13).run(function(error, result){
        console.log(`LA INFROMACIO CALCULADA POR GEOCODER AL INTENTAR HACER LA REFERENCIA INTERNA ES: ${result}`);
        g
        marker.bind.Popup(result.address.LongLabel)
        document.querySelector('.street').textContent = result.address ?.Address ?? '';
        document.querySelector('#street').value = result.address ?.Address ?? '';
        document.querySelector('#lat').value = result.latlng ?.lat ?? '';
        document.querySelector('#lng').value = result.latlng ?.lng ?? '';
    })
})();