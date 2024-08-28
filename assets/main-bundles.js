"use strict"

let allProducts = document.querySelectorAll('.collection-bundles__card');

/* function scrollOnVariantChange() {
    //Scroll on Variant Change
    allProducts.forEach(product => {
        let variantStorage = product.querySelector('.variant-storage');
        let selectedVariant = variantStorage.getAttribute('value');
        let images = product.querySelectorAll('.collection-bundles__products-img');

        images.forEach(image => {
            let imageId = image.getAttribute('data-variant-id');
            
            if (selectedVariant === imageId) {
                image.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
            }
        });
    });
} */

document.addEventListener('DOMContentLoaded', () => {
    allProducts.forEach(product => {
        // Show AddToCartButton if studio-isolated.js is filled
        let form = product.querySelector('svg-product-form');

        form.addEventListener('change', () => {
            let allInputs = form.querySelectorAll('.product-form__input');
            let atcButton = form.nextElementSibling;
            let productFormSucess = atcButton.nextElementSibling;
            let productFormError = productFormSucess.nextElementSibling;
            let productFormErrorIconSpan = productFormError.children[0];
            let productFormErrorIconSVG = productFormErrorIconSpan.children[0];
            let productFormErrorIconPath = productFormErrorIconSVG.children[0];
            let productFormErrorText = productFormError.children[1];

            let allFilled = true;

            allInputs.forEach(input => {
                if (input) {
                    if (input.value.trim() === '') {
                        allFilled = false;
                    }
                };
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
        });

        //Product Variant Select
        let allFieldsets = product.querySelectorAll('fieldset');

        allFieldsets.forEach(fieldset => {
            let optionsContainer = fieldset.querySelector('.product-form__variants');

            //Set First Variant selected
            let firstVariant = optionsContainer.children[0];
            firstVariant.checked = true;

            fieldset.addEventListener('change', () => {
                let options = optionsContainer.querySelectorAll('.radio');

                options.forEach(option => {
                    let variantStorage = product.querySelector('.variant-storage');

                    if (option.checked === true) {
                        let selectedVariantsId = option.getAttribute('data-variant-id');
                        let selectedVariantsSku = option.getAttribute('data-variant-sku');
                        let dataStorage = product.querySelector('svg-product-form');

                        dataStorage.setAttribute('data-product', selectedVariantsSku);
                        dataStorage.setAttribute('data-variation', selectedVariantsId);
                        variantStorage.value = selectedVariantsId;
                        
                        let svgProductFormInstance = dataStorage;
                        if (svgProductFormInstance) {
                            svgProductFormInstance.variationChange(selectedVariantsSku);
                        } else {
                            console.error('SVG Product Form not found')
                        }
                    }
                })
            })
        });

        let radioButtons = product.querySelectorAll('.radio');

        radioButtons.forEach(radio => {
            radio.addEventListener('change', (event) => {
                product.querySelectorAll('.radio-label__overlay').forEach(overlay => {
                    overlay.classList.remove('unchecked');
                });

                if (event.target.checked) {
                    const overlay = event.target.nextElementSibling.querySelector('.radio-label__overlay');
                    overlay.classList.add('unchecked');
                };
            });
        });

        //Slideshow
        let slideshow = product.querySelector('.collection-bundles__slideshow');
        let points = product.querySelectorAll('.product-slideshow__points-element');
        let images = slideshow.querySelectorAll('.collection-bundles__products-img');
        let slideshowNav = product.querySelector('.product-slideshow__nav');
        let arrowLeft = slideshowNav.children[0];
        let arrowRight = slideshowNav.children[1];


        //Slideshow Navigation
        //Set first Point on active
        points[0].classList.add('active');

        //Points Scrolling
        slideshow.addEventListener('scroll', () => {
            const currentPos = Math.round(slideshow.scrollLeft / slideshow.clientWidth);
            points.forEach(point => point.classList.remove('active'));
            points[currentPos].classList.add('active');
        });

        //Scroll when Arrows are pressed
        //Rotate Left Arrow
        arrowLeft.style.transform = 'rotate(180deg)';

        //Scroll Function
        let currentIndex = 0;

        function scrollLeft() {
            if (currentIndex > 0) {
                currentIndex--;
                let targetImage = images[currentIndex];
                slideshow.scrollLeft = targetImage.offsetLeft;
            }
        };

        function scrollRight() {
            if (currentIndex < images.length -1) {
                currentIndex++;
                let targetImage = images[currentIndex];
                slideshow.scrollLeft = targetImage.offsetLeft;
            }
        };

        arrowLeft.addEventListener('click', scrollLeft);
        arrowRight.addEventListener('click', scrollRight);
    });
});