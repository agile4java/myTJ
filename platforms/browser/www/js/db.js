var db;

var DBOpenRequest = indexedDB.open("mobilediary", 1);

DBOpenRequest.onsuccess = function(event){
  console.log("Success: Database Opened");
  db = DBOpenRequest.result;
};

DBOpenRequest.onerror = function(event){
  console.log("Error: Database Not Opened");
};




DBOpenRequest.onupgradeneeded = function(event){
  var db = event.target.result;

  db.onerror = function(event){
    console.log("Error in on upgraded needed");
  };

  // subjects object store
  if(!db.objectStoreNames.contains("subjects")){
    var os = db.createObjectStore("subjects", {autoincrement: true});

    os.createIndex("title", "title", {unique: false});
  }
  // entries object store
  if(!db.objectStoreNames.contains("entries")){
    var os = db.createObjectStore("entries", {keyPath: "id", autoincrement: true});

    os.createIndex("title", "title", {unique: false});
    os.createIndex("subject", "subject", {unique: false});
    os.createIndex("date", "date", {unique: false});
    os.createIndex("body", "body", {unique: false});
  }
};



function addSubject(){
  var title = $('#title').val();

  var transaction = db.transaction(["subjects"], "readwrite");

  var store = transaction.objectStore("subjects");

  // define store
  var subject = {
    title: title
  };

  // perform add
  var objectStoreRequest = store.add(subject);

  // success
  objectStoreRequest.onsuccess = function(event){
    console.log("subject added");
  };
  // fail
  objectStoreRequest.onerror = function(event){
    console.log("There was an error");
  };
}