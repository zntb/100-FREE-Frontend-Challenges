const increaseButton = document.querySelectorAll(".increase-button");
const decreaseButton = document.querySelectorAll(".decrease-button");
const resetButton = document.querySelectorAll(".reset-button");

const prices = [12.99, 9.99, 29.99, 32.99];
const quantityElements = document.querySelectorAll(".quantity");
const priceElements = document.querySelectorAll(".price");

const subTotalElement = document.querySelector(".subtotal");
const taxElement = document.getElementById("tax");
const shippingElement = document.getElementById("shipping");
const totalElement = document.getElementById("total");
const payButton = document.getElementById("pay-btn");
const promoCodeElement = document.getElementById("promo-code");
const totalItemsElement = document.querySelector(".total-items");

const getPromoDiscount = () => {
  const promoCode = promoCodeElement.value;
  return promoCode === "DISCOUNT" ? 0.2 : 0;
};

for (let i = 0; i < increaseButton.length; i++) {
  increaseButton[i].addEventListener("click", () => {
    quantityElements[i].innerText++;
    updateTotal();
  });

  decreaseButton[i].addEventListener("click", () => {
    if (quantityElements[i].innerText > 0) {
      quantityElements[i].innerText--;
      updateTotal();
    }
  });

  resetButton[i].addEventListener("click", () => {
    quantityElements[i].innerText = 0;
    updateTotal();
  });
}

const updateTotal = () => {
  let totalAmount = 0;
  let totalQuantity = 0;

  for (let i = 0; i < quantityElements.length; i++) {
    const quantity = parseInt(quantityElements[i].innerText);
    const productPrice = prices[i];
    const productTotalPrice = quantity * productPrice;

    priceElements[i].innerText = `$${productTotalPrice.toFixed(2)}`;

    totalAmount += productTotalPrice;
    totalQuantity += quantity;
  }

  const promoDiscount = totalAmount * getPromoDiscount();
  const discountedTotal = totalAmount - promoDiscount;

  const taxAmount = discountedTotal * 0.1;
  const shippingAmount = discountedTotal > 0 && discountedTotal < 250 ? 10 : 0;
  const finalTotal = discountedTotal + taxAmount + shippingAmount;

  subTotalElement.innerText = `$${discountedTotal.toFixed(2)}`;
  taxElement.innerText = `$${taxAmount.toFixed(2)}`;
  shippingElement.innerText = `$${shippingAmount.toFixed(2)}`;
  totalElement.innerText = `$${finalTotal.toFixed(2)}`;
  totalItemsElement.innerText = `${totalQuantity} items`;
};

promoCodeElement.addEventListener("input", updateTotal);

payButton.addEventListener("click", () => {
  if (parseFloat(subTotalElement.innerText.slice(1)) > 0) {
    alert("Payment Successful");
    location.reload();
  } else {
    alert("Please add items to cart");
  }
});
