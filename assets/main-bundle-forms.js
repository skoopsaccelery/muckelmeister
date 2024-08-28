"use strict"

document.addEventListener('DOMContentLoaded', function() {
    let bundleForms = document.querySelectorAll('.shopify-product-form');

    bundleForms.forEach((bundleProductAddToCart) => {
        bundleProductAddToCart.addEventListener('submit', (b) => {
            b.preventDefault();

            const bundleData = new FormData(bundleProductAddToCart);

            fetch(window.Shopify.routes.root + 'cart/add.js', {
                method: 'POST',
                body: bundleData
            })
            .then(response => response.json())
            .then(data => {
                reloadCartDrawer()
                .then(() => {
                    addedToCart();
                })
                .catch((e) => {
                  console.error(e);
                });  
            })
            .catch(err => {
                console.error('Error', err)
            })
        });
    })
})