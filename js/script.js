//CREATE MAP
createMap(1.3521, 103.8198);

//SEARCH FUNCTION
document.querySelector("#btnSearch").addEventListener("click", async function () {
    let input = document.querySelector("#txtSearch").value;
    if (input) {
        search(input);
    }
})

//NAVIGATION FUNCTION
document.querySelector("#btnNavigate").addEventListener("click", async function () {
    let origin = "1.3548,103.7763"; //bukit timah
    let destination = "1.3321,103.7743"; //ngee ann poly
    navigate(origin, destination);
})


