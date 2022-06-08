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

function setStart(a,b){
    let start = document.querySelector("#startPoint");
    start.value = a + "," + b;
    // return c;
}

function setEnd(a,b){
    let end = document.querySelector("#endPoint");
    end.value = a + "," + b;
    // return c;
}

