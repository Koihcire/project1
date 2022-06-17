//CREATE MAP
let map = createMap(1.3521, 103.8198);
let myLat = "";
let myLng = "";

let navigationLayer = L.layerGroup();
let geoLocateLayer = L.layerGroup();
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
        map.setView([myLat, myLng], 17);
        //create maker of geolocation
        let marker = L.marker([myLat, myLng], { icon: userIcon });
        marker.addTo(geoLocateLayer)
            .bindPopup(`
                    This is my location</br>
                    <button class="btn btn-success" onclick="setStart(${myLat},${myLng}, 'My Location')">Set as Start</button>
                    <button class="btn btn-danger" onclick="setEnd(${myLat},${myLng}, 'My Location')">Set as End</button>
                    `);
        marker.on('mouseover', function (e) {
            marker.openPopup();
        });
        geoLocateLayer.addTo(map);
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

        //turn off the noSearchResults div
        document.querySelector("#noSearchResults").style.display = "none";

        //do not reset the searchContent!
        // searchContent.innerHTML = "";
        let query = document.querySelector("#txtSearch").value;
        let locations = "";
        if (query) {
            //see if near me check box is checked
            let nearMe = document.querySelector("#checkNearMe");

            if (nearMe.checked) {
                map.setView([myLat, myLng], 14);
                L.circle([myLat, myLng], { radius: 3000 }).addTo(geoLocateLayer);
                let marker = L.marker([myLat, myLng], { icon: userIcon });
                marker.addTo(geoLocateLayer)
                    .bindPopup(`
                        This is my location</br>
                        <button class="btn btn-success" onclick="setStart(${myLat},${myLng})">Set as Start</button>
                        <button class="btn btn-danger" onclick="setEnd(${myLat},${myLng})">Set as End</button>
                        `);
                marker.on('mouseover', function (e) {
                    marker.openPopup();
                });
                geoLocateLayer.addTo(map);
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

                //create custom marker icons, add category details to content cards
                //set marker type according to category. need to loop through object as some locations are assigned more than 1 category
                let locationCategory = "";
                let markerIcon = "";
                for (let c of loc.categories) {
                    // console.log(c)
                    if (c.id == "17114") {
                        markerIcon = mallIcon;
                        locationCategory = "malls";
                        break;
                    } else if (c.id == "19014") {
                        markerIcon = hotelIcon;
                        locationCategory = "hotels";
                        break;
                    }
                }

                let divLocationId = "d" + fsq_id;
                let locationId = "a" + fsq_id;
                //add element to search content
                let divElement = document.createElement("div");
                divElement.innerHTML = `
                <div id="${divLocationId}" class="card mt-3 ${locationCategory}" style="width: 100%;">
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



                //add markers to map
                let marker = L.marker([lat, lng], { icon: markerIcon });

                for (let c of loc.categories) {
                    if (c.id == "17114") {
                        marker.addTo(mallsLayer)
                            .bindPopup(`
                                    ${locName}</br>
                                    <button class="btn btn-success" onclick="setStart(${lat}, ${lng}, '${locName}')">Set as Start</button>
                                    <button class="btn btn-danger" onclick="setEnd(${lat}, ${lng}, '${locName}')">Set as End</button>
                                    `);
                        break;
                    } else if (c.id == "19014") {
                        marker.addTo(hotelsLayer)
                            .bindPopup(`
                                    ${locName}</br>
                                    <button class="btn btn-success" onclick="setStart(${lat}, ${lng}, '${locName}')">Set as Start</button>
                                    <button class="btn btn-danger" onclick="setEnd(${lat}, ${lng}, '${locName}')">Set as End</button>
                                    `);
                        break;
                    }
                }

                //add marker mouserover functions
                marker.on('mouseover', function (e) {
                    marker.openPopup();
                    //scroll to content card
                    let element = document.querySelector(`#${divLocationId}`);
                    element.scrollIntoView({ behavior: "smooth" });
                })
                // marker.on("mouseout", function(e){
                //     marker.closePopup();
                // })

                //add marker click functions
                marker.on("click", function (e) {
                    // map.setView(marker.getLatLng(),17)
                    map.panTo(marker.getLatLng(), { animate: true });
                })

                //open marker popup when clicking content card
                document.querySelector(`#${divLocationId}`).addEventListener("mouseover", function (e) {
                    map.panTo(marker.getLatLng(), { animate: true });
                    // map.setView(marker.getLatLng(),17)
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
        geoLocateLayer.clearLayers();
        document.querySelector("#searchContent").innerHTML = "";
        //turn on the noSearchResults div
        document.querySelector("#noSearchResults").style.display = "block";
        document.querySelector("#txtSearch").value = "";
    })

    //NAVIGATION FUNCTION
    let navigationLayer = L.layerGroup();
    document.querySelector("#btnNavigate").addEventListener("click", async function () {
        let origin = document.querySelector("#startPoint").data;
        let destination = document.querySelector("#endPoint").data;
        navigationLayer.clearLayers();
        // console.log("origin :" + origin + "destination : " + destination);
        let navigateRoute = await navigate(origin, destination);
        console.log(navigateRoute);

        //create turn by turn cards on navigation content

        let navContent = document.querySelector("#navContent");

        let leg = navigateRoute.data.routes[0].legs[0];


        for (let step of leg.steps) {
            let stepTravelMode = "";
            let stepHtml = "";
            let stepDist = "";
            let stepTransit = "";

            let cardDiv = document.createElement("div");
            cardDiv.className = "card";
            let cardBodyDiv = document.createElement("div");
            cardBodyDiv.className = "card-body";

            if (step.travelMode == "WALKING") {
                stepTravelMode = step.travelMode;

                if (step.htmlInstructions) {
                    stepHtml = step.htmlInstructions;
                }
                if (step.distance) {
                    stepDist = step.distance;
                }
                if (step.transitDetail) {
                    stepTransit = step.transitDetail;
                }

                let stepDiv = document.createElement("div");
                stepDiv.innerHTML = `
                    <h5>${stepTravelMode}</h5>
                    <h6>${stepHtml}</h6>
                    `;

                for (substep of step.steps) {
                    let substepTravelMode = "";
                    let substepHtml = "";
                    let substepManeuver = "";
                    if (substep.travelMode) {
                        substepTravelMode = substep.travelMode;
                    }
                    if (substep.htmlInstructions) {
                        substepHtml = substep.htmlInstructions;
                    }
                    if (substep.maneuver) {
                        substepManeuver = substep.maneuver;
                    }

                    let substepDiv = document.createElement("div");
                    substepDiv.className = "card-text";
                    substepDiv.innerHTML = `
                        <p>${substepTravelMode} </br>
                        ${substepHtml} </br>
                        ${substepManeuver}</p>    
                        `;

                    stepDiv.appendChild(substepDiv);
                }
                cardBodyDiv.appendChild(stepDiv);
                cardDiv.appendChild(cardBodyDiv);

            }

            if (step.travelMode == "TRANSIT") {
                stepTravelMode = step.travelMode;
                let vehicleName = "";
                let departureStop = "";
                let departureTime = "";
                let arrivalStop = "";
                let arrivalTime = "";
                let numOfStops = "";

                if (step.htmlInstructions) {
                    step.Html = step.htmlInstructions;
                }
                if (step.transitDetail.line.vehicle.name) {
                    vehicleName = step.transitDetail.line.vehicle.name;
                }
                if (step.transitDetail.departureStop.name) {
                    departureStop = step.transitDetail.departureStop.name;
                }
                if (step.transitDetail.departureTime) {
                    departureTime = step.transitDetail.departureTime;
                }
                if (step.transitDetail.arrivalStop.name) {
                    arrivalStop = step.transitDetail.arrivalStop.name;
                }
                if (step.transitDetail.arrivalTime) {
                    arrivalTime = step.transitDetail.arrivalTime;
                }
                if (step.transitDetail.numOfStops) {
                    numOfStops = step.transitDetail.numOfStops;
                }

                let stepDiv = document.createElement("div");
                stepDiv.innerHTML = `
                        <h5>${stepTravelMode}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${stepHtml}</h6>
                        <div class="card-text">
                            <p>
                                ${vehicleName} </br>
                                ${departureStop} </br>
                                ${departureTime} </br>
                                ${arrivalStop} </br>
                                ${arrivalTime} </br>
                                ${numOfStops}
                            </p>
                        </div>
                        `;
                cardBodyDiv.appendChild(stepDiv);
                cardDiv.appendChild(cardBodyDiv);
            }
            navContent.appendChild(cardDiv);
        }
        
        






        //create overview polyline on map
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



    //add filter function on content cards

    document.querySelector("#hotels").addEventListener("click", function () {
        if (document.querySelector("#hotels").checked) {
            map.addLayer(hotelsLayer);
            let hotelCards = document.querySelectorAll(".hotels");
            for (let hotel of hotelCards) {
                hotel.style.display = "";
            }
        } else if (!document.querySelector("#hotels").checked) {
            map.removeLayer(hotelsLayer);
            let hotelCards = document.querySelectorAll(".hotels");
            for (let hotel of hotelCards) {
                hotel.style.display = "none";
            }
        }
    })

    document.querySelector("#malls").addEventListener("click", function () {
        if (document.querySelector("#malls").checked) {
            map.addLayer(mallsLayer);
            let mallCards = document.querySelectorAll(".malls");
            for (let mall of mallCards) {
                mall.style.display = "";
            }
        } else if (!document.querySelector("#malls").checked) {
            map.removeLayer(mallsLayer);
            let mallCards = document.querySelectorAll(".malls");
            for (let mall of mallCards) {
                mall.style.display = "none";
            }
        }
    })
})












