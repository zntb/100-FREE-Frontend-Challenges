const emailBtn = document.getElementById("email-btn");
const googleButton = document.getElementById("google-btn");
const emailForm = document.getElementById("email-form");
const formInputs = document.querySelectorAll("#email-form input");

emailBtn.addEventListener("click", () => emailForm.classList.toggle("hidden"));

googleButton.addEventListener("click", () => {
  formInputs.forEach((input) => (input.required = false));
  emailForm.classList.toggle("hidden");
});

const getPasswordBtn = document.getElementById("eye-btn");
const passwordInput = document.getElementById("password");

let isPasswordVisible = false;

getPasswordBtn.addEventListener("click", () => {
  passwordInput.type = isPasswordVisible ? "password" : "text";
  isPasswordVisible = !isPasswordVisible;
});
