////////////////////////////////////////////////////////////////////////////////////////
// The code within/below this block is the only thing needed to upload/read from a    //
// CSV file. This can be seen/noticed in the console and within the code of the       //
// processData function.                                                              //
//                                                                                    //
//                             * CODE BEGINS HERE *                                   //
////////////////////////////////////////////////////////////////////////////////////////


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
    // Read file into memory as UTF-8      
    reader.readAsText(fileToRead);
    // Handle errors load
    reader.onload = loadHandler;
    reader.onerror = errorHandler;
  }

  function loadHandler(event) {
    var csv = event.target.result;
    processDataAsObj(csv);
  }

  function processData(csv) {
      var allTextLines = csv.split(/\r\n|\n/);
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


  //if your csv file contains the column names as the first line
  function processDataAsObj(csv){
    var allTextLines = csv.split(/\r\n|\n/);
    var lines = [];

    //first line of csv
    var keys = allTextLines.shift().split(',');

    while (allTextLines.length) {
      var arr = allTextLines.shift().split(',');
      var obj = {};
      for(var i = 0; i < keys.length; i++){
          obj[keys[i]] = arr[i];
      }
      lines.push(obj);
    }
      console.log(lines);
    drawOutputAsObj(lines);
  }


  function errorHandler(evt) {
    if(evt.target.error.name == "NotReadableError") {
        alert("Canno't read file !");
    }
  }

////////////////////////////////////////////////////////////////////////////////////////
// The code above is the core of the programming that reads/uploads a CSV document.   //
//                                                                                    //
//                             * CODE ENDS HERE *                                     //
////////////////////////////////////////////////////////////////////////////////////////


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