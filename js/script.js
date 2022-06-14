//CREATE MAP
let map = createMap(1.3521, 103.8198);
let myLat = "";
let myLng = "";

//GEOLOCATE
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
    alert("wrong");
}
navigator.geolocation.getCurrentPosition(successCallback, errorCallback, geoOps);


//LOAD EVENT LISTENERS
window.addEventListener("DOMContentLoaded", async function () {
    //GEOLOCATE
    //add event listener for geolocate button
    document.querySelector("#geolocate").addEventListener("click", async function () {
        map.setView([myLat, myLng], 12);
        //create maker of geolocation
        let marker = L.marker([myLat, myLng], { icon: userIcon });
        marker.addTo(map)
            .bindPopup(`
                    This is my location</br>
                    <button class="btn btn-success" onclick="setStart(${myLat},${myLng})">Set as Start</button>
                    <button class="btn btn-danger" onclick="setEnd(${myLat},${myLng})">Set as End</button>
                    `);
        marker.on('mouseover', function (e) {
            marker.openPopup();
        });
    })

    //SEARCH ACTIVITY FUNCTION
    // let searchActivityLayer = L.layerGroup();
    let hotelsLayer = L.layerGroup();
    let mallsLayer = L.layerGroup();
    let searchContent = document.querySelector("#searchContent");

    document.querySelector("#btnSearch").addEventListener("click", async function () {
        //show search options content
        let target = document.querySelector("#searchOptions").classList;
        if (!target.contains("show")) {
            target.add("show");
        }

        searchContent.innerHTML = "";
        let query = document.querySelector("#txtSearch").value;
        let locations = "";
        if (query) {
            //see if near me check box is checked
            let nearMe = document.querySelector("#checkNearMe");

            if (nearMe.checked) {
                map.setView([myLat, myLng], 14);
                let marker = L.marker([myLat, myLng], { icon: userIcon });
                marker.addTo(map)
                    .bindPopup(`
                        This is my location</br>
                        <button class="btn btn-success" onclick="setStart(${myLat},${myLng})">Set as Start</button>
                        <button class="btn btn-danger" onclick="setEnd(${myLat},${myLng})">Set as End</button>
                        `);
                marker.on('mouseover', function (e) {
                    marker.openPopup();
                });
                locations = await geoLocateSearch(query, myLat, myLng);

            } else if (!nearMe.checked) {
                locations = await searchActivity(query);
            }


            console.log(locations);
            for (let loc of locations.results) {
                let lat = loc.geocodes.main.latitude;
                let lng = loc.geocodes.main.longitude;
                let locName = loc.name;

                // //extract location details
                let fsq_id = loc.fsq_id;
                // console.log(fsq_id);
                let detail = await activityDetails(fsq_id);
                // console.log(detail);
                //grab description
                let description = "";
                try {
                    description = detail.description;
                } catch (e) {
                    console.log(e);
                }
                //grab photo
                let photoUrl = "";
                try {
                    photoUrl = `${detail.photos[0].prefix}400x400${detail.photos[0].suffix}`;
                } catch (e) {
                    console.log(e);
                }
                //grab website
                let websiteUrl = "";
                try {
                    websiteUrl = detail.website;
                } catch (e) {
                    console.log(e);
                }
                //grab hours
                let openingHours = "";
                try {
                    openingHours = detail.hours.display;
                } catch (e) {
                    console.log(e);
                }

                let divLocationId = "d" + fsq_id;
                let locationId = "a" + fsq_id;
                //add element to search content
                let divElement = document.createElement("div");
                divElement.innerHTML = `
                <div id="${divLocationId}"  class="card mt-3" style="width: 100%;">
                    <div class="card-body">
                        <a data-bs-toggle="collapse" href="#${locationId}" role="button" aria-expanded="false" aria-controls="${locationId}">
                        <h6 class="card-title">${locName}</h6>
                        </a>
                        <div id="${locationId}" class="collapse">
                            <img src="${photoUrl}" style="width: 100%;">
                            <p class="card-text descriptionFontSize">${description}</p></br>
                        </div> 
                        <img src="images/time.png" style="height:20px;">
                        <p class="card-text descriptionFontSize" style="display:inline; margin-left:10px;">${openingHours}</p> </br>
                        <img src="images/home.png" style="height:20px;">
                        <p class="card-text descriptionFontSize" style="display:inline; margin-left:10px;">${loc.location.formatted_address}</p> <hr>
                        <div id="logoLinks">
                            <a href="${websiteUrl}"><img src="images/world.png" style="height:20px;"></a>
                            <a href="#"><img src="images/phone.png" style="height:20px; margin-left: 10px;"></a>
                        </div>
                    </div>
                </div>
                `;
                searchContent.appendChild(divElement);

                //create markers
                //set marker type according to category. need to loop through object as some locations are assigned more than 1 category
                let markerIcon = "";
                for (let c of loc.categories) {
                    console.log(c)
                    if (c.id == "17114") {
                        markerIcon = mallIcon;
                        break;
                    } else if (c.id == "19014") {
                        markerIcon = hotelIcon;
                        break;
                    }
                }

                //add markers to map
                let marker = L.marker([lat, lng], { icon: markerIcon });

                for (let c of loc.categories) {
                    if (c.id == "17114") {
                        marker.addTo(mallsLayer)
                            .bindPopup(`
                                    ${locName}</br>
                                    <button class="btn btn-success" onclick="setStart(${lat}, ${lng})">Set as Start</button>
                                    <button class="btn btn-danger" onclick="setEnd(${lat}, ${lng})">Set as End</button>
                                    `);
                        break;
                    } else if (c.id == "19014") {
                        marker.addTo(hotelsLayer)
                            .bindPopup(`
                                    ${locName}</br>
                                    <button class="btn btn-success" onclick="setStart(${lat}, ${lng})">Set as Start</button>
                                    <button class="btn btn-danger" onclick="setEnd(${lat}, ${lng})">Set as End</button>
                                    `);
                        break;
                    }
                }
                // marker.addTo(searchActivityLayer)
                //     .bindPopup(`
                //     ${locName}</br>
                //     <button class="btn btn-success" onclick="setStart(${lat}, ${lng})">Set as Start</button>
                //     <button class="btn btn-danger" onclick="setEnd(${lat}, ${lng})">Set as End</button>
                //     `);

                //add marker functions
                marker.on('mouseover', function (e) {
                    marker.openPopup();
                    //scroll to content card
                    let element = document.querySelector(`#${divLocationId}`);
                    element.scrollIntoView({ behavior: "smooth" });
                })
                //open marker popup when clicking content card
                document.querySelector(`#${divLocationId}`).addEventListener("mouseover", function (e) {
                    marker.openPopup();
                })
            }
            // searchActivityLayer.addTo(map);
            mallsLayer.addTo(map);
            hotelsLayer.addTo(map);
        }
    })




    //CLEAR SEARCH
    document.querySelector("#btnClearSearch").addEventListener("click", function () {
        // searchActivityLayer.clearLayers();
        mallsLayer.clearLayers();
        hotelsLayer.clearLayers();
        searchContent.innerHTML = `<p>no search results</p>`;
        document.querySelector("#txtSearch").value = "";
    })

    //NAVIGATION FUNCTION
    let navigationLayer = L.layerGroup();
    document.querySelector("#btnNavigate").addEventListener("click", async function () {
        let origin = document.querySelector("#startPoint").value;
        let destination = document.querySelector("#endPoint").value;
        navigationLayer.clearLayers();
        // console.log("origin :" + origin + "destination : " + destination);
        let navigateRoute = await navigate(origin, destination);
        console.log(navigateRoute);

        let encoded = navigateRoute.data.routes[0].overview_polyline.points;
        let polyline = L.Polyline.fromEncoded(encoded).addTo(navigationLayer);
        navigationLayer.addTo(map);
    })
    document.querySelector("#btnClearNavigate").addEventListener("click", function () {
        navigationLayer.clearLayers();
        document.querySelector("#startPoint").value = "";
        document.querySelector("#endPoint").value = "";
    })

    let baseLayers = {
        "Navigation": navigationLayer
    };
    let overlays = {
        "Hotels": hotelsLayer,
        "Malls": mallsLayer,
    }
    L.control.layers(baseLayers, overlays).addTo(map);
})












