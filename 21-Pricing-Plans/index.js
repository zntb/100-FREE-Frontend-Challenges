document.addEventListener("DOMContentLoaded", function () {
  const pricingPlans = document.querySelectorAll(".pricing-plan");

  pricingPlans.forEach((plan) => {
    plan.addEventListener("mousedown", () => {
      plan.classList.add("active");
      updateDots(plan);
    });

    plan.addEventListener("mouseup", () => {
      plan.classList.remove("active");
      updateDots(plan);
    });
  });

  function updateDots(plan) {
    const whiteDots = `<img class="w-8" src='https://svgshare.com/i/18g7.svg' alt='white-dots' />`;
    const blackDots = `<img class="w-8" src='https://svgshare.com/i/18h8.svg' alt='dot-black' />`;
    const listItems = plan.querySelectorAll("li");

    listItems.forEach((item) => {
      const dotImg = plan.classList.contains("active") ? whiteDots : blackDots;

      const existingImg = item.querySelector("img");
      if (existingImg) {
        existingImg.remove();
      }

      item.insertAdjacentHTML("afterbegin", dotImg);
    });
  }

  pricingPlans.forEach((plan) => {
    updateDots(plan);
  });
});

document
  .getElementById("billingToggle")
  .addEventListener("change", function () {
    const standardPrice = document.getElementById("standardPrice");
    const professionalPrice = document.getElementById("professionalPrice");
    const ultimatePrice = document.getElementById("ultimatePrice");
    const annualType = document.getElementById("annual-type");
    const monthlyType = document.getElementById("monthly-type");

    if (this.checked) {
      // Monthly Billing
      standardPrice.innerHTML =
        '$29.99<span class="text-sm text-gray-400 font-normal">/month</span>';
      professionalPrice.innerHTML =
        '$39.99<span class="text-sm text-gray-400 font-normal">/month</span>';
      ultimatePrice.innerHTML =
        '$49.99<span class="text-sm text-gray-400 font-normal">/month</span>';
      annualType.classList.remove("font-bold");
      monthlyType.classList.add("font-bold");
    } else {
      // Annual Billing (Assuming a 10% discount for annual billing)
      standardPrice.innerHTML =
        '$323.91<span class="text-sm text-gray-400 font-normal">/year</span>';
      professionalPrice.innerHTML =
        '$431.91<span class="text-sm text-gray-400 font-normal">/year</span>';
      ultimatePrice.innerHTML =
        '$539.91<span class="text-sm text-gray-400 font-normal">/year</span>';
      monthlyType.classList.remove("font-bold");
      annualType.classList.add("font-bold");
    }
  });

document.getElementById("billingToggle").dispatchEvent(new Event("change"));
