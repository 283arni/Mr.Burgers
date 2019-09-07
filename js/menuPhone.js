
  // opened menu for phone
  const menu = document.body.querySelector('.nav__little');
  const html = '<div class="humburger__wrapper"></div>';
  const logo = document.body.querySelector('.logo').cloneNode(true);
  const nav = document.body.querySelector('.nav').cloneNode(true);
  const cross = document.body.querySelector('.close').cloneNode(true);
  

  menu.addEventListener('click', function () {
    changeMenu()
  });

  function changeMenu() {
    const block = document.createElement('div');
    block.classList.add('humburger');
    document.body.prepend(block);
    block.innerHTML = html;
    copyBlock(block);
    removeBlock(block)
  }

  function copyBlock(block) {
    const wrapper = block.querySelector('.humburger__wrapper');
    
    wrapper.append(logo);
    logo.classList.add('logo_humburger');
    wrapper.append(cross);
    cross.classList.add('close_humburger');
    block.append(nav);
    nav.classList.remove('nav_hero');
    nav.classList.add('nav_tablet');
  }

  function removeBlock(block) {
    const fullMenu = block.querySelector('.nav');
    var closeMenu = block.querySelector('.close_humburger .close__link');

    $('[data-skroll]').on('click', function (e) {
      e.preventDefault();

      const indexLink = $(this).attr('data-skroll');

      $('.section').removeClass('active');
      $('.section').eq(indexLink).addClass('active');
      $('.nav-sections__circle').removeClass('active').eq(indexLink).addClass('active')
      $('.maincontainer').animate({
        'bottom': indexLink * 100 + 'vh'
        }, 700
      );
    });

    $('[data-skroll]').on('click', function () {
      block.remove();
    });


    closeMenu.addEventListener('click', function () {
      block.remove();
    });

    fullMenu.addEventListener('click', function (e) {
      if(e.target === fullMenu){
        block.remove();
      }
    });
  }

