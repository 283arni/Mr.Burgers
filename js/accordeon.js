(function () {
  class Accordeon {
    constructor(section, size) {
      this.container = document.querySelector(section);
      this.items = this.container.querySelectorAll('li');
      this.addActive(this.items, size);
    }
    
    addActive(obj, size) {
      Array.from(obj).forEach((item) => {
        const btn = item.querySelector('button'); 
        const close = item.querySelector('.close');
        
        btn.addEventListener('click', () => {
          this.clickBtn(obj, size, item)
        });
        
        if(close){
          close.addEventListener('click', ()=>{ 
            this.removeActive(obj, size); 
          });
        }
      });
    }

    clickBtn(obj, size, item) {
      const info = item.querySelector('.accordeon__visible');

      if(!item.classList.contains('active')) {
        this.removeActive(obj, size);
        item.classList.add('active');
        info.style.cssText = `${size}: 100%`;
      } else {
        this.removeActive(obj, size);
      }
    }

    removeActive(obj, size) {
      Array.from(obj).forEach((item) => {
        const info = item.querySelector('.accordeon__visible');

        item.classList.remove('active');
        info.style.cssText = `${size}: 0`;
      });
    }
  }

  new Accordeon('.accordeon', 'height');
  new Accordeon('.accordeon_menu', 'width');

})();