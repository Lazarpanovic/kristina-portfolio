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

petopiaSlides.forEach((slide, index) => {
  slide.addEventListener("click", () => {
    updatePetopiaSlider(index);
    resetPetopiaAutoSlider();
  });
});

updatePetopiaSlider(activeIndex);
startPetopiaAutoSlider();
