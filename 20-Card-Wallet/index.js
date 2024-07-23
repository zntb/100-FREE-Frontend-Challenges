document.addEventListener("DOMContentLoaded", function () {
  const currentYear = new Date().getFullYear();
  const expiryYearSelect = document.getElementById("expiry-year");
  for (let i = 0; i < 10; i++) {
    const option = document.createElement("option");
    option.value = currentYear + i;
    option.text = currentYear + i;
    expiryYearSelect.appendChild(option);
  }
});

let cardCount = 1;
let defaultCardIndex = 0;
const maxCards = 5;
const gradients = [
  "linear-gradient(to left top, #43b9dc, #00a9e6, #0097ee, #0082f2, #0069ed, #465be7, #664bde, #7f35d2, #8b34cf, #9633cd, #a132ca, #aa32c7)",
  "linear-gradient(to left top, #abb751, #cb972f, #e56e37, #ee3b5b, #db008d, #c804a4, #ab20bc, #7f35d2, #8b34cf, #9633cd, #a132ca, #aa32c7)",
  "linear-gradient(to left top, #74e5e0, #00d1ed, #00bafd, #009eff, #007afd, #4767f2, #6751e4, #7f35d2, #8b34cf, #9633cd, #a132ca, #aa32c7)",
  "linear-gradient(to left top, #77de8d, #00d2b8, #00c0e8, #00a6ff, #0081ff, #456cf5, #6654e6, #7f35d2, #8b34cf, #9633cd, #a132ca, #aa32c7)",
  "linear-gradient(to left top, #de7780, #dd6185, #d74b90, #c838a1, #ae2fb6, #a22fbf, #9231c9, #7f35d2, #8b34cf, #9633cd, #a132ca, #aa32c7)",
];
const cardData = [
  {
    balance: "$4,387",
    number: "**** **** **** 2390",
    expiry: "04/26",
    brand: "VISA",
    gradient: gradients[0],
  },
  {
    balance: "$1256",
    number: "**** **** **** 1567",
    expiry: "05/25",
    brand: "VISA",
    gradient: gradients[1],
  },
  {
    balance: "Ξ10,505",
    number: "**** **** **** 1567",
    expiry: "05/25",
    brand: "VISA",
    gradient: gradients[2],
  },
];

const cardContainer = document.getElementById("card-container");
const balanceElement = document.getElementById("balance");
const cardNumberElement = document.getElementById("card-number");
const expiryElement = document.getElementById("expiry");
const addCardSection = document.getElementById("add-card-section");
const addCardBtn = document.getElementById("add-card-btn");
const cardSection = document.getElementById("card-section");
const dots = document.querySelectorAll(".dot");

let initialLoad = true;

function updateCardDisplay(index, animate = true) {
  if (cardData.length === 0) return;

  const card = cardData[index];

  if (animate) {
    cardContainer.classList.add("slide-out");

    setTimeout(() => {
      balanceElement.innerText = card.balance;
      cardNumberElement.innerText = card.number;
      expiryElement.innerText = `${card.expiry}`;
      cardContainer.style.backgroundImage = card.gradient;

      cardContainer.classList.remove("slide-out");
      cardContainer.classList.add("slide-in");

      setTimeout(() => {
        cardContainer.classList.remove("slide-in");
      }, 500);
    }, 500);
  } else {
    balanceElement.innerText = card.balance;
    cardNumberElement.innerText = card.number;
    expiryElement.innerText = `${card.expiry}`;
    cardContainer.style.backgroundImage = card.gradient;
  }

  document.querySelectorAll(".dot").forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
    dot.classList.toggle(
      "inactive",
      cardData.length === 0 || i >= cardData.length,
    );
  });
}

function updateDotStates() {
  dots.forEach((dot, index) => {
    dot.classList.toggle("inactive", index >= cardData.length);
  });
}

addCardBtn.onclick = () => {
  cardSection.classList.add("hidden");
  addCardSection.classList.remove("hidden");
};

document.getElementById("add-card-submit").onclick = (e) => {
  e.preventDefault(); // Prevent form submission

  const cardName = document.getElementById("card-name").value;
  const cardNumber = document
    .getElementById("card-number-input")
    .value.replace(/\s+/g, "");
  const expiryMonth = document.getElementById("expiry-month").value;
  const expiryYear = document.getElementById("expiry-year").value;
  const cvc = document.getElementById("cvc-code").value;
  const isDefault = document.getElementById("default-card").checked;

  if (
    cardName &&
    validateLuhnAlgorithm(cardNumber) &&
    validateExpirationDate(
      parseInt(expiryMonth, 10),
      parseInt(expiryYear, 10),
    ) &&
    validateCVV(cvc) &&
    cardCount < maxCards
  ) {
    const newCard = {
      balance: "$0.00",
      number: formatCardNumber(cardNumber),
      expiry: `${expiryMonth}/${expiryYear.slice(-2)}`,
      brand: detectCardType(cardNumber),
      gradient: gradients[cardData.length % gradients.length],
    };
    cardData.push(newCard);

    if (isDefault) {
      defaultCardIndex = cardData.length - 1;
    }

    updateCardDisplay(defaultCardIndex);

    cardCount++;
    addCardSection.classList.add("hidden");
    cardSection.classList.remove("hidden");

    // Clear input fields
    document.getElementById("card-name").value = "";
    document.getElementById("card-number-input").value = "";
    document.getElementById("expiry-month").value = "";
    document.getElementById("expiry-year").value = "";
    document.getElementById("cvc-code").value = "";
    document.getElementById("default-card").checked = false;
  } else {
    alert("Please enter valid card details.");
  }

  updateDotStates();
};

document.getElementById("close-btn").onclick = () => {
  addCardSection.classList.add("hidden");
  cardSection.classList.remove("hidden");
};

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    if (!dot.classList.contains("inactive")) {
      updateCardDisplay(index);
      defaultCardIndex = index;
    }
  });
});

updateCardDisplay(defaultCardIndex, false);
updateDotStates();

function formatCardNumber(cardNumber) {
  return cardNumber.replace(/(\d{4})/g, "$1 ").trim();
}

function validateLuhnAlgorithm(cardNumber) {
  let sum = 0;
  let isEven = false;

  for (let i = cardNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cardNumber.charAt(i), 10);

    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    sum += digit;
    isEven = !isEven;
  }
  detectCardType(cardNumber);
  return sum % 10 === 0;
}

function detectCardType(cardNumber) {
  const patterns = {
    visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
    mastercard: /^5[1-5][0-9]{14}$/,
    amex: /^3[47][0-9]{13}$/,
    discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
  };

  for (const cardType in patterns) {
    if (patterns[cardType].test(cardNumber)) {
      return cardType.toUpperCase();
    }
  }

  return "UNKNOWN";
}

function validateExpirationDate(month, year) {
  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();

  if (year < currentYear) {
    return false;
  } else if (year === currentYear && month < currentMonth) {
    return false;
  }

  return true;
}

function validateCVV(cvv) {
  const cvvPattern = /^[0-9]{3,4}$/;
  return cvvPattern.test(cvv);
}
