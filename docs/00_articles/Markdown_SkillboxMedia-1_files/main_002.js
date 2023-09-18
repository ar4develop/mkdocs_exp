"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function number_format(number, decimals, dec_point, thousands_sep) {
  var i, j, kw, kd, km;

  if (isNaN(decimals = Math.abs(decimals))) {
    decimals = 2;
  }

  if (dec_point == undefined) {
    dec_point = ",";
  }

  if (thousands_sep == undefined) {
    thousands_sep = ".";
  }

  i = parseInt(number = (+number || 0).toFixed(decimals)) + "";

  if ((j = i.length) > 3) {
    j = j % 3;
  } else {
    j = 0;
  }

  km = j ? i.substr(0, j) + thousands_sep : "";
  kw = i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands_sep);
  kd = decimals ? dec_point + Math.abs(number - i).toFixed(decimals).replace(/-/, 0).slice(2) : "";
  return km + kw + kd;
}

$(function () {
  !function () {
    function initializeMap() {
      var WINDOW_WIDTH = $(window).width(),
          map = $('.js-map'),
          pin = map.data('pin');
      map.each(function () {
        var modalMapOffset = 0,
            contactMapOffset = 0;

        if ($(this).attr('data-modal-map') == 'true') {
          if ($(window).width() >= 768) {
            modalMapOffset = 0.0015;
          } else {
            modalMapOffset = 0.0010;
          }
        }

        if ($('.contact__map').length) {
          if ($(window).width() >= 1201) {
            contactMapOffset = -0.0045;
          }
        }

        var map,
            loc = $(this).data('location').split(','),
            position = new google.maps.LatLng(loc[0], loc[1]),
            mapOptions = {
          center: new google.maps.LatLng(loc[0] - modalMapOffset, loc[1] - contactMapOffset),
          zoom: 17,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          mapTypeControlOptions: {},
          disableDefaultUI: true,
          scrollwheel: false,
          rotateControl: false,
          styles: [{
            featureType: "all",
            elementType: "all",
            stylers: [{
              saturation: -100
            }, {
              gamma: 1
            }]
          }]
        };
        map = new google.maps.Map($(this).get(0), mapOptions);
        map.setTilt(45);
        var marker = new google.maps.Marker({
          position: position,
          map: map,
          title: '',
          animation: google.maps.Animation.DROP,
          icon: {
            url: pin,
            scaledSize: new google.maps.Size(36, 48)
          }
        });
        map.setOptions({
          draggable: WINDOW_WIDTH > 767
        });
        var zoomInButton = $('.js-mapZoomPlus');
        var zoomOutButton = $('.js-mapZoomMinus');
        zoomInButton.on('click', function () {
          map.setZoom(map.getZoom() + 1);
        });
        zoomOutButton.on('click', function () {
          map.setZoom(map.getZoom() - 1);
        });
      });
    }

    if ($('body').find('.js-map').length) {
      google.maps.event.addDomListener(window, 'load', initializeMap);
    }
    /** Карта на главной */


    var boxCaseAddress = $('.main-box-case__address');

    if (boxCaseAddress.length) {
      boxCaseAddress.magnificPopup({
        type: 'inline',
        closeBtnInside: true,
        callbacks: {
          open: function open() {
            initializeMap();
          }
        }
      });
    }
  }();
  $(document).on('load', function () {
    $.removeCookie('politics_cookie', null);
  });

  if ($.cookie('politics_cookie') == null) {
    $('.b-cookie').addClass('b-cookie-visible'); //alert("Кука не была установлена!");
  } else {
    $('.b-cookie').removeClass('b-cookie-visible'); //alert("Кука была установлена!");
  }

  $('.js-cookie-close').on('click', function (e) {
    e.preventDefault();
    $.cookie("politics_cookie", 1, {
      expires: 90,
      path: '/'
    });

    if ($.cookie('politics_cookie') == null) {
      $('.b-cookie').addClass('b-cookie-visible'); //alert("Кука не была установлена!");
    } else {
      $('.b-cookie').removeClass('b-cookie-visible'); //alert("Кука была установлена!");
    }
  });
  $(document).on('click', '.js-controlView', function () {
    var _this = $(this);

    viewClass = _this.data('view-class'), wrap = _this.parents('.js-courseGroup').find('.js-courseWrap');

    _this.addClass('is-active').siblings().removeClass('is-active');

    wrap.removeClass('is-tile-view is-list-view').addClass(viewClass);
  });
  var eventCalendarSwiper = new Swiper('.js-eventCalendarSwiper', {
    slidesPerView: 'auto',
    nextButton: '.js-eventCalendarSwiperNext',
    prevButton: '.js-eventCalendarSwiperPrev'
  });
  $(document).on('click', '.js-checkboxSwitchLabel', function () {
    var _this = $(this);

    var parent = _this.parent();

    var checkboxInput = parent.find('.js-checkboxSwitchInput');

    var checkedStatus = _this.attr('data-checked');

    if (checkedStatus === 'true') {
      checkboxInput.val(1);
      parent.addClass('is-state-checked');
    }

    if (checkedStatus === 'false') {
      checkboxInput.val('');
      parent.removeClass('is-state-checked');
    }
  });
  $(document).on('click', '.js-checkboxSwitchSlider', function () {
    var _this = $(this);

    var parent = _this.parent();

    var checkboxInput = parent.find('.js-checkboxSwitchInput');
    parent.toggleClass('is-state-checked');

    if (parent.hasClass('is-state-checked')) {
      checkboxInput.val(1);
    } else {
      checkboxInput.val(0);
    }
  });
  $.extend(true, $.magnificPopup.defaults, {
    tClose: 'Закрыть (Esc)',
    tLoading: 'Загружается...',
    gallery: {
      tPrev: 'Предыдущая (←)',
      tNext: 'Следующая (→)',
      tCounter: '%curr% из %total%'
    },
    image: {
      tError: '<a href="%url%">Данная картинка</a> не может быть загружена.'
    },
    ajax: {
      tError: '<a href="%url%">Содержимое</a> не может быть загружено.'
    },
    closeMarkup: '<div class="modal-close js-mfp-close"></div>',
    removalDelay: 300,
    closeBtnInside: true
  });
  $(document).on('click', '.js-modalLink', function (event) {
    event.preventDefault();
    var src = $(this).data('mfp-src'),
        type = $(this).data('mfp-ajax') || 'inline';
    $.magnificPopup.open({
      items: {
        src: src,
        type: type
      },
      closeBtnInside: true,
      callbacks: {
        open: function open() {
          $('body').addClass('mfp-open');
        },
        close: function close() {
          $('body').removeClass('mfp-open');
        }
      }
    });
  });
  $(document).on('click', '.js-modalVideoLink', function (e) {
    e.preventDefault();
    var item = $(this);
    var src = item.attr('data-mfp-src') || item.attr('href');
    $.magnificPopup.open({
      items: {
        src: src
      },
      type: 'iframe',
      iframe: {
        markup: '<div class="mfp-iframe-scaler">' + '<div class="mfp-close"></div>' + '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>' + '</div>',
        patterns: {
          youtube: {
            index: 'youtube.com/',
            id: 'v=',
            src: '//www.youtube.com/embed/%id%?rel=0&autoplay=1'
          }
        },
        srcAction: 'iframe_src'
      }
    });
  });
  $(document).on('click', '.js-mfp-close', function () {
    $.magnificPopup.close();
  });
  new Swiper('.js-tabNavSwiper', {
    slidesPerView: 'auto',
    freeMode: true,
    simulateTouch: true,
    breakpoints: {
      10000: {
        spaceBetween: 48,
        slidesOffsetAfter: 0,
        slidesOffsetBefore: 0
      },
      1200: {
        spaceBetween: 30,
        slidesOffsetAfter: 30,
        slidesOffsetBefore: 30
      }
    }
  });
  $(document).on('click', '.js-tabNavLink', function (event) {
    event.preventDefault();

    var _this = $(this),
        parent = _this.parents('.js-tab'),
        content = $('' + _this.attr('href') + '');

    parent.find('.js-tabNavLink').parent().removeClass('is-active');

    _this.parent().addClass('is-active');

    content.show().siblings().hide();
  });
  !function () {
    window.fileProcess = function () {
      var fileBox = $('.js-fileAddBox');
      var fileInput = $('.js-fileInput');
      var fileBoxTitle = $('.js-fileTitle');
      var fileButtonRemove = $('.js-fileRemove');
      fileInput.on('change', function (event) {
        fileBox.addClass('is-attached');
        fileBoxTitle.text(event.target.files[0].name);
      });
      fileButtonRemove.on('click', function () {
        fileInput.val('');
        fileBox.removeClass('is-attached');
      });
    };

    fileProcess();
  }();
  !function () {
    $.extend($.validator.messages, {
      required: "Это поле необходимо заполнить.",
      remote: "Пожалуйста, введите правильное значение.",
      email: "Введите корректный email.",
      url: "Пожалуйста, введите корректный URL.",
      date: "Пожалуйста, введите корректную дату.",
      dateISO: "Пожалуйста, введите корректную дату в формате ISO.",
      number: "Пожалуйста, введите число.",
      digits: "Пожалуйста, вводите только цифры.",
      creditcard: "Пожалуйста, введите правильный номер кредитной карты.",
      equalTo: "Пожалуйста, введите такое же значение ещё раз.",
      extension: "Пожалуйста, выберите файл с правильным расширением.",
      maxlength: $.validator.format("Пожалуйста, введите не больше {0} символов."),
      minlength: $.validator.format("Пожалуйста, введите не меньше {0} символов."),
      rangelength: $.validator.format("Пожалуйста, введите значение длиной от {0} до {1} символов."),
      range: $.validator.format("Пожалуйста, введите число от {0} до {1}."),
      max: $.validator.format("Пожалуйста, введите число, меньшее или равное {0}."),
      min: $.validator.format("Пожалуйста, введите число, большее или равное {0}.")
    });
    var form = $('.js-validate');
    form.each(function () {
      $(this).validate({
        rules: {
          EMAIL: {
            required: true,
            email: true
          },
          user_agreement: {
            required: true
          }
        },
        messages: {
          user_agreement: {
            required: "Пожалуйста, подтвердите согласие на обработку персональных данных."
          }
        },
        errorElement: 'span',
        errorClass: 'error-label',
        errorPlacement: function errorPlacement(error, element) {},
        highlight: function highlight(element) {
          $(element).parent().addClass('is-error');
        },
        unhighlight: function unhighlight(element) {
          $(element).parent().removeClass('is-error');
        }
      });
    });
    $.validator.addMethod('phonecustom', function (value, element) {
      return value.match(/^\+7\s\([0-9]{3}\)\s[0-9]{3}\-[0-9]{2}\-[0-9]{2}$/);
    }, 'Пожалуйста, введите корректный телефон.');
    $.validator.addClassRules('js-phone', {
      phonecustom: true
    });
  }(); // Маска ввода телефона

  if ($('.js-phone').length) {
    $('.js-phone').mask('?+7 (999) 999-99-99');
  }

  $(document).on('click', '.js-showMoreButton', function () {
    $('[data-hidden-block="' + $(this).data('hidden-src') + '"]').removeClass('hidden_block');
    $(this).hide();
  });
  $(document).on('click', '.js-scrollTo', function () {
    var scrollTo = $('' + $(this).data('scroll-to') + '').offset().top;
    $('body, html').animate({
      scrollTop: scrollTo
    }, 1000);
    return false;
  });
  $(document).on('click', 'a[href^="#"]', function () {
    var _this2 = this;

    if ($('.universal-notice').length > 0) {
      var bannerHeight = $('.universal-notice').height() + 10;
      setTimeout(function () {
        $('html, body').animate({
          scrollTop: $($.attr(_this2, 'href')).offset().top - bannerHeight
        }, 0);
      }, 100);
    }
  });
  !function () {
    var isotopeOptions = {
      itemSelector: '.js-isotopeGridElem',
      masonry: {// columnWidth: 25,
        // gutter: 15
      },
      percentPosition: true
    };
    var isotopeGrid = $('.js-isotopeGrid').isotope(isotopeOptions);
    $(window).on('resize', function () {
      isotopeResize();
    });
    isotopeResize();

    function isotopeResize() {
      if ($(window).width() <= 1200) {
        isotopeGrid.isotope('shuffle');
      }

      if ($(window).width() <= 767) {
        isotopeGrid.isotope('destroy');
      } else {
        isotopeGrid.isotope(isotopeOptions);
      }
    }
  }();

  if ($('.js-sliderArticle').length) {
    var flky = new Flickity('.js-sliderArticle', {
      lazyLoad: false,
      percentPosition: true,
      prevNextButtons: false,
      pageDots: false,
      wrapAround: true,
      // adaptiveHeight: true,
      cellAlign: 'left',
      contain: true
    });
    $('.mod--prev').on('click', function (e) {
      e.preventDefault();
      $('.js-sliderArticle').flickity().flickity('previous');
    });
    $('.mod--next').on('click', function (e) {
      e.preventDefault();
      $('.js-sliderArticle').flickity().flickity('next');
    });
  }

  new Swiper('.js-sliderPartnerSwiper .swiper-container', {
    slidesPerView: 1,
    spaceBetween: 30,
    nextButton: '.js-sliderPartnerSwiperNext',
    prevButton: '.js-sliderPartnerSwiperPrev'
  });

  if ($('#staticticsSkillbox').length) {
    var init = function init(data, opt) {
      chart = new Chart(ctx).Line(data, opt);
    };

    var changeLabels = function changeLabels() {
      var widthScrenn = $(window).width();

      if (widthScrenn < 768) {
        staticticsData.labels = labelsMobile;
        init(staticticsData, optionsMobile);
      } else if (widthScrenn < 992) {
        staticticsData.labels = labelsTablet;
        init(staticticsData, options);
      } else {
        staticticsData.labels = labelsDesktop;
        init(staticticsData, options);
      }
    };

    var ctx = document.getElementById('staticticsSkillbox').getContext('2d');
    var chart;
    var labelsDesktop = ["январь 2018", "февраль", "март", "апрель", "май", "июнь", "июль", "август", "сентябрь", "октябрь", "ноябрь", "декабрь 2018"];
    var labelsTablet = ["август", " ", "октябрь", " ", "декабрь", " ", "февраль", " ", "апрель", " ", "июнь", " "];
    var labelsMobile = ["январь", " ", " ", " ", " ", "июнь", " ", " ", " ", " ", " ", "декабрь"];
    var gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(170, 56, 250, 0.5)');
    gradient.addColorStop(1, 'rgba(59, 59, 255, 0.5)');
    var staticticsData = {
      labels: labelsDesktop,
      datasets: [{
        fillColor: gradient,
        strokeColor: 'rgba(170, 56, 250, 0)',
        pointColor: "#4F3BFE",
        pointStrokeColor: "#fff",
        data: []
      }]
    };
    var options = {
      scaleFontSize: 15,
      scaleFontColor: '#657195',
      scaleLineColor: '#F1F2F6',
      scaleFontFamily: "'Roboto', sans-serif",
      scaleFontStyle: "300",
      scaleLabel: function scaleLabel(value) {
        return number_format(value.value, ' ', ' ', ' ') + '    ';
      },
      responsive: true,
      pointDotRadius: 6,
      pointDotStrokeWidth: 4,
      tooltipTemplate: "<%= value %>",
      customTooltips: function customTooltips(tooltip) {
        var tooltipEl = $('.js-tooltipChart');
        var tooltipElValue = $('.js-tooltipNumber');

        if (!tooltip) {
          tooltipEl.addClass('is-show');
          return;
        }

        tooltipElValue.text(number_format(tooltip.text, ' ', ' ', ' '));
        tooltipEl.css({
          left: tooltip.x + 'px',
          top: tooltip.y + 'px'
        });
      }
    };
    var optionsMobile = {
      scaleFontSize: 13,
      scaleFontColor: '#657195',
      scaleLineColor: '#F1F2F6',
      scaleFontFamily: "'Roboto', sans-serif",
      scaleFontStyle: "300",
      scaleLabel: function scaleLabel(value) {
        return number_format(value.value, ' ', ' ', ' ') + '    ';
      },
      responsive: true,
      pointDotRadius: 3,
      pointDotStrokeWidth: 2,
      tooltipTemplate: "<%= value %>",
      customTooltips: function customTooltips(tooltip) {
        var tooltipEl = $('.js-tooltipChart');
        var tooltipElValue = $('.js-tooltipNumber');

        if (!tooltip) {
          tooltipEl.addClass('is-show');
          return;
        }

        tooltipElValue.text(number_format(tooltip.text, ' ', ' ', ' '));
        tooltipEl.css({
          left: tooltip.x + 'px',
          top: tooltip.y + 'px'
        });
      }
    };
    $(window).on('resize', function () {
      chart.destroy();
      changeLabels();
    });
    $(document).on('mouseleave', '.page-section__statictics', function () {
      $('.js-tooltipChart').removeClass('is-show');
    });
  }

  if ($('.sticky-content').length) {
    $('.sticky-content').stickyBlock({
      additionalMarginTop: 90
    });
  }

  $(document).on('click', '.js-landingProgramToggle', function () {
    var _this = $(this),
        dropdown = _this.parent().find('.landing-program__dropdown');

    _this.toggleClass('is-open');

    dropdown.slideToggle(200);
  });
  var caseSwiper = new Swiper('.js-caseSwiper .swiper-container', {
    slidesPerView: 'auto',
    breakpoints: {
      10000: {
        spaceBetween: 25,
        slidesOffsetAfter: 0,
        slidesOffsetBefore: 0,
        simulateTouch: false
      },
      767: {
        spaceBetween: 0,
        slidesOffsetAfter: 0,
        slidesOffsetBefore: 0
      }
    }
  });
  $(document).on('click', '.js-landingBurgerMenu', function () {
    $('.js-landingMenu').toggleClass('is-open');
  }).on('click', '.js-landingMenuClose', function () {
    $('.js-landingMenu').removeClass('is-open');
  }).on('click', '.js-scrollNav a', function () {
    $('.js-landingMenu').removeClass('is-open');
  }).on('click', function (e) {
    if (!$('.js-landingMenu').is(e.target) && $('.js-landingMenu').has(e.target).length === 0 && !$('.js-landingBurgerMenu').is(e.target) && $('.js-landingBurgerMenu').has(e.target).length === 0) {
      $('.js-landingMenu').removeClass('is-open');
    }
  });
  $('.js-scrollNav').onePageNav({
    currentClass: 'is-active',
    changeHash: false,
    offsetNum: $('.js-scrollNav').data('offset') || $(window).width() <= 767 ? -70 : -60,
    scrollSpeed: 750,
    scrollThreshold: 0.5,
    filter: ':not(.external)',
    easing: 'swing',
    begin: function begin() {},
    end: function end() {},
    scrollChange: function scrollChange($currentListItem) {}
  });
  !function () {
    $(window).on('scroll', function () {
      landingHeaderScroll();
    });

    function landingHeaderScroll() {
      var scrolled = $(window).scrollTop();
      var header = $('.landing-header');

      if (scrolled >= 1) {
        header.addClass('is-sticky');
      } else {
        header.removeClass('is-sticky');
      }
    }

    landingHeaderScroll();
  }();
  $(document).on('click', '.js-landingAccordionToggle', function () {
    var _this = $(this),
        dropdown = _this.parent().find('.landing-accordion__dropdown');

    _this.toggleClass('is-open');

    dropdown.slideToggle(200);
  });
  $(document).on('click', '.js-reviewMoreLink', function (event) {
    event.preventDefault();
    $(this).parent().hide();
    $('.js-reviewContent').addClass('is-open');
  });
  $(document).on('click', '.js-reviewTextShowLink', function (event) {
    event.preventDefault();

    var _this = $(this),
        content = $('.js-reviewTextContent'),
        label = _this.data('label'),
        secondLabel = _this.data('second-label');

    if (_this.hasClass('is-active')) {
      _this.removeClass('is-active').find('.load-button__text').text(label);

      content.hide();
    } else {
      _this.addClass('is-active').find('.load-button__text').text(secondLabel);

      content.show();
    }
  });
  /**
   * Swiper
   */

  !function () {
    window.nawSwiper = {};
    /**
     * Page example: /media/topic/articles/management/
     * @returns {*}
     */

    window.nawSwiper.pageNavSwiper = function () {
      var area = $('.js-pageNavSwiper');

      if (area.length) {
        var item = new Swiper(area, {
          slidesPerView: 'auto',
          freeMode: true,
          simulateTouch: true,
          breakpoints: {
            10000: {
              spaceBetween: 25,
              slidesOffsetAfter: 0,
              slidesOffsetBefore: 0
            },
            1200: {
              spaceBetween: 30,
              slidesOffsetAfter: 30,
              slidesOffsetBefore: 30
            }
          }
        });
        /** Перекидываем на активный слайд */

        item && item.slideTo(item.wrapper.find('.is-active').closest('.swiper-slide').index(), 0);
        return item;
      }
    };
    /**
     *
     * @returns {*}
     */


    window.nawSwiper.sliderBlockSwiper = function () {
      var area = $('.js-sliderBlockSwiperMedia .swiper-container');

      if (area.length) {
        var item = new Swiper(area, {
          slidesPerView: 1,
          spaceBetween: 0,
          nextButton: '.js-sliderBlockSwiperNext',
          prevButton: '.js-sliderBlockSwiperPrev',
          onSlideChangeStart: function onSlideChangeStart(swiper) {
            var active = swiper.realIndex + 1;
            $('.js-sliderBlockSwiperActive').text(active);
          },
          breakpoints: {
            10000: {
              autoWidth: true,
              autoHeight: false
            },
            767: {
              autoWidth: true,
              autoHeight: true
            }
          }
        });
        return item;
      }
    };
  }();
  /**
   * Инициализируем Swiper-ы
   */

  $.each(window.nawSwiper, function (key, cb) {
    window.nawSwiper[key].call(window.nawSwiper);
  });
  !function () {
    function getMaxOfArray(numArray) {
      return Math.max.apply(null, numArray);
    }

    function tableRow(tr, th, col) {
      var mas = [];
      tr.each(function () {
        mas = [];
        var index = $(this).index();

        for (var i = 0; i < col; i++) {
          mas[i] = $('.elem-table-col').eq(i).find('.elem-table-body-tr').eq(index).height();
        }

        var hh = getMaxOfArray(mas);

        for (var i = 0; i < col; i++) {
          $('.elem-table-col').eq(i).find('.elem-table-body-tr').eq(index).height(hh);
        }
      });
      th.each(function () {
        mas = [];
        var index = $(this).index();

        for (var i = 0; i < col; i++) {
          mas[i] = $('.elem-table-col').eq(i).find('.elem-table-head-tr').eq(index).height();
        }

        var hh = getMaxOfArray(mas);

        for (var i = 0; i < col; i++) {
          $('.elem-table-col').eq(i).find('.elem-table-head-tr').eq(index).height(hh);
        }
      });
    }

    function resizeRow() {
      var ww = $(window).width();
      $('.elem-table-head-tr').removeAttr('style');
      $('.elem-table-body-tr').removeAttr('style');

      if (ww > 767) {
        $('.elem-table--col').each(function () {
          var tr = $(this).find('.elem-table-col:first-child .elem-table-body-tr');
          var th = $(this).find('.elem-table-col:first-child .elem-table-head-tr');
          var col = $(this).find('.elem-table-col').length;
          tableRow(tr, th, col);
        });
      } else {
        $('.elem-table-head-tr').removeAttr('style');
        $('.elem-table-body-tr').removeAttr('style');
      }
    }

    resizeRow();
    $('[js-open-row]').click(function () {
      $(this).parents('.elem-table-body-tr').toggleClass('open');
    });
    $('[js-open-col]').click(function () {
      $(this).parent().find('.elem-table-body').toggleClass('open');
      $(this).toggleClass('open');
    });
    $('.elem-table').each(function () {
      var el = $(this);
      var td = el.find('.elem-table-body-td');
      td.each(function () {
        var index = $(this).index();
        var name = el.find('.elem-table-head').find('.elem-table-head-td').eq(index).find('p').text();
        $(this).attr('data-title', name);
      });
    });
    $('.elem-table-head-tr, .elem-table-body-tr p').find('p').keyup(function () {
      var tr = $(this).parents('.elem-table-body-tr');
      var th = $(this).parents('.elem-table-head-tr');
      var col = $(this).parents('.elem-table--col').find('.elem-table-col').length;
      tableRow(tr, th, col);
    });
    $(window).resize(function () {
      resizeRow();
    });
    $(document).on("click", ".js-modalVideoLink", function (evt) {
      evt.preventDefault();
      var item = $(this);
      var src = item.attr('data-mfp-src') || item.attr('href');
      $.magnificPopup.open({
        items: {
          src: src
        },
        type: "iframe",
        iframe: {
          markup: '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe></div>',
          patterns: {
            youtube: {
              index: "youtube.com/",
              id: "v=",
              src: "//www.youtube.com/embed/%id%?rel=0&autoplay=1"
            }
          },
          srcAction: "iframe_src"
        }
      });
    });
  }();
  !function () {
    var indexMediaTitle = "Skillbox Media — журнал для профессионалов. Актуальные статьи про бизнес, дизайн, образование, разработку игр и программирование.";
    var shareLinks = [{
      url: "https://vk.com/share.php?&url=",
      dataCode: "vk"
    }, {
      url: "https://www.facebook.com/sharer/sharer.php?u=",
      dataCode: "fb"
    }, {
      url: "https://twitter.com/share?url=",
      dataCode: "tw"
    }, {
      url: "https://t.me/share/url?url=",
      dataCode: "tg"
    }];
    var doc = $(document);
    var xhr = xhr || {};
    var regex = /\/topic\/[a-zA-Z0-9\-\_]+\/$/g;
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    var refreshPopupData = function refreshPopupData(node) {
      var newNode = $(node).find("#popup__data--formatted");
      var docHead = document.getElementsByTagName("head")[0];
      var newScript = document.createElement("script");
      var newAction = $(node).find("[data-action]").data("action");
      $(".subscribe-popup .newsletter-form").attr("action", newAction);
      newScript.setAttribute("type", "text/javascript");
      newScript.setAttribute("id", "popup__data--formatted");
      newScript.innerHTML = newNode.text();
      $("#popup__data--formatted").remove();
      node.remove();
      docHead.appendChild(newScript);
    };

    var initTagsSlide = function initTagsSlide() {
      var destroy = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var tags = $(".js-media-formats .tags");

      if (tags.length) {
        var slick = tags;

        if (destroy && slick.hasClass("slick-initialized")) {
          slick.slick("unslick");
        }

        if (!destroy) {
          slick.not('.slick-initialized').slick({
            infinite: false,
            variableWidth: true,
            swipeToSlide: true
          });
          slideIndex = tags.find(".active-tag").closest(".slick-slide").data('slick-index');
          var slideLength = $(".tags .slick-slide").length;
          var countSlideByPageSize = Math.floor($(window).width() / 100);

          if (slideLength - slideIndex < countSlideByPageSize) {
            slideIndex = slideLength - countSlideByPageSize;
          }

          slick.slick('slickGoTo', slideIndex);
        }
      }
    };

    var popupDetect = function popupDetect(target) {
      var dataViewed = 'viewed';

      if (target.length && target.data('viewed') !== true) {
        var windowTop = $(window).scrollTop();
        var windowHeight = $(window).height();
        var targetHeight = $(target).height();
        var targetTop = $(target).offset().top;
        var isDetect = false;

        if (targetTop >= windowTop && targetTop + targetHeight <= windowHeight + windowTop) {
          isDetect = true;
        }

        if (isDetect && window.popupData.code) {
          target.data(dataViewed, true);
          var $banner = target;
          document.dispatchEvent(new CustomEvent('sectionPopup', {
            detail: {
              event: 'show',
              code: window.popupData.code
            }
          }));
        }
      }
    };

    $(window).scroll(function () {
      popupDetect($(".newsletter"));
    });

    var bannerScrollDetect = function bannerScrollDetect(target) {
      var dataViewed = 'viewed';

      if (target.length && target.data('viewed') !== true) {
        var windowTop = $(window).scrollTop();
        var windowHeight = $(window).height();
        var targetHeight = $(target).height();
        var targetTop = $(target).offset().top;
        var isDetect = false;

        if (targetTop >= windowTop && targetTop + targetHeight <= windowHeight + windowTop) {
          isDetect = true;
        }

        if (isDetect) {
          target.data(dataViewed, true);
          var $banner = target;
          document.dispatchEvent(new CustomEvent('articleAdvertBanner', {
            detail: {
              event: 'show',
              id: $banner.data('banner'),
              sourceId: $banner.data('source'),
              format: $banner.data('format')
            }
          }));
        }
      }
    };

    $(window).scroll(function () {
      $('[data-banner]').each(function () {
        bannerScrollDetect($(this));
      });
    });
    doc.ready(function () {
      if (window.innerWidth < 768) {
        initTagsSlide();
      }

      var text = '';
      $("#menu .menu-nav__link").css("display", "block");

      if (window.innerWidth > 1023) {
        text = $('.articles-block').find('.tab-active').text().trim();

        if ($(".article-preview__tag").length) {
          text = $(".article-preview__tag a").first().text();
        }
      } else {
        text = $('.menu-block').find('.tab-active').text().trim();

        if ($(".article-mobile__tag").length) {
          text = $(".article-mobile__tag a").first().text();
        }
      }

      if (!text) {
        text = $(".article-preview-info__tag a").first().text().trim();
      }

      if (text === "Все" || text.trim().length === 0) {
        $(".js-category").addClass("hidden");

        if (window.location.href.match(regex) == null) {
          $(".js-media-formats").hide();
        }
      } else {
        if (text === "Образование") {
          text = text + " 4.0";
        }

        $(".js-category").removeClass("hidden").text(text);
        $(".js-media-formats").show();
      }

      typeof window.showSideBanner === 'function' && window.showSideBanner();
      typeof window.hideFacebook === 'function' && window.hideFacebook();
    });
    doc.on('click', '.subscribe__checkbox label', function () {
      $(this).closest(".subscribe__checkboxes").find("input[type='checkbox']").removeClass("invalid");
    });
    doc.on('click', '.popup-btn-click, .newsletter-form__btn', function (e) {
      var input = $(this).closest(".subscribe__email").find(".subscribe-form__input");
      var inputValue = input.val();

      if (!emailPattern.test(inputValue)) {
        $(this).siblings(".subscribe-form__input").css('border', 1 + 'px solid #FF5733');
        $(this).siblings(".email__error");
      }
    });
    doc.on("input", ".subscribe-form__input", function () {
      if (emailPattern.test($(this).val()) || $(this).val().trim() === "") {
        $(this).removeAttr('style').removeClass('invalid').siblings(".email__error, .error");
        $(this).closest(".newsletter-form__input-wrap, .subscribe__email").removeClass("is-error");
      }
    });
    /**
     * Переключает табы (top) (для оставшихся страниц)
     */

    doc.on('click', '.js-article-list-section-link', function (e) {
      e.preventDefault();
      var item = $(this);
      var href = item.attr('href');
      var parent = item.parent();
      var area = $('#js-article-list-section-wrapper');
      var subscribe = item.attr('data-subscribe-text');
      var fbTitle = $('#js-page-feedback-title');
      var newTitle = item.attr('data-title');

      if (href && parent.hasClass('is-active')) {
        return;
      }

      item.parents().addClass('is-active').parents('.swiper-slide').siblings().find('.page-nav__item').removeClass('is-active');
      area.find('.page-media__articles').removeClass('opened right').addClass('close left').before(function () {
        $(this).addClass('right');
      });
      xhr['tab'] && xhr['tab'].readyState !== 4 && xhr['tab'].abort();
      xhr['tab'] = $.ajax({
        url: href,
        type: 'POST',
        data: {
          AJAX: 'Y'
        },
        success: function success(data) {
          //console.log('>> Tab change [response]: ', data);
          area.html(data);
          history.replaceState("", "", href);
          window.nawSwiper.pageNavSwiper();
          window.nawSwiper.sliderBlockSwiper();
          area.find('.page-media__articles').removeClass('close left').addClass('opened left');
          subscribe && fbTitle.html(subscribe);
          $('title').text(newTitle);
        }
      });
      return false;
    });
    doc.on('click', '.js-article-show-more.btn-load-more--href', function (e) {
      e.preventDefault();

      var _this = $(this);

      if (_this.attr('disabled')) {
        return false;
      }

      var href = _this.attr('href');

      var body = $(document.body);

      var currentNavButton = _this.find('.btn-load-more');

      if (href) {
        $.ajax({
          url: href,
          type: 'POST',
          data: {
            AJAX: 'Y',
            LOAD_ARTICLE: 'Y',
            LOAD_MORE: 'Y'
          },
          beforeSend: function beforeSend() {
            _this.attr('disabled', 'disabled');

            currentNavButton.addClass('loading');
          },
          success: function success(data) {
            _this.parent().remove();

            var jqData = $(data);
            var parse = $.parseHTML(data);
            parse && parse.forEach(function (item, key) {
              if (item && (item.tagName === 'STYLE' || item.tagName === 'SCRIPT')) {
                body.append(item);
              }
            });
            jqData.insertBefore('#js-article-show-more-wrapper');
            history.replaceState(null, null, href);
          }
        });
      }

      return false;
    });
    /**
     * Загрузить еще для разделов и теговых
     */

    doc.on('click', '.js-article-show-more', function (e) {
      e.preventDefault();

      var _this = $(this);

      if (_this.attr('disabled')) {
        return false;
      }

      var body = $(document.body);

      var currentNavButton = _this.find('.btn-load-more');

      $.ajax({
        url: '/local/ajax/getArticlesIndex.php',
        type: 'POST',
        data: {
          params: _this.data('params')
        },
        beforeSend: function beforeSend() {
          _this.attr('disabled', 'disabled');

          currentNavButton.addClass('loading');
        },
        success: function success(data) {
          if (data.status !== 'ok') {
            return false;
          }

          _this.parent().remove();

          var jqData = $(data.html);
          var parse = $.parseHTML(data.html);
          parse && parse.forEach(function (item, key) {
            if (item && (item.tagName === 'STYLE' || item.tagName === 'SCRIPT')) {
              body.append(item);
            }
          });
          jqData.insertBefore('#js-article-show-more-wrapper');
          history.replaceState(null, null, href);
        }
      });
      return false;
    });
    /**
     * Шаринг для новых статей
     */

    window.addEventListener('scroll', sharingScroll, false);
    document.body.addEventListener('scroll', sharingScroll, false);

    function sharingScroll() {
      var sharingBlock = $('.social-list-footer'),
          sharringOffset = sharingBlock.offset(),
          articleOffset = $('.article__content').offset();

      if (sharingBlock.hasClass('social-list-fixed') && sharringOffset.top <= articleOffset.top) {
        sharingBlock.removeClass('social-list-fixed').addClass('social-list-stream');
      }

      if (sharingBlock.hasClass('social-list-stream') && sharringOffset.top > articleOffset.top) {
        sharingBlock.removeClass('social-list-stream').addClass('social-list-fixed');
      }
    }

    window.addEventListener('resize', manipulateTagsSlider, false);
    document.body.addEventListener('resize', manipulateTagsSlider, false);

    function manipulateTagsSlider() {
      if (window.innerWidth >= 768) {
        initTagsSlide(true);
      } else {
        initTagsSlide();
      }
    }
    /**
     * Загрузить ещё статьи для главной
     */


    doc.on('click', '.btn-load-more-wrap--articles', function () {
      var _this = $(this);

      if (_this.attr('disabled')) {
        return false;
      }

      var currentNav = $('.btn-load-more-wrap--articles');
      var currentNavButton = currentNav.find('.btn-load-more');

      _this.attr('disabled', 'disabled');

      currentNavButton.addClass('loading');
      $.ajax({
        url: '/local/ajax/getArticlesIndex.php',
        type: 'POST',
        data: {
          params: _this.data('params')
        },
        success: function success(result) {
          _this.removeAttr('disabled');

          currentNavButton.removeClass('loading');

          if (result.status !== 'ok') {
            return false;
          }

          var html = $(result.html);
          var innerImportant = html.find('.important-block__banner');
          var innerArticlesList = html.find('.media-catalog__grid');
          var newNav = html.find('.btn-load-more-wrap--articles');

          if (!innerArticlesList.length) {
            return false;
          }

          innerArticlesList.addClass('last loaded'); // if (innerImportant.length) {
          //     currentNav.before(innerImportant);
          // }

          currentNav.before(innerArticlesList);
          innerArticlesList.addClass('media-catalog-content__content');

          if (newNav.length) {
            currentNav.replaceWith(newNav);
          } else {
            currentNav.remove();
          }
        }
      });
    });
    doc.on('click', '.subscribe__close, .bg-modal-overlay', function () {
      var subscribePopup = $('.subscribe-popup');
      subscribePopup.removeClass('open');
      $('body').removeClass('modal-bg').css({
        overflowY: ''
      });
      subscribePopup.addClass('close');
      $.cookie(bitrixPrefix + "popup_close", 1, {
        expires: 1,
        path: "/"
      });

      if (window.popupData.code !== "") {
        $.cookie(bitrixPrefix + "popup_" + window.popupData.code, 1, {
          expires: 7,
          path: "/"
        });
        ga('send', {
          hitType: 'event',
          eventCategory: 'Media',
          eventAction: 'Pop-up skipped',
          eventLabel: window.popupData.code
        });
      }
    });
    /**
     * Переход по ссылке в попапе
     */

    doc.on('click', '.article-popup__link', function () {
      $popup = $(this).closest('.article-advert-popup');

      if ($popup.length) {
        document.dispatchEvent(new CustomEvent('articleAdvertPopup', {
          detail: {
            event: 'click',
            id: $popup.data('id')
          }
        }));
      }
    });
    doc.on('click', '.subscribe__close', function () {
      if (window.popupData.code) {
        document.dispatchEvent(new CustomEvent('sectionPopup', {
          detail: {
            event: 'close',
            code: window.popupData.code
          }
        }));
      }
    });
    /**
     * События рекламного попапа
     */

    document.addEventListener('articleAdvertPopup', function (event) {
      var params = {};

      switch (event.detail['event']) {
        case 'show':
          params = {
            'type': 'article-advert-popup-show',
            'id': event.detail['id']
          };
          break;

        case 'click':
          params = {
            'type': 'article-advert-popup-click',
            'id': event.detail['id']
          };
          break;
      }

      if (!$.isEmptyObject(params)) {
        $.ajax({
          url: '/local/ajax/advert.php',
          type: 'POST',
          data: params,
          success: function success(result) {}
        });
      }
    }, false);
    /**
     * События рекламного попапа
     */

    document.addEventListener('sectionPopup', function (event) {
      var params = {};
      params.code = event.detail["code"];

      switch (event.detail['event']) {
        case 'show':
          params.type = "popup-show";
          break;

        case 'click':
          params.type = "popup-click";
          break;

        case 'close':
          params.type = "popup-close";
          break;
      }

      if (!$.isEmptyObject(params)) {
        $.ajax({
          url: '/local/ajax/popup.php',
          type: 'POST',
          data: params,
          success: function success(result) {}
        });
      }
    }, false);
    doc.on('click', '.share__handler-btn', function (evt) {
      evt.preventDefault();
      $(this).toggleClass('active');
    });
    doc.on('click', function (evt) {
      if (!$(evt.target).hasClass('share__handler-btn') && !$(evt.target).parents('.share__handler-btn').length) {
        $('.share__handler-btn').removeClass('active');
      }
    });
    doc.on('click', '.js-share-item-copy', function (evt) {
      var $temp = $("<input>");
      $("body").append($temp);
      $temp.val(window.location.href).select();
      document.execCommand("copy");
      $temp.remove();
      evt.preventDefault();
      $('.copied').addClass('visible');
      setTimeout(function () {
        $('.copied').removeClass('visible');
      }, 3000);
    });
    doc.on('click', '.share__item:not(.js-share-item-copy)', function (event) {
      event.preventDefault();
      var dataCode = $(this).data("code");
      var url = window.location.href;
      var link = shareLinks.filter(function (item) {
        return item.dataCode === dataCode;
      })[0];

      if (typeof link.url !== "undefined") {
        var shareLink = link.url + url;
        window.open(shareLink, 'newwindow', 'width=600,height=600');
      }
    });
    /**
     * События рекламного баннера
     */

    document.addEventListener('articleAdvertBanner', function (event) {
      var params = {};

      switch (event.detail['event']) {
        case 'show':
          params = {
            'type': 'article-advert-banner-show',
            'id': event.detail['id'],
            'sourceId': event.detail['sourceId'],
            'format': event.detail['format']
          };
          break;

        case 'click':
          params = {
            'type': 'article-advert-banner-click',
            'id': event.detail['id'],
            'sourceId': event.detail['sourceId'],
            'format': event.detail['format']
          };
          break;
      }

      if (!$.isEmptyObject(params)) {
        $.ajax({
          url: '/local/ajax/advert.php',
          type: 'POST',
          data: params,
          success: function success(result) {}
        });
      }
    }, false);
    /**
     * Переход по ссылке в баннере
     */

    doc.on('click', '.article-advert-banner__link', function () {
      var banner = $(this).closest('[data-banner]');

      if (banner.length) {
        document.dispatchEvent(new CustomEvent('articleAdvertBanner', {
          detail: {
            event: 'click',
            id: banner.data('banner'),
            sourceId: banner.data('source'),
            format: banner.data('format')
          }
        }));
      }
    });
  }();
  /**
   * Display sidebar banner
   *
   * @param $container
   */

  window.showSideBanner = function ($container) {
    var $context = typeof $container === 'undefined' ? $('.page') : $container;

    if ($('.article-banner', $context).length > 0 && $('.js-article-banner', $context).length > 0) {
      var banners = $('.article-banner', $context);
      banners.each(function () {
        var bannerHtml = $(this).clone();
        var attr = $(this).data("type");
        var jsBanner = $(".js-article-banner[data-type=" + attr + "]", $context);
        jsBanner.append(bannerHtml);
        $(this).remove();
      });
    }
  };
  /**
   * Hide facebook iframe
   *
   * @param $container
   */


  window.hideFacebook = function ($container) {
    var $context = typeof $container === 'undefined' ? $('.page') : $container;

    if ($('iframe[src*="www.facebook.com/plugins/"]', $context).length > 0) {
      var facebookIframe = $('iframe[src*="www.facebook.com/plugins/"]', $context);
      facebookIframe.each(function () {
        $(this).closest('.stk-code').addClass('facebook-media');
      });
    }
  };

  !function () {
    if ($('[data-page-404]').length) {
      var cb = function cb() {
        var width = $(window).width();

        if (width > 1024) {
          var area = $('.js-sliderBlockSwiper .swiper-container');

          if (area.length) {
            new Swiper(area, {
              slidesPerView: 'auto',
              spaceBetween: 30,
              pagination: {
                el: '.swiper-pagination',
                type: 'fraction'
              },
              nextButton: '.js-sliderBlockSwiperNext',
              prevButton: '.js-sliderBlockSwiperPrev',
              breakpoints: {
                10000: {
                  autoHeight: false
                },
                767: {
                  autoHeight: true
                }
              }
            });
          }
        }
      };

      cb();
      $(window).on('resize', cb);
      $(document).on('click', '.js-modalVideoLink', function (event) {
        event.preventDefault();
        var item = $(this);
        var src = item.attr('data-mfp-src') || item.attr('href');
        $.magnificPopup.open({
          items: {
            src: src
          },
          type: 'iframe',
          iframe: {
            markup: '<div class="mfp-iframe-scaler">' + '<div class="mfp-close"></div>' + '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>' + '</div>',
            patterns: {
              youtube: {
                index: 'youtube.com/',
                id: 'v=',
                src: '//www.youtube.com/embed/%id%?rel=0&autoplay=1'
              }
            },
            srcAction: 'iframe_src'
          }
        });
      });
      $(document).on('click', '.js-mfp-close', function () {
        $.magnificPopup.close();
      });
    }
  }();
  !function () {
    var parentPage = $('[data-page="course-list"]');

    if (parentPage.length) {
      /**
       * Обрабатывает клики по заголовкам типов курсов
       */
      parentPage.on('click', '[data-btn="course-load"]', function (e) {
        e.preventDefault();
        var item = $(this);
        var section = item.attr('data-section');

        if (section) {
          parentPage.find('.page-nav__link[data-section="' + section + '"]').trigger('click');
        }

        return false;
      });
      /**
       *
       */

      var oddToggle = function oddToggle() {
        var is = true;
        var items = parentPage.find('[data-area="line-course"]:visible, [data-area="pupular-courses"]:visible');
        items.each(function () {
          $(this)[is ? 'removeClass' : 'addClass']('course-line-odd');
          is = !is;
        });
      };
      /**
       * Обрабатывает клики по табам курсов
       */


      parentPage.on('click', '[data-btn="course-tab"]', function (e) {
        e.preventDefault();
        var item = $(this);
        var sectionId = item.attr('data-section');
        var coursesLine = parentPage.find('[data-area="line-course"]');
        var tabs = parentPage.find('.js-courses-tabs');
        var section = parentPage.find('#' + sectionId);
        var popular = parentPage.find('[data-area="pupular-courses"]');
        var link = item.attr('href') || item.attr('data-link') || item.attr('data-url');
        var courseTitle = item.attr('data-title');

        if (sectionId) {
          coursesLine.hide();
          tabs.parent().removeClass('is-active');
          popular.hide();
          sectionId === 'all' ? coursesLine.show() : section.show();
          popular.filter('[data-section="' + sectionId + '"]').show();
          item.parent().addClass('is-active');
          link && history.pushState(null, null, link);
        }

        oddToggle();
        return false;
      });
      oddToggle(); //parentPage.find('[data-btn="course-tab"]').first().trigger('click');
    }
  }();
  !function () {
    var sliderBlockSwiper1 = null;

    var cb = function cb() {
      if ($('.js-sliderBlockSwiper .swiper-container').length > 0) {
        sliderBlockSwiper1 = new Swiper('.js-sliderBlockSwiper .swiper-container', {
          slidesPerView: 1,
          spaceBetween: 30,
          nextButton: '.js-sliderBlockSwiperNext',
          prevButton: '.js-sliderBlockSwiperPrev',
          onSlideChangeStart: function onSlideChangeStart(swiper) {
            var active = swiper.realIndex + 1;
            $('.js-sliderBlockSwiperActive').text(active);
          },
          breakpoints: {
            1025: {
              autoHeight: true
            }
          }
        });
      }
    };

    cb();
    $(window).on('resize', function () {
      sliderBlockSwiper1 && typeof sliderBlockSwiper1.destroy === 'function' && sliderBlockSwiper1.destroy();
      cb();
    });
  }();
  /**
   * Sliders in index
   */

  window.onload = function () {
    window.sliders = window.sliders || [];
    var sliderBlocks = [{
      id: 'history',
      selector: '.history-block'
    }, {
      id: 'selects',
      selector: '.selects-block'
    }, {
      id: 'interview',
      selector: '.interview-block'
    }];
    sliderBlocks.forEach(function (block) {
      if (document.querySelector(block.selector)) {
        if ($(window).width() <= '767') {
          window.sliders.push({
            id: block.id,
            slider: new Swiper(block.selector + ' .swiper-container', {
              loop: false,
              slidesPerView: 'auto',
              spaceBetween: 0,
              pagination: {
                el: '.swiper-pagination'
              },
              navigation: {
                nextEl: block.selector + ' .swiper-button-next',
                prevEl: block.selector + ' .swiper-button-prev'
              },
              scrollbar: {
                el: '.swiper-scrollbar'
              }
            })
          });
        } else {
          window.sliders.push({
            id: block.id,
            slider: new Swiper(block.selector + ' .swiper-container', {
              loop: false,
              navigation: {
                nextEl: block.selector + ' .swiper-button-next',
                prevEl: block.selector + ' .swiper-button-prev'
              }
            })
          });
        }
      }
    });
  };
  /**
   * validation
   */


  $(document).ready(function () {
    forms.init();
  });
  var forms = {
    forms: '.newsletter-form',
    init: function init() {
      $(document).on('submit', forms.forms, function (e) {
        e.preventDefault();
        var form = $(this);
        var _form = form;

        var formType = _form.data('type');

        var button = _form.find('button');

        if (button.attr('disabled')) {
          return false;
        }

        if (forms.checkForm(form)) {
          var data = _form.serialize();

          if (typeof BX !== 'undefined') {
            data = data + '&sessid=' + BX.bitrix_sessid();
          }

          $.ajax({
            type: 'POST',
            url: _form.attr('action'),
            data: data,
            beforeSend: function beforeSend() {
              button.attr('disabled', 'disabled');
            },
            success: function success(response) {
              if (response.status === 'ok') {
                if (formType === 'popup') {
                  var subscribePopup = $('.subscribe-popup');
                  $('body').removeClass('modal-bg');
                  subscribePopup.removeClass('open');
                  subscribePopup.addClass('close');
                  $(".subscribe-success-popup").addClass("subscribe-success-popup--visible");
                  setTimeout(function () {
                    $(".subscribe-success-popup").removeClass("subscribe-success-popup--visible");
                  }, 5000);
                  ga('send', {
                    hitType: 'event',
                    eventCategory: 'Media',
                    eventAction: 'Pop-up form sent',
                    eventLabel: window.popupData.code
                  });
                } else {
                  _form.parent().parent().addClass('success');

                  _form.parent().parent().find('.newsletter__header').addClass('newsletter__header--success').text('Вы успешно подписаны. Спасибо!');

                  ga('send', {
                    hitType: 'event',
                    eventCategory: 'Media',
                    eventAction: 'Form sent',
                    eventLabel: window.popupData.code
                  }); // .addClass('success')
                  // .html('<div class="form-success"><div class="form-success__text">Спасибо, Вы успешно подписаны!</div></div>');
                }
              } else {
                button.removeAttr('disabled');
                alert(response.error);
              }
            },
            error: function error(response) {
              console.log('e', response);
            }
          });
        }
      });
    },
    validateEmail: function validateEmail(email) {
      var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      return emailPattern.test(email);
    },
    checkForm: function checkForm(form) {
      var btn = $(form).find('button[type="submit"]');
      var email = $(form).find('input[name="email"]');
      var $email = email.val();
      var checkboxes = $(form).find("[type='checkbox']");
      var isSuccess = true;
      email.removeClass('invalid');
      btn.removeClass('disabled');
      btn.attr('disabled', false);

      if ($email.length <= 5 || !forms.validateEmail($email)) {
        email.addClass('invalid');
        isSuccess = false;
      }

      if (!forms.validateCheckboxes(checkboxes)) {
        checkboxes.addClass('invalid');
        isSuccess = false;
      }

      return isSuccess;
    },
    validateCheckboxes: function validateCheckboxes(checkboxes) {
      if (!$(checkboxes).length) return true;
      var result = false;
      $(checkboxes).each(function () {
        if ($(this).is(":checked")) {
          result = true;
          return result;
        }
      });
      return result;
    },
    update: function update() {
      forms.init();
    }
  };

  var Slider =
  /*#__PURE__*/
  function () {
    function Slider(el) {
      _classCallCheck(this, Slider);

      this.btnPrev = el.find('.button-prev');
      this.btnNext = el.find('.button-next');
      this.swiperContainer = el.find('.swiper-container');
      this.carouselWrapper = el.find('.slider-news__carousel');
    }

    _createClass(Slider, [{
      key: "initialize",
      value: function initialize() {
        var _this = this;

        var newsSwiper = new Swiper(this.swiperContainer[0], {
          slidesPerView: 'auto',
          spaceBetween: 20,
          watchOverflow: true,
          noSwiping: true,
          noSwipingClass: 'swiper-wrapper',
          navigation: {
            nextEl: this.btnNext,
            prevEl: this.btnPrev
          },
          breakpoints: {
            // when window width is <= 1023px
            1023: {
              noSwiping: false,
              freeMode: true
            }
          },
          on: {
            init: function init() {
              _this.carouselWrapper.addClass('grad-end').removeClass('grad-begin');
            },
            progress: function progress(_progress) {
              if (Math.abs(_progress) === 0) {
                _this.carouselWrapper.removeClass('grad-begin');
              } else if (Math.abs(_progress) === 1) {
                _this.carouselWrapper.removeClass('grad-end');
              } else {
                _this.carouselWrapper.addClass('grad-begin').addClass('grad-end');
              }
            }
          }
        });
      }
    }]);

    return Slider;
  }();

  if ($('.js-slider-news').length > 0) {
    var sliders = [];
    $('.js-slider-news').each(function (i) {
      sliders[i] = new Slider($(this));
      sliders[i].initialize();
    });
  }

  $('.look__allvideo').on('click', function (e) {
    e.stopPropagation();
  });
  $('#js-video').hover(function () {
    $('#js-video-content').trigger('play');
  }, function () {
    return;
  });
  !function () {
    var mousexdown = null;
    var mousexup = null;
    $(".l-slider-webinar").mousedown(function (e) {
      mousexdown = e.pageX;
    });
    $(".l-slider-webinar").mouseup(function (e) {
      mousexup = e.pageX;
    });
    $("[data-mfp-src='#modalSpecial']").click(function (e) {
      if (mousexdown != mousexup) {
        return false;
      }
    });
  }();
  $(document).ready(function () {
    var tabs;

    if ($('[data-top-section-tabs]').length > 0) {
      tabs = $('[data-top-section-tabs]');
      tabsScroll(tabs);
      var w = $(window).width();
      $(window).resize(function () {
        var new_w = $(window).width();

        if (new_w !== w) {
          tabsScroll(tabs);
        }
      });
    }

    if ($('[data-nav-parent]').length > 0) {
      tabs = $('[data-nav-parent]');
      tabsScroll(tabs);

      var _w = $(window).width();

      $(window).resize(function () {
        var new_w = $(window).width();

        if (new_w !== _w) {
          tabsScroll(tabs);
        }
      });
    }
  });

  function tabsScroll(tabs) {
    var topSectionHeight = $(tabs).height();
    var articlesSection = $('[data-articles-section]');
    var offsetArticlesSectionFirst = $(articlesSection).offset().top.toFixed();
    var offsetArticlesSectionLast = offsetArticlesSectionFirst;
    var tabsMarginTop = 20;
    var count = 0;

    if ($(window).width() < 1600) {
      $(tabs).css({
        position: 'relative',
        top: 'auto',
        bottom: 'auto'
      });
    }

    if ($(window).width() >= 1600) {
      setTimeout(function () {
        $(tabs).css({
          position: 'absolute',
          top: "".concat(offsetArticlesSectionFirst, "px"),
          bottom: 'auto'
        });
      });
    }

    var interval = setInterval(function () {
      count = count + 10;
      var offset = $(articlesSection).offset().top.toFixed();

      if (count === 3000 || offset !== offsetArticlesSectionFirst) {
        offsetArticlesSectionLast = $(articlesSection).offset().top;
        clearInterval(interval);

        if ($(window).scrollTop() < topSectionHeight - offsetArticlesSectionLast - Number(offsetArticlesSectionFirst) + tabsMarginTop) {
          if ($(window).width() >= 1600) {
            $(tabs).css({
              top: "".concat(offsetArticlesSectionLast, "px")
            });
          }
        }
      }
    }, 10);
    var isSwitch = true;
    var isPosition = true;
    var isArticlesMoreEvent = true;
    $(window).on('scroll resize', function () {
      if ($(window).width() >= 1600) {
        var headerOffset = null;
        headerOffset = $('header.header').offset().top;
        var margin = offsetArticlesSectionLast - Number(offsetArticlesSectionFirst);

        if (margin < 1) {
          if ($('.bannerTop').length > 0) {
            margin = headerOffset - $('.bannerTop').height();
          } else {
            margin = headerOffset;
          }
        }

        var footerOffset = $('footer.without-buttons').offset().top;
        var footerHeight = $('footer.without-buttons').outerHeight();
        var position = $(window).height() + $(window).scrollTop();

        if (isArticlesMoreEvent) {
          $('[dara-articles-more]').click(function () {
            $(tabs).css({
              position: 'fixed',
              top: "".concat(margin + tabsMarginTop, "px"),
              bottom: 'auto'
            });
            isArticlesMoreEvent = true;
          });
        }

        isArticlesMoreEvent = false;

        if (isSwitch) {
          if ($(window).scrollTop() > offsetArticlesSectionLast - margin - tabsMarginTop) {
            $(tabs).css({
              position: 'fixed',
              top: "".concat(margin + tabsMarginTop, "px"),
              bottom: 'auto'
            });
          } else {
            $(tabs).css({
              position: 'absolute',
              top: "".concat(offsetArticlesSectionLast, "px"),
              bottom: 'auto'
            });
          }
        }

        if (position > footerOffset + ($(window).height() - (margin + $(tabs).height() + tabsMarginTop))) {
          isSwitch = false;

          if (isPosition) {
            isPosition = false;
            $(tabs).css({
              position: 'absolute',
              bottom: "".concat(footerHeight + tabsMarginTop, "px"),
              top: 'auto'
            });
          }
        } else {
          isSwitch = true;
          isPosition = true;
        }
      }
    });
  }
  /** Cтраница Media - tab меню */


  var MediaNavTabs =
  /*#__PURE__*/
  function () {
    function MediaNavTabs(elem) {
      _classCallCheck(this, MediaNavTabs);

      this.data = {
        el: elem
      };
      this.dataNavParent = null;
      this.dataNavParentItem = null;
      this.swiper = null;
    }

    _createClass(MediaNavTabs, [{
      key: "initialize",
      value: function initialize() {
        this.dataNavParent = $(this.data.el).find('[data-nav-parent]');
        this.dataNavParentItem = $(this.data.el).find('[data-nav-parent-item]');
        var tabWidth;
        tabWidth = this.dataNavParent.width();
        $(this.dataNavParent).removeClass('opacity');

        if (tabWidth > 1200) {
          this.addSwiper();
        }

        var that = this;
        $(window).resize(function () {
          if ($(this).width() <= 1600) {
            tabWidth = that.dataNavParent.width();

            if (tabWidth > 1200) {
              that.addSwiper();
            } else {
              that.destroySwiper();
            }
          } else {
            that.destroySwiper();
          }
        });
      }
    }, {
      key: "destroySwiper",
      value: function destroySwiper() {
        if (this.swiper) {
          this.swiper.destroy(true, true);
          this.swiper = null;
          $(this.data.el).removeClass('swiper top-section__swiper');
          this.dataNavParent.removeClass('swiper-wrapper');
          this.dataNavParentItem.removeClass('swiper-slide');
          $('[data-top-section-btn]').remove();
        }
      }
    }, {
      key: "addSwiper",
      value: function addSwiper() {
        if (!this.swiper) {
          $(this.data.el).addClass('swiper top-section__swiper').append("<button class=\"top-section__button top-section__button-next\" data-top-section-btn><img style=\"width: 24px; height: 24px\" src=\"/local/templates/media/images/common/\u0441hevron-btn.svg\"></button><button class=\"top-section__button top-section__button-prev\" data-top-section-btn><img style=\"width: 24px; height: 24px\" src=\"/local/templates/media/images/common/\u0441hevron-btn.svg\"></button>");
          this.dataNavParent.addClass('swiper-wrapper');
          this.dataNavParentItem.addClass('swiper-slide');
          this.swiper = new Swiper('.top-section__swiper', {
            speed: 500,
            slidesPerView: 'auto',
            spaceBetween: 8,
            navigation: {
              nextEl: '.top-section__button-next',
              prevEl: '.top-section__button-prev'
            },
            breakpoints: {
              0: {
                spaceBetween: 8,
                slidesPerView: 'auto'
              },
              530: {
                spaceBetween: 8,
                slidesPerView: 'auto'
              }
            }
          });
        }
      }
    }]);

    return MediaNavTabs;
  }();

  var SectionArticlesNav =
  /*#__PURE__*/
  function () {
    function SectionArticlesNav(elem) {
      _classCallCheck(this, SectionArticlesNav);

      this.data = {
        el: elem
      };
      this.swiper = null;
      this.tabs = null;
      this.nav = null;
      this.tabsWrapper = null;
      this.tabsWrapperItem = null;
    }

    _createClass(SectionArticlesNav, [{
      key: "initialize",
      value: function initialize() {
        var _this3 = this;

        this.tabs = $(this.data.el);
        this.tabsWrapper = $(this.data.el).find('[data-top-section-tabs]');
        this.nav = $(this.data.el).find('[data-media-formats]');
        this.tabsWrapperItem = $(this.data.el).find('[data-tab-media-item]');
        var tags = $('[data-media-formats-tags] [data-media-formats-tags-item]');
        var arrTags = [];
        tags.each(function () {
          var el = $(this);
          var tagWidth = el.width() + 8;
          arrTags.push(tagWidth);
        });
        var initialValue = 0;
        var sumWithInitial = arrTags.reduce(function (accumulator, currentValue) {
          return accumulator + currentValue;
        }, initialValue);
        var width = $(window).width();

        if (sumWithInitial > 1170 && width > 1600) {
          setTimeout(function () {
            _this3.swiperInitialize();
          }, 500);
        }

        if (width < 1600 && width >= 768) {
          this.navTransform();
          setTimeout(function () {
            _this3.swiperInitialize();
          }, 500);
        }

        var that = this;
        $(window).resize(function () {
          var _this4 = this;

          var width = $(window).width();

          if (sumWithInitial > 1170 && width > 1600) {
            setTimeout(function () {
              _this4.swiperInitialize();
            }, 500);
          }

          if (width < 1600 && width >= 768) {
            that.navTransform();
            setTimeout(function () {
              that.swiperInitialize();
            }, 500);
          } else {
            that.swiperDestroy();
          }
        });
      }
    }, {
      key: "swiperDestroy",
      value: function swiperDestroy() {
        this.swiper.destroy(true, true);
        this.swiper = null;
        $('[data-media-formats]').removeClass('swiper');
        $('[data-media-formats-tags]').removeClass('swiper-wrapper');
        $('[data-media-formats-tags-item]').removeClass('swiper-slide');
        $('[data-media-formats-btn]').remove();
      }
    }, {
      key: "swiperInitialize",
      value: function swiperInitialize() {
        if (!this.swiper) {
          $('[data-media-formats]').append("<button class=\"media-formats__button media-formats__button-next\" data-media-formats-btn><img style=\"width: 24px; height: 24px\" src=\"/local/templates/media/images/common/\u0441hevron-btn.svg\"></button>\n                    <button class=\"media-formats__button media-formats__button-prev\" data-media-formats-btn><img style=\"width: 24px; height: 24px\" src=\"/local/templates/media/images/common/\u0441hevron-btn.svg\"></button>");
          var hasClassSwiper = $('[data-media-formats]').hasClass('swiper');

          if (!hasClassSwiper) {
            $('[data-media-formats]').addClass('swiper');
            $('[data-media-formats-tags]').addClass('swiper-wrapper');
            $('[data-media-formats-tags-item]').addClass('swiper-slide');
          }

          this.swiper = new Swiper('.media-formats__swiper', {
            speed: 500,
            slidesPerView: 'auto',
            spaceBetween: 8,
            navigation: {
              nextEl: '.media-formats__button-next',
              prevEl: '.media-formats__button-prev'
            },
            breakpoints: {
              0: {
                spaceBetween: 8,
                slidesPerView: 'auto'
              },
              530: {
                spaceBetween: 8,
                slidesPerView: 'auto'
              }
            }
          });
        }
      }
    }, {
      key: "navTransform",
      value: function navTransform() {
        if ($('[data-nav-box-title]').length === 0) {
          this.tabsWrapper.append("<div class=\"top-section__tabs-select-title\" data-nav-box-title></div><div class=\"top-section__tabs-select-content\" data-nav-box-content></div>");
          this.tabsWrapperItem.each(function () {
            if ($(this).find('[data-section-id]').hasClass('tab-active')) {
              $(this).find('[data-section-id]').removeAttr('href').click(function () {
                if ($('[data-top-section-tabs]').hasClass('active')) {
                  $('[data-top-section-tabs]').removeClass('active');
                } else {
                  $('[data-top-section-tabs]').addClass('active');
                }
              });
              $('[data-nav-box-title]').append(this);
            } else {
              $('[data-nav-box-content]').append(this);
            }
          });
        }
      }
    }]);

    return SectionArticlesNav;
  }();

  if ($('[data-nav-container]').length > 0) {
    var mediaNavTabs = new MediaNavTabs($('[data-nav-container]'));
    mediaNavTabs.initialize();
  }

  if ($('[data-top-section-articles]').length > 0) {
    var sectionArticlesNav = new SectionArticlesNav($('[data-top-section-articles]'));
    sectionArticlesNav.initialize();
  }
  /** Fix - Переход по ссылкам из меню */


  $('[data-menu-area]').on('click', '.swiper-slide', function () {
    var item = $(this);
    var a = item.find('a');

    if (a.length) {
      var href = $.trim(a.attr('href'));

      if (/^[^#]/.test(href)) {
        window.location.href = href;
      }
    }
  });
  !function () {
    var query_string = window.location.search.toString();
    var utm_conf = query_string.indexOf('utm_campaign=conf');

    if (utm_conf > 0) {
      var _phone1 = document.getElementById('conf_phone1');

      _phone1.href = "tel:84951544334";

      var _phone2 = document.getElementById('conf_phone2');

      _phone2.innerText = "+7 (495) 154-43-34";

      var _phone3 = document.getElementById('conf_phone3');

      _phone3.innerText = "+7 (495) 154-43-34";
      _phone3.href = "tel:84951544334";
      _phone3.content = "+74951544334";
    }
  }();
  $(function () {
    var $tabs = $('.js-tabBlue');
    $tabs.each(function () {
      var _self = $(this);

      $(this).click(function (e) {
        e.preventDefault();

        var $block = _self.attr('data-id');

        $('.js-tabBlueContent').hide();
        $('.js-tabBlue').parent().removeClass('is-active');
        $('#' + $block).show();
        $(this).parent().addClass('is-active');
      });
    });

    if ($tabs && $tabs.length > 0) {
      $($tabs[0]).trigger('click');
    }
  });
  $(document).on('click', '.share__link', function (e) {
    e.preventDefault();
    var $obj = $('#' + $(this).data('obj')),
        $type = $(this).data('type'),
        ptitle = $obj.find('.js-shareName').text(),
        ptext = $obj.find('.js-shareText').text(),
        purl = $('#currentURL').val();

    switch ($type) {
      case 'vk':
        url = 'http://vkontakte.ru/share.php?';
        url += 'url=' + encodeURIComponent(purl);
        url += '&title=' + encodeURIComponent(ptitle);
        url += '&description=' + encodeURIComponent(ptext); // url += '&image='       + encodeURIComponent(pimg);

        url += '&noparse=true';
        break;

      case 'fb':
        url = 'http://www.facebook.com/sharer.php?s=100';
        url += '&p[title]=' + encodeURIComponent(ptitle);
        url += '&p[summary]=' + encodeURIComponent(ptext);
        url += '&p[url]=' + encodeURIComponent(purl); // url += '&p[images][0]=' + encodeURIComponent(pimg);

        break;

      case 'tw':
        url = 'http://twitter.com/share?';
        url += 'text=' + encodeURIComponent(ptitle);
        url += '&url=' + encodeURIComponent(purl);
        url += '&counturl=' + encodeURIComponent(purl);
        break;

      default:
        break;
    }

    window.open(url, '', 'toolbar=0,status=0,width=626,height=436');
  });
  /**
   * Подписка
   */

  !function () {
    var xhr = null;
    var doc = $(document);
    /**
     * Проверяем корректность заполненных данных
     */

    var check = function check(item, type) {
      var check = false;

      if (item && type) {
        item = $(item);

        if (type === 'email') {
          var parent = item.parent();
          var value = $.trim(item.val());
          check = value && /.+@.+\..+/.test(value);
          parent[!check ? 'addClass' : 'removeClass']('is-error');
        } else if (type === 'phone') {
          var parent = item.parent();
          var value = $.trim(item.val());
          check = value && /^[^A-Za-zА-Яа-яЁё]{9,}$/.test(value);
          parent[!check ? 'addClass' : 'removeClass']('is-error');
        } else if (type === 'checkbox') {
          var checkbox = item.find('input[type="checkbox"]');
          check = checkbox.prop('checked') === true;
          item[!check ? 'addClass' : 'removeClass']('is-error');
        }
      }

      return check;
    };
    /**
     * Вызывается до отправки
     * @param options
     * @param dom
     * @param send
     */


    var before = function before(options, dom, send) {};
    /**
     * Вызывается после отправки
     * @param options
     * @param dom
     * @param send
     * @param response
     */


    var after = function after(options, dom, send, response) {
      if (response.status === 'ok' || response.status === 'success') {
        var parent = $('.page-subscription__form3 .page-feedback__fields');

        if (options.type == 'lead') {
          parent.html('<div class="form-success"><div class="form-success__text">Спасибо, Ваш запрос успешно отправлен!</div></div>');
        } else parent.html('<div class="form-success"><div class="form-success__text">Спасибо, Вы успешно подписаны!</div></div>');
      } else {
        response.error && alert(response.error.message);
      }
    };

    doc.off('.subscription');
    /**
     * Проверяем корректность EMAIL || PHONE
     */

    doc.on('keyup.subscription', '.page-subscription__form3 input[type="email"], .page-subscription__form3 input[data-type="phone"]', function (e) {
      e.preventDefault();
      var item = $(this);
      check(item, item.attr('data-type') || 'email');
      return false;
    });
    /**
     * Проверяем корректность checkbox
     */

    doc.on('click.subscription', '.page-subscription__form3 .fieldset__checkbox', function (e) {
      check(this, 'checkbox');
    });
    /**
     * Отправляем форму
     */

    doc.on('submit.subscription', '.page-subscription__form3', function (e) {
      e.preventDefault();
      var send = {};
      var dom = {};
      var options = {};
      dom.item = $(this);
      dom.form = dom.item.closest('form');
      dom.checkbox = dom.item.find('.fieldset__checkbox');
      dom.input = dom.item.find('input[name="email"], input[data-type="phone"]');
      options.type = dom.item.attr('data-type');
      options.action = dom.item.attr('action');
      options.inputValue = $.trim(dom.input.val());
      options.inputType = dom.input.attr('data-type') || 'email';

      if (!check(dom.input, options.inputType) || !check(dom.checkbox, 'checkbox')) {
        return;
      }

      send[options.inputType] = options.inputValue;
      dom.form.find('input[type="hidden"]').each(function () {
        var item = $(this);
        var name = $.trim(item.attr('data-name'));
        var value = $.trim(item.val());

        if (name) {
          send[name] = value;
        }
      });

      if (window.pageOptions && window.pageOptions.page === 'article.detail' && window.pageOptions.sectionId) {
        send = $.extend(send, {
          action: 'media-index',
          sectionId: window.pageOptions.sectionId
        });
      } else {
        var tab = $('.is-active [data-tab-name="media_nav"][data-section-id]');

        if (tab.length) {
          send = $.extend(send, {
            action: 'media-index',
            sectionId: tab.attr('data-section-id')
          });
        }
      }

      before(options, dom, send);

      if (options.type === 'lead') {
        // Отправка Amo lead
        $.formSend({
          form: dom.form,
          action: function action(type, response, params) {
            after($.extend({}, options, {
              params: params
            }), dom, send, response);
          },
          send: $.map(send, function (name, value) {
            return {
              name: name,
              value: value
            };
          })
        });
      } else if (send.action === 'media-index') {
        // Подписка с новой главной страницы
        api('controller/subscribe/index', send, function (response) {
          after(options, dom, send, response || {});
        });
      } else {
        xhr && xhr.readyState !== 4 && xhr.abort();
        xhr = $.ajax({
          url: options.action,
          contentType: "application/json",
          dataType: 'json',
          type: 'POST',
          data: JSON.stringify(send),
          success: function success(response) {
            after(options, dom, send, response || {});
          }
        });
      }

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'email.subscribe',
        details: {
          category: 'email.subscribe',
          action: 'send'
        }
      });
      return false;
    });
  }();
  $('.modal__special-form').submit(function (e) {
    e.preventDefault();
    var url = $(this).attr('action');
    var $checkedSpecial = $('.specialCheck:checked'),
        $selected = [],
        $courses = $('.js-specialCourses');
    $checkedSpecial.each(function () {
      $selected.push($(this).val());
    });
    $courses.val(JSON.stringify($selected));
    $.ajax({
      url: url + '?' + $(this).serialize(),
      contentType: "application/x-www-form-urlencoded; charset=UTF-8",
      dataType: 'json',
      success: function success(data) {
        //console.log(data.status);
        if (data.status == 'ok') {
          $.magnificPopup.close();
          $checkedSpecial.prop('checked', false);
        }
      }
    });
  });
  $('.specialCheck').on('change', function () {
    var $checkedSpecial = $('.specialCheck:checked');
    $cnt = $checkedSpecial.length, $add = '';
    if ($cnt == 0 || $cnt > 3) $add = 'тем';
    if ($cnt == 1) $add = 'тема';
    if ($cnt == 2 || $cnt == 3) $add = 'темы'; // темы

    $('.js-counterSpecials span').html($cnt + ' ' + $add);
  });
  $('.modal__subscriptionCourse-form').submit(function (e) {
    e.preventDefault();
    var url = $(this).attr('action'),
        $checkedSpecial = $('.modal__subscriptionCourse-checkbox:checked');
    $.ajax({
      url: url + '?' + $(this).serialize(),
      contentType: "application/x-www-form-urlencoded; charset=UTF-8",
      dataType: 'json',
      success: function success(data) {
        //console.log(data.status);
        if (data.status == 'ok') {
          $.magnificPopup.close();
          $checkedSpecial.prop('checked', false);
        }
      }
    });
  });
  /**
   * Блок целей метрики и GA
   */

  !function () {
    $(document).on('click', '.course__wrapper .button a', function (e) {
      // Клик по кнопке курса
      typeof yaCounter !== "undefined" && yaCounter.reachGoal('course_from_article');
      typeof gaCounter !== "undefined" && gaCounter('send', 'event', 'events', 'course_from_article');
    }).on('click', '.page-feedback .page-feedback__button', function (e) {
      // Подписаться на email рассылку
      typeof yaCounter !== "undefined" && yaCounter.reachGoal('email-subscribe');
      typeof gaCounter !== "undefined" && gaCounter('send', 'event', 'events', 'email-subscribe');
    }).on('click', '.js-like-item', function (e) {
      // Понравилась статья авторизованные
      typeof yaCounter !== "undefined" && yaCounter.reachGoal('like-article');
      typeof gaCounter !== "undefined" && gaCounter('send', 'event', 'events', 'like-article');
    }).on('click', '.article__question .question__button .js-modalLink', function (e) {
      // Понравилась статья не авторизованные
      typeof yaCounter !== "undefined" && yaCounter.reachGoal('like-article-unauth');
      typeof gaCounter !== "undefined" && gaCounter('send', 'event', 'events', 'like-article-unauth');
    }).on('click', '.stk-post .article__board .board-info__preview a', function (e) {
      // Переход на страницу трансляции
      typeof yaCounter !== "undefined" && yaCounter.reachGoal('play-link');
      typeof gaCounter !== "undefined" && gaCounter('send', 'event', 'events', 'play-link');
    }).on('click', 'a.board-info__preview', function (e) {
      // Переход на страницу трансляции
      typeof yaCounter !== "undefined" && yaCounter.reachGoal('play-link');
      typeof gaCounter !== "undefined" && gaCounter('send', 'event', 'events', 'play-link');
    }).on('click', '.js-share-vk', function (e) {
      // Репост медиа ВКонтакте
      typeof yaCounter !== "undefined" && yaCounter.reachGoal('share-vk');
      typeof gaCounter !== "undefined" && gaCounter('send', 'event', 'events', 'share-vk');
    }).on('click', '.js-share-fb', function (e) {
      // Репост медиа Facebook
      typeof yaCounter !== "undefined" && yaCounter.reachGoal('share-fb');
      typeof gaCounter !== "undefined" && gaCounter('send', 'event', 'events', 'share-fb');
    }).on('click', '.js-share-tw', function (e) {
      // Репост медиа Twitter
      typeof yaCounter !== "undefined" && yaCounter.reachGoal('share-tw');
      typeof gaCounter !== "undefined" && gaCounter('send', 'event', 'events', 'share-tw');
    }).on('click', '.js-share-vb', function (e) {
      // Репост медиа Viber
      typeof yaCounter !== "undefined" && yaCounter.reachGoal('share-vb'); // typeof gaCounter !== "undefined" && gaCounter('send', 'event', 'events', 'share-vb');
    }).on('click', '.js-share-tg', function (e) {
      // Репост медиа Telegram
      typeof yaCounter !== "undefined" && yaCounter.reachGoal('share-tg'); // typeof gaCounter !== "undefined" && gaCounter('send', 'event', 'events', 'share-tg');
    }).on('click', '.js-share-wa', function (e) {
      // РРепост медиа WatsApp
      typeof yaCounter !== "undefined" && yaCounter.reachGoal('share-wa'); // typeof gaCounter !== "undefined" && gaCounter('send', 'event', 'events', 'share-wa');
    });
  }();
  /**
   * Шаринг. соц. сети
   */

  !function () {
    /**
     * Обработка social-share ссылок
     */
    $('a[data-social-share-btn]').each(function () {
      var item = $(this);
      var parent = $(this).closest('[data-social-share]');
      var type = item.attr('data-social-share-btn');
      var url = item.attr('data-social-share-url') || parent.attr('data-social-share-url') || window.location.href;
      var title = item.attr('data-social-share-title') || parent.attr('data-social-share-title') || document.title;
      var href = 'JavaScript:void(0)';

      if (type == 'viber') {
        // viber
        href = 'viber://forward?text=' + window.encodeURIComponent(title + " \n\n " + url);
      } else if (type == 'whatsapp') {
        // whatsapp
        href = 'whatsapp://send?text=' + window.encodeURIComponent(title + " \n\n " + url);
      }

      item.attr('href', href).attr('target', '_blank');
    });
    /**
     * Летающий блок social-share в футере для touch
     * @type {jQuery|HTMLElement}
     */

    var area = $("[data-social-share='touch-footer']");

    if (area.length) {
      var body = $('html, body');
      var parent = $('[data-feedback-footer]').last();

      var refresh = function refresh() {
        if (area.is(":visible")) {
          var $show = body.scrollTop() + body.outerHeight() - parent.offset().top < parent.outerHeight() - area.outerHeight() / 2 - 5;
          area[$show ? 'addClass' : 'removeClass']('social-share-touch-footer-fixed');
        }
      };

      refresh();
      $(document).on('scroll', refresh);
    }
    /**
     * скрытие-раскрытие блока
     */


    $('.page-sc__title').on('click', function () {
      $('.social-share-touch-footer-fixed').toggleClass('expanded');
    });
  }();
  /**
   * Resize Main TOP3
   */

  !function () {
    var parent = $('.top-publications');

    if (parent.length) {
      var mainArticle = $('[data-main-top-head-article]');
      var win = $(window);

      var cb = function cb() {
        var items = parent.find('.top-publications__article');
        var windowWidth = win.width();

        if (windowWidth <= 1200) {
          items.show();
          mainArticle.css('min-height', 'auto');
        } else {
          var parentTop = parent.innerHeight() + parent.offset().top;
          var threeLineCounter = 0;
          var topElementsCounter = 0;
          items.each(function () {
            topElementsCounter += 1;
            var item = $(this);
            item.show();

            if (topElementsCounter < 3 && item.innerHeight() > 110) {
              threeLineCounter += 1;
            } // var itemTop = item.innerHeight() + item.offset().top;
            // item[itemTop > parentTop ? 'hide' : 'show']();

          });

          if (threeLineCounter === 2 && topElementsCounter === 3) {
            parent.find('.top-publications__article:last').hide();
          }
          /**
           * Отступ у главной статьи
           * @type {number}
           */


          var mainArticleHeight = Math.abs(mainArticle.innerHeight() + (parent.innerHeight() + parent.offset().top - (mainArticle.innerHeight() + mainArticle.offset().top))) - 25;
          mainArticle.css('min-height', mainArticleHeight + 'px');
        }
      };

      var timeout = null;
      win.on('resize', function () {
        window.clearTimeout(timeout);
        timeout = window.setTimeout(cb, 200);
      });
      cb();
    }
  }();
  /**
   * Перезапись UTM меток на детальных страницах в медиа
   */

  $(document).on('click', '.courseLink', function () {
    var $article = $(this).closest('section[data-courseid]');
    var courseId = $(this).attr('data-courseId');
    var page = window.location;
    var pageId = $article.attr('data-articleId');
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      'event': 'go_to_course',
      'courseID': courseId,
      'page': page,
      'pageID': pageId
    });
  });

  window.rewriteUTM = function () {
    $(document).ready(function () {
      var $article = $('div[data-area="article"]');
      var isDetailPage = $article.length > 0;

      if (!isDetailPage) {
        return;
      }

      var $links = $article.find('a');

      if ($links.length > 0) {
        $links.each(function (index, link) {
          var $link = $(link);
          var url = $link.attr('href');
          var $article = $link.parents('section[data-courseid]');

          if (url) {
            var urlSplit = url.split('?');
            var urlBase = urlSplit[0] ? urlSplit[0] : '';
            var urlQuery = urlSplit[1] ? urlSplit[1] : ''; // проверяем ссылка ли это на курс

            if (urlBase && isCourseUrl(urlBase)) {
              // var newUrlQuery = buildUrlQuery(urlQuery);

              /**
               * Удаляем все параметры из адреса
               */
              if ($article !== null && $article.length > 0) {
                var courseId = $article[0].getAttribute('data-courseId');
                $link.attr('href', urlBase).attr('data-courseId', courseId).addClass('courseLink').addClass('article-advert-banner__link');
                /*if (newUrlQuery && newUrlQuery.length) {
                    $link.attr('href', urlBase + newUrlQuery);
                }*/
              }
            }
          }
        });
        getCourseId();
      }

      function buildUrlQuery(urlQuery) {
        // получаем параметры из ссылки, если они были
        var parameters = urlQuery ? getParameters(urlQuery) : {}; // заменяем/добавляем параметры, найденные в cookie

        try {
          var cookie = getCookie('savedUTM');
          var cookieParsed = cookie ? JSON.parse(cookie) : {};

          for (var i in cookieParsed) {
            if (cookieParsed.hasOwnProperty(i)) {
              if (cookieParsed[i]) {
                parameters[i] = cookieParsed[i];
              }
            }
          }
        } catch (e) {
          console.error(e);
        } // выходим, если параметров нет


        if ($.isEmptyObject(parameters)) {
          return;
        } // добавляем параметр media


        if (typeof parameters['utm_term'] === 'string' && parameters['utm_term']) {
          parameters['media'] = parameters['utm_term'];
        } else {
          parameters['media'] = getArticleCode();
        }

        var query = [];
        $.each(parameters, function (name, value) {
          query.push(window.encodeURIComponent(name) + "=" + window.encodeURIComponent(value));
        });
        return query.length ? '?' + query.join('&') : '';
      }

      function getCookie(name) {
        // noinspection RegExpRedundantEscape
        var matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
        return matches ? decodeURIComponent(matches[1]) : undefined;
      }

      function escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }

      function isCourseUrl(url) {
        if (typeof url !== 'string') {
          return false;
        }

        var externalLinks = ['freelancer.skillbox.ru', 'sale.skillbox.ru', 'course.skillbox.ru', 'interiordesign.skillbox.ru', 'iamwebdev.skillbox.ru', 'iammarketer.skillbox.ru', 'iamdesigner.skillbox.ru', 'live.skillbox.ru', 'b2b.skillbox.ru', 'highereducation.skillbox.ru'];

        for (var i = 0; i < externalLinks.length; i++) {
          externalLinks[i] = escapeRegExp(externalLinks[i]);
        }

        var regexp = new RegExp('^http[s]?:\/\/(skillbox\.ru|' + escapeRegExp(window.location.host) + '|' + externalLinks.join('|') + ')\/(?!media/)[a-zA-Z0-9-_/]*');
        return !!url.match(regexp);
      }

      function getParameters(url) {
        var match;
        var pl = /\+/g;
        var search = /([^&=]+)=?([^&]*)/g;

        var decode = function decode(s) {
          return decodeURIComponent(s.replace(pl, " "));
        };

        var urlParams = {};

        while (match = search.exec(url)) {
          urlParams[decode(match[1])] = decode(match[2]);
        }

        return urlParams;
      }

      function getArticleCode() {
        var pathNameParts = window.location.pathname.split('/');
        return pathNameParts.pop() === '' ? pathNameParts[pathNameParts.length - 1] : pathNameParts.pop();
      }

      function getCourseId() {
        $.ajax({
          url: '/local/api.v1/controller/nav/course.json',
          dataType: 'json',
          success: function success(courses) {
            $('.courseLink').each(function (a, link) {
              courses.every(function (course) {
                if (course.PROPERTY_URL_VALUE && course.PROPERTY_URL_VALUE.toString() === $(link).attr('href')) {
                  $(link).attr('data-courseId', course.ID);
                  return false;
                } else {
                  return true;
                }
              });
            });
          }
        });
      }
    });
  };

  window.rewriteUTM();
  !function () {
    var $article = $('.article__text');

    if ($article.length > 0) {
      $article.find('[style]').each(function (a, el) {
        var $style = $(el).attr('style');

        if ($style.length > 0) {
          var newStyle = $style.replace(new RegExp(' ', 'g'), ' ');
          $(el).attr('style', newStyle);
        } else {
          $(el).removeAttrs('style');
        }
      });
    }
  }();
  /**
   * Counter
   */

  function getHash($obj) {
    return murmurHash3.x86.hash128(JSON.stringify($obj));
  }

  !function () {
    if (typeof Fingerprint2 === 'function') {
      if (window.requestIdleCallback) {
        requestIdleCallback(function () {
          Fingerprint2.get(function (components) {
            var $url = window.location.pathname,
                $hash = getHash(components);

            if ($url.length > 0 && $hash.length > 0) {
              var xhr = new XMLHttpRequest();
              var body = 'url=' + encodeURIComponent($url) + '&hash=' + encodeURIComponent($hash);
              xhr.open("POST", '/local/ajax/addCounter.php', true);
              xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
              xhr.send(body);
            }
          });
        });
      } else {
        setTimeout(function () {
          Fingerprint2.get(function (components) {
            var $url = window.location.pathname,
                $hash = getHash(components);

            if ($url.length > 0 && $hash.length > 0) {
              var xhr = new XMLHttpRequest();
              var body = 'url=' + encodeURIComponent($url) + '&hash=' + encodeURIComponent($hash);
              xhr.open("POST", '/local/ajax/addCounter.php', true);
              xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
              xhr.send(body);
            }
          });
        }, 500);
      }
    }
  }();
  !function () {
    $(document).ready(function () {
      $("a[data-tab-name='media_nav']").on("click", function (event) {
        var code = $(this).data("code");

        if (code.length > 0) {
          ga('send', {
            hitType: 'event',
            eventCategory: 'Media',
            eventAction: 'Direction clicked',
            eventLabel: code
          });
        }
      });
      $(".header__logo .header__media-main-link").on("click", function () {
        ga('send', {
          hitType: 'event',
          eventCategory: 'Header -Media',
          eventAction: 'Logo button clicked'
        });
      });
      $(".menu-nav__link--about").on("click", function () {
        ga('send', {
          hitType: 'event',
          eventCategory: 'Header -Media',
          eventAction: 'About button clicked'
        });
      });
      $(".menu-nav__link--main").on("click", function () {
        ga('send', {
          hitType: 'event',
          eventCategory: 'Header -Media',
          eventAction: 'Click on the main button'
        });
      });
      $(".toggle-menu--course").on("click", function () {
        ga('send', {
          hitType: 'event',
          eventCategory: 'Header -Media',
          eventAction: 'Click on the main button'
        });
      });
    });
  }();
  /**
   Top menu
   **/
  // $(document).ready(function(){
  //     $('.header__menu-mobile-btn').click(function () {
  //         $('.menu').toggleClass('menu-show');
  //         $('body').toggleClass('no-scroll');
  //     });
  // });

  $(document).ready(function () {
    $(function () {
      var ww = $(window).width();
      var search = $('[data-search-media]');
      var inputWrap = search.find('.search-media__input-wrap');
      var inputSearch = search.find('.search-media__input');
      var crossClose = search.find('.search-media__reset');

      if (ww >= 768) {
        inputSearch.on('input', dropdownShow);
        crossClose.on('click', dropdownShow);
      } else {
        inputWrap.on('click', function () {
          modalSearch();
          showSearchMobile();
        });
      }

      function showSearchMobile() {
        var searchMobile = $('[data-mobile-media-search]');
        var inputSearchMobile = searchMobile.find('.mobile-media-search__input-search');
        var btnReset = searchMobile.find('button[type="reset"]');
        var btnReturn = searchMobile.find('.mobile-media-search__return');
        inputSearchMobile.focus();
        inputSearchMobile.on('input', showButtonReset);
        btnReset.on('click', showButtonReset);
        btnReturn.on('click', modalSearchClose); // inputSearchMobile.focus();
      }

      function modalSearchClose() {
        var el = $(this);
        var modalSearch = el.closest('[data-mobile-media-search]');
        var btnReset = el.closest('[data-mobile-media-search]').find('button[type="reset"]');
        modalSearch.addClass('none');
        $('body, html').removeClass('no-scroll-phone');
        btnReset.click();
      }

      function modalSearch() {
        $('[data-mobile-media-search]').removeClass('none');
        $('body, html').addClass('no-scroll-phone');
      }

      function showButtonReset() {
        var el = $(this);
        var btnReset = el.closest('[data-mobile-media-search]').find('button[type="reset"]');

        if (el.val().length > 0) {
          btnReset.addClass('show');
        } else {
          btnReset.removeClass('show');
        }
      }

      function dropdownShow() {
        var el = $(this);
        var search = el.closest('[data-search-media]');
        var dropdown = search.find('[data-search-media-dropdown]');

        if (el.val().length > 0) {
          dropdown.addClass('open');
          el.addClass('active');
          crossClose.addClass('show');
        } else {
          dropdown.removeClass('open');
          el.removeClass('active');
          crossClose.removeClass('show');
        }
      }
    });
    $('.menu__link--toggle').click(function () {
      $('.menu__link-droplist').toggleClass('open');
    });
    $('.header__menu-mobile-btn').click(function () {
      $('.menu-directions__wrap').toggleClass('open');
      $('.menu-sale').toggleClass('open');
    });
    $('.cookies__button').click(function () {
      $('.cookies').remove();
      document.cookie = "isAcceptCookies=true;max-age=31536e3; path=/";
    });

    if ($("#articleAdvertPopup").length && window.innerWidth >= 1200) {
      $.magnificPopup.open({
        items: {
          src: '#articleAdvertPopup'
        },
        type: 'inline',
        callbacks: {
          open: function open() {
            $this = $(this.currItem['src']);

            if ($this.data('type') == 'article-popup') {
              document.dispatchEvent(new CustomEvent("articleAdvertPopup", {
                detail: {
                  event: "show",
                  id: $this.data('id')
                }
              }));
            }
          },
          close: function close() {
            $.cookie('article_ad_popup', 1, {
              expires: 30,
              path: '/'
            });
          }
        }
      });
    }

    if (window.clientIds) {
      window.clientIds.init();
    }
  });
  /**
   * Инициализация promo-banner из библиотеки @skillbox/promo-banner
   */

  if (typeof fetchConfig === 'function' && !window.TopBanner) {
    fetchConfig('media', true).then(function (_ref) {
      var error = _ref.error,
          config = _ref.config;
      new BannerPlugin(_objectSpread({
        isProduction: true,
        project: 'main'
      }, config));

      if (error) {
        console.error(error);
        window.Sentry.captureException(error);
      }
    });
  }
});