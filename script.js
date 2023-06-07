
//import fetch from 'node-fetch';

var count = 0;

var textarea = document.getElementById("text-area");
textarea.addEventListener("focus", function(event) {
    textarea.value = ""; // Clear the textarea's value
});

// textarea.addEventListener("blur", function(event) {
//     textarea.value = "Shorten a link here..."; // Restore the original text
// });

function validateForm(event) {
    event.preventDefault();
    var textarea = document.getElementById("text-area");
    var errorMessage = document.getElementById("error-message");

    if (textarea.value.trim() === "Shorten a link here...") {
        textarea.style.border = "3px solid #f46262";
        errorMessage.textContent ="Please add a link.";
    } else {
        textarea.style.border = "5px solid green";
        console.log(textarea.value.trim())
        var defaulLink = textarea.value.trim();
        errorMessage.textContent ="";
        var shortLink;
        getApi(defaulLink)
        .then(shortLink => {
            console.log("shortlink in above all "+shortLink+defaulLink);
            if (errorMessage.textContent =="Note a valid link"){
                textarea.style.border = "3px solid #f46262";
                return;
            }
            cloneBox(defaulLink,shortLink);
        })
        console.log("above all-shortlink"+shortLink);
        console.log(defaulLink);
        
    }
}

console.log("red red")

function getApi(newLink){
    var baseLink = "https://api.shrtco.de/v2/shorten?url=";
    var ourLink = newLink;
    //ourLink = "https://www.frontendmentor.io/challenges/url-shortening-api-landing-page-2ce3ob-G/hub";

    return fetch(baseLink+ourLink)
        .then (response => response.json())
        .then (data => {
            console.log("getapi"+data.result.short_link);
            return data.result.short_link;
        })
        //console.log(data.result.short_link)
        .catch(error => {
            var errorMessage = document.getElementById("error-message");
            errorMessage.textContent ="Note a valid link";
        })
        //console.log("function function")
    
}

function cloneBox(old,short) {
    count++;

    var originalBox = document.getElementById("box0");
    var cloneBox = originalBox.cloneNode(true);
    cloneBox.id = "box" + count;

    var cloneDefaultLink = cloneBox.getElementsByClassName("default-link")[0];
    console.log(cloneDefaultLink.textContent);
    cloneDefaultLink.textContent = old;
    //\
    console.log("cloneDefaultLink.textContent")
    console.log(cloneDefaultLink.textContent);
    console.log("clonebox-short"+short)

    var cloneShortLink = cloneBox.getElementsByClassName("short-link")[0];
    cloneShortLink.textContent = short;
    cloneShortLink.id = "short-link"+count;

    var cloneButton = cloneBox.querySelector("button");
    cloneButton.id = "copy-btn"+count;
    cloneButton.setAttribute("onClick","copyText('unik','short-link"+count+"','copy-btn"+count+"')");

    var boxContainer = document.getElementById("center-2-bottom");
    boxContainer.appendChild(cloneBox);

    var newBoxElement = document.getElementById("box" + count);
    newBoxElement.classList.remove("hidden");
    /////
    console.log("new element");
    console.log(newBoxElement.getElementsByClassName("short-link").textContent)
    console.log(cloneDefaultLink.textContent);
}

function copyText(unik,short,copybtn) {
    var textBox = document.getElementById(short);
    var text = textBox.textContent;
    var tempElement = document.createElement("textarea");
    tempElement.value = text;
    document.body.appendChild(tempElement);
    tempElement.select();
    document.execCommand("copy");
    document.body.removeChild(tempElement);

    var oldTheme = document.getElementsByClassName(unik);
    for (var i=0; i<oldTheme.length; i++){
        oldTheme[i].innerText ="Copy";
        oldTheme[i].style.backgroundColor ="#2acfcf";
    }

    var button = document.getElementById(copybtn);
    console.log(copybtn)
    button.innerText = "Copied!";
    button.style.backgroundColor = "#3b3054"
    
}