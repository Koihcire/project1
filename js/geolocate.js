function geolocate() {
    //function for geoops argument
    var geoOps = {
        enableHighAccuracy: true,
        timeout: 10000
    }
    //function for success call back argument
    function successCallback(pos) {
        let lat = pos.coords.latitude;
        let lng = pos.coords.longitude;
        // console.log(lat, lng);
        //create maker of geolocation
        let marker = L.marker([lat, lng], { icon: userIcon });
        marker.addTo(map)
            .bindPopup(`
    This is my location</br>
    <button class="btn btn-success" onclick="setStart(${lat},${lng})">Set as Start</button>
    <button class="btn btn-danger" onclick="setEnd(${lat},${lng})">Set as End</button>
    `);
        marker.on('mouseover', function (e) {
            marker.openPopup();
        });
    }
    //function for errorcall back argument
    function errorCallback() {
        alert("wrong");
    }
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback, geoOps);
}