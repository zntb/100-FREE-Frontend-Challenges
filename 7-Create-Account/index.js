const getPasswordBtn = document.getElementById("togglePassword");
const passwordInput = document.getElementById("password");

let isPasswordVisible = false;

getPasswordBtn.addEventListener("click", () => {
  passwordInput.type = isPasswordVisible ? "password" : "text";
  isPasswordVisible = !isPasswordVisible;
});
