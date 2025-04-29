const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const images = document.querySelectorAll(".gallery img");
const closeBtn = document.getElementById("closeBtn");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
let currentIndex = 0;

const openLightbox = (index) => {
  currentIndex = index;
  lightboxImg.src = images[index].src;
  lightbox.classList.add("active");
};

const closeLightbox = () => {
  lightbox.classList.remove("active");
  lightboxImg.src = "";
};

const showNext = (e) => {
  e?.stopPropagation();
  lightboxImg.classList.add("fade-out");
  setTimeout(() => {
    currentIndex = (currentIndex + 1) % images.length;
    lightboxImg.src = images[currentIndex].src;
    lightboxImg.classList.remove("fade-out");
  }, 300);
};

const showPrev = (e) => {
  e?.stopPropagation();
  lightboxImg.classList.add("fade-out");
  setTimeout(() => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    lightboxImg.src = images[currentIndex].src;
    lightboxImg.classList.remove("fade-out");
  }, 300);
};

images.forEach((img, index) => {
  img.addEventListener("click", () => openLightbox(index));
});

closeBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  closeLightbox();
});

nextBtn.addEventListener("click", showNext);
prevBtn.addEventListener("click", showPrev);

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("active")) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowRight") showNext(e);
  if (e.key === "ArrowLeft") showPrev(e);
});

// Swipe gesture support
let touchStartX = 0;
let touchEndX = 0;

lightbox.addEventListener("touchstart", (e) => {
  touchStartX = e.changedTouches[0].screenX;
});

lightbox.addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipeGesture();
});

function handleSwipeGesture() {
  const swipeThreshold = 50;
  const swipeDistance = touchEndX - touchStartX;

  if (swipeDistance > swipeThreshold) {
    showPrev(new Event("swipe"));
  } else if (swipeDistance < -swipeThreshold) {
    showNext(new Event("swipe"));
  }
}
