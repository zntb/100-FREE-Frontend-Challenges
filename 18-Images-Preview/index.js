const images = [
  "https://images.unsplash.com/photo-1662652610624-4c12ff68385b?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1719090024421-f29c83ab4034?q=80&w=2128&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1644843521798-13d5c423fa4b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1719885157028-66f8304e27aa?q=80&w=2128&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1720087523174-3cc618f0dc28?q=80&w=1934&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1719702702970-6959f285c59b?q=80&w=2128&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1718664485620-0e0a2f781120?q=80&w=2128&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1719179513227-15758bc779ed?q=80&w=2128&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1692607038928-17d0bb79e451?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1717140370275-7d847544b27b?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1717501218385-55bc3a95be94?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1717501219074-943fc738e5a2?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

const imageGallery = document.getElementById("image-gallery");
const sliderContainer = document.getElementById("slider-container");
const sliderImages = document.getElementById("slider-images");
const thumbnailsContainer = document.querySelector(".thumbnails");

const createImageElement = (image, index) => {
  const imgElement = document.createElement("div");
  imgElement.className = "rounded-lg overflow-hidden cursor-pointer";
  imgElement.innerHTML = `<img src="${image}" alt="Image ${index + 1}" class="w-full h-48">`;
  imgElement.addEventListener("click", () => openModal(image));
  return imgElement;
};

const createThumbnailElement = (image, index) => {
  const thumbElement = document.createElement("div");
  thumbElement.className = "thumbnail";
  thumbElement.innerHTML = `<img src="${image}" alt="Image ${index + 1}" data-index="${index}">`;
  return thumbElement;
};

const loadImages = () => {
  imageGallery.innerHTML = "";
  images.forEach((image, index) =>
    imageGallery.appendChild(createImageElement(image, index)),
  );
};

const loadSliderImages = () => {
  sliderImages.innerHTML = "";
  thumbnailsContainer.innerHTML = "";
  const sliderImagesElements = images.map((image, index) => {
    const imgElement = createSliderImageElement(image, index);
    sliderImages.appendChild(imgElement);
    return imgElement;
  });
  const thumbnailsElements = images.map((image, index) => {
    const thumbElement = createThumbnailElement(image, index);
    thumbnailsContainer.appendChild(thumbElement);
    return thumbElement;
  });
  const [firstSliderImage, firstThumbnail] = [
    sliderImagesElements[0],
    thumbnailsElements[0],
  ];
  firstSliderImage.classList.add("active");
  firstThumbnail.classList.add("active");
};

const createSliderImageElement = (image, index) => {
  const imgElement = document.createElement("div");
  imgElement.className = "slider-image";
  imgElement.innerHTML = `<img src="${image}" alt="Image ${index + 1}" class="w-full h-[600px] md:h-full object-cover">`;
  return imgElement;
};

const updateSlider = () => {
  const offset = -currentIndex * 100;
  sliderImages.style.transform = `translateX(${offset}%)`;
  document.querySelectorAll(".thumbnail img").forEach((img, index) => {
    img.classList.toggle("active", index === currentIndex);
  });
};

const gridViewNav = document.getElementById("grid-view-nav");
const listViewNav = document.getElementById("list-view-nav");
const sliderViewNav = document.getElementById("slider-view-nav");

gridViewNav.addEventListener("click", () => {
  imageGallery.className = "grid grid-cols-1 md:grid-cols-3 gap-4 grid-view";
  imageGallery.classList.remove("hidden");
  sliderContainer.classList.add("hidden");
  loadImages();
});

listViewNav.addEventListener("click", () => {
  imageGallery.className = "list-view space-y-4";
  imageGallery.classList.remove("hidden");
  sliderContainer.classList.add("hidden");
  imageGallery.innerHTML = "";
  images.forEach((image, index) =>
    imageGallery.appendChild(createListImageElement(image, index)),
  );
});

sliderViewNav.addEventListener("click", () => {
  imageGallery.classList.add("hidden");
  sliderContainer.classList.remove("hidden");
  loadSliderImages();
  startAutoSwitch();
});

const createListImageElement = (image, index) => {
  const imgElement = document.createElement("div");
  imgElement.className =
    "flex items-center space-x-4 border border-gray-200 rounded-lg overflow-hidden p-2";
  imgElement.innerHTML = `
                <img src="${image}" alt="Image ${index + 1}" class="w-24 h-24 object-cover">
                <span class="text-gray-400">Image ${index + 1}</span>
            `;
  return imgElement;
};

loadImages();

let currentIndex = 0;

thumbnailsContainer.addEventListener("click", (e) => {
  if (e.target.tagName === "IMG") {
    currentIndex = parseInt(e.target.dataset.index);
    updateSlider();
  }
});

let autoSwitchInterval;

const startAutoSwitch = () => {
  stopAutoSwitch();
  autoSwitchInterval = setInterval(() => {
    currentIndex = (currentIndex + 1) % images.length;

    updateSlider();
  }, 5000);
};

const stopAutoSwitch = () => {
  clearInterval(autoSwitchInterval);
};

sliderContainer.addEventListener("mouseover", stopAutoSwitch);
sliderContainer.addEventListener("mouseout", startAutoSwitch);

window.addEventListener("load", () => {
  if (!imageGallery.classList.contains("hidden")) {
    startAutoSwitch();
  }
});

const modal = document.getElementById("image-modal");
const modalImage = document.getElementById("modal-image");
const closeModal = document.getElementById("close-modal");

const openModal = (imageSrc) => {
  modalImage.src = imageSrc;
  modal.classList.add("show");
};

closeModal.addEventListener("click", () => {
  modal.classList.remove("show");
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("show");
  }
});
