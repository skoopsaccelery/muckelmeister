"use strict";

document.addEventListener("DOMContentLoaded", function () {
  const addToCartForms = document.querySelectorAll(".shopify-product-form");
  let currentStep = 0;

  addToCartForms.forEach((addToCartForm) => {
    addToCartForm.addEventListener("submit", function (e) {
      e.preventDefault();

      //Default Add to Cart Function
      const formData = new FormData(addToCartForm);
      const submitButton = addToCartForm.querySelector(".submit-btn");
      let submitButtonTag = submitButton.getAttribute('data-tag');
      let submitButtonUrl = submitButton.getAttribute('data-action-url');
      const successMessage = addToCartForm.querySelector(".product-form__success");
      let productCount = addToCartForms.length;

      fetch(window.Shopify.routes.root + "cart/add.js", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          reloadCartDrawer()
            .then(() => {
              addedToCart(submitButton, successMessage);
              if (productCount == 1) {
                if (submitButtonTag === 'action') {
                  window.location = submitButtonUrl;
                } else if (submitButtonTag === 'sale') {
                  console.log('Product added.');
                } else {
                  setTimeout(() => {
                    openCartDrawer();
                  }, 200);
                }
              } else {
                progressBarFilling();
                currentStep++;
                nextStep(currentStep);
              }
            })
            .catch((e) => {
              console.error(e);
            });
        })
        .catch((err) => {
          console.error("Error", err);
        });
    });
  });

  //Set Last Button to Checkout-Button
  let productCount = parseInt(addToCartForms.length);

  if (productCount > 1) {
    let allSubmits = document.querySelectorAll(".submit-btn");
    let lastSubmit = allSubmits[allSubmits.length - 1];

    lastSubmit.value = "Zum Checkout";

    lastSubmit.addEventListener("click", () => {
      setTimeout(() => {
        window.location = "/checkout";
      }, 100);
    });
  }

  //Product Variants
});
