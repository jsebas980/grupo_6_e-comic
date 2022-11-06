console.log("validateProduct Front-end JS");
// https://www.javascripttutorial.net/javascript-dom/javascript-form-validation/
window.addEventListener("load", function () {
  const titleEl = document.querySelector("#titulo");
  const seasonEl = document.querySelector("#temporada");
  const volumeEl = document.querySelector("#volumen");
  const stockEl = document.querySelector("#stock");
  const discontinuedEl = document.querySelector("#descontinuado");
  const countryEl = document.querySelector("#id_pais");
  const categoryEl = document.querySelector("#id_categoria");
  const publicationEl = document.querySelector("#publicacion");
  const normalpriceEl = document.querySelector("#precionormal");
  const priceEl = document.querySelector("#precio");
  const authorEl = document.querySelector("#id_autor");
  const illustratorEl = document.querySelector("#id_illustrador");
  const shortdescriptionEl = document.querySelector("#descripcioncorta");
  const detailddescriptionEl = document.querySelector("#descripciondetallada");
  const imgEl = document.querySelector("#imagen");

  const form = document.querySelector("#formValidate");

  const checkText = (campo, etiqueta) => {
    let valid = false;

    const min = 2,
      max = 200;

    const productText = campo.value.trim();

    if (!isRequired(productText)) {
      showError(campo, etiqueta + " no debe estar vacio");
    } else if (!isBetween(productText.length, min, max)) {
      showError(campo, `${etiqueta} de ser entre ${min} y ${max} caracteres.`);
    } else {
      showSuccess(campo);
      valid = true;
    }
    return valid;
  };

  const checkMultiText = (campo, etiqueta, aMin, bMax) => {
    let valid = false;

    const min = aMin,
      max = bMax;

    const productText = campo.value.trim();

    if (!isRequired(productText)) {
      showError(campo, etiqueta + " no debe estar vacio");
    } else if (!isBetween(productText.length, min, max)) {
      showError(campo, `${etiqueta} de ser entre ${min} y ${max} caracteres.`);
    } else {
      showSuccess(campo);
      valid = true;
    }
    return valid;
  };

  const checkNumber = (campo, etiqueta) => {
    let valid = false;

    const productNumber = campo.value.trim();

    if (!isRequired(productNumber)) {
      showError(campo, etiqueta + " no debe estar vacio.");
    } else if (!isNumberValid(productNumber)) {
      showError(campo, etiqueta + " debe ser solamente número");
    } else {
      showSuccess(campo);
      valid = true;
    }

    return valid;
  };

  const checkPictureValid = () => {
    let valid = false;

    const filePath = imgEl.value;

    var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i; // Allowing file type

    if (!allowedExtensions.exec(filePath)) {
      showError(imgEl, "La imagen debe ser en formato valido.");
      imgEl.value = "";
    } else {
      showSuccess(countryEl);
      valid = true;
    }

    return valid;
  };

  const isNumberValid = (number) => {
    const renumber = new RegExp("^(?=.*[0-9])(?=.{1,})");
    return renumber.test(number);
  };

  const checkID = (campo, etiqueta) => {
    let valid = false;

    const fieldID = campo.value.trim();

    if (!isRequired(fieldID)) {
      showError(campo, etiqueta + " no debe estar vacio.");
    } else {
      showSuccess(campo);
      valid = true;
    }

    return valid;
  };

  const isRequired = (value) => (value === "" ? false : true);
  const isBetween = (length, min, max) =>
    length < min || length > max ? false : true;

  const showError = (input, message) => {
    // get the form-field element
    const formField = input.parentElement;
    // add the error class
    formField.classList.remove("success");
    formField.classList.add("error");

    // show the error message
    const error = formField.querySelector("small");
    error.textContent = message;
  };

  const showSuccess = (input) => {
    // get the form-field element
    const formField = input.parentElement;

    // remove the error class
    formField.classList.remove("error");
    formField.classList.add("success");

    // hide the error message
    const error = formField.querySelector("small");
    error.textContent = "";
  };

  form.addEventListener("submit", function (e) {
    // prevent the form from submitting
    e.preventDefault();

    // validate forms
    let isTitleValid = checkText(titleEl, `El titulo `),
      isSeasonValid = checkText(seasonEl, `La temporada `),
      isVolumeValid = checkText(volumeEl, `El volumen `),
      isStockValid = checkNumber(stockEl, `El stock `),
      isDiscontinuedValid = checkNumber(discontinuedEl, `El descontinuado `),
      isCountryValid = checkID(countryEl, `El país `),
      isCategoryValid = checkID(categoryEl, `La categoria `),
      isPublicationValid = checkText(publicationEl, `La publicación `),
      isAuthorValid = checkID(authorEl, `El país `),
      isIllustratorValid = checkID(illustratorEl, `El país `),
      isNormalPriceEValid = checkNumber(normalpriceEl, `El precio normal `),
      isPriceValid = checkNumber(priceEl, `El precio `),
      isShortDescriptionValid = checkMultiText(
        shortdescriptionEl,
        `La descripción corta `,
        10,
        200
      ),
      isDetaildDescriptionValid = checkMultiText(
        detailddescriptionEl,
        `La descripción detallada `,
        20,
        4000
      ),
      isPictureValid = checkPictureValid();

    let isFormValid =
      isTitleValid &&
      isSeasonValid &&
      isVolumeValid &&
      isStockValid &&
      isDiscontinuedValid &&
      isCountryValid &&
      isCategoryValid &&
      isPublicationValid &&
      isAuthorValid &&
      isIllustratorValid &&
      isNormalPriceEValid &&
      isPriceValid &&
      isShortDescriptionValid &&
      isDetaildDescriptionValid &&
      isPictureValid;

    // submit to the server if the form is valid
    if (isFormValid) {
      console.log("La validación fue exitosa - validateProduct Front-end JS");
      form.submit();
    }
  });

  const debounce = (fn, delay = 500) => {
    let timeoutId;
    return (...args) => {
      // cancel the previous timer
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      // setup a new timer
      timeoutId = setTimeout(() => {
        fn.apply(null, args);
      }, delay);
    };
  };
  //
  form.addEventListener(
    "input",
    debounce(function (e) {
      switch (e.target.id) {
        case "titulo":
          checkText(titleEl, `El titulo`);
          break;
        case "temporada":
          checkText(seasonEl, `La temporada `);
          break;
        case "volumen":
          checkText(volumeEl, `El volumen `);
          break;
        case "stock":
          checkNumber(stockEl, `El stock `);
          break;
        case "descontinuado":
          checkNumber(discontinuedEl, `El descontinuado `);
          break;
        case "id_pais":
          checkID(countryEl, `El país `);
          break;
        case "id_categoria":
          checkID(categoryEl, `La categoria `);
          break;
        case "publicacion":
          checkText(publicationEl, `La publicación `);
          break;
        case "id_autor":
          checkID(authorEl, `El autor `);
          break;
        case "id_illustrador":
          checkID(illustratorEl, `El ilustrador `);
          break;
        case "precionormal":
          checkNumber(normalpriceEl, `El precio normal `);
          break;
        case "precio":
          checkNumber(priceEl, `La precio `);
          break;
        case "descripcioncorta":
          checkMultiText(shortdescriptionEl, `La descripción corta `, 10, 200);
          break;
        case "descripciondetallada":
          checkMultiText(
            detailddescriptionEl,
            `La descripción detallada `,
            20,
            4000
          );
          break;
      }
    })
  );
});
