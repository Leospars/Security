let registeredUsers = ["Aaliyah", "Aashna-Paris", "Christina", "Delano", "Fitzgerald", "Javier", "Kisan", "Leon", "Matthew", "Michael", "Nicholas", "Nigel", "Richard", "Stashia"];
let userFace = true;
let unknownFace = false;
const faceDetcted = userFace;
function startCamera(camID) {
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(function (stream) {
            var videoElement = document.getElementById(camID);
            videoElement.srcObject = stream;
        })
        .catch(function (error) {
            console.error("Error accessing camera: " + camID, error);
            let camErrorMessageID = camID + "Error";
            errorMessage.style.display = "block";
            document.getElementById(camErrorMessageID).style.display = "block";
            document.getElementById("safeMessage").style.display = "none";
        });
}
window.onload = startCamera("cam1");
window.onload = startCamera("cam2");
window.onload = startCamera("cam3");
window.onload = startCamera("cam4");
window.onload = startCamera("camTest");

function isIntruder() {
    return (faceDetcted == unknownFace) ? true : false;
}

function whoIsInHouse() {
    if (isIntruder()) {
        console.log("Intruder is in House");
        console.error("Unregistered face identified in house, after leaving house and system is ON");
        return scream();
    } else {
        console.log("faceDetected : " + isIntruder());
        printRandUsers("cam1Identify");
        printRandUsers("cam2Identify");
        printRandUsers("cam3Identify");
        printRandUsers("cam4Identify");
    }
}

setInterval(whoIsInHouse, 1000);

function randomUsers() {
    let randUsers = [];
    let randUserNum = rand(1, 4);
    for (let i = 1; i <= randUserNum; i++) {
        randNum = rand(0, registeredUsers.length);
        if (randUsers.includes(registeredUsers[randNum]) == false)
            randUsers.push(registeredUsers[randNum]);
        else i--;
    }
    return randUsers;
}
//check is strinig is in an array?

function printRandUsers(elementID) {
    let randUser = randomUsers();
    let usersSeen = document.getElementById(elementID);
    randUser.forEach(user => {
        usersSeen.innerHTML = user + ", ";
    });
}

function scream() {
    return 0;
}

function rand(smallest, largest) {
    return Math.floor(Math.random() * (largest - smallest) + smallest);
}

const x = document.getElementById("demo");

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    x.innerHTML = "Latitude: " + position.coords.latitude +
        "<br>Longitude: " + position.coords.longitude;
}

