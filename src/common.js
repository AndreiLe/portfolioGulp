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

  //show by scroll
  showMenuItem('.header-home', '#header-home__logo-img','header-home__logo-img--hide');

  showMenuItem('#used', '#header-home__menu-item-used','header-home__menu-item--hide');
  showMenuItem('#now', '#header-home__menu-item-now','header-home__menu-item--hide');
  showMenuItem('#todo', '#header-home__menu-item-todo','header-home__menu-item--hide');
 
  function showMenuItem(blockId, menuId, removeClass) {
    $(blockId).viewportChecker({
      offset: 200,
      repeat: true,
      callbackFunction: function(elem, action){
        if (action === 'add') {
          $(menuId).removeClass(removeClass);
        }
        if (action === 'remove') {
          $(menuId).addClass(removeClass);
        }
      },
    });
  }

})();