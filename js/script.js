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

    //SEARCH FUNCTION
    document.querySelector("#btnSearch").addEventListener("click", async function () {
        let query = document.querySelector("#txtSearch").value;
        if (query) {
            let locations = await search(query);
            console.log(locations);
            for (let l of locations.results) {
                let lat = l.geocodes.main.latitude;
                let lng = l.geocodes.main.longitude;
                let marker = L.marker([lat, lng]).addTo(map)
                    .bindPopup(`${l.name}`);
            }
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