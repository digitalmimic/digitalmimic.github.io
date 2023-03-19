
document.addEventListener('DOMContentLoaded', function() {
    for(let image of document.querySelectorAll('.section-transparent img')) {
        image.addEventListener('mouseover', function (evt) {
            evt.target.style.opacity = 0.5;
        });
        image.addEventListener('mouseout', function (evt) {
            evt.target.style.opacity = 1;
        });
    };
});