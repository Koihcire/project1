window.addEventListener("DOMContentLoaded", async function () {

    //CREATE MAP
    let map = createMap(1.3521, 103.8198);

    //GEOLOCATE
    let myLat = ""
    let myLng = ""
    document.querySelector("#geolocate").addEventListener("click", function () {
        var geoOps = {
            enableHighAccuracy: true,
            timeout: 10000
        }
        function successCallback(pos) {
            myLat = pos.coords.latitude;
            myLng = pos.coords.longitude;
            // console.log(myLat, myLng);
            let me = L.marker([myLat, myLng]);
            me.addTo(map)
            .bindPopup(`This is my location`);
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
        searchActivityLayer.clearLayers();
        searchContent.innerHTML = "";
        let query = document.querySelector("#txtSearch").value;
        if (query) {
            //add location details
            let locations = await searchActivity(query);
            // console.log(locations);
            for (let loc of locations.results) {
                let lat = loc.geocodes.main.latitude;
                let lng = loc.geocodes.main.longitude;
        
                //extract place details
                let marker = L.marker([lat, lng]);
                marker.addTo(searchActivityLayer)
                    .bindPopup(`${loc.name}`);

                // //extract location details
                let fsq_id = loc.fsq_id;
                console.log (fsq_id);
                let detail = await activityDetails(fsq_id);
                console.log (detail);
                //grab description
                let description = "";
                try {
                    description = detail.description;
                } catch (e) {
                    console.log (e);
                }
                //grab photo
                let photoUrl = "";
                try {
                    photoUrl = `${detail.photos[0].prefix}400x400${detail.photos[0].suffix}`;
                } catch (e) {
                    console.log (e);
                }
                //grab website
                let websiteUrl = "";
                try {
                    websiteUrl = detail.website;
                } catch(e) {
                    console.log (e);
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
            }
            searchActivityLayer.addTo(map);
        } 
    })

    //NAVIGATION FUNCTION
    document.querySelector("#btnNavigate").addEventListener("click", async function () {
        let myOrigin = myLat + "," + myLng;
        console.log (myOrigin);
        let origin = myOrigin; //bukit timah
        let destination = "1.3321,103.7743"; //ngee ann poly
        navigate(origin, destination);
    })

})