//FILTERING FUNCTION
function filter(divId, divClass, layer){
    if (document.querySelector(`${divId}`).checked) {
        map.addLayer(layer);
        let cards = document.querySelectorAll(`${divClass}`);
        for (let card of cards) {
            card.style.display = "";
        }
    } else if (!document.querySelector(`${divId}`).checked) {
        map.removeLayer(layer);
        let cards = document.querySelectorAll(`${divClass}`);
        for (let card of cards) {
            card.style.display = "none";
        }
    }
}