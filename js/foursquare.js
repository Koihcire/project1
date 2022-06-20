//FOURSQUARE SEARCH API
const FOURSQUARE_BASE_API_URL = "https://api.foursquare.com/v3/";
const FOURSQUARE_API_KEY = "fsq3snHTNkPnKFXDgP3y9m0txe7VNN6fINb2FCSo9sz3rDo="

async function geoLocateSearch(query, myLat, myLng) {
    let url = FOURSQUARE_BASE_API_URL + "places/search";
    let response = await axios.get(url, {
        "params": {
            "query": query,
            "ll": myLat+","+myLng,
            "radius": 3000,
            "limit": 40,
            "sort": "POPULARITY",
            "categories": "19014,17114,16007,13034,13035,13340,13145,13099,13299,13199"
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
            "limit" : 50,
            "sort": "POPULARITY",
            "categories" : "19014,17114,16007,13034,13035,13340,13145,13099,13299,13199" //19014 hotel, 17114 shopping mall, 16007 landmarks, 13034 cafe, 13035 coffeeshop, 13340 singapore restaurant, 13145 fastfood, 13099 chinese, 13299 malay, 13199 indian
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