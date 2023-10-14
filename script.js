const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
const apiKey = 'W50vEi-VfXd34TNogtF_65i_MxFLt3f9PG5J4qCX2Lw';
const count = "30";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// check if image finshed loaded
function imageLoaded() {
    console.log('image laoded')
    imagesLoaded++
    if (imagesLoaded === totalImages) {
        ready = true;
        console.log('ready', ready)
    }else if (imagesLoaded=== 5) {
        loader.hidden = true;
    }

}


// helper function to set attribute s in dom elements
function setAttributes (element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key ,attributes[key])
    }
}

// Create elements for links and photos, and add them to the DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length
    console.log('tatalimages', totalImages)
    photosArray.forEach((photo) => {
        // Create <a> element to link to Unsplash
        const item = document.createElement("a");
setAttributes(item, {
    href: photo.links.html,
    target: '-blank',
})
        // Create <img> for photos
        const img = document.createElement('img');
setAttributes(img, {
    src: photo.urls.regular,
    alt: photo.alt_description,
    title: photo.alt_description
})
// event lisener cheek if each image is fihed  loaded
img.addEventListener('load', imageLoaded)
        // Put <img> inside <a>, then put both of them inside imageContainer
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// Get photos from Unsplash
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        // Handle errors here
        console.error(error);
    }
}
// Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
 ready = false;
 getPhotos();
    }
})

// On load
getPhotos();