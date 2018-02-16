var request = indexedDB.open('mobilediary', 1);

request.onupgradeneeded = function (event) {
  var db = event.target.result;

  // Subjects Table
  if (!db.objectStoreNames.contains('subjects')) {
    var subjectsOS = db.createObjectStore('subjects', { keyPath: 'id', autoIncrement: true });

    subjectsOS.createIndex('title', 'title', { unique: false });
  }

  // Entries Table
  if (!db.objectStoreNames.contains('entries')) {
    var entriesOS = db.createObjectStore('entries', { keyPath: 'id', autoIncrement: true });

    entriesOS.createIndex('title', 'title', { unique: false });
    entriesOS.createIndex('subject', 'subject', { unique: false });
    entriesOS.createIndex('date', 'date', { unique: false });
    entriesOS.createIndex('body', 'body', { unique: false });
  }
}

request.onsuccess = function (event) {
  console.log('Success: Database Opened!');
  db = event.target.result;

  // Get All Subjects
  getSubjects();

  mobileDiary.onPageInit('index', function (page) {
    getSubjects();
  });

  mobileDiary.onPageInit('new-entry', function (page) {
    getSubjectList();
  });

  // mobileDiary.onPageInit('new-entry', function (page) {
  //   // Get Formatted Current Date
  //   Date.prototype.toDateInputValue = (function () {
  //     var local = new Date(this);
  //     local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
  //     return local.toJSON().slice(0, 10);
  //   });

    // Display Current Date in Date Field
  //   $('#datePicker').val(new Date().toDateInputValue());
  // });
}

request.onerror = function (event) {
  console.log('Error: Database NOT Opened!');
}

function addSubject() {
  var title = $('#title').val();

  var transaction = db.transaction(['subjects'], 'readwrite');

  var store = transaction.objectStore('subjects');

  //Define Store
  var subject = {
    title: title
  }

  // Perfomr the add
  var request = store.add(subject);

  //Success
  request.onsuccess = function (event) {
    console.log('Subject Added!');
  }

  //Fail
  request.onerror = function (event) {
    console.log('There Was An Error!');
  }
}


function getSubjects() {
  console.log('Fetching Subjects...');

  var transaction = db.transaction(['subjects'], 'readonly');
  var store = transaction.objectStore('subjects');
  var index = store.index('title');

  var output = '';
  index.openCursor().onsuccess = function (event) {
    var cursor = event.target.result;
    if (cursor) {
      output += '<li><a onclick="getEntries(' + cursor.value.id + ')" href="entries.html" class="item-link">' +
        '<div class="item-content">' +
        '<div class="item-inner"> ' +
        '<div class="item-title">' + cursor.value.title + '</div>' +
        '</div>' +
        '</div></a></li>';
      cursor.continue();
    }
    $('#subjectList').html(output);
  }
}

// Get List of Subjects for Entry Form
function getSubjectList(current) {
  console.log('Fetching Subjects...');

  var transaction = db.transaction(['subjects'], 'readonly');
  var store = transaction.objectStore('subjects');
  var index = store.index('title');

  var output = '';
  index.openCursor().onsuccess = function (event) {
    var cursor = event.target.result;
    if (cursor) {
      if (cursor.value.id == current) {
        output += '<option value="' + cursor.value.id + '" selected>' + cursor.value.title + '</option>';
      } else {
        output += '<option value="' + cursor.value.id + '">' + cursor.value.title + '</option>';
      }
      cursor.continue();
    }
    $('#subjectSelect').html(output);
  }
}

