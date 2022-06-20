document.querySelector("#feedbackSubmit").addEventListener("click", function(){
    let validName = false;
    let validEmail = false;
    let validContent = false;

    //check if name is filled
    let feedbackName = document.querySelector("#feedbackName").value;
    if (feedbackName){
        validName = true;
    }

    if (!validName){
        document.querySelector("#feedbackName").classList.add("feedbackError");
        document.querySelector("#nameError").classList.add("errorTxt");
        document.querySelector("#nameError").innerHTML = `please provide your name`;
    } else if (validName) {
        document.querySelector("#feedbackName").classList.remove("feedbackError");
        document.querySelector("#nameError").classList.remove("errorTxt");
        document.querySelector("#nameError").innerHTML = ``;
    }

    //check if email is valid
    let feedbackEmail = document.querySelector("#feedbackEmail").value;
    if (feedbackEmail.includes('@') && feedbackEmail.includes(".")){
        validEmail = true;
    }

    if (!validEmail){
        document.querySelector("#feedbackEmail").classList.add("feedbackError");
        document.querySelector("#emailError").classList.add("errorTxt");
        document.querySelector("#emailError").innerHTML = `please enter a valid email address`;
    } else if (validEmail) {
        document.querySelector("#feedbackEmail").classList.remove("feedbackError");
        document.querySelector("#emailError").classList.remove("errorTxt");
        document.querySelector("#emailError").innerHTML = ``;
    }

    //check if content in filled
    let feedbackContent = document.querySelector("#feedbackContent").value;
    if (feedbackContent){
        validContent = true;
    }

    if (!validContent){
        document.querySelector("#feedbackContent").classList.add("feedbackError");
        document.querySelector("#contentError").classList.add("errorTxt");
        document.querySelector("#contentError").innerHTML = `please provide us with your feedback`;
    } else if (validContent) {
        document.querySelector("#feedbackContent").classList.remove("feedbackError");
        document.querySelector("#contentError").classList.remove("errorTxt");
        document.querySelector("#contentError").innerHTML = ``;
    }


    if (validName && validEmail && validContent){
        //modal
        document.querySelector("#confirmationName").innerHTML = document.querySelector("#feedbackName").value;
        document.querySelector("#confirmationEmail").innerHTML = document.querySelector("#feedbackEmail").value;
        document.querySelector("#confirmationContent").innerHTML = document.querySelector("#feedbackContent").value;
        let feedbackSuccessModal = document.querySelector("#feedbackSuccessModal")
        let span = document.getElementsByClassName("close")[0];
        feedbackSuccessModal.style.display = "block";
        span.onclick = function(){
            feedbackSuccessModal.style.display = "none";
        }
        window.onclick = function(event){
            if (event.target == feedbackSuccessModal) {
                feedbackSuccessModal.style.display = "none";
            }
        }

        document.querySelector("#feedbackName").value = "";
        document.querySelector("#feedbackEmail").value = "";
        document.querySelector("#feedbackContent").value = "";
    }
})