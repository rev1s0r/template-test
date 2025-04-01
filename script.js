const loader = document.getElementById('loader');
const imageContainer = document.querySelector('#image-container');
let = photosArray = [];
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

let count = 5;
const apiKey ='nEcnOiqVRXpIblRd-pYQSqglpEV5Ii4Zn8s1ABomvLM';
let  apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

function imageLoaded () {
    imagesLoaded++;
    console.log('running');
    console.log(imagesLoaded);
    console.log(totalImages);
    if(imagesLoaded === totalImages) {
        ready = true;
        count = 30;
        apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
    }
}

function setAttributes (element,attributes) {
    for(const key in attributes) {
        element.setAttribute(key, attributes[key])
    }
}

function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    photosArray.forEach((photo) => {
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        });
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.title_description
        });
        img.addEventListener('load', imageLoaded);
        item.appendChild(img); 
        imageContainer.appendChild(item);
    });
}

async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {}
}

window.addEventListener('scroll',  ()=> {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
});

getPhotos();