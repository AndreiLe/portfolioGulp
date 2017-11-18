//jquery-3.2.1.js
@@include('../assets/js/jquery-3.2.1.js')
//viewportchecker.js
@@include('../assets/js/jquery.viewportchecker.js')
//blazy.min.js
@@include('../assets/js/blazy.min.js')

//common.js
;(function() {

  new Blazy();

  //smooth scroll to id
  $(function() {
    $('a[href*="#"]:not([href="#"])').click(function() {
      if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
          $('html, body').animate({
            scrollTop: target.offset().top
          }, 1000);
          return false;
        }
      }
    });
  });

  //animate by scroll
  $(function() {
    $('.animated').viewportChecker({
      classToAdd: 'visible fadeIn',
      offset: 100,
      repeat: false
    });
  });

})();