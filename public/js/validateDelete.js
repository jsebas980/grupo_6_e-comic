console.log("validateDelete Front-end JS");

// https://www.javascripttutorial.net/javascript-dom/javascript-form-validation/
window.addEventListener("load", function () {
  const form = document.querySelector("#formdelete");

  form.addEventListener("submit", function (e) {
    // prevent the form from submitting
    e.preventDefault();
    var answer = window.confirm("Save data?");
    if (answer) {
        //some code
        console.log('Thing was saved to the database.');
        console.log("La validación fue exitosa - validateDelete Front-end JS");
      form.submit();
    }
    else {
        //some code
        console.log('Thing was not saved to the database.');
        return false;
    }
      
  });
});
