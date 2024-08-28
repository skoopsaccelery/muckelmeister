"use strict";
document.addEventListener("DOMContentLoaded", function () {
  let widgetContainers = document.querySelectorAll(".widgets");
  let widgetNavWrappers = document.querySelectorAll(".widget-card__navigation");

  widgetNavWrappers.forEach((widgetNavWrapper) => {
    let navElements = widgetNavWrapper.querySelectorAll(
      ".widget-card__navigation-element"
    );

    if (navElements.length > 0) {
      navElements[0].classList.add('widget-card__navigation-element__active');

      widgetContainers.forEach((widgetContainer) => {
        widgetContainer.addEventListener("scroll", function () {
          const currentPos = Math.round(
            widgetContainer.scrollLeft / widgetContainer.clientWidth
          );
          navElements.forEach((element) =>
            element.classList.remove("widget-card__navigation-element__active")
          );
          navElements[currentPos].classList.add(
            "widget-card__navigation-element__active"
          );
        });
      });
    }
  });
});
