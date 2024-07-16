const generatePassword = (length, chars) => {
  if (chars.length === 0) {
    showAlertMessage();
    return;
  }

  hideAlertMessage();

  let password = "";
  for (let i = 0; i < length; i++) {
    password += chars[Math.floor(Math.random() * chars.length)];
  }
  document.getElementById("generated-password").innerText = password;
};

const updateLength = (value) => {
  document.getElementById("char-length").innerText = value;
  document.getElementById("cur-length").innerText = value;
};

const copyPassword = () => {
  const password = document.getElementById("generated-password").innerText;
  const copyAlertMsg = document.getElementById("copy-alert");

  navigator.clipboard
    .writeText(password)
    .then(() => {
      copyAlertMsg.innerText = "Password copied to clipboard";
      copyAlertMsg.classList.remove("hidden");
      setTimeout(() => {
        copyAlertMsg.classList.add("hidden");
      }, 3000);
    })
    .catch(() => {
      copyAlertMsg.innerText = "Failed to copy password";
      copyAlertMsg.classList.remove("hidden");
      setTimeout(() => {
        copyAlertMsg.classList.add("hidden");
      }, 3000);
    });
};

const getCheckedChars = () => {
  const includeUppercase = document.getElementById("include-uppercase").checked;
  const includeLowercase = document.getElementById("include-lowercase").checked;
  const includeNumbers = document.getElementById("include-numbers").checked;
  const includeSymbols = document.getElementById("include-symbols").checked;

  const upperCaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowerCaseChars = "abcdefghijklmnopqrstuvwxyz";
  const numberChars = "0123456789";
  const symbolChars = "!@#$%^&*()_+-=[]{}|;:,.<>?";

  let chars = "";
  if (includeUppercase) chars += upperCaseChars;
  if (includeLowercase) chars += lowerCaseChars;
  if (includeNumbers) chars += numberChars;
  if (includeSymbols) chars += symbolChars;

  return chars;
};

const showAlertMessage = () => {
  const alertMessage = document.getElementById("alert-message");
  alertMessage.classList.remove("hidden");
};

const hideAlertMessage = () => {
  const alertMessage = document.getElementById("alert-message");
  alertMessage.classList.add("hidden");
};

document.addEventListener("DOMContentLoaded", () => {
  const lengthInput = document.getElementById("character-length");
  const generateButton = document.getElementById("generate-btn");
  const updateButton = document.getElementById("update-btn");
  const copyButton = document.getElementById("copy-btn");

  const updatePassword = () => {
    const length = parseInt(lengthInput.value, 10);
    const chars = getCheckedChars();
    generatePassword(length, chars);
  };

  lengthInput.addEventListener("input", (e) => {
    updateLength(e.target.value);
  });

  generateButton.addEventListener("click", updatePassword);

  updateButton.addEventListener("click", updatePassword);

  copyButton.addEventListener("click", copyPassword);

  updatePassword();
});
