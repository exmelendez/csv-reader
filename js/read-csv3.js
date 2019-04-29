/*********
 * 
 * Most recent JS as of 4/28/2019
 * 
 ********/
let ipageIsbnList;
let tlcTitlesIsbnList;

document.getElementById("input-form").reset();

const fileNumCheck = (inputFiles) => {
    if(inputFiles.length > 2) {
        alert("You may only choose two files");
        document.getElementById("input-form").reset();
    } else if(inputFiles.length < 2) {
        alert("at least two CSV files needed");
        document.getElementById("input-form").reset();
    } else {
        handleFiles(inputFiles);
    }
};

//Determines if Reader/File API is compatible w/ browser
const handleFiles = (files) => {
    // Check for the various File API support.
    if (window.FileReader) {

        for(let i = 0; i < 2; i++) {
            getAsText(files[i]);
        }
    } else {
        alert('FileReader are not supported in this browser.');
    }
  };

  //Creates reader object, reads uploaded doc
  const getAsText = (fileToRead) => {
    var reader = new FileReader();

    //get file type of file passed, as string
    const fileType = fileToRead.name.substr(fileToRead.name.length-3);

    // Read file into memory as UTF-8      
    reader.readAsText(fileToRead);

    //Handle errors load
    if(fileType === "csv") {
      reader.onload = ipageLoadHandler;
    } else if (fileType === "xls") {
      reader.onload = tlcLoadHandler;
    } else {
      reader.onerror = errorHandler;
    }
  };

  const ipageLoadHandler = (event) => {
    var file = event.target.result;
    dataProcess(file, "csv");
  };

  const tlcLoadHandler = (event) => {
    var file = event.target.result;
    dataProcess(file, "xls");
  };

  const errorHandler = (event) => {
    if(event.target.error.name == "NotReadableError") {
        alert("Cannot read file!");
    }
  };

  const dataProcess = (file, fileType) => {

    if(fileType == "csv") {
        ipageIsbnList = file.match(/\b\d{9,13}X?\b/g);
    } else {
        tlcTitlesIsbnList = file.match(/\b\d{9,13}X?\b/g);
    }
    compareIsbnLists();
  };

  const compareIsbnLists = () => {
      if(ipageIsbnList && tlcTitlesIsbnList) {
        console.log("both have data");
        console.log(ipageIsbnList);
        console.log(tlcTitlesIsbnList);
      } else {
          console.log("one or none have data");
          console.log(ipageIsbnList);
          console.log(tlcTitlesIsbnList);
      }
  };