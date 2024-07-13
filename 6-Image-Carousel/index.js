document.addEventListener("DOMContentLoaded", () => {
  const thumbImages = [
    "https://images.unsplash.com/photo-1475113548554-5a36f1f523d6?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1426604966848-d7adac402bff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1444464666168-49d633b86797?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNjI0NTM4MDY3&ixlib=rb-1.2.1&q=80&w=1080",
    "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1546182990-dffeafbe841d?q=80&w=2059&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1603915639582-9ef4ca58c5ad?q=80&w=1928&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];

  const carousel = document.querySelector(".carousel");
  const prevButton = document.getElementById("prev");
  const nextButton = document.getElementById("next");
  const thumbnailsContainer = document.querySelector(".thumbnails");

  let currentIndex = 2;

  thumbImages.forEach((image, index) => {
    const img = document.createElement("img");
    img.classList.add("carousel-image");
    img.src = image;
    carousel.appendChild(img);
  });

  thumbImages.forEach((image, index) => {
    const thumbnail = document.createElement("img");
    thumbnail.classList.add("thumbnail");
    thumbnail.src = image;
    thumbnail.addEventListener("click", () => {
      currentIndex = index;
      updateCarousel();
    });
    thumbnailsContainer.appendChild(thumbnail);
  });

  function updateCarousel() {
    const imageWidth = carousel.offsetWidth;
    carousel.style.transform = `translateX(${-currentIndex * imageWidth}px)`;

    const thumbnails = document.querySelectorAll(".thumbnail");
    thumbnails.forEach((thumb, index) => {
      thumb.classList.toggle("active", index === currentIndex);
    });
  }

  function navigate(offset) {
    currentIndex =
      (currentIndex + offset + thumbImages.length) % thumbImages.length;
    updateCarousel();
  }

  prevButton.addEventListener("click", () => navigate(-1));
  nextButton.addEventListener("click", () => navigate(1));

  updateCarousel();
});
