"use strict";

function addedToCart(submitButton, successMessage) {
  submitButton.classList.add("submitted");
  submitButton.setAttribute("value", "Hinzugefügt");
  submitButton.disabled = true;
  successMessage.classList.remove("product-form__success-collapsed");
  successMessage.children[0].classList.add(
    "product-form__success-content-visible"
  );
}

function setOverflowScroll() {
  const stepsContainer = document.querySelector(".collection-bundles__steps");
  stepsContainer.classList.add("collection-bundles__step-onscroll");
}

function unsetOverflowScroll() {
  const stepsContainer = document.querySelector(".collection-bundles__steps");
  stepsContainer.classList.remove("collection-bundles__step-onscroll");
}

function nextStep(currentStep) {
  function preventMouseMovement(e) {
    e.preventDefault();
  }

  setOverflowScroll();

  document.addEventListener('mousemove', preventMouseMovement, { passive: false })

  setTimeout(() => {
    const stepsContainer = document.querySelector(".collection-bundles__steps");
    let steps = stepsContainer.querySelectorAll(".collection-bundles__card");

    if (currentStep < steps.length) {
      let targetStep = steps[currentStep];
      stepsContainer.scrollLeft = targetStep.offsetLeft;
    }
  }, 100);

  setTimeout(() => {
    document.removeEventListener('mousemove', preventMouseMovement);
    unsetOverflowScroll();
  }, 700);
}

function progressBarFilling() {
  let submitButtons = document.querySelectorAll(".submit-btn");
  let disabledButtonsCount = 0;
  let totalButtons = submitButtons.length;

  for (let i = 0; i < totalButtons; i++) {
    if (submitButtons[i].disabled === true) {
      disabledButtonsCount++;
    }
  }

  let progressBarFill = document.querySelector(
    ".collection-bundles__progress-bar__fill"
  );
  if (progressBarFill && totalButtons > 0) {
    let fillPercentage = (disabledButtonsCount / totalButtons) * 100;
    progressBarFill.style.width = fillPercentage + "%";
  }

  let progressCount = document.querySelector("#progress-count");
  progressCount.textContent = disabledButtonsCount;
}
