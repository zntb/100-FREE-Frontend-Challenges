document.addEventListener("DOMContentLoaded", function () {
  const heartCheckboxes = document.querySelectorAll(".heart-checkbox");

  heartCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      const label = this.nextElementSibling;
      if (this.checked) {
        label.style.color = "#FF1C7B";
      } else {
        label.style.color = "#b3b0b0";
      }
    });
  });
});

document.getElementById("search-input").addEventListener("input", function () {
  const searchValue = this.value.toLowerCase();
  const friends = document.querySelectorAll("#friends-list > div");

  let visibleCount = 0;

  friends.forEach((friend) => {
    const name = friend.querySelector("div.relative").textContent.toLowerCase();
    if (name.includes(searchValue)) {
      friend.style.display = "flex";
      visibleCount++;
    } else {
      friend.style.display = "none";
    }
  });

  if (visibleCount === 0) {
    document.getElementById("friends-list").style.height = "450px";
  }
});
