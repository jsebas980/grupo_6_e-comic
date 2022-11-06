console.log("validateUser Front-end JS");

// https://www.javascripttutorial.net/javascript-dom/javascript-form-validation/
window.addEventListener("load", function () {
  const emailEl = document.querySelector("#email");
  const passwordEl = document.querySelector("#password");

  const form = document.querySelector("#formValidate");

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
    let isEmailValid = checkEmail(),
      isPasswordValid = checkPassword();

    let isFormValid =
      isEmailValid &&
      isPasswordValid;

    // submit to the server if the form is valid
    if (isFormValid) {
      //window.alert("Te has registrado correctamente. Se proceder a iniciar sesión");
      console.log("La validación fue exitosa - validateLogin Front-end JS");
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
        case "email":
          checkEmail();
          break;
        case "password":
          checkPassword();
          break;
      }
    })
  );
});
