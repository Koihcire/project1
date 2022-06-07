//FOURSQUARE SEARCH API
const FOURSQUARE_BASE_API_URL = "https://api.foursquare.com/v3/";
const FOURSQUARE_API_KEY = "fsq3snHTNkPnKFXDgP3y9m0txe7VNN6fINb2FCSo9sz3rDo="

async function search(query) {
    let url = FOURSQUARE_BASE_API_URL + "places/search";
    let response = await axios.get(url, {
        "params": {
            "query": query,
            "near": "singapore",
            "limit" : 50
        },
        "headers": {
            "Accept": "application/json",
            "Authorization": FOURSQUARE_API_KEY
        }
    })
    console.log(response.data);
    return response.data;
}