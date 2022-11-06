console.log("validateUser Front-end JS");
// https://www.javascripttutorial.net/javascript-dom/javascript-form-validation/
window.addEventListener("load", function () {
  const usernameEl = document.querySelector("#nombre");
  const userlastnameEl = document.querySelector("#apellido");
  const emailEl = document.querySelector("#correoelectronico");
  const passwordEl = document.querySelector("#contrasena");
  const phoneEl = document.querySelector("#numerotelefono");
  const countryEl = document.querySelector("#id_pais");
  const cityEl = document.querySelector("#id_provincia");
  const imgEl = document.querySelector("#imagenuser");

  const form = document.querySelector("#formValidate");

  const checkUsername = () => {
    let valid = false;

    const min = 2,
      max = 25;

    const username = usernameEl.value.trim();

    if (!isRequired(username)) {
      showError(usernameEl, "El nombre no debe estar vacio.");
    } else if (!isBetween(username.length, min, max)) {
      showError(
        usernameEl,
        `El nombre debe ser entre ${min} y ${max} caracteres.`
      );
    } else {
      showSuccess(usernameEl);
      valid = true;
    }
    return valid;
  };

  const checkUserLastname = () => {
    let valid = false;

    const min = 2,
      max = 25;

    const userlastname = userlastnameEl.value.trim();

    if (!isRequired(userlastname)) {
      showError(userlastnameEl, "El apellido no debe estar vacio");
    } else if (!isBetween(userlastname.length, min, max)) {
      showError(
        userlastnameEl,
        `El apellido de ser entre ${min} y ${max} caracteres.`
      );
    } else {
      showSuccess(userlastnameEl);
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

  const checkPassword = () => {
    let valid = false;

    const password = passwordEl.value.trim();

    if (!isRequired(password)) {
      showError(passwordEl, "La contraseña no debe estar vacio.");
    } else if (!isPasswordSecure(password)) {
      showError(
        passwordEl,
        "La contraseña debe ser mas de 8 caracteres incluir un carater en minuscula, una mayuscula, un número , y un caracter especial (!@#$%^&*)"
      );
    } else {
      showSuccess(passwordEl);
      valid = true;
    }

    return valid;
  };

  const checkNumber = () => {
    let valid = false;

    const phone = phoneEl.value.trim();

    if (!isRequired(phone)) {
      showError(phoneEl, "El teléfono / celular no debe estar vacio.");
    } else if (!isNumberValid(phone)) {
      showError(phoneEl, "El teléfono / celular debe ser solamente número");
    } else {
      showSuccess(phoneEl);
      valid = true;
    }

    return valid;
  };

  const checkIdCountry = () => {
    let valid = false;

    const country = countryEl.value.trim();

    if (!isRequired(country)) {
      showError(countryEl, "El país no debe estar vacio.");
    } else {
      showSuccess(countryEl);
      valid = true;
    }

    return valid;
  };

  const checkIdCity = () => {
    let valid = false;

    const city = cityEl.value.trim();

    if (!isRequired(city)) {
      showError(cityEl, "La ciudad o provincia no debe estar vacio.");
    } else {
      showSuccess(cityEl);
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

  const isEmailValid = (email) => {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  const isPasswordSecure = (password) => {
    const re = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );
    return re.test(password);
  };

  const isNumberValid = (number) => {
    const renumber = new RegExp("^(?=.*[0-9])(?=.{8,})");
    return renumber.test(number);
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
    let isUsernameValid = checkUsername(),
      isUserLastnameValid = checkUserLastname(),
      isEmailValid = checkEmail(),
      isNumberValid = checkNumber(),
      isIdCountryValid = checkIdCountry(),
      isIdCityValid = checkIdCity(),
      isPasswordValid = checkPassword(),
      isPictureValid = checkPictureValid();

    let isFormValid =
      isUsernameValid &&
      isUserLastnameValid &&
      isEmailValid &&
      isNumberValid &&
      isIdCountryValid &&
      isIdCityValid &&
      isPasswordValid &&
      isPictureValid;

    // submit to the server if the form is valid
    if (isFormValid) {
      console.log("La validación fue exitosa - validateUser Front-end JS");
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
        case "nombre":
          checkUsername();
          break;
        case "apellido":
          checkUserLastname();
          break;
        case "correoelectronico":
          checkEmail();
          break;
        case "numerotelefono":
          checkNumber();
          break;
        case "id_pais":
          checkIdCountry();
          break;
        case "id_provincia":
          checkIdCity();
          break;
        case "contrasena":
          checkPassword();
          break;
      }
    })
  );
});
