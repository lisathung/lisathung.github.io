var pswpElement = document.querySelectorAll('.pswp')[0];
console.log(pswpElement);
// build items array
var items = [
    {
        src: 'https://placekitten.com/600/400',
        w: 600,
        h: 400
    },
    {
        src: 'https://placekitten.com/1200/900',
        w: 1200,
        h: 900
    }
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
