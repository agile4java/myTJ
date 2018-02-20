// Initialize your app
var myTJ = new Framework7({
    toast: {
        // set default title for all dialog shortcuts
        closeTimeout: 3000,
        // change default "OK" button text
        closeButton: 'Done'
    }
});
// var toastCenter = myTJ.toast.create({
//     text: 'I\'m on center',
//     position: 'center',
//     closeTimeout: 2000,
// });



var notes = [];
// Export selectors engine
var $$ = Dom7;

// Add view
var mainView = myTJ.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});

function mySnackbar(newText) {
    // Get the snackbar DIV
    var x = $$('.snackbar');

    // Change innerHTML to passed in String
    x.html(newText);
    // Add the "show" class to DIV
    x.toggleClass('show');

    setTimeout(function(){ x.toggleClass('show'); }, 3000);
    
}

myTJ.onPageInit("new-entry", function (page) {
   mySnackbar("New Text Note");
});
myTJ.onPageInit("new-picnote", function (page) {
    mySnackbar("New Picture Note");
});






//-----------------------------------Test Code Below-----------------------------

// function noteLogging(newNoteText) {
//     console.log("entering noteLogging with newNoteText = " + newNoteText);
//     // Alert

//     myTJ.dialog.alert();


//     notes.push(newNoteText);
// }


function printNotes() {


    var noteList = $$('#myTJnoteSpot');
    for (note in notes) {
        var newCard = document.createElement("div");
        newCard.innerHTML =
            '<div class="card myTJ-secondary">' +
            '   <div class="card-header myTJ-secondary-dark myTJ-text">' +
            '      <h2>' + newNoteText + '</h2>' +
            '   </div>' +
            '   <div class="card-content card-content-padding"> ' +
            '      <h2 class="myTJ-secondary myTJ-text-dark">' + noteText + '</h2>' +
            '   </div> ' +
            '   <div class="card-footer myTJ-secondary-dark myTJ-text">' +
            '      Posted on ' +
            '   </div> ' +
            '</div>';
    }

}// End noteLogging function
//-----------------------------------Test Code Above -----------------------------



// Open Camera app and take picture
function getNewPic() {

    // Set Camera Options
    function setOptions(srcType) {
        var options = {
            // Some common settings are 20, 50, and 100
            quality: 50,
            destinationType: Camera.DestinationType.FILE_URI,
            // In this app, dynamically set the picture source, Camera or photo gallery
            sourceType: srcType,
            encodingType: Camera.EncodingType.JPEG,
            mediaType: Camera.MediaType.PICTURE,
            allowEdit: true,
            correctOrientation: true,  //Corrects Android orientation quirks
            saveToPhotoAlbum: true,
        }
        return options;
    }

    var srcType = Camera.PictureSourceType.CAMERA;
    var options = setOptions(srcType);


    navigator.camera.getPicture(onSuccess, onFail, options);

    function onSuccess(imageURI) {

        //-----------------------------------Test Code Below-----------------------------
        mySnackbar("photo stored at: " + imageURI);
        //-----------------------------------Test Code Above -----------------------------

        var image = document.createElement("img");

        image.src = imageURI;
        image.setAttribute("id", "newPic");
        image.setAttribute("width", "100%");
        image.setAttribute("height", "auto");
        $("#picPlace").append(image);


    }

    function onFail(message) {
        console.log("Failed to get pic, error = " + message);
    }
}

// get a pictue taken previously

function getLibraryPic() {

    // Set Camera Options
    function setOptions(srcType) {
        var options = {
            // Some common settings are 20, 50, and 100
            quality: 50,
            destinationType: Camera.DestinationType.FILE_URI,
            // In this app, dynamically set the picture source, Camera or photo gallery
            sourceType: srcType,
            encodingType: Camera.EncodingType.JPEG,
            mediaType: Camera.MediaType.PICTURE,
            allowEdit: true,
            correctOrientation: true,  //Corrects Android orientation quirks
            saveToPhotoAlbum: true,
        }
        return options;
    }

    var srcType = Camera.PictureSourceType.PHOTOLIBRARY;
    var options = setOptions(srcType);


    navigator.camera.getPicture(onSuccess, onFail, options);

    function onSuccess(imageURI) {
        var image = document.createElement("img");
        image.src = imageURI;
        image.setAttribute("id", "newPic");
        image.setAttribute("width", "100%");
        image.setAttribute("height", "auto");
        $("#picPlace").append(image);
    }

    function onFail(message) {
        console.log("Failed to get pic, error = " + message);
    }
}

// get a pictue taken previously

function getCameraRollPic() {

    // Set Camera Options
    function setOptions(srcType) {
        var options = {
            // Some common settings are 20, 50, and 100
            quality: 50,
            destinationType: Camera.DestinationType.FILE_URI,
            // In this app, dynamically set the picture source, Camera or photo gallery
            sourceType: srcType,
            encodingType: Camera.EncodingType.JPEG,
            mediaType: Camera.MediaType.PICTURE,
            allowEdit: true,
            correctOrientation: true,  //Corrects Android orientation quirks
            saveToPhotoAlbum: true,
        }
        return options;
    }

    var srcType = Camera.PictureSourceType.SAVEDPHOTOALBUM;
    var options = setOptions(srcType);


    navigator.camera.getPicture(onSuccess, onFail, options);

    function onSuccess(imageURI) {

        var image = document.createElement("img");
        //   commented out for testing, manually setting an image source
        //   image.src = imageURI;
        image.src = "dancer.jpg";
        image.setAttribute("id", "newPic");
        image.setAttribute("width", "100%");
        image.setAttribute("height", "auto");
        $("#picPlace").append(image);
    }

    function onFail(message) {
        console.log("Failed to get pic, error = " + message);
    }
}


// -----------------------------------------------Remove - Test Function ONLY! -------------------------
function getTestPic() {



    var image = document.createElement("img");
    //   commented out for testing, manually setting an image source
    //   image.src = imageURI;
    image.src = "dancer.jpg";
    image.setAttribute("id", "../www/js/dancer.jpg");
    image.setAttribute("width", "100%");
    image.setAttribute("height", "auto");
    $("#picPlace").append(image);

    var uri = $('#picPlace').children('.img').attr('src');
    copyPhotoToAppDir(uri).then(function (newURI) {
        console.log(newURI);
    });


}

function quickLogImage(imageURI) {
    console.log("function quickLogImage imageURI = ");
    console.log(imageURI);
}

// ----------------------------------------- Remove Above ------------------------------------------


//copy photo to app file storage
function copyPhotoToAppDir(imageURI) {

    var fileEntry = createFile();

    //-------Begin----------------commented out previous copyPhotoToAppDir Code---------------------------
    // if (!imageURI) {
    //     console.warn("You need to pass imageURI");
    //     return;
    // }

    // var fileNameSplit = imageURI.split("/"),
    //     fileName = fileNameSplit[fileNameSplit.length - 1],
    //     deferred = jQuery.Deferred();

    // var copyPhoto = function (fileEntry) {
    //     window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSys) {
    //         fileSys.root.getDirectory("photos", { create: true, exclusive: false }, function (dir) {
    //             fileEntry.copyTo(dir, fileName, onCopySuccess, onFileFail);
    //         }, onFileFail);
    //     }, onFileFail);
    // };

    // var onCopySuccess = function onCopySuccess(entry) {
    //     console.log("NEW PATH", entry.fullPath);
    //     deferred.resolve(entry.fullPath);
    // };

    // var onFileFail = function (error) {
    //     console.log("COPY FAIL", error);
    //     deferred.reject();
    // };

    // window.resolveLocalFileSystemURL(imageURI, copyPhoto, onFileFail);

    // return deferred.promise;
    //-------End----------------commented out previous copyPhotoToAppDir Code---------------------------
}

// create a file in app persistent storage
function createFile() {

    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onSuccess, onError)

    function onSuccess(fileSystem) {

        fileSystem.root.getFile('newPic.jpg', { create: true, exclusive: false }, onSuccess, onError)

        function onSuccess(fileEntry) {

            return fileEntry;


            //-------------commented out - use for creating a fileWriter
            // fileEntry.createWriter(onSuccess, onError)

            // function onSuccess(fileWriter) {

            //        return fileWriter;
            //     } //end OnSuccess callback of createWriter

            // function onError(e) {
            //     alert('write error: ' + e.toString());



        } //end onSuccess callback of fileEntry

        function onError(e) {
            alert('fileEntry error: ' + e.toString());
        }

    } //end onSuccess callback of fileSystem


    function onError(error) {
        allert('File creation error: ' + error);
    }
}




// request for persistent storage
function getSomeStorage() {
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {

        console.log('file system open: ' + fs.name);
        fs.root.getFile("newImageFile.jpg", { create: true, exclusive: false }, function (fileEntry) {

            console.log("fileEntry is file?" + fileEntry.isFile.toString());
            // fileEntry.name == 'someFile.txt'
            // fileEntry.fullPath == '/someFile.txt'
            writeFile(fileEntry, null);

        }, onErrorCreateFile);

    }, onErrorLoadFs);

    // Use FileEntry object to write to the file by calling createWriter
    function writeFile(fileEntry, dataObj) {
        // Create a FileWriter object for our FileEntry (log.txt).
        fileEntry.createWriter(function (fileWriter) {

            fileWriter.onwriteend = function () {
                console.log("Successful file write...");
                readFile(fileEntry);
            };

            fileWriter.onerror = function (e) {
                console.log("Failed file write: " + e.toString());
            };

            // If data object is not passed in,
            // create a new Blob instead.
            if (!dataObj) {
                dataObj = new Blob(['some file data'], { type: 'text/plain' });
            }

            fileWriter.write(dataObj);
        });
    }

} // End getSomeStorage function

