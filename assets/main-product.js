"use strict"

function scrollOnVariantChange() {
    //Scroll on Variant Change
    let variantStorage = document.querySelector('#variant-storage');
    let selectedVariant = variantStorage.getAttribute('value');
    let images = document.querySelectorAll('.product-slideshow__image');

    images.forEach(image => {
        let imageId = image.getAttribute('data-variant-id');
        
        if (selectedVariant === imageId) {
            image.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
        }
    });
}

function eventWidgetDisplay() {
    let eventWidget = document.querySelector('.product-form__event-widget');

    if (eventWidget) {
        let beforeAfter = eventWidget.querySelector('#before-after');
        let dateData = beforeAfter.getAttribute('data-event-date');
        let dateSplit = dateData.split('/');
        let eventDateString = `${dateSplit[1]}/${dateSplit[0]}/${dateSplit[2]}`;

        let eventDate = new Date(eventDateString);
        let now = new Date();

        if (now <= eventDate) {
            beforeAfter.textContent = 'vor'
        } else {
            beforeAfter.textContent = 'nach'
        }
    }
}

document.addEventListener('DOMContentLoaded', function(){
    // Points Scrolling
    let slideshow = document.querySelector('.product-slideshow');
    let pointsWrapper = document.querySelector('.product-slideshow__points');
    let points = pointsWrapper.querySelectorAll('.product-slideshow__points-element');

    points[0].classList.add('active');

    slideshow.addEventListener('scroll', function() {
        const currentPos = Math.round(slideshow.scrollLeft / slideshow.clientWidth);
        points.forEach(point => point.classList.remove('active'));
        points[currentPos].classList.add('active');
    });

    //Arrow Scrolling
    let images = slideshow.querySelectorAll('.product-slideshow__image');
    let slideshowNav = document.querySelector('.product-slideshow__nav');
    const arrowLeft = slideshowNav.children[0];
    const arrowRight = slideshowNav.children[1];

    //Rotate Left Arrow Button
    arrowLeft.style.transform = 'rotate(180deg)';

    let currentIndex = 0;

    function scrollLeft() {
        if (currentIndex > 0) {
            currentIndex--;
            let targetImage = images[currentIndex];
            slideshow.scrollLeft = targetImage.offsetLeft;
        }
    }

    function scrollRight() {
        if (currentIndex < images.length - 1) {
            currentIndex++;
            let targetImage = images[currentIndex];
            slideshow.scrollLeft = targetImage.offsetLeft;
        }
    }

    arrowLeft.addEventListener('click', scrollLeft);
    arrowRight.addEventListener('click', scrollRight);

    //Radio Button Overlay
    let radioButtons = document.querySelectorAll('.radio');

        radioButtons.forEach(radio => {
            radio.addEventListener('change', (event) => {
                document.querySelectorAll('.radio-label__overlay').forEach(overlay => {
                    overlay.classList.remove('unchecked');
                });

                if (event.target.checked) {
                    const overlay = event.target.nextElementSibling.querySelector('.radio-label__overlay');
                    overlay.classList.add('unchecked');
                };
            });
        });

    //Show AddToCartButton if Studio.js form is filled
    document.body.addEventListener('change', function(event) {
        if (event.target.matches('.product-form__input--text-option, .product-form__input--color-option, .product-form__input--select-option')) {
            const allInputs = document.querySelectorAll('.product-form__input');
            const atcButton = document.querySelector('.submit-btn');
            let productFormError = document.querySelector('.product-form__error');
            let productFormErrorIconSpan = productFormError.children[0];
            let productFormErrorIconSVG = productFormErrorIconSpan.children[0];
            let productFormErrorIconPath = productFormErrorIconSVG.children[0];
            let productFormErrorText = productFormError.children[1];

            let allFilled = true;

            allInputs.forEach((input) => {
                if (input) {
                    if (input.value.trim() === '') {
                        allFilled = false;
                    }
                }
            });

            if (allFilled) {
                atcButton.style.display = 'block';
                productFormError.style.color = '#36876c'
                productFormErrorIconPath.setAttribute('fill', '#36876c');
                productFormErrorText.textContent = 'Alle Optionen ausgefüllt. Du kannst das Produkt nun in den Warenkorb legen.'

                setTimeout(() => {
                    atcButton.classList.remove('submit-btn__collapsed');
                }, 50);
            } else {
                atcButton.classList.add('submit-btn__collapsed');
                productFormError.classList.remove('product-form__error-collapsed');

                setTimeout(() => {
                    atcButton.style.display = 'none'
                }, 300);
            }
        }
    });

    eventWidgetDisplay();
})