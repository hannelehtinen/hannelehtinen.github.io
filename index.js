const navSlide = () => {
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".navig");

  burger.addEventListener("click", () => {
    nav.classList.toggle("nav-active");
  });
};
navSlide();

/* -----------------------------------------
  Have focus outline only for keyboard users 
 ---------------------------------------- */

const handleFirstTab = (e) => {
  if (e.key === "Tab") {
    document.body.classList.add("user-is-tabbing");

    window.removeEventListener("keydown", handleFirstTab);
    window.addEventListener("mousedown", handleMouseDownOnce);
  }
};

const handleMouseDownOnce = () => {
  document.body.classList.remove("user-is-tabbing");

  window.removeEventListener("mousedown", handleMouseDownOnce);
  window.addEventListener("keydown", handleFirstTab);
};

window.addEventListener("keydown", handleFirstTab);

const backToTopButton = document.querySelector(".back-to-top");
let isBackToTopRendered = false;

let alterStyles = (isBackToTopRendered) => {
  backToTopButton.style.visibility = isBackToTopRendered ? "visible" : "hidden";
  backToTopButton.style.opacity = isBackToTopRendered ? 1 : 0;
  backToTopButton.style.transform = isBackToTopRendered
    ? "scale(1)"
    : "scale(0)";
};

window.addEventListener("scroll", () => {
  if (window.scrollY > 700) {
    isBackToTopRendered = true;
    alterStyles(isBackToTopRendered);
  } else {
    isBackToTopRendered = false;
    alterStyles(isBackToTopRendered);
  }
});

// Make it so that ESCAPE key closes the overlay
document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "Escape":
    case "Esc":
      window.location.hash = "#close";
      break;

    case "Left":
    case "ArrowLeft":
      const currentEl = document.querySelector(window.location.hash);
      if (!currentEl) return;

      const prevEl = currentEl.previousElementSibling;
      if (!prevEl) return;

      window.location.hash = `#${prevEl.id}`;

      break;

    case "Right":
    case "ArrowRight":
      const currentEl2 = document.querySelector(window.location.hash);
      if (!currentEl2) return;

      const nextEl = currentEl2.nextElementSibling;
      if (!nextEl) return;

      window.location.hash = `#${nextEl.id}`;

      break;

    default:
      return;
  }
});

// Get all gallery items
const galleryItems = document.querySelectorAll(".gallery-item");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const captionText = document.getElementById("caption");
const closeBtn = document.querySelector(".close");

// Loop through each gallery item
galleryItems.forEach((item) => {
  item.addEventListener("click", function () {
    lightbox.style.display = "flex"; // Show lightbox
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
