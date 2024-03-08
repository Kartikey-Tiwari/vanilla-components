class ImageSlider {
  constructor(imagesOrElement) {
    if (Array.isArray(imagesOrElement)) {
      this.createFromArray(imagesOrElement);
    } else if (
      imagesOrElement instanceof HTMLElement &&
      imagesOrElement.classList.contains("image-slider")
    ) {
      this.createFromElement(imagesOrElement);
    } else {
      throw new Error(
        'Invalid Arguement. Expected array of image URLs or HTML element with class "image-slider"',
      );
    }
    this.interval = setInterval(() => this.nextSlide(), 5000);
  }

  createFromArray(imagesArray) {
    const div = document.createElement("div");
    div.innerHTML = `<div class="image-slider"><button class="slider-btn left">←</button><div class="slides"></div><button class="slider-btn right">→</button><div class="slider-nav"></div></div>`;
    this.domElement = div.firstElementChild;
    this.slides = this.domElement.querySelector(".slides");
    this.sliderNav = this.domElement.querySelector(".slider-nav");
    this.curActive = 0;

    const slideLeftBtn = this.domElement.querySelector(".slider-btn.left");
    const slideRightBtn = this.domElement.querySelector(".slider-btn.right");

    this._initPrevNextBtn(slideLeftBtn, slideRightBtn);

    let left = 0;
    imagesArray.forEach((image, _) => {
      const slide = this.createSlide(image);
      slide.style.left = `${left}%`;
      left += 100;
    });
  }

  createFromElement(element) {
    this.domElement = element;
    this.slides = element.querySelector(".slides");
    this.sliderNav = element.querySelector(".slider-nav");
    this.curActive = 0;

    const slideLeftBtn = this.domElement.querySelector(".slider-btn.left");
    const slideRightBtn = this.domElement.querySelector(".slider-btn.right");

    console.log(this.slides, this.sliderNav, slideLeftBtn, slideRightBtn);
    if (!this.slides || !this.sliderNav || !slideLeftBtn || !slideRightBtn)
      throw new Error("Missing elements for Image Slider");

    this._initPrevNextBtn(slideLeftBtn, slideRightBtn);

    let left = 0;
    Array.from(this.slides.children).forEach((slide) => {
      slide.style.left = `${left}%`;
      left += 100;
      this._createSliderBtn(slide);
    });
  }

  nextSlide() {
    this.curActive = (this.curActive + 1) % this.slides.children.length;
    this.moveToSlide(this.curActive);
  }

  previousSlide() {
    this.curActive = this.curActive
      ? this.curActive - 1
      : this.slides.children.length - 1;
    this.moveToSlide(this.curActive);
  }

  moveToSlide(idx) {
    if (!this.slides.children.length) return;
    const sliderNavBtns = Array.from(this.sliderNav.children);
    sliderNavBtns.forEach((btn) => btn.classList.remove("active"));
    sliderNavBtns[idx].classList.add("active");

    let left = -idx * 100;
    Array.from(this.slides.children).forEach((slide) => {
      slide.style.left = `${left}%`;
      left += 100;
    });
  }

  resetInterval() {
    clearInterval(this.interval);
    this.interval = setInterval(() => this.nextSlide(), 5000);
  }

  createSlide(url) {
    const slide = document.createElement("div");
    const img = document.createElement("img");
    slide.append(img);
    slide.classList.add("slide");
    img.src = url;
    this.slides.append(slide);

    this._createSliderBtn(slide);
    return slide;
  }

  _createSliderBtn(slide) {
    const sliderBtn = document.createElement("div");
    sliderBtn.classList.add("slider-nav-btn");
    if (this.slides.children[0] === slide) sliderBtn.classList.add("active");
    this.sliderNav.append(sliderBtn);

    sliderBtn.addEventListener("click", () => {
      const idx = Array.from(this.slides.children).findIndex(
        (i) => i === slide,
      );

      if (idx === this.curActive) return;

      this.curActive = idx;
      this.moveToSlide(idx);
      this.resetInterval();
    });
  }

  _initPrevNextBtn(slideLeftBtn, slideRightBtn) {
    slideRightBtn.addEventListener("click", () => {
      this.nextSlide();
      this.resetInterval();
    });

    slideLeftBtn.addEventListener("click", () => {
      this.previousSlide();
      this.resetInterval();
    });
  }
}

document
  .querySelectorAll(".image-slider")
  .forEach((element) => new ImageSlider(element));
