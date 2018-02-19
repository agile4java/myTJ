var request = indexedDB.open('myTJ', 1);

request.onupgradeneeded = function (event) {
  var db = event.target.result;


  // Entries Table
  if (!db.objectStoreNames.contains('entries')) {
    var entriesOS = db.createObjectStore('entries', { keyPath: 'id', autoIncrement: true });

    entriesOS.createIndex('title', 'title', { unique: false });
    entriesOS.createIndex('date', 'date', { unique: false });
    entriesOS.createIndex('imgSource', 'imgSource', { unique: false });
    entriesOS.createIndex('body', 'body', { unique: false });
  }
}

request.onsuccess = function (event) {
  console.log('Success: Database Opened!');
  db = event.target.result;
  getEntries();



  myTJ.onPageInit('index', function (page) {

  });

  myTJ.onPageInit('new-entry', function (page) {

  });

  myTJ.onPageInit('new-entry', function (page) {
    // Get Formatted Current Date
    Date.prototype.toDateInputValue = (function () {
      var local = new Date(this);
      local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
      return local.toJSON().slice(0, 10);
    });

    // Display Current Date in Date Field
    $('#datePicker').val(new Date().toDateInputValue());
  });
}

request.onerror = function (event) {
  console.log('Error: Database NOT Opened!');
}


// Add Entry
function addEntry(noteType) {

  var noteType = noteType;
  var title = $('#title').val();
  var date = $('#datePicker').val();
  if (noteType === "newPicture") {
    var imgSource = $('#newPic').attr('src');
    
        //-----------------------------------Test Code Below-----------------------------
        quickLogImage(imgSource);
        //-----------------------------------Test Code Above -----------------------------
        
  }
  if (noteType === "newText") {
    var imgSource = null;
  }
  var body = $('#body').val();
  var transaction = db.transaction(['entries'], 'readwrite');
  var store = transaction.objectStore('entries');
  //Define Store
  var entry = {
    noteType: noteType,
    title: title,
    date: date,
    imgSource: imgSource,
    body: body
  };
  // Perform the add
  var request = store.add(entry);
  //Success
  request.onsuccess = function (event) {
    console.log('Entry Added!');
  }
  //Fail
  request.onerror = function (event) {
    console.log('There Was An Error!');
  }
} //end addEntry()



// Get and Display Entries
function getEntries() {
  console.log("Getting Entries....");


  // var transaction = db.transaction(['entries'], 'readonly');
  // var store = transaction.objectStore('entries');
  // var index = store.index('title');
  var id = 1;
  var noteType = new String();
  var title = new String();
  var date = date;
  var imgSource = new String();
  var body = new String();
  var entry = {
    noteType: noteType,
    title: title,
    date: date,
    imgSource: imgSource,
    body: body
  };

  var entriesArray = [];

  var transaction = db.transaction(['entries'], "readonly");
  var objectStore = transaction.objectStore('entries');


  objectStore.openCursor().onsuccess = function (event) {
    var cursor = event.target.result;
    if (cursor) {
      var entry = {
        noteType: noteType,
        title: title,
        date: date,
        imgSource: imgSource,
        body: body
      };
  
      entry.noteType = cursor.value.noteType;
      entry.title = cursor.value.title;
      entry.date = cursor.value.date;
      entry.imgSource = cursor.value.imgSource;
      entry.body = cursor.value.body;


      entriesArray.push(entry);
      cursor.continue();

    } else {
      var output = '';
      for (j = 0; j < entriesArray.length; j++) {
        console.log("entriesArray at index =" + j);
        
        if (entriesArray[j].noteType === "newPicture") {
          
        //-----------------------------------Test Code Below-----------------------------
       console.log("entriesArray imgSource = " + entriesArray[j].imgSource);
        //-----------------------------------Test Code Above -----------------------------
        
          var newCard = document.createElement("div");
          newCard.innerHTML =
            '<div class="card myTJ-secondary">' +
            '   <div class="card-header myTJ-secondary-dark myTJ-text">' +
            '      <h2>' + entriesArray[j].title + '</h2>' +
            '   </div>' +
            '   <div class="card-content card-content-padding"> ' +
            '       <img src="'+ entriesArray[j].imgSource + '" class="notePicture"></img>' +
            '      <h2 class="myTJ-secondary myTJ-text-dark">' + entriesArray[j].body + '</h2>' +
            '   </div> ' +
            '   <div class="card-footer myTJ-secondary-dark myTJ-text">' +
            '      Posted on ' + entriesArray[j].date +
            '   </div> ' +
            '</div>';
          var newCard = document.createElement("div");
        } else {
          var newCard = document.createElement("div");
          newCard.innerHTML =
            '<div class="card myTJ-secondary">' +
            '   <div class="card-header myTJ-secondary-dark myTJ-text">' +
            '      <h2>' + entriesArray[j].title + '</h2>' +
            '   </div>' +
            '   <div class="card-content card-content-padding"> ' +
            '      <h2 class="myTJ-secondary myTJ-text-dark">' + entriesArray[j].body + '</h2>' +
            '   </div> ' +
            '   <div class="card-footer myTJ-secondary-dark myTJ-text">' +
            '      Posted on ' + entriesArray[j].date +
            '   </div> ' +
            '</div>';
          $("#entryList").append(newCard);
        } // end else of make newCard
      } // end for loop of creating cards for entriesArray
    } // end of cursor else body
  } // end of openCursor.onSuccess

} // end of getEntries function



// Get Entry
function getEntry(entryID) {
  myTJ.onPageInit('entry', function (page) {
    var transaction = db.transaction(['entries'], 'readonly');
    var store = transaction.objectStore('entries');
    var request = store.get(entryID);

    request.onsuccess = function (event) {
      $('#entryTitle').html(request.result.title);
      $('#entryDate').html(request.result.date);
      $('#entryBody').html(request.result.body);
    };
  });
}


