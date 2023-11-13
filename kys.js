const userFace = true;
const unknownFace = false;
let faceDetcted = userFace;
let registeredUsers = ["Aaliyah", "Aashna-Paris", "Christina", "Delano", "Fitzgerald", "Javier", "Kisan", "Leon", "Matthew", "Michael", "Nicholas", "Nigel", "Richard", "Stacia"];

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

setInterval(whoIsInHouse, 2500);

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

function printRandUsers(elementID) {
    let randUser = randomUsers();
    let allSeen = "";
    let usersSeen = document.getElementById(elementID);
    randUser.forEach(element => {
        allSeen += element;
        if(element != randUser[randUser.length-1]) allSeen += ", ";
    });
    usersSeen.innerHTML = allSeen;
}
function secondsToDhms(seconds) {
    const milliseconds = seconds * 1000;
    const date = new Date(milliseconds);
   
    const time = {
       days: date.getUTCDate() - 1,
       hours: date.getUTCHours(),
       minutes: date.getUTCMinutes(),
       seconds: date.getUTCSeconds(),
    };
   
    return time;
}

var secondsUp = 100;
function numTo2DigitString(number) {
    // Convert the number to a string
    let numberString = number.toString();
  
    // Check if the length is 1 (single digit)
    if (numberString.length === 1) {
      // Prepend '0' to make it a two-digit string
      numberString = '0' + numberString;
    }
  
    return numberString;
  }

var timeAwake = "";
function systemAwakeTime() {
    secondsUp+=1;
    dhms = secondsToDhms(secondsUp);

    timeAwake = numTo2DigitString(dhms.days) + ":" + numTo2DigitString(dhms.hours) + ":" +
        numTo2DigitString(dhms.minutes) + ":" + numTo2DigitString(dhms.seconds);

    console.log(secondsUp + " => " + timeAwake);
    systemAwake = document.getElementById(systemAwakeTime);
    systemAwake.innerHTML = timeAwake + " ";
}



//countdown function in js?
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

