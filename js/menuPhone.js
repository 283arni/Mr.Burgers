(function(){
  // opened menu for phone
  const menu = document.querySelector('.nav__little');
  const fullMenu = document.querySelector('.hamburger');
  const closeMenu = document.querySelector('.hamburger .close__link');

  menu.addEventListener('click', function (event) {
    event.preventDefault();
    fullMenu.style.display = 'flex';
  });

  closeMenu.addEventListener('click', function (event) {
    event.preventDefault();
    fullMenu.style.display = 'none';
  });

  fullMenu.addEventListener('click', function (event) {
    if (event.target === fullMenu) {
      closeMenu.click();
    }
  });

  $('[data-skroll]').on('click', function (e) {
    fullMenu.style.display = 'none';
  });
})();
