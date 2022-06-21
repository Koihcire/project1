//CREATE MAP
let map = createMap(1.3521, 103.8198);

//LOAD EVENT LISTENERS
window.addEventListener("DOMContentLoaded", async function () {

    //GEOLOCATE EVENT LISTENER
    document.querySelector("#geolocate").addEventListener("click", async function () {
        map.setView([myLat, myLng], 17);
        // create geolocate marker
        geolocateMarker(myLat, myLng, geoLocateLayer, map);
    });

    //SEARCH EVENT LISTENER (trigger on enter)
    document.querySelector("#txtSearch").addEventListener("keyup", async function (event) {
        if (event.key === "Enter") {
            // async function search() {

            //     //show loading div
            //     document.querySelector("#loading").style.display = "block";

            //     //show search options content
            //     let target = document.querySelector("#searchOptions").classList;
            //     if (!target.contains("show")) {
            //         target.add("show");
            //     }
            //     //open the search tab
            //     let searchContentTab = document.querySelector("#searchContent-tab");
            //     let tab = new bootstrap.Tab(searchContentTab);
            //     tab.show();

            //     //turn off the noSearchResults div
            //     document.querySelector("#noSearchResults").style.display = "none";

            //     //do not reset the searchContent!
            //     let query = document.querySelector("#txtSearch").value;
            //     let locations = "";
            //     if (query) {
            //         //see if near me check box is checked
            //         let nearMe = document.querySelector("#checkNearMe");

            //         if (nearMe.checked) {
            //             map.setView([myLat, myLng], 14);
            //             L.circle([myLat, myLng], { radius: 3000 }).addTo(geoLocateLayer);
            //             // create geolocate marker
            //             geolocateMarker(myLat, myLng, geoLocateLayer, map)
            //             //pull locations data with added gelocate ll
            //             locations = await geoLocateSearch(query, myLat, myLng);
            //         } else if (!nearMe.checked) {
            //             // pull locations data without geolocate ll
            //             locations = await searchActivity(query);
            //         }
            //         console.log(locations);


            //         // EXTRACT CORE DATA FROM FOURSQUARE API
            //         for (let loc of locations.results) {
            //             let lat = loc.geocodes.main.latitude;
            //             let lng = loc.geocodes.main.longitude;
            //             let locName = loc.name;
            //             let fsq_id = loc.fsq_id;
            //             // console.log(fsq_id);

            //             // EXTRACT SUPPORTING DATA USING FSQ_ID
            //             let detail = await activityDetails(fsq_id);
            //             // console.log(detail);
            //             //extract location description
            //             let description = "";
            //             if (detail.description) {
            //                 description = detail.description;
            //             }
            //             //extract photo url
            //             let photoUrl = "";
            //             try {
            //                 if (detail.photos[0].prefix) {
            //                     photoUrl = `${detail.photos[0].prefix}400x400${detail.photos[0].suffix}`;
            //                 }
            //             } catch (e) {
            //                 console.log(e)
            //             }
            //             //extract website url
            //             let websiteUrl = "";
            //             if (detail.website) {
            //                 websiteUrl = detail.website;
            //             }
            //             //extract opening hours overview
            //             let openingHours = "";
            //             if (detail.hours.display) {
            //                 openingHours = detail.hours.display;
            //             }

            //             //CREATE CUSTOM MARKERS BY CATEGORY
            //             //set marker type according to category. need to loop through object as some locations are assigned more than 1 category
            //             let locationCategory = "";
            //             let markerIcon = "";
            //             let descriptionIconUrl = "";
            //             let marker = L.marker([lat, lng]);

            //             for (let c of loc.categories) {
            //                 // console.log(c)
            //                 if (c.id == "17114") {
            //                     markerIcon = mallIcon;
            //                     locationCategory = "malls";
            //                     descriptionIconUrl = mallLogoUrl;
            //                     marker.setIcon(mallIcon).addTo(mallsLayer);


            //                     break;
            //                 } 
            //                 if (c.id == "19014") {
            //                     markerIcon = hotelIcon;
            //                     locationCategory = "hotels";
            //                     descriptionIconUrl = hotelLogoUrl;
            //                     marker.setIcon(hotelIcon).addTo(hotelsLayer);

            //                     break;
            //                 }
            //                 if (c.id == "13034" || c.id == "13035" || c.id == "13340" || c.id == "13145" || c.id == "13099" || c.id == "13299" || c.id == "13199") {
            //                     // 13034 cafe, 13035 coffeeshop, 13340 singapore restaurant, 13145 fastfood, 13099 chinese, 13299 malay, 13199 indian
            //                     markerIcon = restaurantIcon;
            //                     locationCategory = "restaurants";
            //                     descriptionIconUrl = restaurantLogoUrl;
            //                     marker.setIcon(restaurantIcon).addTo(restaurantsLayer);

            //                     break;
            //                 }
            //                 if (c.id == "16007") {
            //                     markerIcon = attractionIcon;
            //                     locationCategory = "attractions";
            //                     descriptionIconUrl = attractionLogoUrl;
            //                     marker.setIcon(attractionIcon).addTo(attractionsLayer);

            //                     break;
            //                     // create anomaly case for uncategorized food options
            //                 } else {
            //                     markerIcon = restaurantIcon;
            //                     locationCategory = "restaurants";
            //                     descriptionIconUrl = restaurantLogoUrl;
            //                     marker.setIcon(restaurantIcon).addTo(restaurantsLayer);
            //                 }
            //             }

            //             marker.bindPopup(`
            //                 <div class="container">
            //                     <div class="container d-flex">
            //                         <div>
            //                         <img src="${descriptionIconUrl}" style="height:30px; margin-top: 2px; margin-right:5px;">
            //                         </div>
            //                         <div style="height: 30px;">
            //                         <p style="font-size: 15px; margin-top: 5px;">${locName}</p>
            //                         </div>
            //                     </div>
            //                     <div class="container mt-2 ">
            //                         <button class="btn btn-sm btn-success" onclick="setStart(${lat}, ${lng}, '${locName}')">Set Start</button>
            //                         <button class="btn btn-sm btn-danger" onclick="setEnd(${lat}, ${lng}, '${locName}')">Set End</button>
            //                     </div>
            //                 </div>
            //                 `);


            //             //create content cards
            //             let divLocationId = "d" + fsq_id;
            //             let locationId = "a" + fsq_id;
            //             //add card element to search content
            //             let divElement = document.createElement("div");
            //             divElement.innerHTML = `
            //             <div id="${divLocationId}" class="card mt-3 ${locationCategory}" style="width: 100%;">
            //                 <div class="card-body">
            //                     <div class="container d-flex">
            //                         <img src="${descriptionIconUrl}" style="height:20px; margin-left: -12px; margin-right: 10px">
            //                         <a data-bs-toggle="collapse" href="#${locationId}" role="button" aria-expanded="false" aria-controls="${locationId}">
            //                         <h6 class="card-title">${locName}</h6>
            //                         </a>
            //                     </div>
            //                     <div id="${locationId}" class="collapse">
            //                         <img src="${photoUrl}" style="width: 100%;">
            //                         <p class="card-text descriptionFontSize">${description}</p>
            //                         <img src="images/time.png" style="height:20px;">
            //                         <p class="card-text descriptionFontSize" style="display:inline; margin-left:10px;">${openingHours}</p>
            //                     </div> 
            //                     <img src="images/home.png" style="height:20px;">
            //                     <p class="card-text descriptionFontSize" style="display:inline; margin-left:10px;">${loc.location.formatted_address}</p>
            //                     <hr>
            //                     <div id="logoLinks">
            //                         <a href="${websiteUrl}"><img src="images/world.png" style="height:20px;"></a>
            //                         <a href="#"><img src="images/phone.png" style="height:20px; margin-left: 10px;"></a>
            //                     </div>
            //                 </div>
            //             </div>
            //             `;
            //             document.querySelector("#searchCardContent").appendChild(divElement);

            //             //add marker mouserover functions
            //             marker.on('mouseover', function (e) {
            //                 marker.openPopup();

            //             })

            //             //add marker click functions
            //             marker.on("click", function (e) {
            //                 // map.setView(marker.getLatLng(),17)
            //                 // map.panTo(marker.getLatLng(), { animate: true });
            //                 marker.openPopup();

            //                 //show search options content
            //                 let target = document.querySelector("#searchOptions").classList;
            //                 if (!target.contains("show")) {
            //                     target.add("show");
            //                 }

            //                 //scroll to card
            //                 let element = document.querySelector(`#${divLocationId}`);
            //                 element.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
            //             })

            //             //open marker popup when clicking content card
            //             document.querySelector(`#${divLocationId}`).addEventListener("mouseover", function (e) {
            //                 map.panTo(marker.getLatLng(), { animate: true });
            //                 // map.setView(marker.getLatLng(),17)
            //                 marker.openPopup();
            //             })
            //         }
            //         // searchActivityLayer.addTo(map);
            //         mallsLayer.addTo(map);
            //         hotelsLayer.addTo(map);
            //         restaurantsLayer.addTo(map);
            //         attractionsLayer.addTo(map);

            //         //remove loading div
            //         document.querySelector("#loading").style.display = "none";
            //     }
            // } 
            search();
        }
    });

    // SEARCH EVENT LISTENER (trigger on search button)
    document.querySelector("#searchBtn").addEventListener("click", async function(){
        search();
    })

    //CLEAR SEARCH EVENT LISTENER
    document.querySelector("#btnClearSearch").addEventListener("click", function () {
        // searchActivityLayer.clearLayers();
        mallsLayer.clearLayers();
        hotelsLayer.clearLayers();
        restaurantsLayer.clearLayers();
        attractionsLayer.clearLayers();
        geoLocateLayer.clearLayers();
        navigationLayer.clearLayers()
        document.querySelector("#searchCardContent").innerHTML = "";
        document.querySelector("#navContent").innerHTML = "";
        document.querySelector("#startPoint").value = "";
        document.querySelector("#startPoint").data = "";
        document.querySelector("#endPoint").value = "";
        document.querySelector("#endPoint").data = "";
        //turn on the noSearchResults div
        document.querySelector("#noSearchResults").style.display = "block";
        document.querySelector("#txtSearch").value = "";
    });

    //NAVIGATION EVENT LISTENER
    document.querySelector("#btnNavigate").addEventListener("click", async function () {
        //check if input
        if (!document.querySelector("#startPoint").data) {
            document.querySelector("#startPoint").classList.add("feedbackError");
            document.querySelector("#startPoint").value = "Please select start point";
        }
        if (!document.querySelector("#endPoint").data) {
            document.querySelector("#endPoint").classList.add("feedbackError");
            document.querySelector("#endPoint").value = "Please select end point";
        }

        if (document.querySelector("#startPoint").data && document.querySelector("#endPoint").data) {
            //show loading div
            document.querySelector("#loading").style.display = "block";

            let origin = document.querySelector("#startPoint").data;
            let destination = document.querySelector("#endPoint").data;
            navigationLayer.clearLayers();
            // console.log("origin :" + origin + "destination : " + destination);
            let navigateRoute = await navigate(origin, destination);
            console.log(navigateRoute);

            //create markers
            let originCoords = origin.split(",");
            let destinationCoords = destination.split(",");
            let startMarker = L.marker([originCoords[0], originCoords[1]], { icon: startIcon }).addTo(navigationLayer);
            let endMarker = L.marker([destinationCoords[0], destinationCoords[1]], { icon: endIcon }).addTo(navigationLayer);

            //create turn by turn cards on navigation content
            let leg1 = navigateRoute.data.routes[0].legs[0];
            let leg2 = navigateRoute.data.routes[0].legs[4];
            try {
                for (let step of leg1.steps) {
                    turnByturn(step);
                }
            } catch (e) {
                console.log(e)
            }

            try {
                for (let step of leg2.steps) {
                    turnByturn(step);

                }
            } catch (e) {
                console.log(e)
            }

            //create overview polyline on map
            let encoded = navigateRoute.data.routes[0].overview_polyline.points;
            let polyline = L.Polyline.fromEncoded(encoded).addTo(navigationLayer);
            navigationLayer.addTo(map);

            //remove loading div
            document.querySelector("#loading").style.display = "none";
        }

    });

    //CLEAR NAVIGATION EVENT LISTENER
    document.querySelector("#btnClearNavigate").addEventListener("click", function () {
        navigationLayer.clearLayers();
        document.querySelector("#navContent").innerHTML = "";
        document.querySelector("#startPoint").value = "";
        document.querySelector("#startPoint").data = "";
        document.querySelector("#endPoint").value = "";
        document.querySelector("#endPoint").data = "";
    });

    //FILTERS CHECKBOXES EVENT LISTENERS
    //hotels layer
    document.querySelector("#hotels").addEventListener("click", function () {
        filter("#hotels", ".hotels", hotelsLayer);
    });
    //malls layer
    document.querySelector("#malls").addEventListener("click", function () {
        filter("#malls", ".malls", mallsLayer);
    });
    //restaurants layer
    document.querySelector("#restaurants").addEventListener("click", function () {
        filter("#restaurants", ".restaurants", restaurantsLayer);
    });
    //attractions layer
    document.querySelector("#attractions").addEventListener("click", function () {
        filter("#attractions", ".attractions", attractionsLayer);
    });

})