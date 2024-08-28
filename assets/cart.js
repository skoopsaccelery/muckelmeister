"use strict"

function updateCart(updates) {
    return fetch(window.Shopify.routes.root + 'cart/update.js', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ updates })
    })
}

function reloadCartDrawer() {
    return new Promise((resolve, reject) => {
        fetch(window.location.pathname + `?section_id=main-header`)
        .then((response) => response.text())
        .then((responseText) => {
            document.querySelector(".cart-drawer__empty").classList.remove("hidden");
            const html = new DOMParser().parseFromString(responseText, 'text/html');
            const selectors = ['cart-items'];
            for (const selector of selectors) {
                const targetElement = document.querySelector(selector);
                const sourceElement = html.querySelector(selector);
                if (targetElement && sourceElement) {
                    targetElement.replaceWith(sourceElement);
                    if(sourceElement.children.length != 0){
                        document.querySelector(".cart-drawer__empty").classList.add("hidden");
                    }
                }
            }
        })
        .then(() => {
            addQuantitiyListener();
            resolve();
        })
        .catch((e) => {
            console.error(e);
            resolve();
        });
    })
}

function manipulateCartItem(key, quantity, isMinus) {
    let quantityNumber = parseInt(quantity.textContent);
    let loader = document.querySelector(".cart-drawer-loader");
    
    //show overlay in cart drawer
    if (loader) {
        loader.style.display = 'block';
    }


    if (quantityNumber > 0) {
        isMinus ? quantityNumber -= 1 : quantityNumber += 1;
        quantity.textContent = quantityNumber;
    }

    let updates = {
        [key]: quantityNumber
    }

    updateCart(updates).then(() => {
        console.log("cart updated");
        return reloadCartDrawer()
    }).then(() => {
        //hide loading overlay
        if (loader) {
            loader.style.display = 'none';
        }
    })

}

function addQuantitiyListener() {
    let cartItemsForm = document.querySelector('.cart-items-form');

    cartItemsForm.addEventListener('submit', function(e) {
        e.preventDefault();
    });

    let lineItems = document.querySelectorAll('.cart-items__quantity-container');

    lineItems.forEach(function(lineItem) {
        let minus = lineItem.children[0];
        let quantity = lineItem.children[1];
        let plus = lineItem.children[2];
        
        minus.addEventListener('click', function(event) {
            let key = event.target.closest('[data-variant-key]').getAttribute('data-variant-key');
            manipulateCartItem(key, quantity, true);
        });

        plus.addEventListener('click', function(event) {
            let key = event.target.closest('[data-variant-key]').getAttribute('data-variant-key');
            manipulateCartItem(key, quantity, false);
        });
    });
}


document.addEventListener('DOMContentLoaded', function() {
    addQuantitiyListener();
})