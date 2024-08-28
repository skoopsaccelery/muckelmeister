"use strict"

document.addEventListener('DOMContentLoaded', function() {
    //Open Slidemenu
    let slidemenu = document.querySelector('.slidemenu');
    let slidemenuContainer = document.querySelector('.slidemenu-container');
    let slidemenuNav = document.querySelector('.slidemenu-container__nav');
    let slidemenuOpen = document.querySelector('.icon-hamburger');
    let slidemenuClose = document.querySelector('.slidemenu-container__close');
    let announcementbar = document.querySelector('.announcement');

    slidemenuOpen.addEventListener('click', function() {
        announcementbar.style.maxHeight = '0';
        slidemenu.classList.remove('hidden');

        setTimeout(() => {
            slidemenu.classList.remove('opacity-hidden');
        }, 50);

        setTimeout(() => {
            slidemenuContainer.classList.remove('opacity-hidden');
        }, 200);
        
        setTimeout(() => {
            slidemenuNav.classList.remove('opacity-hidden');
        }, 300);
    });

    slidemenuClose.addEventListener('click', function() {
        announcementbar.style.maxHeight = '37.5px';
        slidemenuNav.classList.add('opacity-hidden');

        setTimeout(() => {
            slidemenuContainer.classList.add('opacity-hidden');
        }, 200);

        setTimeout(() => {
            slidemenu.classList.add('opacity-hidden')
        }, 400);

        setTimeout(() => {
            slidemenu.classList.add('hidden');
        }, 600);
    })

    //Panelswitch Products
    let products = slidemenu.querySelector('#products');
    let productsContent = slidemenu.querySelector('#productsPanel');
    let navContent = slidemenu.querySelector('#nav-content');
    let navBackButton = slidemenu.querySelector('.slidemenu-container__back')

    products.addEventListener('click', () => {
        navContent.classList.add('nav-hidden');
        navBackButton.classList.remove('opacity-hidden');

        setTimeout(() => {
            navContent.classList.add('hidden');
            productsContent.classList.remove('hidden');
        }, 200);

        setTimeout(() => {
            productsContent.classList.remove('content-hidden');
        }, 400);
    });

    navBackButton.addEventListener('click', () => {
        navBackButton.classList.add('opacity-hidden');
        productsContent.classList.add('content-hidden');

        setTimeout(() => {
            navContent.classList.remove('hidden');
        }, 200);

        setTimeout(() => {
            navContent.classList.remove('nav-hidden');
        }, 250);

        setTimeout(() => {
            productsContent.classList.add('hidden');
        }, 400);
    })

    //Panelswitch Childroom
    let childroom = slidemenu.querySelector('#childroom');
    let childroomContent = slidemenu.querySelector('#childroomPanel');

    childroom.addEventListener('click', () => {
        navContent.classList.add('nav-hidden');
        navBackButton.classList.remove('opacity-hidden');

        setTimeout(() => {
            navContent.classList.add('hidden');
            childroomContent.classList.remove('hidden');
        }, 200);

        setTimeout(() => {
            childroomContent.classList.remove('content-hidden');
        }, 400);
    });

    navBackButton.addEventListener('click', () => {
        navBackButton.classList.add('opacity-hidden');
        childroomContent.classList.add('content-hidden');

        setTimeout(() => {
            navContent.classList.remove('hidden');
        }, 200);

        setTimeout(() => {
            navContent.classList.remove('nav-hidden');
        }, 250);

        setTimeout(() => {
            childroomContent.classList.add('hidden');
        }, 400);
    });

    //Panelswitch Childroom
    let eatanddrink = slidemenu.querySelector('#eatanddrink');
    let eatandddrinkContent = slidemenu.querySelector('#eatanddrinkPanel');

    eatanddrink.addEventListener('click', () => {
        navContent.classList.add('nav-hidden');
        navBackButton.classList.remove('opacity-hidden');

        setTimeout(() => {
            navContent.classList.add('hidden');
            eatandddrinkContent.classList.remove('hidden');
        }, 200);

        setTimeout(() => {
            eatandddrinkContent.classList.remove('content-hidden');
        }, 400);
    });

    navBackButton.addEventListener('click', () => {
        navBackButton.classList.add('opacity-hidden');
        eatandddrinkContent.classList.add('content-hidden');

        setTimeout(() => {
            navContent.classList.remove('hidden');
        }, 200);

        setTimeout(() => {
            navContent.classList.remove('nav-hidden');
        }, 250);

        setTimeout(() => {
            eatandddrinkContent.classList.add('hidden');
        }, 400);
    });

    //Panelswitch Childroom
    let occasions = slidemenu.querySelector('#occasions');
    let occasionsContent = slidemenu.querySelector('#occasionsPanel');

    occasions.addEventListener('click', () => {
        navContent.classList.add('nav-hidden');
        navBackButton.classList.remove('opacity-hidden');

        setTimeout(() => {
            navContent.classList.add('hidden');
            occasionsContent.classList.remove('hidden');
        }, 200);

        setTimeout(() => {
            occasionsContent.classList.remove('content-hidden');
        }, 400);
    });

    navBackButton.addEventListener('click', () => {
        navBackButton.classList.add('opacity-hidden');
        occasionsContent.classList.add('content-hidden');

        setTimeout(() => {
            navContent.classList.remove('hidden');
        }, 200);

        setTimeout(() => {
            navContent.classList.remove('nav-hidden');
        }, 250);

        setTimeout(() => {
            occasionsContent.classList.add('hidden');
        }, 400);
    })
})