(function(){

// slider constructor
class Slider {
  constructor(selector) {
    this.container = document.querySelector(selector);
    this.slider = this.container.querySelector('.slider__list');
    this.item = this.slider.querySelectorAll('.slider__slid');
    this.btnLeft = this.container.querySelector('.slider__btn_prev');
    this.btnRight = this.container.querySelector('.slider__btn_next');
    this.currentItem = 0;

    this.btnLeft.addEventListener('click', (e) => {
      e.preventDefault();
      this.sliderGo('prev');
    })

    this.btnRight.addEventListener('click', (e) => {
      e.preventDefault();
      this.sliderGo('next');
    })
  }

  sliderGo(way) {
    if(way === 'next') {
      this.currentItem++;
    }

    if(way === 'prev') {
      this.currentItem--;
    }

    if(this.currentItem === this.item.length) {
      this.currentItem = 0;
    }

    if(this.currentItem < 0) {
      this.currentItem = this.item.length-1;
    }

    this.translate();
  }

  translate() {
    this.slider.style.transform = `translateX(-${this.currentItem}00%)`;
  }
}

new Slider('.slider');

//slider (lite version)

// const slider = document.querySelector('.burgers__slider');
// const btnRight = document.querySelector('.burgers__right');
// const btnLetf = document.querySelector('.burgers__left')
// const sliderChild = document.querySelector('.burgers__slider-item');


// btnRight.addEventListener('click', e=>{
//   e.preventDefault();
//   slider.appendChild(slider.firstElementChild)

// })

// btnLetf.addEventListener('click', e=>{
//   e.preventDefault();
//   slider.insertBefore(slider.lastElementChild, slider.firstElementChild)
// })

})();