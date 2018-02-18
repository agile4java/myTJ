// Initialize your app
var myTJ = new Framework7();

// Export selectors engine
var $$ = Dom7;

// Add view
var mainView = myTJ.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});

// Callbacks to run specific code for specific pages, for example for About page:
myTJ.onPageInit('about', function (page) {
    // run createContentPage func after link was clicked
    $$('.create-page').on('click', function () {
        createContentPage();
    });
});

// Generate dynamic page
var dynamicPageIndex = 0;
function createContentPage() {
    mainView.router.loadContent(
        '<!-- Top Navbar-->' +
        '<div class="navbar">' +
        '  <div class="navbar-inner">' +
        '    <div class="left"><a href="#" class="back link"><i class="icon icon-back"></i><span>Back</span></a></div>' +
        '    <div class="center sliding">Dynamic Page ' + (++dynamicPageIndex) + '</div>' +
        '  </div>' +
        '</div>' +
        '<div class="pages">' +
        '  <!-- Page, data-page contains page name-->' +
        '  <div data-page="dynamic-pages" class="page">' +
        '    <!-- Scrollable page content-->' +
        '    <div class="page-content">' +
        '      <div class="content-block">' +
        '        <div class="content-block-inner">' +
        '          <p>Here is a dynamic page created on ' + new Date() + ' !</p>' +
        '          <p>Go <a href="#" class="back">back</a> or go to <a href="services.html">Services</a>.</p>' +
        '        </div>' +
        '      </div>' +
        '    </div>' +
        '  </div>' +
        '</div>'
    );
    return;
}

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
        var image = document.createElement("img");

        image.src = imageURI;
        image.setAttribute("id", imageURI);
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
        //   commented out for testing, manually setting an image source
        //   image.src = imageURI;
        image.src = "dancer.jpg";
        image.setAttribute("id", imageURI);
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
        image.setAttribute("id", imageURI);
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
  }

  // ----------------------------------------- Remove Above ------------------------------------------