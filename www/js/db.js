var entriesArray = [];

var request = indexedDB.open('myTJ', 1);

request.onupgradeneeded = function (event) {
  var db = event.target.result;


  // Entries Table
  if (!db.objectStoreNames.contains('entries')) {
    var entriesOS = db.createObjectStore('entries', { keyPath: 'id', autoIncrement: true });

    entriesOS.createIndex('id', 'id', { unique: true });
    entriesOS.createIndex('title', 'title', { unique: false });
    entriesOS.createIndex('date', 'date', { unique: false });

  }
}

request.onsuccess = function (event) {
  mySnackbar('Success: Database Opened!');
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
  mySnackbar('Error: Database NOT Opened!');
}


// Add Entry
function addEntry(noteType) {

  var noteType = noteType;
  var title = $('#title').val();
  var date = $('#datePicker').val();
  if (noteType === "newPicture") {
    var imgSource = $('#newPic').attr('src');
  } else if (noteType === "newText") {
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
    mySnackbar('Entry Added!');
  }
  //Fail
  request.onerror = function (event) {
    mySnackbar('There Was An Error!');
  }
} //end addEntry()



// Get and Display Entries
function getEntries() {
  mySnackbar("Getting Entries....");
  // noteLogging("Getting entries...");
  while (entriesArray.length > 0) {
    entriesArray.pop();
  }
  mySnackbar("EntriesArray length = " + entriesArray.length);


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



  var transaction = db.transaction(['entries'], "readonly");
  var objectStore = transaction.objectStore('entries');


  objectStore.openCursor().onsuccess = function (event) {
    var cursor = event.target.result;
    if (cursor) {
      var entry = {
        id: id,
        noteType: noteType,
        title: title,
        date: date,
        imgSource: imgSource,
        body: body
      };

      entry.id = cursor.value.id;
      entry.noteType = cursor.value.noteType;
      entry.title = cursor.value.title;
      entry.date = cursor.value.date;
      entry.imgSource = cursor.value.imgSource;
      entry.body = cursor.value.body;


      entriesArray.push(entry);
      id++;
      cursor.continue();

    } else {
      var output = '';
      for (j = 0; j < entriesArray.length; j++) {


        if (entriesArray[j].noteType === "newPicture") {

          //-----------------------------------Test Code Below-----------------------------
          mySnackbar("getEntries: entry " + entriesArray[j].id + " of " + entriesArray.length);

          //  output += '<li><a onclick="getEntry(' + cursor.value.id + ')" href="entry.html" class="item-link">' +
          //  '<div class="item-content">' +
          //  '<div class="item-inner"> ' +
          //  '<div class="item-title">' + cursor.value.title + '</div>' +
          //  '</div>' +
          //  '</div></a></li>';

          //  <div class="row">
          // <div class="col-50">
          //   <div id="edit-btn"></div>
          // </div>
          // <div class="col-50">
          //   <div id="delete-btn"></div>
          //   </div>
          //   </div>
          //-----------------------------------Test Code Above -----------------------------

          var newCard = document.createElement("div");
          newCard.innerHTML =
            '<div class="card myTJ-secondary">' +
            '   <div class="card-header myTJ-secondary-dark myTJ-text">' +
            '      <h2>' + entriesArray[j].title + '</h2>' +
            '   </div>' +
            '   <div class="card-content card-content-padding"> ' +
            '       <img src="' + entriesArray[j].imgSource + '" class="notePicture"></img>' +
            '      <h2 class="myTJ-secondary myTJ-text-dark">' + entriesArray[j].body + '</h2>' +
            '   </div> ' +
            '   <div class="card-footer myTJ-secondary-dark myTJ-text">' +
            '   <div class="col-50 myTJ-secondary-dark myTJ-text">' +
            '    <div="col-50">Posted on ' + entriesArray[j].date +
            '   </div> ' +
            '   <div class="col-50 myTJ-secondary-dark myTJ-text">' +
            '       <button onclick="getPicEntry(' + entriesArray[j].id + ')"' +
            '          id="edit-btn" href="pic-entry.html">Edit Entry' +
            '       </button>' +
            '      </div>' +
            '</div>';
          $("#entryList").append(newCard);
        } else {
          //-----------------------------------Test Code Below-----------------------------
          mySnackbar("getEntries: entry " + entriesArray[j].id + " of " + entriesArray.length);
          //-----------------------------------Test Code Above -----------------------------

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
            '   <div class="col-50 myTJ-secondary-dark myTJ-text">' +
            '    <div="col-50">Posted on ' + entriesArray[j].date +
            '   </div> ' +
            '   <div class="col-50 myTJ-secondary-dark myTJ-text">' +
            '       <a class="item-link" onclick="getEntry(' + entriesArray[j].id + ')"' +
            '          id="edit-btn" href="entry.html">Edit Entry' +
            '      </div>' +
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

    // On page Initialize get Entry to Edit
    var id = entryID;
    var transaction = db.transaction(['entries'], 'readonly');
    var store = transaction.objectStore('entries');
    var request = store.get(entryID);
    var onSubCall = "saveEditedEntry(" + entryID + ")";
    var onDeleteCall = "deleteWarn(" + entryID + ")";
   


    request.onsuccess = function (event) {

      $$('#entryTitle').attr('value', request.result.title);
      $$('#entryDatePicker').attr('value', request.result.date);
      $$('#entryBody').html(request.result.body);
      $$('#entryPageForm').attr('onsubmit', onSubCall);
      $$('#deleteEntryButton').attr('onclick', onDeleteCall);
     
    };
  });


} // end getEntry function

// Get Picture Entry
function getPicEntry(entryID) {

  myTJ.onPageInit('pic-entry', function (page) {
    var transaction = db.transaction(['entries'], 'readonly');
    var store = transaction.objectStore('entries');
    var request = store.get(entryID);

    request.onsuccess = function (event) {

      //-----------------------------------Test Code Below-----------------------------
      mySnackbar("getEntry.onsuccess.id  = " + entryID);
      console.log("gettingEntry for edit with id  = " + entryID);
      //-----------------------------------------------Test Code Above--------------------

      $('#entryTitle').html(request.result.title);
      $('#entryDate').html(request.result.date);
      $('#entryBody').html(request.result.body);
    };
  });
} // end getPicEntry function

// Clear the database
function clearDB() {

  var transaction = db.transaction(['entries'], "readwrite");
  var objectStore = transaction.objectStore('entries');

  var objectStoreRequest = objectStore.clear();

  objectStoreRequest.onsuccess = function (event) {
    mySnackbar("Database Cleared");
  };
} // end clearDB function

// Update an Entry
function saveEditedEntry(entryID) {
  // Get request on objectStore
  var transaction = db.transaction(['entries'], 'readwrite');
  var store = transaction.objectStore('entries');
  var request = store.get(entryID);

  request.onsuccess = function (event) {
    var entryToFix = request.result;

    // Get Updated entry values
    entryToFix.title = $$('#entryTitle').val();
    entryToFix.date = $$('#entryDatePicker').val();
    entryToFix.body = $$('#entryBody').val();
    entryToFix.noteType = "newText";
    entryToFix.imgSource = null;

    // store the entry back into the objectStore
    var requestPut = store.put(entryToFix);
    //Success
    requestPut.onsuccess = function (event) {
      console.log("Entry updated");
  };
    //Fail
    requestPut.onerror = function (event) {
      console.log('There Was An Error!');
    }
  };
} // end saveEditedEntry

function deleteWarn(entryID){
  console.log("deleteWarn entryID = " + entryID);
  var entryDelete = confirm("This will permanently delete the entry!!");
  if(entryDelete === true){
    console.log("deleteWarn confirm accepted with entryID = " + entryID);
  deleteEntry(entryID);
  }
}


function deleteEntry(entryID){
  console.log("deleteEntry with entryID = " + entryID);
  var deleteRecord = entryID;
  var transaction = db.transaction(["entries"],"readwrite");

	var store = transaction.objectStore("entries");
	var request = store.delete(deleteRecord);

	request.onsuccess = function(event){
		window.location.href="index.html";
	}
  
}