// STB NAVIGATION API
const NAV_BASE_API_URL = "https://tih-api.stb.gov.sg/map/v1.1/experiential_route/transit";
const STB_API_KEY = "1LIwtLEBlh0AWpQTt3ElNHG367vmlVzd";

async function navigate(origin,destination) {
    let url = NAV_BASE_API_URL
    let response = await axios.get(url, {
        'params': {
            "apikey": STB_API_KEY,
            "origin": origin, //bukit timah
            "destination": destination //np
        },
        "headers": {
            "Accept": "application/json"
        }
    })
    console.log(response.data);
    return response.data;
}