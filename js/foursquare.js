//FOURSQUARE SEARCH API
const FOURSQUARE_BASE_API_URL = "https://api.foursquare.com/v3/";
const FOURSQUARE_API_KEY = "fsq3snHTNkPnKFXDgP3y9m0txe7VNN6fINb2FCSo9sz3rDo="

async function searchActivity(query) {
    let url = FOURSQUARE_BASE_API_URL + "places/search";
    let response = await axios.get(url, {
        "params": {
            "query": query,
            "near": "singapore",
            "limit" : 20,
            "categories" : "17114" //19009 hotel, 16003,16005,16015,16028,16032 national park,
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