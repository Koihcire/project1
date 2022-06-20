//GEOLOCATE FUNCTION
let myLat = "";
let myLng = "";
//function for geoops argument
var geoOps = {
    enableHighAccuracy: true,
    timeout: 10000
}
//function for success call back argument
function successCallback(pos) {
    myLat = pos.coords.latitude;
    myLng = pos.coords.longitude;
    // // console.log(lat, lng);
}
//function for errorcall back argument
function errorCallback() {
    console.log("callback error");
}
navigator.geolocation.getCurrentPosition(successCallback, errorCallback, geoOps);
// create function for geolocate marker creation
function geolocateMarker(myLat, myLng, geoLocateLayer,map){
    let marker = L.marker([myLat, myLng], { icon: userIcon });
    marker.addTo(geoLocateLayer)
        .bindPopup(`
                My location</br>
                <button class="btn btn-success" onclick="setStart(${myLat},${myLng}, 'My Location')">Set as Start</button>
                <button class="btn btn-danger" onclick="setEnd(${myLat},${myLng}, 'My Location')">Set as End</button>
                `);
    marker.on('mouseover', function (e) {
        marker.openPopup();
    });
    geoLocateLayer.addTo(map);
}