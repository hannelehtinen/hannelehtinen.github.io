// Get all gallery items
const galleryItems = document.querySelectorAll(".gallery-item");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const captionText = document.getElementById("caption");
const closeBtn = document.querySelector(".close");

// Loop through each gallery item
galleryItems.forEach((item) => {
  item.addEventListener("click", function () {
    lightbox.style.display = "block"; // Show lightbox
    lightboxImg.src = this.src; // Set lightbox image source
    captionText.innerHTML = this.alt; // Set caption text
  });
});

// Close lightbox when close button is clicked
closeBtn.addEventListener("click", function () {
  lightbox.style.display = "none"; // Hide lightbox
});

// Close lightbox when clicking outside of the image
lightbox.addEventListener("click", function (event) {
  if (event.target === this) {
    this.style.display = "none"; // Hide lightbox if clicked outside
  }
});

let currentIndex;

// Function to open lightbox with specific index
function openLightBox(index) {
  currentIndex = index; // Store current index
  const selectedItem = galleryItems[index];
  lightbox.style.display = "block";
  lightboxImg.src = selectedItem.src;
  captionText.innerHTML = selectedItem.alt;
}

// Add click events for each item
galleryItems.forEach((item, index) => {
  item.addEventListener("click", () => openLightBox(index));
});

// Left arrow click event
document.querySelector(".left-arrow").addEventListener("click", () => {
  currentIndex = currentIndex > 0 ? currentIndex - 1 : galleryItems.length - 1;
  openLightBox(currentIndex);
});

// Right arrow click event
document.querySelector(".right-arrow").addEventListener("click", () => {
  currentIndex = currentIndex < galleryItems.length - 1 ? currentIndex + 1 : 0;
  openLightBox(currentIndex);
});

document.addEventListener("keydown", (event) => {
  if (lightbox.style.display === "block") {
    if (event.key === "ArrowLeft") {
      // Left arrow key
      currentIndex =
        currentIndex > 0 ? currentIndex - 1 : galleryItems.length - 1;
      openLightBox(currentIndex);
    } else if (event.key === "ArrowRight") {
      // Right arrow key
      currentIndex =
        currentIndex < galleryItems.length - 1 ? currentIndex + 1 : 0;
      openLightBox(currentIndex);
    } else if (event.key === "Escape") {
      // Escape key closes light box
      lightbox.style.display = "none";
    }
  }
});

const navSlide = () => {
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".navig");

  burger.addEventListener("click", () => {
    nav.classList.toggle("nav-active");
  });
};
navSlide();
