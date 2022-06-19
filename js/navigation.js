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
    // return c;
}
//SETEND FUNCTION
function setEnd(lat,lng,locName){
    let end = document.querySelector("#endPoint");
    end.data = lat + "," + lng;
    end.value = locName;
    // return c;
}

//TURNBYTURN FUNCTION
function turnByturn(step){
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
    document.querySelector("#navContent").appendChild(cardDiv);    
}