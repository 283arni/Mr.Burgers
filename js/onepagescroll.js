

  //OnePageScroll

  $(document).ready(function () {

    var containerScroll = $('.wrapper'),
        section = $('.section'),
        sliderContainer = $('.maincontainer'),
        inscroll = false,
        md = new MobileDetect(window.navigator.userAgent);

    const isMobile = md.mobile();
    const sectionHero = document.querySelector('.hero');

    containerScroll.on('wheel', function (e) {
      e.preventDefault();

      var sectionAct = section.filter('.active'),
          nextSection = sectionAct.next(),
          prevSection = sectionAct.prev(),
          indexSection;

      if (inscroll === false) {
        inscroll = true;

        sectionAct.removeClass('active');
        
        if (e.originalEvent.deltaY > 0) {
          if (nextSection.length) {
            indexSection = nextSection.index();
            nextSection.addClass('active');
          } else {
            indexSection = section.first().index();
            section.first().addClass('active');
          }
          scroll(indexSection);
        } else {
          if (prevSection.length) {
            indexSection = prevSection.index();
            prevSection.addClass('active');
          } else {
            indexSection = section.last().index();
            section.last().addClass('active');
          }
          scroll(indexSection);
        }
        setTimeout(() => {
          inscroll = false;
        }, 1500); // Время на откат события wheel
      }
    });

    function scroll(indexSection) {
      sliderContainer.animate({
          'bottom': indexSection * 100 + 'vh'
        }, 700,
        function () {
          activeDot(indexSection);
          colorDot(indexSection);
        }
      );
    }

   function fullScreen() {
      const divUp = document.querySelector('.up');
      if (window.innerWidth < 480) {
        if (sectionHero.classList.contains('active')) {
          divUp.style.display = 'none';
        } else {
          divUp.style.display = 'block';
        }
      }
    }

    function colorDot(indexSection) {
      if (indexSection == 1 || indexSection == 6 || indexSection == 8) {
        $('.nav-sections__point').css('background-color', "#2f3234");
        $('.nav-sections__circle').css('border-color', "transparent");
        $('.nav-sections__circle.active').css('border-color', "#2f3234");
      } else {
        $('.nav-sections__point').css('background-color', "#fff");
        $('.nav-sections__circle').css('border-color', "transparent");
        $('.nav-sections__circle.active').css('border-color', "#fff");
      }
    }

    if (isMobile) {
      $('.maincontainer').swipe({
        swipe: function (event, direction) {
          touchAndKey('', direction);
          fullScreen();
        }
      });
    }

    $('[data-skroll]').on('click', function (e) {
      e.preventDefault();

      const indexLink = $(this).attr('data-skroll');

      section.removeClass('active');
      $('.section').eq(indexLink).addClass('active');
      scroll(indexLink);
      fullScreen();
    });
    
    $(document).on('keydown', (e) => {
      switch (e.keyCode) {
        case 40:
          e.preventDefault();
          touchAndKey(e.keyCode);
          break;
        case 38:
          e.preventDefault();
          touchAndKey(e.keyCode);
          break;
      }
    });

    function activeDot(index) {
      $('.nav-sections__circle').removeClass('active').eq(index).addClass('active');
    }

    function touchAndKey(keyCode, direction) {
      let imitationClick = $('.nav-sections__circle').filter('.active');

      if (keyCode === 40 || direction === 'up') {
        imitationClick.next().click();
      }
  
      if (keyCode === 38 || direction === 'down') {
        imitationClick.prev().click();
      }
    }
  });