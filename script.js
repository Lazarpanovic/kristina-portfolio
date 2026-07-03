const petopiaSlides = document.querySelectorAll(".petopia-slide");

let activeIndex = 0;
let sliderInterval;

function updatePetopiaSlider(index) {
  petopiaSlides.forEach((slide) => {
    slide.classList.remove("active", "prev", "next");
  });

  const total = petopiaSlides.length;
  const prevIndex = index === 0 ? total - 1 : index - 1;
  const nextIndex = index === total - 1 ? 0 : index + 1;

  petopiaSlides[index].classList.add("active");
  petopiaSlides[prevIndex].classList.add("prev");
  petopiaSlides[nextIndex].classList.add("next");

  activeIndex = index;
}

function nextPetopiaSlide() {
  const nextIndex =
    activeIndex === petopiaSlides.length - 1 ? 0 : activeIndex + 1;
  updatePetopiaSlider(nextIndex);
}

function startPetopiaAutoSlider() {
  sliderInterval = setInterval(nextPetopiaSlide, 3000);
}

function resetPetopiaAutoSlider() {
  clearInterval(sliderInterval);
  startPetopiaAutoSlider();
}

updatePetopiaSlider(activeIndex);
startPetopiaAutoSlider();

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-links a");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("active");
    navLinks.classList.toggle("active");
  });

  navItems.forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.classList.remove("active");
      navLinks.classList.remove("active");
    });
  });
}

const lightbox = document.getElementById("imageLightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxClose = document.querySelector(".lightbox-close");

function openLightbox(image) {
  lightboxImage.src = image.src;
  lightboxImage.alt = image.alt;

  lightbox.classList.add("active");
  document.body.style.overflow = "hidden";
}

petopiaSlides.forEach((slide, index) => {
  slide.addEventListener("click", () => {
    const wasActive = index === activeIndex;
    const image = slide.querySelector("img");

    if (wasActive && image) {
      openLightbox(image);
      return;
    }

    updatePetopiaSlider(index);
    resetPetopiaAutoSlider();
  });
});

function closeLightbox() {
  lightbox.classList.remove("active");
  lightboxImage.src = "";
  document.body.style.overflow = "";
}

const normalProjectImages = document.querySelectorAll(".project-images img");

normalProjectImages.forEach((image) => {
  image.addEventListener("click", () => {
    openLightbox(image);
  });
});

lightboxClose.addEventListener("click", closeLightbox);

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && lightbox.classList.contains("active")) {
    closeLightbox();
  }
});
