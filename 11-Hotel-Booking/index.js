document.addEventListener("DOMContentLoaded", function () {
  const customSelects = document.querySelectorAll(".custom-select");

  customSelects.forEach((select) => {
    const selected = select.querySelector(".select-selected");
    const items = select.querySelector(".select-items");
    const options = items.querySelectorAll("div");

    selected.addEventListener("click", function (e) {
      e.stopPropagation();
      closeAllSelect(this);
      items.classList.toggle("select-hide");
      selected.classList.toggle("select-arrow-active");
    });

    options.forEach((option) => {
      option.addEventListener("click", function (e) {
        e.stopPropagation();
        selected.textContent = this.textContent;
        items.classList.add("select-hide");
        selected.classList.remove("select-arrow-active");
      });
    });
  });

  function closeAllSelect(el) {
    const selectItems = document.querySelectorAll(".select-items");
    const selected = document.querySelectorAll(".select-selected");
    selected.forEach((sel) => {
      if (el !== sel) {
        sel.classList.remove("select-arrow-active");
      }
    });
    selectItems.forEach((item) => {
      if (el.parentNode.querySelector(".select-items") !== item) {
        item.classList.add("select-hide");
      }
    });
  }

  document.addEventListener("click", closeAllSelect);
});

document.addEventListener("DOMContentLoaded", function () {
  const today = new Date().toISOString().split("T")[0];

  flatpickr("#checkin", {
    minDate: "today",
    dateFormat: "Y-m-d",
    position: "auto right",
    onChange: function (selectedDates, dateStr, instance) {
      const checkout = document.getElementById("checkout")._flatpickr;
      checkout.set("minDate", dateStr);
    },
  });

  flatpickr("#checkout", {
    minDate: today,
    dateFormat: "Y-m-d",
    position: "auto right",
  });
});
