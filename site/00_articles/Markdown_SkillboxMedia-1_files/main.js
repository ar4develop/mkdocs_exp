// window.onload = function () {
//     window.sliders = window.sliders || [];
//     const sliderBlocks = [
//         {
//             id: 'history',
//             selector: '.history-block'
//         },
//         {
//             id: 'selects',
//             selector: '.selects-block'
//         },
//         {
//             id: 'interview',
//             selector: '.interview-block'
//         },
//     ];
//     console.log('before fe');
//     sliderBlocks.forEach(function (block) {
//         console.log(document.querySelector(block.selector + ' .swiper-container'))
//         if(document.querySelector(block.selector).length > 0) {
//             window.sliders.push({
//                 id: block.id,
//                 slider: new Swiper(block.selector + ' .swiper-container', {
//                     loop: false,
//                     navigation: {
//                         nextEl: block.selector + '.swiper-button-next',
//                         prevEl: block.selector + '.swiper-button-prev',
//                     }
//                 })
//             });
//         }
//     });
//
//     // function sliderSelectionArticles() {
//     //     var mySwiper = new Swiper('.slider-selection-articles', {
//     //         loop: false,
//     //         navigation: {
//     //             nextEl: '.swiper-button-next',
//     //             prevEl: '.swiper-button-prev',
//     //         }
//     //     })
//     // }
//     //
//     // sliderSelectionArticles();
// };
//
// $(document).ready(function () {
//
//     function mobileSlider() {
//         if ($(window).width() <= '767') {
//             var mySwiper = new Swiper('.slider-mobile-content', {
//                 loop: false,
//                 slidesPerView: 'auto',
//                 spaceBetween: 0,
//                 pagination: {
//                     el: '.swiper-pagination',
//                 },
//                 navigation: {
//                     nextEl: '.swiper-button-next',
//                     prevEl: '.swiper-button-prev',
//                 },
//                 scrollbar: {
//                     el: '.swiper-scrollbar',
//                 },
//             });
//         }
//     }
//
//     mobileSlider();
//
//
//     $('.header__menu-mobile-btn').click(function () {
//         $('.menu').toggleClass('menu-show');
//         $('body').toggleClass('no-scroll');
//     });
// });
