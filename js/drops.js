(function () {
  const drops = $('.hero__svg');

  var posX = drops.offset().left;
  var posY = drops.offset().top;

  function moveDrops(moveX, moveY) {
    var cordsX = (moveX - posX) / 100 + 'px';
    var cordsY = (moveY - posY) / 50 + 'px';
    drops.css({
      left: cordsX,
      top: cordsY
    })
  }

  if (document.body.clientWidth > 768) {
    $('.hero').mousemove(function (e) {
      var moveY = e.pageY;
      var moveX = e.pageX;
      moveDrops(moveX, moveY);
    })
  }


})();