"use strict"

document.addEventListener('DOMContentLoaded', function() {
    let slidemenuDrawer = document.querySelector('.slidemenu-drawer');
    let slidemenuDrawerBlock = slidemenuDrawer.children[0];
    let slidemenuDrawerBlockContent = slidemenuDrawerBlock.children[0];
    let slidemenuToggle = document.querySelector('#slidemenu-toggle');

    function openDrawer() {
        slidemenuDrawer.classList.remove('hidden');

        setTimeout(() => {
            slidemenuDrawer.classList.add('opacity-enrolled');
        }, 200);

        setTimeout(() => {
            slidemenuDrawerBlock.classList.add('slidemenu-drawer-enrolled');
        }, 400);

        setTimeout(() => {
            slidemenuDrawerBlockContent.classList.add('opacity-enrolled');
        }, 800);
    };

    function closeDrawer() {
        slidemenuDrawerBlockContent.classList.remove('opacity-enrolled');

        setTimeout(() => {
            slidemenuDrawerBlock.classList.remove('slidemenu-drawer-enrolled');
        }, 300);

        setTimeout(() => {
            slidemenuDrawer.classList.remove('opacity-enrolled');
        }, 500);

        setTimeout(() => {
            slidemenuDrawer.classList.add('hidden');
        }, 700);
    };

    slidemenuToggle.addEventListener('mouseenter', () => {
        openDrawer();
    });

    slidemenuDrawerBlock.addEventListener('mouseleave', () => {
        closeDrawer();
    });
})