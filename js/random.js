let attendeesArray = [];
let currentWinner;
let allWinners = [];
let fileUploaded = false;

function closeModal(id) {
    let modal = document.getElementById(id);
    modal.style.display = "none";
}

function displayWinner() {
    $('#winners-name').html(currentWinner);
}

function errorHandler(event) {
    if(event.target.error.name == "NotReadableError") {
        alert("Cannot read file!");
    }
}

function getAsText(fileToRead) {
    let reader = new FileReader();
    reader.readAsText(fileToRead);

    reader.onload = loadHandler; //when it successfully loads
    reader.onerror = errorHandler;
}

//Will ensure that the browser can support file reader before continuing with logic
function handleFiles(files) {
    if(window.FileReader) {
        getAsText(files[0]); //uploaded file
        fileUploaded = true;
    } else {
        alert("FileReader not supported in browser");
    }
}

function loadHandler(event) {
    let csv = event.target.result;
    processData(csv);
}

function openModal(id) {
    let modal = document.getElementById(id);
    modal.style.display = "block";
}

function processData(csv) {
    let allTextLines = csv.split(/\r\n|\n/); //creates array

    //For loop below will deal with each row of data
    for(let i = 0; i < allTextLines.length; i++){
        let row = allTextLines[i].split(';'); //CSVs separate the lines/rows of data with semi colons. creates array

        let col = []; //empty array which will be reset everytime for loop iterates through

        //for loop below will go through each column of data and store separately. Creates an array within the Array.
        for(let j = 0; j < row.length; j++){
            col.push(row[j]);
        }

        attendeesArray.push(col);
    }
}

function randomizeWinner() {
    if(!fileUploaded) {
        openModal('errorModal');
    } else if(attendeesArray.length === 0) {
        openModal('emptyList');
    } else {
        let min = 0;
        let max = attendeesArray.length;
        let winnerIndex = Math.floor(Math.random() * (max - min + 1)) + min;

        currentWinner = attendeesArray[winnerIndex];
        displayWinner();
        allWinners.push(attendeesArray[winnerIndex]);
        removeWinner(winnerIndex);
        showAllWinners();
    }
}

function removeWinner(winnerIndex) {
    attendeesArray.splice(winnerIndex, 1);
}

function showAllWinners() {
    let content = "<h2>Previously Called Winners</h2>";
    content += "<ul>";
    for (let i = 0; i < allWinners.length; i++) {
      content += "<li>";
      content += allWinners[i];
      content += "</li>";
    }
    content += "</ul>";
    content += "<p><a onClick=\"location.reload()\" class=\"btn btn-info\" href=\"#\" role=\"button\">Reset</a></p>";

    $("#all-winners").html(content);
    console.log(allWinners);
}