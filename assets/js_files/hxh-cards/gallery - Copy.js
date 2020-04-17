var pswpElement = document.querySelectorAll('.pswp')[0];
console.log(pswpElement);
// build items array
var slides = [

    // slide 1
    {

        src: 'path/to/image1.jpg', // path to image
        w: 1024, // image width
        h: 768, // image height

        msrc: 'path/to/small-image.jpg', // small image placeholder,
        // main (large) image loads on top of it,
        // if you skip this parameter - grey rectangle will be displayed,
        // try to define this property only when small image was loaded before

        title: 'Image Caption'  // used by Default PhotoSwipe UI
                                // if you skip it, there won't be any caption

        // You may add more properties here and use them.
        // For example, demo gallery uses "author" property, which is used in the caption.
        // author: 'John Doe'
    },
    // slide 2
    {
        src: 'path/to/image2.jpg', 
        w: 600, 
        h: 600
        // etc.
    }
    // etc.
];

// define options (if needed)
var options = {
    // optionName: 'option value'
    // for example:
    index: 0 // start at first slide
};

console.log(pswpElement);
// Initializes and opens PhotoSwipe
// var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
var gallery = new PhotoSwipe( document.querySelectorAll('.pswp')[0], PhotoSwipeUI_Default, items, options);
gallery.init();
