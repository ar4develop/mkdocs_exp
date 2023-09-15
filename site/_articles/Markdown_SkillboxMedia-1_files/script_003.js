const bitrixPrefix = "BITRIX_SM_";
const isPopupCookiesDisabled = () => $.cookie(bitrixPrefix+"popup_close") == null && $.cookie(bitrixPrefix+"popup_"+popupData.code) == null;
const topPopupPosition = 40;
const insertCheckboxes = (parent, idPostfix = "") => {
    var checkboxes = '';
    for (index in popupData.checkboxes) {
        checkboxes += `
                    <div class="subscribe__checkbox">
                        <input type="checkbox" name="subscribe[]" id="check${index}${idPostfix}" value="${index}" checked>
                        <label for="check${index}${idPostfix}">${popupData.checkboxes[index]}</label>
                    </div>
                `;
    }

    parent.find(".subscribe__checkboxes").show().html(checkboxes);
}
const initializeSubscribePopup = (timeout = 10000) => {
    window.removeEventListener('scroll', popupScroll);
    document.body.removeEventListener('scroll', popupScroll);
    if (!popupData.code) return;
    if (!popupData.position) {
        popupData.position = topPopupPosition
    }
    let smileImg = '';
    let smileNewsImg = '';
    let smilePath = window.location.origin + '/static/images/articles/';
    let smileName = '';
    switch (popupData.code) {
        case 'growth':
            smileName = 'smile_psy.svg';
            break;

        case 'gamedev':
        case 'design':
            smileName = 'smile_dg.svg';
            break;

        case 'code':
        case 'education':
        case 'business':
        case 'marketing':
        case 'management':
            smileName = 'smile_cob.svg';
            break;

        default:
            smileName = 'smile_cob.svg';
    }

    // для попап
    $('.subscribe__header').html(`<span class="subscribe__header-title">${popupData.header}</span>`);
    // для врезки
    $('.newsletter__header').html(`<div class="newsletter__header-title">${popupData.header}</div>`);
    if (smileName.length > 0) {
        // для попап
        // smileImg = `<img class="subscribe__header-smile" src="${smilePath}${smileName}">`;
        // $('.subscribe__header').append(smileImg);

        // для врезки
        // smileNewsImg = `<img class="newsletter__header-smile" src="${smilePath}${smileName}">`;
        // $('.newsletter__header').append(smileNewsImg);
    }

    const subscribePopup = $('.subscribe-popup');

    if ($(".js-sticky-delimiter").length){
        let height = $(".js-sticky-delimiter").offset().top + popupData.position;
        subscribePopup.css({top:`${height}px`});
    }
    if (window.popupTimeOutId){
        window.clearTimeout(window.popupTimeOutId)
        subscribePopup.addClass("close")
    }
    subscribePopup.show();

    if (popupData.checkboxes){
        if (!Object.keys(popupData.checkboxes).length) {
            $('.subscribe__checkboxes').hide();
        } else {
            insertCheckboxes($(".subscribe-popup"));
            insertCheckboxes($(".newsletter"), "incut");
        }
    }
    if (isPopupCookiesDisabled()) {
        window.popupTimeOutId = setTimeout(() => {
            setPosition()
            resize()

            subscribePopup.removeClass('close');
            subscribePopup.addClass('open');
            $('body').addClass('modal-bg');
            document.dispatchEvent(new CustomEvent('sectionPopup', {
                detail: {
                    event: 'show',
                    code: popupData.code,
                }
            }));
            ga('send', {
                hitType: 'event',
                eventCategory: 'Media',
                eventAction: 'Pop-up shown',
                eventLabel: popupData.code
            });

            if (window.outerWidth <= 767 && subscribePopup.innerHeight() > 400){
                initDrag();
            }

        }, timeout)


    }
}
const popupScroll = () => {
    if (popupData.scroll && window.subscribePopupShow){
        popupData.scroll = false;
        initializeSubscribePopup(15000);
    }
    setPosition();
}
const setPosition = () => {
    if (window.outerWidth <= 767){
        resize()
        return
    }

    let stickyPopup = $('.subscribe-popup')

    let height = 0;

    if ($(".js-sticky-delimiter").length) {
        height = $(".js-sticky-delimiter").offset().top;
    }

    stickyPopup.css({position: "fixed", top:`${height + popupData.position}px`})
    /*
    if (window.scrollY > height){
        stickyPopup.css({position: "fixed", top:`${popupData.position}px`})
    }else{
        stickyPopup.css({position: "absolute", top:`${height + popupData.position}px`})
    }

     */
}
const resize = () => {
    let stickyPopup = $('.subscribe-popup');
    if (window.outerWidth <= 767) {
        stickyPopup.css({top:0});
    } else {
        setPosition()
    }
}

const initDrag = () => {
    var dragItem = document.querySelector('.subscribe-popup');
    var dragItemHeight = dragItem.clientHeight;
    let container = document.querySelector('body');
    var dragItemPos;

    var active = false;
    var currentY;
    var initialY;
    var yOffset = 0;

    // задержка для правильного определения позиции
    // на позиционирование отведено 300мс из CSS
    setTimeout(()=>{
        dragItemPos = dragItem.getBoundingClientRect();

        container.addEventListener("touchstart", dragStart, false);
        container.addEventListener("touchend", dragEnd, false);
        container.addEventListener("touchmove", drag, false);

        container.addEventListener("mousedown", dragStart, false);
        container.addEventListener("mouseup", dragEnd, false);
        container.addEventListener("mousemove", drag, false);
    }, 400);

    $(container).css({overflowY: 'hidden'});


    function dragStart(e) {
        if (e.type === "touchstart") {
            initialY = e.touches[0].clientY - yOffset;
        } else {
            initialY = e.clientY - yOffset;
        }

        active = true;
    }

    function dragEnd() {
        setTranslate(currentY, dragItem);
        active = false;
    }

    function drag(e) {
        if (active) {
            if (e.type === "touchmove") {
                currentY = e.touches[0].clientY - initialY;
            } else {
                currentY = e.clientY - initialY;
            }
        }
    }

    function setTranslate(yPos, el) {
        if (yPos < 5) {
            el.style.top = `calc(100% - ${dragItemHeight}px)`;
        } else if (yPos > 10) {
            $('.subscribe__close').click();
        }
    }
}

if (window.subscribePopupShow && !popupData.scroll) {
    initializeSubscribePopup();
}

window.addEventListener('scroll', popupScroll, false);
document.body.addEventListener('scroll', popupScroll, false);

window.addEventListener('resize', resize, false);
