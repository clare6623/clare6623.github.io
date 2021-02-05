/*page animation**********************************************/
AOS.init();


/*mouse **********************************************/
var pic = document.querySelector('img');
document.addEventListener('mousemove', function (e) {
  // 1. mousemove只要我们鼠標移動1px 就會觸發這個事件
  // console.log(1);
  // 2.核心原理： 每次鼠標移動，我们都會獲得最新的鼠標坐標， 把这个x和y坐標做為圖片的top和left 值就可以移動圖片
  var x = e.pageX;
  var y = e.pageY;
  console.log('x坐標是' + x, 'y坐標是' + y);
  //3 . 千万不要忘記给left 和top 添加px 單位
  pic.style.left = x - 0 + 'px';
  pic.style.top = y - 16 + 'px';
});


/*Preloader**********************************************/
$(window).on('load', function () {

  function removePreloader() {
    var preLoader = $('.preLoader');
    preLoader.fadeOut();
  }
  setTimeout(removePreloader, 550);
});


/*Project**********************************************/

var $btns = $('.pf-btn').click(function () {
  if (this.id == 'all') {
    $('.projects-content > div').fadeIn(450);
  } else {
    var $el = $('.' + this.id).fadeIn(450);
    $('.projects-content > div').not($el).hide();
  }
  $btns.removeClass('active');
  $(this).addClass('active');
});


/*work**********************************************/

$(document).ready(function () {
  $(".work-menu li a").click(function (e) {
    e.preventDefault();
    var tab = $(this).parent().attr('data-tab'),
      $body = $('body');

    // tab user clicked
    var clicked = $(".projects").find("[data-tab='" + tab + "']");

    // clicked already active tab
    if ($(".projects").find("[data-tab='" + tab + "']").hasClass('is-active'))
      return false;

    // make current tab inactive
    $(".project-container.is-active, .work-menu li").removeClass('is-active');

    // switch to different tab
    $body.find("[data-tab='" + tab + "']").addClass('is-active');

    var desc, bgColor = '';

    switch (tab) {
      case "1":
        desc = "A collection of our latest & greatest work case studies";
        new_id = 'featured-projects';
        tab_label = 'Featured Projects';
        $bgColor = 'black';
        break;

      case "2":
        desc = "Side projects and other things we've designed for the masses";
        new_id = 'web';
        tab_label = 'Web';
        $bgColor = $('.web .gd-projects-content:first').data('color');
        break;

      case "3":
        desc = "All our work we haven't made a case study for yet";
        new_id = 'graphic';
        tab_label = 'Graphic';
        $bgColor = $('.graphic .gd-projects-content:first').data('color');
        break;

      case "4":
        desc = "From R";
        new_id = 'more';
        tab_label = 'More';
        $bgColor = $('.more .gd-projects-content:first').data('color');
    }

    // change the ID for projects div
    $('.work .projects').attr('id', new_id);
    // change h1 text
    $('.work h1').text(desc);
    // change vertical text
    $('.work-vertical-text').attr('id', new_id).find('span').text(tab_label);

    $body.removeClass(function (index, css) {
      return (css.match(/(^|\s)color-\S+/g) || []).join(' ');
    });
    $body.addClass('color-' + $bgColor);

    // scroll to top of page
    $("html, body").animate({
      scrollTop: 0
    }, 600);
  });

  // Mouse Aware 3D Tilt
  var $body = $('body'),
    $panel = $('.project-panel'),
    $pContent = $('.project-panel__content'),
    $img = $('.project-panel__img-col');

  function initTilt() {
    TweenMax.set([$pContent, $img], {
      transformStyle: "preserve-3d"
    });

    $body.mousemove(function (e) {
      tilt(e.pageX, e.pageY)
    });
  };

  function tilt(cx, cy) {
    // var sxPos = cx / $panel.width() * 100 - 100;
    // var syPos = cy / $panel.height() * 100 - 100;
    var sxPos = (cx / $body.width() * 100 - 50) * 2;
    var syPos = (cy / $body.height() * 100 - 50) * 2;
    TweenMax.to($pContent, 2, {
      rotationY: -0.05 * sxPos,
      rotationX: 0.05 * syPos,
      transformPerspective: 500,
      transformOrigin: "center center -400",
      ease: Expo.easeOut
    });
    TweenMax.to($img, 2, {
      rotationY: -0.03 * sxPos,
      rotationX: 0.03 * syPos,
      transformPerspective: 500,
      transformOrigin: "center center -200",
      ease: Expo.easeOut
    });
  }

  $body.mouseleave(function () {
    tilt($body.width() / 2, $body.height() / 2);
  })
  initTilt();

  $(window).scroll(function () {
    // selectors
    var $window = $(window),
      $body = $('body'),
      $panel = $('.case-study');

    // Change 33% earlier than scroll position so colour is there when you arrive.
    var scroll = $window.scrollTop() + ($window.height() / 3);

    $panel.each(function () {
      var $this = $(this);

      // if position is within range of this panel.
      // So position of (position of top of div &lt;= scroll position) &amp;&amp; (position of bottom of div &gt; scroll position).
      // Remember we set the scroll to 33% earlier in scroll var.
      if ($this.position().top <= scroll && $this.position().top + $this.height() > scroll) {
        // Remove all classes on body with color-
        $body.removeClass(function (index, css) {
          return (css.match(/(^|\s)color-\S+/g) || []).join(' ');
        });

        // Add class of currently active div
        $body.addClass('color-' + $(this).data('color'));
      }
    });
  }).scroll();


});

/***/ //
