"use strict"

function changFontSizes() {
    let windowWidth = window.innerWidth;
    let benefitBlocks = document.querySelectorAll('.benefits__block-head');

    benefitBlocks.forEach(block => {
        let heading = block.children[1];
        let desc = block.nextElementSibling;

        if (windowWidth >= 768) {
            heading.classList.remove('bodytext');
            heading.classList.add('subheading');
            desc.classList.remove('caption');
            desc.classList.add('bodytext');
        } 
        if (windowWidth >= 1200) {
            heading.classList.remove('bodytext');
            heading.classList.add('heading');
            desc.classList.remove('caption');
            desc.classList.add('subheading');
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    changFontSizes();
})