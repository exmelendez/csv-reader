document.getElementById("input-form").reset();
let multiArr = [
    [1, 2],
    [3, 4],
    [5, 6]
];
console.log(multiArr);

const fileNumCheck = (inputFiles) => {
    if(inputFiles.length < 2) {
        alert("at least two CSV files needed");
    } else {
        handleFiles(inputFiles);
    }
};

//Determines if Reader/File API is compatible w/ browser
function handleFiles(files) {
    // Check for the various File API support.
    if (window.FileReader) {
        // FileReader are supported.
        getAsText(files[0]);
    } else {
        alert('FileReader are not supported in this browser.');
    }
  }

  //Creates reader object, reads uploaded doc
  function getAsText(fileToRead) {
    var reader = new FileReader();
    const fileType = fileToRead.name.substr(fileToRead.name.length-3);
    
    // Read file into memory as UTF-8      
    reader.readAsText(fileToRead);

    //Handle errors load
    if(fileType === "csv") {
        reader.onload = csvLoadHandler;
    } else if (fileType === "xls") {
        reader.onload = xlsLoadHandler;
    } else {
        reader.onerror = errorHandler;
    }
  }

  function csvLoadHandler(event) {
    var csv = event.target.result;
    processDataTest(csv);
  }

  function xlsLoadHandler(event) {
    var csv = event.target.result;
    processDataTest(csv);
  }

  function processData(csv) {
    //   console.log("CSV Contents: ");
    //   console.log(csv);
      var allTextLines = csv.split(/\r\n|\n/);
    //   console.log(allTextLines);
      var lines = [];
      for (var i=0; i<allTextLines.length; i++) {
          var data = allTextLines[i].split(';');
              var tarr = [];
              for (var j=0; j<data.length; j++) {
                  tarr.push(data[j]);
              }
              lines.push(tarr);
      }
    console.log(lines);
    drawOutput(lines);
  }

  function processDataTest(csv) {
    console.log("CSV Contents: ");
    // console.log(csv);
    var allTextLines = csv.split(/\r\n|\n/);
    // console.log(allTextLines[0]);
    
    var lines = [];
    for (var i=0; i<allTextLines.length; i++) {
        let data = allTextLines[i].split(';');
            var tarr = [];
            for (var j=0; j<data.length; j++) {
                tarr.push(data[j]);
            }
            lines.push(tarr);
    }
    /*
    const newArr = [];
    for (let i = 0; i < lines.length; i++) {
        let data = lines[i].split("\t");
        newArr.push(data);
    } */
  console.log(lines);
//   drawOutput(lines);
  
}


  //if your csv file contains the column names as the first line
  function processDataAsObj(csv){
    var allTextLines = csv.split(/\r\n|\n/);
    var lines = [];

    //first line of csv
    var keys = allTextLines.shift().split(',');
    console.log(keys);

    while (allTextLines.length) {
      var arr = allTextLines.shift().split(',');
      var obj = {};
      for(var i = 0; i < keys.length; i++){
          obj[keys[i]] = arr[i];
      }
      lines.push(obj);
    }
    //   console.log(lines);
    drawOutputAsObj(lines);
  }


  function errorHandler(evt) {
    if(evt.target.error.name == "NotReadableError") {
        alert("Canno't read file !");
    }
  }

function drawOutput(lines){
	//Clear previous data
	document.getElementById("output").innerHTML = "";
	var table = document.createElement("table");
	for (var i = 0; i < lines.length; i++) {
		var row = table.insertRow(-1);
		for (var j = 0; j < lines[i].length; j++) {
			var firstNameCell = row.insertCell(-1);
			firstNameCell.appendChild(document.createTextNode(lines[i][j]));
		}
	}
	document.getElementById("output").appendChild(table);
}


//draw the table, if first line contains heading
function drawOutputAsObj(lines){
	//Clear previous data
	document.getElementById("output").innerHTML = "";
  var table1 = document.createElement("table");
  
  /* ADDED BY ME */
  document.getElementById("output2").innerHTML = "";
  var table2 = document.createElement("table");
  /* END */
	
	//for the table headings
	var tableHeader1 = table1.insertRow(-1);
 	Object.keys(lines[0]).forEach(function(key){
 		var el = document.createElement("TH");
		el.innerHTML = key;		
		tableHeader1.appendChild(el);
	});	
	
	//the data
	for (var i = 0; i < lines.length; i++) {
		var row = table1.insertRow(-1);
		Object.keys(lines[0]).forEach(function(key){
			var data = row.insertCell(-1);
			data.appendChild(document.createTextNode(lines[i][key]));
		});
  }

  /* ADDED BY ME */
  var tableHeader2 = table2.insertRow(-1);
 	Object.keys(lines[0]).forEach(function(key){
 		var el = document.createElement("TH");
		el.innerHTML = key;		
		tableHeader2.appendChild(el);
	});	
	
	//the data
	for (var i = 0; i < lines.length; i++) {
		var row = table2.insertRow(-1);
		Object.keys(lines[0]).forEach(function(key){
			var data = row.insertCell(-1);
			data.appendChild(document.createTextNode(lines[i][key]));
		});
  }
  /* END */
  

  document.getElementById("output").appendChild(table1);
  //added by me (below)
  document.getElementById("output").appendChild(table2);
}