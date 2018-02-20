Professor Thomas,

I'm struggling with how to add a new Entry to my travel journal app that includes an image.

I've got the camera plugin working and I can take a picture and display it in "new-picnote.html"

The problem is when the user hits "submit"

The code for taking the picture is in "my-app.js"

When the user hits "submit" in "new-picnote.html" the code passes the "imageURI" to 
"getNewPic()" in "db.js".

The "imageURI" points to a photo in my travel journal's cache folder.  I save the "imageURI" to indexedDB and retrieve it in "getEntries" but it doesn't display with the other entries??

Also, to persist the photo there seems to be a few options.

From my research my options are:

1.	Leave the image in the cache and risk Android deleting it.

2.	Copy to persistent app file storage and store the link to that in indexedDB.

3.	Get a URL or URI to the photo stored in the photo library and store that in indexedDB.

4.	Return an imageData encoded in base64 and store that as a blob in indexedDB.

Do you have a suggestion on which option I should lean towards?

Thanks, Chad
