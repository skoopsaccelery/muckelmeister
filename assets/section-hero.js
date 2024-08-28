"use strict"

const imageContainer = document.querySelector('.hero-section__img-container');

function showProductWidget() {
    const widgetCircle = imageContainer.querySelector('.hero-section__product-widget-cirle');
    const widget = imageContainer.querySelector('.hero-section__product-widget');

    if (widgetCircle) {
        widgetCircle.addEventListener('click', () => {
            if (widget.classList.contains('product-widget__hidden')) {
                widget.classList.remove('product-widget__hidden');
            } else {
                widget.classList.add('product-widget__hidden')
            }
        })
    }
}

document.addEventListener('DOMContentLoaded', () => {
    showProductWidget();
});