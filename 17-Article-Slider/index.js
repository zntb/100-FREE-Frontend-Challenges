document.addEventListener("DOMContentLoaded", () => {
  const slider = document.getElementById("slider");
  const prevButton = document.getElementById("prev");
  const nextButton = document.getElementById("next");
  const dots = document.querySelectorAll(".dot");
  const counter = document.getElementById("counter");
  const totalSlides = dots.length;
  let currentIndex = 0;

  function updateSlider(index) {
    slider.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach(
      (dot, i) => (
        dot.classList.toggle("bg-blue-800", i === index),
        dot.classList.toggle("bg-gray-500", i !== index)
      ),
    );
  }

  const updateIndex = (delta) => {
    currentIndex = (currentIndex + delta + totalSlides) % totalSlides;
    updateSlider(currentIndex);
    counter.textContent = `${currentIndex + 1}`;
  };

  prevButton.addEventListener("click", () => updateIndex(-1));
  nextButton.addEventListener("click", () => updateIndex(1));
  dots.forEach((dot, index) =>
    dot.addEventListener("click", () => updateIndex(index - currentIndex)),
  );
});

document.addEventListener("DOMContentLoaded", function () {
  var shareButton = document.getElementById("shareButton");
  var dropdownMenu = document.getElementById("dropdownMenu");

  shareButton.addEventListener("click", function () {
    dropdownMenu.classList.toggle("hidden");
  });

  document.addEventListener("click", function (e) {
    if (!shareButton.contains(e.target) && !dropdownMenu.contains(e.target)) {
      dropdownMenu.classList.add("hidden");
    }
  });
});
