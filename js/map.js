// MAP API
function createMap(lat, lng) {
    let map = L.map("map", {
        zoomControl: true
    });
    //set the center point of the map
    map.setView([lat, lng], 12)
    map.zoomControl.setPosition('bottomright')

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

let hotelsLayer = L.markerClusterGroup.layerSupport({disableClusteringAtZoom:13});
let mallsLayer = L.markerClusterGroup.layerSupport({disableClusteringAtZoom:13});
let restaurantsLayer = L.markerClusterGroup.layerSupport({disableClusteringAtZoom:13});
let attractionsLayer = L.markerClusterGroup.layerSupport({disableClusteringAtZoom:13});

//SET UP ICONS
var startIcon = L.icon({
    iconUrl: "images/circle.png",
    iconSize: [20,20]
})

var endIcon = L.icon({
    iconUrl: "images/end.png",
    iconSize: [20,20]
})

var mallIcon = L.icon({
    iconUrl: "images/mall.png",
    iconSize: [30, 30],
});

var mallLogoUrl = "/images/shopping-description.png";

var hotelIcon = L.icon({
    iconUrl: "images/hotel.png",
    iconSize: [30, 30],
});

var hotelLogoUrl = "/images/hotel-description.png"

var userIcon = L.icon({
    iconUrl: "images/user.png",
    iconSize: [40, 40],
});

var restaurantIcon = L.icon({
    iconUrl: "images/restaurant.png",
    iconSize: [30,30],
});

var restaurantLogoUrl = "/images/food-description.png";

var attractionIcon = L.icon({
    iconUrl: "images/attraction.png",
    iconSize: [30,30],
});

var attractionLogoUrl = "/images/attraction-description.png";




// <a href="https://www.flaticon.com/free-icons/maps-and-location" title="maps-and-location icons">Maps-and-location icons created by adrianadam - Flaticon</a>