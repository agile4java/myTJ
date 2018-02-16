var request = indexedDB.open('myTJ', 1);

request.onupgradeneeded = function (event) {
  var db = event.target.result;


  // Entries Table
  if (!db.objectStoreNames.contains('entries')) {
    var entriesOS = db.createObjectStore('entries', { keyPath: 'id', autoIncrement: true });

    entriesOS.createIndex('title', 'title', { unique: false });
    entriesOS.createIndex('date', 'date', { unique: false });
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
function addEntry() {
  var title = $('#title').val();
  
  var date = $('#datePicker').val();
  var body = $('#body').val();

  var transaction = db.transaction(['entries'], 'readwrite');

  var store = transaction.objectStore('entries');

  //Define Store
  var entry = {
    title: title,
    date: date,
    body: body
  };

  // Perfomr the add
  var request = store.add(entry);

  //Success
  request.onsuccess = function (event) {
    console.log('Entry Added!');
  }

  //Fail
  request.onerror = function (event) {
    console.log('There Was An Error!');
  }
}

// Get and Display Entries
function getEntries() {
  console.log("Getting Entries....");
  
    
    var transaction = db.transaction(['entries'], 'readonly');
    var store = transaction.objectStore('entries');
    var index = store.index('title');

    var output = '';
    index.openCursor().onsuccess = function (event) {
      var cursor = event.target.result;
      if (cursor) {
        // if (cursor.value.id == subjectID) {
          output += '<li><a onclick="getEntry(' + cursor.value.id + ')" href="entry.html" class="item-link">' +
            '<div class="item-content">' +
            '<div class="item-inner"> ' +
            '<div class="item-title">' + cursor.value.title + '</div>' +
            '</div>' +
            '</div></a></li>';
        // }
        cursor.continue();
      }
      $('#entryList').html(output);
    }

  
}



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