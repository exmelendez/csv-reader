let ipageIsbnList;
let tlcTitlesIsbnList;

/*
const test1 = (str) => {
  return test2(str);
};

const test2 = (str) => {
  let newString = str + 'a';
  return test3(newString);
};

const test3 = (str) => {
  return str + " final";
};

*/

let s = `

"PO#","Order by ipage login","Date Ordered","Time Ordered","Order type","Shipping Instructions","Warehouse Selection","Vendor","Product Code","EAN","Title","Author","Binding","Publisher","Pub Date","Price","PO# (line level)","Confirmation Status","Backorder","Backorder Cancellation Date","Quantity Ordered","Quantity Shipped","Quantity Backordered","Quantity Cancelled","Attention Line","Discount","Notes","Indexed","Imprint Symbol","Imprint Font","Imprint Font Color","Position","Imprint 1st Line","Imprint 2nd Line","Imprint 3rd Line","Imprint 4th Line"
"03110618","emelendez1","11/06/2018","09:46:19","QUOTATION SERVICE ONLY","Default Ingram Shipping Instructions","DC Pairs","INGRAM","068807166X          ","9780688071660","Russell Sprouts","Hurwitz, Johanna","Hardcover","Morrow Junior Books","09/01/87",13.93,"","OUT OF PRINT","Y","05-JAN-19",2,0,0,2,emelendez1,"10.00","","N","","","","","","","",""
"03110618","emelendez1","11/06/2018","09:46:19","QUOTATION SERVICE ONLY","Default Ingram Shipping Instructions","DC Pairs","INGRAM","0688087922          ","9780688087920","Russell and Elisa","Hurwitz, Johanna","Hardcover","Morrow Junior Books","09/01/89",11.95,"","NOT STOCKED BY INGRAM","Y","05-JAN-19",2,0,0,2,emelendez1,"0.00","","N","","","","","","","",""
"03110618","emelendez1","11/06/2018","09:46:19","QUOTATION SERVICE ONLY","Default Ingram Shipping Instructions","DC Pairs","INGRAM","0688090958          ","9780688090951","Superduper Teddy","Hurwitz, Johanna","Hardcover","Morrow Junior Books","05/01/90",12.88,"","NOT STOCKED BY INGRAM","Y","05-JAN-19",2,0,0,2,emelendez1,"0.00","","N","","","","","","","",""
"03110618","emelendez1","11/06/2018","09:46:19","QUOTATION SERVICE ONLY","Default Ingram Shipping Instructions","DC Pairs","INGRAM","0688099467          ","9780688099466","Nora and Mrs. Mind-Your-Own-Business","Hurwitz, Johanna","Hardcover","Morrow Junior Books","04/01/91",12.88,"","NOT STOCKED BY INGRAM","Y","05-JAN-19",2,0,0,2,emelendez1,"0.00","","N","","","","","","","",""
"03110618","emelendez1","11/06/2018","09:46:19","QUOTATION SERVICE ONLY","Default Ingram Shipping Instructions","DC Pairs","INGRAM","0688151892          ","9780688151898","Ever-Clever Elisa","Hurwitz, Johanna","Hardcover","HarperCollins Publishers","09/26/97",15,"","OUT OF STOCK INDEFINITELY","Y","05-JAN-19",2,0,0,2,emelendez1,"45.00","","N","","","","","","","",""
"03110618","emelendez1","11/06/2018","09:46:19","QUOTATION SERVICE ONLY","Default Ingram Shipping Instructions","DC Pairs","INGRAM","0688221734          ","9780688221737","New Neighbors for Nora","Hurwitz, Johanna","Hardcover","William Morrow & Company","03/01/79",11.95,"","NOT STOCKED BY INGRAM","Y","05-JAN-19",2,0,0,2,emelendez1,"0.00","","N","","","","","","","",""
"03110618","emelendez1","11/06/2018","09:46:19","QUOTATION SERVICE ONLY","Default Ingram Shipping Instructions","DC Pairs","INGRAM","0688320570          ","9780688320577","Busybody Nora","Hurwitz, Johanna","Hardcover","William Morrow & Company","04/01/90",11.88,"","NOT STOCKED BY INGRAM","Y","05-JAN-19",2,0,0,2,emelendez1,"0.00","","N","","","","","","","",""

`;

// console.log(s);

document.getElementById("input-form").reset();

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
        getAsText(files[1]);
    } else {
        alert('FileReader are not supported in this browser.');
    }
  }

  //Creates reader object, reads uploaded doc
  function getAsText(fileToRead) {
    var reader = new FileReader();
    //var fileType below will create a string of the file type; i.e. CSV || XLS
    const fileType = fileToRead.name.substr(fileToRead.name.length-3);
    
    // Read file into memory as UTF-8      
    reader.readAsText(fileToRead);

    //Handle errors load
    if(fileType === "csv") {
      console.log("entered csv loader");
        reader.onload = loadHandler;
    } else if (fileType === "xls") {
      console.log("entered xls loader");
        reader.onload = xlsLoadHandler;
    } else {
        reader.onerror = errorHandler;
    }
  }

  function loadHandler(event) {
    var csv = event.target.result;
    dataProcess(csv);
  }

  function xlsLoadHandler(event) {
    var xls = event.target.result;
    dataProcess(xls);
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
    // console.log("CSV Contents: ");
    // console.log("raw CSV type is: " + typeof csv);
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
  // console.log(lines);
//   drawOutput(lines);
  
}

const dataProcess = (csv) => {
  const matches = csv.match(/\b\d{9,13}X?\b/g);
  console.log("inside new ProcessData func");
  console.log(matches);
};

const xlsDataProcess = (xls) => {
  const matches = xls.match(/\b\d{9,13}X?\b/g);
  console.log("inside new ProcessData func");
  console.log(matches);
};


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
        alert("Cannot read file!");
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