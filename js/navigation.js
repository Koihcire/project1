// STB NAVIGATION API
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

function setStart(lat,lng,locName){
    let start = document.querySelector("#startPoint");
    start.data = lat + "," + lng;
    start.value = locName;
    // return c;
}

function setEnd(lat,lng,locName){
    let end = document.querySelector("#endPoint");
    end.data = lat + "," + lng;
    end.value = locName;
    // return c;
}

