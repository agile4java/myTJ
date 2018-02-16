var db;

var DBOpenRequest = indexedDB.open('mobilediary', 1);

DBOpenRequest.onsuccess = function(event){
  console.log('Success: Database Opened');
  db = DBOpenRequest.result;
};

DBOpenRequest.onerror = function(event){
  console.log('Error: Database Not Opened');
};




DBOpenRequest.onupgradeneeded = function(event){
  var db = event.target.result;

  db.onerror = function(event){
    console.log('Error in on upgraded needed');
  };

  // subjects object store
  if(!db.objectStoreNames.contains('subjects')){
    var subjectsOS = db.createObjectStore('subjects', {keyPath: 'id', autoIncrement: true});

    subjectsOS.createIndex('title', 'title', {unique: false});

  }
  // entries object store
  if(!db.objectStoreNames.contains('entries')){
    var entriesOS = db.createObjectStore('entries', {keyPath: 'id', autoIncrement: true});

    entriesOS.createIndex('title', 'title', {unique: false});
    entriesOS.createIndex('subject', 'subject', {unique: false});
    entriesOS.createIndex('date', 'date', {unique: false});
    entriesOS.createIndex('body', 'body', {unique: false});
  }
};



function addSubject(){
  var title = $('#title').val();

  var transaction = db.transaction(['subjects'], 'readwrite');

  var store = transaction.objectStore('subjects');

  // define store
  var subject = {
    title: title
  };

  // perform add
  var objectStoreRequest = store.add(subject);

  // success
  objectStoreRequest.onsuccess = function(event){
    console.log('subject added');
  };
  // fail
  objectStoreRequest.onerror = function(event){
    console.log('There was an error');
  };
}