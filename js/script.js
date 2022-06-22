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
            if (document.querySelector("#txtSearch").value){
                search();
            }
        }
    });

    // SEARCH EVENT LISTENER (trigger on search button)
    document.querySelector("#searchBtn").addEventListener("click", async function(){
        if (document.querySelector("#txtSearch").value){
            search();
        }
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
        map.setView([1.3521, 103.8198], 12)
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

            let coords = origin.split(",")
            map.flyTo([coords[0],coords[1]],15)

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