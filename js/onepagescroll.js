(function () {

  //OnePageScroll

  $(document).ready(function () {

    var containerScroll = $('.wrapper'),
      section = $('.section'),
      sliderContainer = $('.maincontainer');

    function scroll(indexSection, posSection) {
      sliderContainer.animate({
          'bottom': indexSection * 100 + 'vh'
        }, 700,
        function () {
          posSection;
        }
      );
    }

    function activeDot(index) {
      $('.nav-sections__circle').removeClass('active').eq(index).addClass('active');
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

    function fullScreen() {
      const divUp = document.querySelector('.up');

      if (document.body.clientWidth < 480) {
        if (sectionHero.classList.contains('active')) {
          cancelFullScreen.call(document);
          divUp.style.display = 'none';
        } else {
          requestFullScreen.call(document.body);
          divUp.style.display = 'block';
        }
      }
    }

    var inscroll = false;

    containerScroll.on('wheel', function (e) {
      e.preventDefault();

      var sectionAct = section.filter('.active'),
        nextSection = sectionAct.next(),
        prevSection = sectionAct.prev(),
        indexSection, posSection;

      function scrollWheel(indexSection, posSection) {
        sliderContainer.animate({
            'bottom': indexSection * 100 + 'vh'
          }, 700,
          function () {
            sectionAct.removeClass('active');
            posSection
            colorDot(indexSection);
          }
        );
      }
      if (inscroll === false) {
        inscroll = true;
        if (e.originalEvent.deltaY > 0) {
          if (nextSection.length) {
            indexSection = nextSection.index();
            posSection = nextSection.addClass('active');
          } else {
            indexSection = section.first().index();
            posSection = section.first().addClass('active');
          }
          scrollWheel(indexSection, posSection);
          activeDot(indexSection);
        } else {
          if (prevSection.length) {
            indexSection = prevSection.index();
            posSection = prevSection.addClass('active');
          } else {
            indexSection = section.last().index();
            posSection = section.last().addClass('active');
          }
          scrollWheel(indexSection, posSection);
          activeDot(indexSection);
        }
        setTimeout(() => {
          inscroll = false;
        }, 1500); // Время на откат события wheel
      }

    });

    $('[data-skroll]').on('click', function (e) {
      e.preventDefault();
      const indexLink = $(this).attr('data-skroll');
      section.removeClass('active');
      const posActiv = $('.section').eq(indexLink).addClass('active');
      scroll(indexLink, posActiv);
      activeDot(indexLink);
      colorDot(indexLink);
      fullScreen();
    });

    function touchAndKey(keyCode, direction) {
      let imitationClick = $('.nav-sections__circle').filter('.active');

      if (keyCode == 40 || direction == 'up') {
        imitationClick.next().click();
      }
  
      if (keyCode == 38 || direction == 'down') {
        imitationClick.prev().click();
      }
    }
    
    var requestFullScreen = document.body.requestFullscreen || document.body.mozRequestFullScreen || document.body.webkitRequestFullScreen || document.body.msRequestFullscreen;
    var cancelFullScreen = document.exitFullscreen || document.mozCancelFullScreen || document.webkitExitFullscreen || document.msExitFullscreen;
    var md = new MobileDetect(window.navigator.userAgent);
    const isMobile = md.mobile();
    const sectionHero = document.querySelector('.hero');
  
    if (isMobile) {
      $('.maincontainer').swipe({
        swipe: function (event, direction) {
          touchAndKey('', direction);
          fullScreen();
        }
      });
    }

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
  });
})();