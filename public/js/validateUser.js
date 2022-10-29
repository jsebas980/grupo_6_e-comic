console.log("validateUser JS");
// https://www.javascripttutorial.net/javascript-dom/javascript-form-validation/
window.addEventListener("load", function () {
  const usernameEl = document.querySelector("#nombre");
  const userlastnameEl = document.querySelector("#apellido");
  const emailEl = document.querySelector("#correoelectronico");
  const passwordEl = document.querySelector("#contrasena");

  const form = document.querySelector("#signup");

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
      isPasswordValid = checkPassword();

    let isFormValid =
      isUsernameValid &&
	  isUserLastnameValid &&
      isEmailValid &&
      isPasswordValid;

    // submit to the server if the form is valid
    if (isFormValid) {
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
        case "contrasena":
          checkPassword();
          break;
      }
    })
  );
});
