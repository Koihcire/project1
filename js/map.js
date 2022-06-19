// MAP API
function createMap(lat, lng) {
    let map = L.map("map", {
        zoomControl: true
    });
    //set the center point of the map
    map.setView([lat, lng], 12)
    map.zoomControl.setPosition('topright')

    //set up the tile layer
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw' //demo access token
    }).addTo(map);
    return map;
}

//INITIALISE LAYERS
let navigationLayer = L.layerGroup();
let geoLocateLayer = L.layerGroup();
let hotelsLayer = L.layerGroup();
let mallsLayer = L.layerGroup();
let restaurantsLayer = L.layerGroup();
let attractionsLayer = L.layerGroup();

//SET UP ICONS
var mallIcon = L.icon({
    iconUrl: "images/mall.png",
    iconSize: [40, 40],
});

var mallLogoUrl = "/images/shopping-description.png";

var hotelIcon = L.icon({
    iconUrl: "images/hotel.png",
    iconSize: [40, 40],
});

var hotelLogoUrl = "/images/hotel-description.png"

var userIcon = L.icon({
    iconUrl: "images/user.png",
    iconSize: [40, 40],
});

var restaurantIcon = L.icon({
    iconUrl: "images/restaurant.png",
    iconSize: [40,40],
});

var restaurantLogoUrl = "/images/food-description.png";

var attractionIcon = L.icon({
    iconUrl: "images/attraction.png",
    iconSize: [40,40],
});

var attractionLogoUrl = "/images/attraction-description.png";




// <a href="https://www.flaticon.com/free-icons/maps-and-location" title="maps-and-location icons">Maps-and-location icons created by adrianadam - Flaticon</a>