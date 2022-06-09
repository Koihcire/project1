window.addEventListener("DOMContentLoaded", async function () {

    //CREATE MAP
    let map = createMap(1.3521, 103.8198);

    //GEOLOCATE
    let myLat = ""
    let myLng = ""
    //function to set start

    document.querySelector("#geolocate").addEventListener("click", function () {
        var geoOps = {
            enableHighAccuracy: true,
            timeout: 10000
        }
        function successCallback(pos) {
            myLat = pos.coords.latitude;
            myLng = pos.coords.longitude;
            // console.log(myLat, myLng);
            let marker = L.marker([myLat, myLng],{icon:userIcon});
            marker.addTo(map)
                .bindPopup(`
            This is my location</br>
            <button class="btn btn-success" onclick="setStart(${myLat},${myLng})">Set as Start</button>
            <button class="btn btn-danger" onclick="setEnd(${myLat},${myLng})">Set as End</button>
            `);
            marker.on('mouseover', function(e){
                marker.openPopup();
            });
        }
        function errorCallback() {
            alert("wrong");
        }
        navigator.geolocation.getCurrentPosition(successCallback, errorCallback, geoOps);
    })

    //SEARCH ACTIVITY FUNCTION
    let searchActivityLayer = L.layerGroup();
    let searchContent = document.querySelector("#searchContent");
    document.querySelector("#btnSearch").addEventListener("click", async function () {
        searchContent.innerHTML = "";
        let query = document.querySelector("#txtSearch").value;
        if (query) {
            //add location details
            let locations = await searchActivity(query);
            console.log(locations);
            for (let loc of locations.results) {
                let lat = loc.geocodes.main.latitude;
                let lng = loc.geocodes.main.longitude;
                let locName = loc.name;

                

                // //extract location details
                let fsq_id = loc.fsq_id;
                console.log(fsq_id);
                let detail = await activityDetails(fsq_id);
                console.log(detail);
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

                //add element to search content
                let divElement = document.createElement("div");
                divElement.innerHTML = `
                <div class="card mt-3" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">${loc.name}</h5>
                        <img src="${photoUrl}" style="width: 100%;">
                        <p class="card-text">${description}</p>
                        <p class="card-text">${openingHours}</p>
                        <p class="card-text">${loc.location.formatted_address}</p>
                        <a href="${websiteUrl}" class="btn btn-primary">More Info</a>
                        
                    </div>
                </div>
                `;
                searchContent.appendChild(divElement);

                //create markers
                //set marker type according to category
                let markerIcon = "";
                if (loc.categories[0].id == "17114"){
                    markerIcon = mallIcon;
                } else if (loc.categories[0].id == "19014"){
                    markerIcon = hotelIcon;
                }
                //add markers to map
                let marker = L.marker([lat, lng], {icon: markerIcon});
                marker.addTo(searchActivityLayer)
                    .bindPopup(`
                    ${locName}</br>
                    <button class="btn btn-success" onclick="setStart(${lat}, ${lng})">Set as Start</button>
                    <button class="btn btn-danger" onclick="setEnd(${lat}, ${lng})">Set as End</button>
                    `);
                //add marker functions
                marker.on('mouseover', function(e){
                    marker.openPopup();
                })
            }
            searchActivityLayer.addTo(map);
        }
    })
    
    //clear search
    document.querySelector("#btnClearSearch").addEventListener("click", function(){
        searchActivityLayer.clearLayers();
        searchContent.innerHTML = "";
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
    document.querySelector("#btnClearNavigate").addEventListener("click", function(){
        navigationLayer.clearLayers();
    })

})