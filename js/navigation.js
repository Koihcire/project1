// STB NAVIGATION API FUNCTION
const NAV_BASE_API_URL = "https://tih-api.stb.gov.sg/map/v1.1/experiential_route/transit";
const STB_API_KEY = "1LIwtLEBlh0AWpQTt3ElNHG367vmlVzd";

async function navigate(origin,destination) {
    let url = NAV_BASE_API_URL
    let response = await axios.get(url, {
        'params': {
            "apikey": STB_API_KEY,
            "origin": origin, 
            "destination": destination,
            "maxpoi" : 1
        },
        "headers": {
            "Accept": "application/json"
        }
    })
    // console.log(response.data);
    return response.data;
}

//SETSTART FUNCTION
function setStart(lat,lng,locName){
    let start = document.querySelector("#startPoint");
    start.data = lat + "," + lng;
    start.value = locName;
    //show search options content
    let target = document.querySelector("#searchOptions").classList;
    if (!target.contains("show")) {
        target.add("show");
    }
    //open the navigation pane
    let navTarget = document.querySelector("#navigate-tab");
    let tab = new bootstrap.Tab(navTarget);
    tab.show();
}
//SETEND FUNCTION
function setEnd(lat,lng,locName){
    let end = document.querySelector("#endPoint");
    end.data = lat + "," + lng;
    end.value = locName;
    //show search options content
    let target = document.querySelector("#searchOptions").classList;
    if (!target.contains("show")) {
        target.add("show");
    }
    //open the navigation pane
    let navTarget = document.querySelector("#navigate-tab");
    let tab = new bootstrap.Tab(navTarget);
    tab.show();
}

//TURNBYTURN FUNCTION
function turnByturn(step){
    let stepTravelMode = "";
    let stepHtml = "";
    let stepDist = "";
    let stepTransit = "";

    let cardDiv = document.createElement("div");
    cardDiv.className = "card mt-3";
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
            <div>
            <img src="images/walking.png" style="height: 20px; display:inline;">
            <h6 style="display:inline">${stepHtml}</h6>
            </div>
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
            substepDiv.className = "card-text mt-3 descriptionFontSize";
            substepDiv.innerHTML = `
                ${substepHtml} </br>
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
        let headsign = "";
        let lineName = "";
        let vehicleIconUrl = "";
        
        if (step.htmlInstructions) {
            stepHtml = step.htmlInstructions;
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
        if (step.transitDetail.headsign) {
            headsign = step.transitDetail.headsign;
        }
        if (step.transitDetail.line.name){
            lineName = step.transitDetail.line.name;
        }

        if (vehicleName == "Bus"){
            vehicleIconUrl = "images/bus.png";
        } else if (vehicleName == "Subway"){
            vehicleIconUrl = "images/train.png";
        };

        let stepDiv = document.createElement("div");
        stepDiv.innerHTML = `
                <div>
                <img src="${vehicleIconUrl}" style="height: 20px; display: inline;">
                <h6 style="display:inline; margin-left: 10px">${stepHtml}</h6>
                </div>
                <div class="card-text descriptionFontSize" style="margin-top: 10px;">
                    <p>
                        Take <b>${vehicleName} ${lineName}</b> (${headsign})</br>
                        </br>
                        from <b>${departureStop}</b> at <b>${departureTime}</b></br>
                        </br>
                        alight at <b>${arrivalStop}</b> after <b>${numOfStops}</b> stops
                    </p>
                </div>
                `;
        cardBodyDiv.appendChild(stepDiv);
        cardDiv.appendChild(cardBodyDiv);
    }
    document.querySelector("#navContent").appendChild(cardDiv);    
}