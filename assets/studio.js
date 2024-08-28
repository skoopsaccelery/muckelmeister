var product = null;
const api = "https://svg.accelery.host/public/";

var poster = null;
var designId = null;
var loading = false;
var tryToLoad = 0;

$(document).ready(function () {
  while (product == null) {
    setTimeout(function () {
      console.log("wait for product");
    }, 100);
  }

  let sku = product.variants[0].sku;

  //show #poster-loading

  fetch(api + "product/" + sku)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      poster = data;
      loadCustomOptions();
      //previewPoster(true);
    });

  //modal close
  $(".cropped-modal__close").click(function () {
    $(".cropped-modal").hide();
  });
});

function variationChange(sku) {
  console.debug("VAR CHANGE @ studiojs: " + sku);
  if (sku == null) {
    sku = product.variants[0].sku;
  }

  designId = null;

  console.log("Variation changed: " + sku);
  fetch(api + "product/" + sku)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      poster = data;
      loadCustomOptions();
      //previewPoster(true);
    });
}

function getGalleryImage(desktop = false) {
  if (desktop) {
    return $(".product-slideshow__image")[0];
  } else {
    return $(".product-slideshow__image")[0];
  }
}

function previewPoster(defaultImage = false) {
  //set state to prevent multiple calls
  if (loading) {
    tryToLoad++;
    return;
  }
  loading = true;
  var event = new CustomEvent("loading");
  document.dispatchEvent(event);

  if (!defaultImage) {
  }

  //show #poster-loading
  document.getElementById("poster-loading").style.display = "block";

  //move loading to poster-options
  const posterOptions = document.getElementById("poster-options");
  const posterLoading = document.getElementById("poster-loading");
  // posterOptions.appendChild(posterLoading);

  const previewImage = getGalleryImage(true);
  const mobilePreview = getGalleryImage(false);

  //get options values
  let options = {};

  if (!defaultImage) {
    for (let option of this.poster.options) {
      if (option.type == "text") {
        options[option.field] = document.getElementById(
          "product-form__text-option-" + option.field
        ).value;
      } else if (option.type == "select") {
        options[option.field] = document.getElementById(
          "product-form__select-option-" + option.field
        ).value;
      } else if (option.type == "image") {
        options[option.field] = option.src;
      } else if (option.type == "color") {
        options[option.field] = document.getElementById(
          "product-form__color-option-" + option.field
        ).value;
      } else if (option.type == "location") {
        console.log(option);
        console.log(
          document.getElementById(
            "product-form__location-option-" + option.field
          ).value
        );
        options[option.field] = document.getElementById(
          "product-form__location-option-" + option.field
        ).value;
      } else if (option.type == "optionSelect") {
        options[option.field] = document.getElementById(
          "product-form__select-option-" + option.field
        ).value;
      } else if (option.type == "mapbox") {
        options[option.field] = document.getElementById(
          "product-form__text-mapbox-" + option.field
        ).value;
      } else if (option.type == "imageLink") {
        options[option.field] = document.getElementById(
          "product-form__text-imageLink-" + option.field
        ).value;
      } else if (option.type == "fontSet") {
        options[option.field] = document.getElementById(
          "product-form__font-option-" + option.field
        ).value;
      }
    }
  }

  //get preview image
  let url = api + "product/" + poster.SKU + "/preview";
  if (designId) {
    url += "?design=" + designId;
  }
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(options),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      previewImage.style.backgroundImage = `url(${data.preview})`;
      mobilePreview.style.backgroundImage = `url(${data.preview})`;

      //scroll into view
      previewImage.scrollIntoView();
      mobilePreview.scrollIntoView();

      designId = data.designId;
      //set designId to #product-form__design-id

      let designInput = document.getElementById("designId");
      if (designInput) {
        designInput.value = designId;
      }

      //hide #poster-loading
      document.getElementById("poster-loading").style.display = "none";

      var event = new CustomEvent("loadingEnd");
      document.dispatchEvent(event);

      loading = false;
      if (tryToLoad > 0) {
        tryToLoad = 0;
        previewPoster();
      }
    });
}

//open #cropped-modal dialog and set image and init cropped.js
function openCroppedDialog(imageSrc, option) {
  const croppedModal = document.getElementById("cropped-modal");
  croppedModal.style.display = "block";

  const croppedModalImage = document.getElementById("cropped-modal-image");
  croppedModalImage.src = imageSrc;

  var cropper = null;

  croppedModalImage.onload = function () {
    cropper = initCroppedModal(croppedModalImage, option);
  };

  //add event listener to #cropped-modal-save button
  const croppedModalSave = document.getElementById("cropped-modal-save");
  croppedModalSave.addEventListener("click", function () {
    console.log(cropper);
    const croppedCanvas = cropper.getCroppedCanvas();

    console.log("croppedCanvas");
    scaleImageDataUrlDown(
      croppedCanvas.toDataURL(),
      option.width,
      function (scaledImage) {
        option.src = scaledImage;
        croppedModal.style.display = "none";
        previewPoster();
        croppedModalImage.src = "";
        cropper.destroy();
      }
    );
  });

  //add event listener to #cropped-modal-close button
  const croppedModalClose = document.getElementById("cropped-modal-close");
  croppedModalClose.addEventListener("click", function () {
    croppedModalImage.src = "";
    croppedModal.style.display = "none";
    cropper.destroy();
  });
}

//init cropped.js
function initCroppedModal(image, option) {
  const aspectRatio = option.aspectRatio;

  const cropper = new Cropper(image, {
    aspectRatio: aspectRatio,
    restore: false,
    guides: false,
    center: false,
    highlight: false,
    toggleDragModeOnDblclick: false,
    ready: function () {
      const croppedModalImageContainer = document.getElementById(
        "cropped-modal-image-container"
      );
      croppedModalImageContainer.style.height =
        croppedModalImageContainer.offsetWidth + "px";
    },
  });

  return cropper;
}

function scaleImageDataUrlDown(dataUrl, maxWidth, callback) {
  const img = new Image();

  console.log("scaleImageDown", maxWidth);

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  img.onload = function () {
    console.log(img);
    console.log("Image loadding", img.width, img.height);

    let width = img.width;
    let height = img.height;

    if (width > maxWidth) {
      height *= maxWidth / width;
      width = maxWidth;
    }

    canvas.width = width;
    canvas.height = height;

    ctx.drawImage(img, 0, 0, width, height);
    console.log("Image loadded", width, height);
    console.log(canvas.toDataURL("image/jpeg"));
    callback(canvas.toDataURL("image/jpeg"));
  };

  img.src = dataUrl;
}

function initAutocomplete(adressInput) {
  var defaultBounds = new google.maps.LatLngBounds(
    new google.maps.LatLng(5.98865807458, 45.7769477403),
    new google.maps.LatLng(16.9796667823, 54.983104153)
  );

  let autocomplete = new google.maps.places.Autocomplete(adressInput, {
    fields: ["address_components", "geometry"],
    types: ["geocode"],
    bounds: defaultBounds,
  });

  autocomplete.addListener("place_changed", () =>
    fillInAddress(autocomplete, adressInput)
  );
}

function fillInAddress(autocomplete, input) {
  // Get the place details from the autocomplete object.
  const place = autocomplete.getPlace();
  let address1 = "";
  let postcode = "";
  let city = "";
  let country = "";

  let latlng = decimalToDMS(
    place.geometry.location.lat(),
    place.geometry.location.lng()
  );

  for (const component of place.address_components) {
    // @ts-ignore remove once typings fixed
    const componentType = component.types[0];
    switch (componentType) {
      case "locality":
        city = component.long_name;
        break;
      case "country":
        country = component.long_name;
        break;
    }
  }

  if (input !== null && latlng) {
    input.value = latlng;

    previewPoster();
  }
}

function decimalToDMS(latitude, longitude) {
  let latDegrees = Math.floor(latitude);
  let latMinutes = Math.floor((latitude - latDegrees) * 60);
  let latSeconds =
    Math.round(((latitude - latDegrees) * 60 - latMinutes) * 60 * 1000) / 1000;

  let lonDegrees = Math.floor(longitude);
  let lonMinutes = Math.floor((longitude - lonDegrees) * 60);
  let lonSeconds =
    Math.round(((longitude - lonDegrees) * 60 - lonMinutes) * 60 * 1000) / 1000;

  return `${latDegrees}° ${latMinutes}' ${latSeconds}" N, ${lonDegrees}° ${lonMinutes}' ${lonSeconds}" E`;
}

function loadCustomOptions() {
  if (poster && poster.options) {
    //fire loading Event on document
    var event = new CustomEvent("loading");
    document.dispatchEvent(event);

    //clear id poster-options
    const posterOptions = document.getElementById("poster-options");
    posterOptions.innerHTML = "";

    // add hidden input for designId
    const designIdInput = document.createElement("input");
    designIdInput.type = "hidden";
    designIdInput.name = "properties[designId]";
    designIdInput.id = "designId";
    designIdInput.value = designId;
    posterOptions.appendChild(designIdInput);

    //sort poster.options to put image options first
    poster.options.sort((a, b) => {
      if (a.type == "image" && b.type != "image") {
        return -1;
      } else if (a.type != "image" && b.type == "image") {
        return 1;
      } else {
        return 0;
      }
    });
    for (let option of poster.options) {
      if (option.type == "image") {
        const div = document.createElement("div");
        div.classList.add("product-form__item");
        div.classList.add("product-form__item--custom-option");
        div.classList.add("product-form__item--image-option");

        const label = document.createElement("label");
        label.classList.add("product-form__label");
        label.classList.add("product-form__label--image-option");
        label.setAttribute("for", "product-form__image-option-" + option.field);
        label.innerHTML = option.label;

        //image upload
        const input = document.createElement("input");
        input.classList.add("product-form__input");
        input.classList.add("product-form__input--image-option");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");
        input.setAttribute("id", "product-form__image-option-" + option.field);
        input.setAttribute(
          "name",
          "product-form__image-option-" + option.field
        );
        input.setAttribute("onchange", "previewPoster()");
        input.setAttribute("required", "");

        //add preview of selected image ontop
        const preview = document.createElement("img");
        preview.classList.add("product-form__image-option-preview");
        preview.setAttribute(
          "id",
          "product-form__image-option-preview-" + option.field
        );
        preview.setAttribute("src", "");

        preview.style.display = "none";
        preview.style.border = "1px solid #e5e5e5";
        preview.style.borderRadius = "5px";
        preview.style.padding = "5px";
        preview.style.boxShadow =
          "0 0 5px 0 rgba(0,0,0,0.2), 0 5px 5px 0 rgba(0,0,0,0.24)";
        preview.style.maxWidth = "200px";
        preview.style.marginTop = "10px";
        preview.style.marginBottom = "10px";

        //set data-aspect-ratio attribute
        if (option.aspectRatio) {
          preview.setAttribute("data-aspect-ratio", option.aspectRatio);
        }

        div.appendChild(label);
        div.appendChild(input);
        div.appendChild(preview);

        //show image once selected
        input.addEventListener("change", function () {
          console.log("INPUT CHANGE:");
          console.log(this.files[0]);

          if (this.files && this.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
              console.log("File readed");
              console.log(e);

              preview.src = e.target.result;
              preview.style.display = "block";

              //open cropped dialog
              openCroppedDialog(e.target.result, option);
            };
            reader.readAsDataURL(this.files[0]);
          }
        });

        posterOptions.appendChild(div);
      }

      if (option.type == "color") {
        const div = document.createElement("div");
        div.classList.add("product-form__item");
        div.classList.add("product-form__item--custom-option");
        div.classList.add("product-form__item--color-option");

        const label = document.createElement("label");
        label.classList.add("product-form__label");
        label.classList.add("product-form__label--color-option");
        label.setAttribute("for", "product-form__color-option-" + option.field);
        label.innerHTML = option.label;

        const input = document.createElement("input");
        input.classList.add("product-form__input");
        input.classList.add("product-form__input--color-option");
        input.setAttribute("type", "color");
        input.setAttribute("id", "product-form__color-option-" + option.field);
        input.setAttribute(
          "name",
          "product-form__color-option-" + option.field
        );
        input.setAttribute("onchange", "previewPoster()");
        input.setAttribute("required", "");

        //set placeholder color
        if (option.placeholder) {
          input.setAttribute("placeholder", option.placeholder);
          input.value = option.placeholder;
        }

        div.appendChild(label);
        div.appendChild(input);

        posterOptions.appendChild(div);
      }

      if (option.type == "text") {
        const div = document.createElement("div");
        div.classList.add("product-form__item");
        div.classList.add("product-form__item--custom-option");
        div.classList.add("product-form__item--text-option");

        const label = document.createElement("label");
        label.classList.add("product-form__label");
        label.classList.add("product-form__label--text-option");
        label.setAttribute("for", "product-form__text-option-" + option.field);
        label.innerHTML = option.label;

        const input = document.createElement("input");
        input.classList.add("product-form__input");
        input.classList.add("product-form__input--text-option");
        input.setAttribute("type", "text");
        input.setAttribute("id", "product-form__text-option-" + option.field);
        input.setAttribute("name", "properties[" + option.field + "]");
        input.setAttribute("maxlength", option.maxChar);
        //add placeholder
        //input.setAttribute("value", option.placeholder.replace("&amp;", "&"));
        input.setAttribute(
          "placeholder",
          option.placeholder.replace("&amp;", "&")
        );

        //change event
        input.addEventListener("change", function () {
          previewPoster(false);
        });

        div.appendChild(label);
        div.appendChild(input);

        posterOptions.appendChild(div);
      }

      if (option.type == "mapbox") {
        const div = document.createElement("div");
        div.classList.add("product-form__item");
        div.classList.add("product-form__item--custom-option");
        div.classList.add("product-form__item--text-option");

        const label = document.createElement("label");
        label.classList.add("product-form__label");
        label.classList.add("product-form__label--text-option");
        label.setAttribute("for", "product-form__text-option-" + option.field);
        label.innerHTML = option.label;

        const input = document.createElement("input");
        input.classList.add("product-form__input");
        input.classList.add("product-form__input--text-mapbox");
        input.setAttribute("type", "text");
        input.setAttribute("id", "product-form__text-mapbox-" + option.field);
        input.setAttribute("name", "properties[" + option.field + "]");
        //add placeholder
        input.setAttribute("required", true);

        //change event
        input.addEventListener("change", function () {
          self.previewPoster(false);
        });

        div.appendChild(label);
        div.appendChild(input);

        posterOptions.appendChild(div);
      }
      if (option.type == "imageLink") {
        const div = document.createElement("div");
        div.classList.add("product-form__item");
        div.classList.add("product-form__item--custom-option");
        div.classList.add("product-form__item--text-option");

        const label = document.createElement("label");
        label.classList.add("product-form__label");
        label.classList.add("product-form__label--text-option");
        label.setAttribute("for", "product-form__text-option-" + option.field);
        label.innerHTML = option.label;

        const input = document.createElement("input");
        input.classList.add("product-form__input");
        input.classList.add("product-form__input--text-imageLink");
        input.setAttribute("type", option.inputType);
        input.setAttribute(
          "id",
          "product-form__text-imageLink-" + option.field
        );
        input.setAttribute("name", "properties[" + option.field + "]");
        //add placeholder
        input.setAttribute("required", true);

        //change event
        input.addEventListener("change", function () {
          self.previewPoster(false);
        });

        div.appendChild(label);
        div.appendChild(input);

        posterOptions.appendChild(div);
      }

      if (option.type == "location") {
        const div = document.createElement("div");
        div.classList.add("product-form__item");
        div.classList.add("product-form__item--custom-option");
        div.classList.add("product-form__item--location-option");

        const label = document.createElement("label");
        label.classList.add("product-form__label");
        label.classList.add("product-form__label--location-option");
        label.setAttribute(
          "for",
          "product-form__location-option-" + option.field
        );
        label.innerHTML = option.label;

        const input = document.createElement("input");
        input.classList.add("product-form__input");
        input.classList.add("product-form__input--location-option");
        input.setAttribute("type", "text");
        input.setAttribute(
          "id",
          "product-form__location-option-" + option.field
        );
        input.setAttribute("name", "properties[" + option.field + "]");
        //add placeholder
        input.setAttribute("required", true);

        //init autocomplete
        initAutocomplete(input);

        div.appendChild(label);
        div.appendChild(input);

        posterOptions.appendChild(div);
      }
      if (option.type == "optionSelect") {
        const div = document.createElement("div");
        div.classList.add("product-form__item");
        div.classList.add("product-form__item--custom-option");
        div.classList.add("product-form__item--select-option");

        const label = document.createElement("label");
        label.classList.add("product-form__label");
        label.classList.add("product-form__label--select-option");
        label.setAttribute(
          "for",
          "product-form__select-option-" + option.field
        );
        label.innerHTML = option.label;

        const select = document.createElement("select");
        select.classList.add("product-form__input");
        select.classList.add("product-form__input--select-option");
        select.setAttribute(
          "id",
          "product-form__select-option-" + option.field
        );
        select.setAttribute("name", "properties[" + option.field + "]");
        select.setAttribute("required", true);

        select.addEventListener("change", () => {
          select.setAttribute('data-selected', select.value);
          self.previewPoster(false);
        });

        //add options
        for (let o of option.targetId) {
          const optionElement = document.createElement("option");
          optionElement.setAttribute("value", o);

          if (o == "Motiv_3") {
            //hack
            //set selected
            optionElement.setAttribute("selected", true);
          }

          optionElement.innerHTML = o;
          select.appendChild(optionElement);
        }

        div.appendChild(label);
        div.appendChild(select);

        posterOptions.appendChild(div);
      }

      if (option.type == "fontSet") {
        const div = document.createElement("div");
        div.classList.add("product-form__item");
        div.classList.add("product-form__item--custom-option");
        div.classList.add("product-form__item--font-option");

        const label = document.createElement("label");
        label.classList.add("product-form__label");
        label.classList.add("product-form__label--font-option");
        label.setAttribute("for", "product-form__font-option-" + option.field);
        label.innerHTML = option.label;

        const select = document.createElement("select");
        select.classList.add("product-form__input");
        select.classList.add("product-form__input--font-option");
        select.setAttribute("id", "product-form__font-option-" + option.field);
        select.setAttribute("name", "properties[" + option.field + "]");
        select.setAttribute("required", true);

        select.addEventListener("change", function () {
          self.previewPoster(false);
        });

        // add font options
        for (let font of option.fontSet.fonts) {
          const optionElement = document.createElement("option");
          optionElement.setAttribute("value", font.id);
          optionElement.innerHTML = font.name;
          //set optionElement fontFamily

          loadFont(font.name);
          select.appendChild(optionElement);
        }

        div.appendChild(label);
        div.appendChild(select);

        posterOptions.appendChild(div);
      }
    }

    //add preview button
    const previewButton = document.createElement("button");
    previewButton.classList.add("btn");
    previewButton.classList.add("rounded-all");
    previewButton.classList.add("preview-btn");
    //set type button
    previewButton.setAttribute("type", "button");
    previewButton.innerHTML = "Vorschau";

    previewButton.setAttribute("onclick", "previewPoster(false)");
    posterOptions.appendChild(previewButton);

    const posterLoading = document.createElement("div");
    posterLoading.setAttribute("id", "poster-loading");
    posterLoading.setAttribute("style", "display:none");

    posterLoading.classList.add("lds-ripple");
    const posterLoadingDiv1 = document.createElement("div");
    posterLoadingDiv1.classList.add("loader");
    posterLoading.appendChild(posterLoadingDiv1);
    posterOptions.appendChild(posterLoading);
  }
}

function loadFont(font) {
  var head = document.getElementsByTagName("head")[0];
  var link = document.createElement("link");
  link.rel = "stylesheet";
  link.type = "text/css";
  link.href = "https://svg.accelery.host/public/font/" + font + "/css";
  link.media = "all";
  head.appendChild(link);
}
