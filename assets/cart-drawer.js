let cartDrawer = document.querySelector("#cart-drawer");
let cartDrawerBackground = document.querySelector(".cart-drawer");
let cartDrawerContent = document.querySelector(".cart-drawer__content");
let cartClose = document.querySelector(".cart-drawer__close");
let iconCart = document.querySelector(".icon-cart");
let body = document.getElementById('body');

function closeCartDrawer() {
  cartDrawerContent.classList.remove("opacity-enrolled");

  setTimeout(function () {
    cartDrawerBackground.classList.remove("cart-drawer-enrolled");
  }, 400);

  setTimeout(function () {
    cartDrawer.classList.remove("opacity-enrolled");
  }, 500);

  setTimeout(function () {
    cartDrawer.classList.add("hidden");
    body.style.overflow = 'auto';
  }, 700);
}

function openCartDrawer() {
  body.style.overflow = 'hidden';
  cartDrawer.classList.remove("hidden");

  setTimeout(function () {
    cartDrawer.classList.add("opacity-enrolled");
  }, 100);

  setTimeout(function () {
    cartDrawerBackground.classList.add("cart-drawer-enrolled");
  }, 100);

  setTimeout(function () {
    cartDrawerContent.classList.add("opacity-enrolled");
  }, 400);
}

document.addEventListener("DOMContentLoaded", function () {
  iconCart.addEventListener("click", function () {
    openCartDrawer();
  });

  cartClose.addEventListener("click", function () {
    closeCartDrawer();
  });
});

//Set-Up cart-items HTML Element
class cartItems extends HTMLElement {
    constructor() {
        super();
    };
}

customElements.define('cart-items', cartItems);
