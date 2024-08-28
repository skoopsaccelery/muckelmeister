"use strict"

document.addEventListener('DOMContentLoaded', function() {
    let accordionBlocks = document.querySelectorAll('.accordion-block');

    accordionBlocks.forEach(function(accordionBlock) {
        let blockText = accordionBlock.nextElementSibling;
        let blockIcon = accordionBlock.children[1];

        accordionBlock.addEventListener('click', function() {
            if (blockText.classList.contains('hidden')) {
                blockText.classList.remove('hidden');
                blockIcon.classList.add('icon-active');
            } else {
                blockText.classList.add('hidden');
                blockIcon.classList.remove('icon-active');
            }
        })
    })
})