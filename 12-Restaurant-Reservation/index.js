const likeBtn = document.querySelector(".heart-icon");

let isLiked = false;

const likeClick = () => {
  isLiked = !isLiked;
  likeBtn.classList.toggle("isLiked", isLiked);
};

likeBtn.addEventListener("click", likeClick);
