$(document).ready(function() {
  //Animacion footer
  //     $(".footer").click(function () {
  //         $(".slide").slideToggle("fast");
  //     });

  //ANIMACION SLIDER
  (function() {

    var $$ = function(selector, context) {
      var context = context || document;
      var elements = context.querySelectorAll(selector);
      return [].slice.call(elements);
    };

    function _fncSliderInit($slider, options) {
      var prefix = ".fnc-";

      var $slider = $slider;
      var $slidesCont = $slider.querySelector(prefix + "slider__slides");
      var $slides = $$(prefix + "slide", $slider);
      var $controls = $$(prefix + "nav__control", $slider);
      var $controlsBgs = $$(prefix + "nav__bg", $slider);
      var $progressAS = $$(prefix + "nav__control-progress", $slider);

      var numOfSlides = $slides.length;
      var curSlide = 1;
      var sliding = false;
      var slidingAT = +parseFloat(getComputedStyle($slidesCont)["transition-duration"]) * 1000;
      var slidingDelay = +parseFloat(getComputedStyle($slidesCont)["transition-delay"]) * 1000;

      var autoSlidingActive = false;
      var autoSlidingTO;
      var autoSlidingDelay = 5000; // default autosliding delay value
      var autoSlidingBlocked = false;

      var $activeSlide;
      var $activeControlsBg;
      var $prevControl;

      function setIDs() {
        $slides.forEach(function($slide, index) {
          $slide.classList.add("fnc-slide-" + (index + 1));
        });

        $controls.forEach(function($control, index) {
          $control.setAttribute("data-slide", index + 1);
          $control.classList.add("fnc-nav__control-" + (index + 1));
        });

        $controlsBgs.forEach(function($bg, index) {
          $bg.classList.add("fnc-nav__bg-" + (index + 1));
        });
      };

      setIDs();

      function afterSlidingHandler() {
        $slider.querySelector(".m--previous-slide").classList.remove("m--active-slide", "m--previous-slide");
        $slider.querySelector(".m--previous-nav-bg").classList.remove("m--active-nav-bg", "m--previous-nav-bg");

        $activeSlide.classList.remove("m--before-sliding");
        $activeControlsBg.classList.remove("m--nav-bg-before");
        $prevControl.classList.remove("m--prev-control");
        $prevControl.classList.add("m--reset-progress");
        var triggerLayout = $prevControl.offsetTop;
        $prevControl.classList.remove("m--reset-progress");

        sliding = false;
        var layoutTrigger = $slider.offsetTop;

        if (autoSlidingActive && !autoSlidingBlocked) {
          setAutoslidingTO();
        }
      };

      function performSliding(slideID) {
        if (sliding) return;
        sliding = true;
        window.clearTimeout(autoSlidingTO);
        curSlide = slideID;

        $prevControl = $slider.querySelector(".m--active-control");
        $prevControl.classList.remove("m--active-control");
        $prevControl.classList.add("m--prev-control");
        $slider.querySelector(prefix + "nav__control-" + slideID).classList.add("m--active-control");

        $activeSlide = $slider.querySelector(prefix + "slide-" + slideID);
        $activeControlsBg = $slider.querySelector(prefix + "nav__bg-" + slideID);

        $slider.querySelector(".m--active-slide").classList.add("m--previous-slide");
        $slider.querySelector(".m--active-nav-bg").classList.add("m--previous-nav-bg");

        $activeSlide.classList.add("m--before-sliding");
        $activeControlsBg.classList.add("m--nav-bg-before");

        var layoutTrigger = $activeSlide.offsetTop;

        $activeSlide.classList.add("m--active-slide");
        $activeControlsBg.classList.add("m--active-nav-bg");

        setTimeout(afterSlidingHandler, slidingAT + slidingDelay);
      };



      function controlClickHandler() {
        if (sliding) return;
        if (this.classList.contains("m--active-control")) return;
        if (options.blockASafterClick) {
          autoSlidingBlocked = true;
          $slider.classList.add("m--autosliding-blocked");
        }

        var slideID = +this.getAttribute("data-slide");

        performSliding(slideID);
      };

      $controls.forEach(function($control) {
        $control.addEventListener("click", controlClickHandler);
      });

      function setAutoslidingTO() {
        window.clearTimeout(autoSlidingTO);
        var delay = +options.autoSlidingDelay || autoSlidingDelay;
        curSlide++;
        if (curSlide > numOfSlides) curSlide = 1;

        autoSlidingTO = setTimeout(function() {
          performSliding(curSlide);
        }, delay);
      };

      if (options.autoSliding || +options.autoSlidingDelay > 0) {
        if (options.autoSliding === false) return;

        autoSlidingActive = true;
        setAutoslidingTO();

        $slider.classList.add("m--with-autosliding");
        var triggerLayout = $slider.offsetTop;

        var delay = +options.autoSlidingDelay || autoSlidingDelay;
        delay += slidingDelay + slidingAT;

        $progressAS.forEach(function($progress) {
          $progress.style.transition = "transform " + (delay / 1000) + "s";
        });
      }

      $slider.querySelector(".fnc-nav__control:first-child").classList.add("m--active-control");

    };

    var fncSlider = function(sliderSelector, options) {
      var $sliders = $$(sliderSelector);

      $sliders.forEach(function($slider) {
        _fncSliderInit($slider, options);
      });
    };

    window.fncSlider = fncSlider;
  }());

  /* not part of the slider scripts */

  /* Slider initialization
  options:
  autoSliding - boolean
  autoSlidingDelay - delay in ms. If audoSliding is on and no value provided, default value is 5000
  blockASafterClick - boolean. If user clicked any sliding control, autosliding won't start again
  */
  fncSlider(".example-slider", {
    autoSlidingDelay: 5000
  });

  var $demoCont = document.querySelector(".demo-cont");


  //PAUSE VIDEO ON SCROLL
  //    var myvid = $('.video-pause')[0];
  //    $(window).scroll(function () {
  //        var scroll = $(this).scrollTop();
  //        scroll > 200 ? myvid.pause() : myvid.play()
  //    })


  //ADD OPACITY ON SCROLL
//   $(window).scroll(function(event) {
//     let scroll = $(this).scrollTop();
//     let opacity = 1 - (scroll / 500);
//     if (opacity >= 0) {
//       $('.fnc-slider').css('opacity', opacity);
//     }
//   });

  //SCROLLREVELAL
  ScrollReveal().reveal('.nota', {
    delay: 375,
    duration: 500,
    //reset: true,
    distance: "60px",
    scale: 0.3,
    origin: 'bottom'
  });

  ScrollReveal().reveal('.programacion-item', {
    delay: 375,
    duration: 500,
    //reset: true,
    distance: "10px",
    scale: 0.1,
    origin: 'bottom'
  });

  ScrollReveal().reveal('.nota-hor', {
    delay: 375,
    duration: 500,
    //reset: true,
    distance: "60px",
    scale: 0.3,
    origin: 'bottom'
  });


  //PLAY VIDEO NOTA ON HOVER
  var figure = $(".contenedor-video").hover(hoverVideo, hideVideo);
  var figure2 = $(".nota").hover(hoverVideo, hideVideo);
  var figure3 = $(".nota-hor").hover(hoverVideo, hideVideo);
  var figure4 = $(".nota-interes").hover(hoverVideo, hideVideo);
  function hoverVideo(e) {
    $('video', this).get(0).play();
  }

  function hideVideo(e) {
    $('video', this).get(0).pause();
  }



  //ICON HEART
  $(".me-gusta").click(function() {
    $(this).find("i").toggleClass("fas");
  });

  $(".guardar").click(function() {
    $(this).find("i").toggleClass("fas");
  });

  //CARRUSEL TE PUEDE INTERESAR
  $('.owl-interes').owlCarousel({
    loop: true,
    margin: 15,
    nav: true,
    dots: true,
    responsive: {
      0: {
        items: 1.2
      },
      600: {
        items: 2
      },
      1000: {
        items: 3
      }
    }
  })
  $('.owl-capitulos').owlCarousel({
    loop: true,
    margin: 15,
    nav: true,
    dots: false,
    responsive: {
      0: {
        items: 1.2
      },
      600: {
        items: 2
      },
      1000: {
        items: 4
      }
    }
  })
  $('.owl-personajes').owlCarousel({
    loop: true,
    margin: 15,
    nav: true,
    responsive: {
      0: {
        items: 1.5
      },
      600: {
        items: 2
      },
      1000: {
        items: 4
      }
    }
  })

  $('.owl-promotion').owlCarousel({
    loop: true,
    margin: 15,
    nav: true,
    responsive: {
      0: {
        items: 1.5
      },
      600: {
        items: 2
      },
      1000: {
        items: 3
      }
    }
  })
  $('#slider-pomocion').owlCarousel({
    loop: true,
    center: true,
    items: 3,
    margin: 0,
    nav: true,
    touchDrag: false,
    mouseDrag: false,
    smartSpeed: 450,
    responsive: {
      0: {
        items: 1
      },
      768: {
        items: 2
      },
      1170: {
        items: 3
      }
    }
  });

  //Slider promocion home bk
  $(function moveImg() {
    var ot_img = $(".owl-item.active.center #ob_img").attr("src");
    $('.bloque-promocion').css('background-image', 'url(' + ot_img + ')');

    $('.owl-nav button').click(function() {
      moveImg();
    });
  });

  //Filtro programas
  $('.nav-item').click(function() {
    // reset active class
    $('.nav-item').removeClass("active");
    // add active class to selected
    $(this).addClass("active");
    // return needed to make function work
    return false;
  });


  $(function() {
    // create an empty variable
    var selectedClass = "";
    // call function when item is clicked
    $(".nav-item").click(function() {
      // assigns class to selected item
      selectedClass = $(this).attr("data-rel");
      // fades out all portfolio items
      $(".portfolio li").fadeOut(300);
      // fades in selected category
      $(".portfolio li." + selectedClass).delay(300).fadeIn(300);
    });
  });

});
