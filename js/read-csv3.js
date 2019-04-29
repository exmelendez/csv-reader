/*********
 * 
 * Most recent JS as of 4/29/2019
 * 
 ********/
let ipageIsbnList;
const tlcTitlesIsbnList = [];

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
      const regexCode = /(\d{9,13}[xX]*)\s+[\w\s]*\d+\s+(["\w\s\/';,:\[\]!=?\-&\(\)]+)\]*\.*["]*/g;
      let results;

      while(results = regexCode.exec(file)) {
        let book = {
          isbn: results[1],
          title: results[2]
        };
        tlcTitlesIsbnList.push(book);
      }
    }
    compareIsbnLists();
  };

  const compareIsbnLists = () => {
      if(ipageIsbnList && tlcTitlesIsbnList.length > 0) {

        for(let i = 0; i < ipageIsbnList.length; i++) {
          for(let j = 0; j < tlcTitlesIsbnList.length; j++) {
            if(ipageIsbnList[i] == tlcTitlesIsbnList[j].isbn) {
              console.log("match found: " + tlcTitlesIsbnList[j].isbn + " Title: " + tlcTitlesIsbnList[j].title);
            }
          }
        }

        // console.log("From the Ipage CSV the first element ISBN is: \n" + ipageIsbnList[0]);
        // console.log("From the TLC CSV/XLS the first element ISBN is: \n" +tlcTitlesIsbnList[0].isbn);
        // console.log("From the TLC CSV/XLS the first element title is: \n" +tlcTitlesIsbnList[0].title);
      }
  };