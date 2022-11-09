console.log("validateBill JS");
// https://www.javascripttutorial.net/javascript-dom/javascript-form-validation/
window.addEventListener("load", function () {
  const userEl = document.querySelector("#id_usuario");
  const statebillEl = document.querySelector("#id_estadofactura");
  const sendEl = document.querySelector("#envio");
  const taxeEl = document.querySelector("#impuesto");
  const totalEl = document.querySelector("#total");
  const paymentmethodEl = document.querySelector("#id_modopago");
  const dateEl = document.querySelector("#fecha");
  const countryEl = document.querySelector("#id_pais");
  const departamentEl = document.querySelector("#id_provincia");
  const cityEl = document.querySelector("#ciudad");
  const fullnameEl = document.querySelector("#nombrecompleto");
  const emailEl = document.querySelector("#correoelectronico");
  const addressEl = document.querySelector("#direccion");
  const phonenumberEl = document.querySelector("#numerotelefono");
  const detailddescriptionEl = document.querySelector("#detalleadicionales");

  const form = document.querySelector("#formValidate");

  const checkText = (campo, etiqueta) => {
    let valid = false;

    const min = 1,
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

  const checkEmail = () => {
    let valid = false;
    const email = emailEl.value.trim();
    if (!isRequired(email)) {
      showError(emailEl, "EL correo electrónico no debe estar vacio.");
    } else if (!isEmailValid(email)) {
      showError(emailEl, "El correo electrónico debe ser válido.");
    } else {
      showSuccess(emailEl);
      valid = true;
    }
    return valid;
  };

  const isNumberValid = (number) => {
    const renumber = new RegExp("^(?=.*[0-9])(?=.{1,})");
    return renumber.test(number);
  };

  const isEmailValid = (email) => {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
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
    let isUserValid = checkText(userEl, `El usuario `),
      isStateBillValid = checkID(statebillEl, `El estado factura `),
      isSendValid = checkText(sendEl, `El envió `),
      isTaxeValid = checkNumber(taxeEl, `El impuesto `),
      isTotalValid = checkNumber(totalEl, `El total `),
      isPaymentMethodValid = checkID(paymentmethodEl, `El modo de pago `),
      isDateValid = checkID(dateEl, `La fecha `),
      isCountryValid = checkID(countryEl, `El país `),
      isDepartamentValid = checkID(departamentEl, `La provincia `),
      isCityValid = checkText(cityEl, `La ciudad `),
      isFullNameValid = checkText(fullnameEl, `El nombre completo `),
      isEmailEValid = checkEmail(emailEl, `El correo electrónico `),
      isAddressValid = checkText(addressEl, `La dirección `),
      isPhoneNumberValid = checkNumber(phonenumberEl, `El teléfono / celular `),
      isDetailDescriptionValid = checkMultiText(
        detailddescriptionEl,
        `La descripción detallada `,
        10,
        200
      );

    let isFormValid =
      isUserValid &&
      isStateBillValid &&
      isSendValid &&
      isTaxeValid &&
      isTotalValid &&
      isPaymentMethodValid &&
      isDateValid &&
      isCountryValid &&
      isDepartamentValid &&
      isCityValid &&
      isFullNameValid &&
      isEmailEValid &&
      isAddressValid &&
      isPhoneNumberValid &&
      isDetailDescriptionValid;

    // submit to the server if the form is valid
    if (isFormValid) {
      console.log("La validación fue exitosa - validateBill Front-end JS");
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
        case "id_usuario":
          checkNumber(userEl, `El usuario `);
          break;
        case "id_estadofactura":
          checkID(statebillEl, `El estado factura `);
          break;
        case "envio":
          checkText(sendEl, `El envió `);
          break;
        case "impuesto":
          checkNumber(taxeEl, `El impuesto `);
          break;
        case "total":
          checkNumber(totalEl, `El total `);
          break;
        case "id_modopago":
          checkID(paymentmethodEl, `El modo de pago `);
          break;
        case "fecha":
          checkText(dateEl, `La fecha `);
          break;
        case "id_pais":
          checkID(countryEl, `El país `);
          break;
        case "id_provincia":
          checkID(departamentEl, `La provincia `);
          break;
        case "ciudad":
          checkText(cityEl, `La ciudad `);
          break;
        case "nombrecompleto":
          checkText(fullnameEl, `El nombre completo `);
          break;
        case "correoelectronico":
          checkEmail(emailEl, `El correo electrónico `);
          break;
        case "direccion":
          checkText(addressEl, `La dirección `);
          break;
        case "numerotelefono":
          checkNumber(phonenumberEl, `El teléfono / celular `);
          break;
        case "detalleadicionales":
          checkMultiText(
            detailddescriptionEl,
            `La descripción detallada `,
            10,
            200
          );
          break;
      }
    })
  );
});
