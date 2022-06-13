//FOURSQUARE SEARCH API
const FOURSQUARE_BASE_API_URL = "https://api.foursquare.com/v3/";
const FOURSQUARE_API_KEY = "fsq3snHTNkPnKFXDgP3y9m0txe7VNN6fINb2FCSo9sz3rDo="

async function geoLocateSearch(query, myLat, myLng) {
    let url = FOURSQUARE_BASE_API_URL + "places/search";
    let response = await axios.get(url, {
        "params": {
            "query": query,
            "ll": myLat+","+myLng,
            "radius": 2000,
            "limit": 30,
            "categories": "19014,17114"
        },
        "headers": {
            "Accept": "application/json",
            "Authorization": FOURSQUARE_API_KEY
        }
    })
    // console.log(response.data);
    return response.data;
}

async function searchActivity(query) {
    let url = FOURSQUARE_BASE_API_URL + "places/search";
    let response = await axios.get(url, {
        "params": {
            "query": query,
            "near": "singapore",
            "limit" : 20,
            "categories" : "19014,17114" //19014 hotel, 17114 shopping mall
        },
        "headers": {
            "Accept": "application/json",
            "Authorization": FOURSQUARE_API_KEY
        }
    })
    // console.log(response.data);
    return response.data;
}

async function activityDetails(fsq_id) {
    let url = FOURSQUARE_BASE_API_URL + "places/" + fsq_id;
    let response = await axios.get(url, {
        "params" : {
            "fields" : "description,hours,website,photos"
        },
        "headers" : {
            "Accept": "application/json",
            "Authorization": FOURSQUARE_API_KEY
        }
    })   
    // console.log(response.data)
    return response.data;
}