/**
 * полифил для path
 */
if (!('path' in Event.prototype)) {

    Object.defineProperty(Event.prototype, 'path', {
        get: function () {
            var path = [];
            var currentElem = this.target;
            while (currentElem) {
                path.push(currentElem);
                currentElem = currentElem.parentElement;
            }
            if (path.indexOf(window) === -1 && path.indexOf(document) === -1)
                path.push(document);
            if (path.indexOf(window) === -1)
                path.push(window);
            return path;
        }
    });
}

if (typeof getHash !== "function") {
    function getHash($obj) {
        return base64encode(JSON.stringify($obj))
    }
}

/**
 * Прототип для хеширования строки
 * @returns {number}
 */
String.prototype.hashCode = function () {
    var hash = 0;
    if (this.length == 0) {
        return hash;
    }
    for (var i = 0; i < this.length; i++) {
        var char = this.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
};

/**
 * Конвертирует строку в base64
 * @param str
 * @returns {string}
 */
function base64encode(str) {

    if (!window.btoa) {
        window.btoa = $.base64.btoa;
    }

    return window.btoa(unescape(encodeURIComponent(str)));
}

/**
 * Выполняет ajax запрос к api
 * @param method
 * @param send
 * @param cb
 * @param params
 */
function api(method, send, cb, params) {

    if (method) {

        send = send || {};
        params = params || {};

        api.xhr = api.xhr || {};
        api.xhr[method] && api.xhr[method].readyState != 4 && api.xhr[method].abort();

        var ext = params.hjson ? '.hjson' : (params.html ? '.html' : '.json');

        send = JSON.stringify(send.data ? send.data : send).replace(/[\u007f-\uffff]/g,
            function (c) {
                return '\\u' + ('0000' + c.charCodeAt(0).toString(16)).slice(-4);
            }
        );

        if (BX.browser.IsIE()) {

            var def = [];
            var key = (new Date()).getTime() + BX.util.getRandomString();

            api.xhr[method + '_chunk'] = api.xhr[method + '_chunk'] || [];
            api.xhr[method + '_chunk'].forEach(function (xhr) {
                xhr && xhr.readyState != 4 && xhr.abort();
            });

            /**
             * Отправляем данные через GET порциями
             * @info https://support.microsoft.com/ru-ru/help/208427/maximum-url-length-is-2-083-characters-in-internet-explorer
             * @type {RegExpMatchArray | null}
             */
            base64encode(send).match(/.{1,1500}/g).forEach(function (data, index, list) {

                var chunk = $.ajax({
                    method: "GET",
                    url: '/local/api.v1/' + method + ext,
                    data: $.param({
                        ie: 1,
                        hash: key,
                        part: index,
                        data: data
                    }),
                    contentType: 'application/json; charset=utf-8',
                    dataType: params.html ? 'html' : 'json',
                    async: true
                });

                api.xhr[method + '_chunk'].push(chunk);
                def.push(chunk);
            });

            $.when.apply($, def).then(function () {
                api.xhr[method] = $.ajax({
                    method: "GET",
                    url: '/local/api.v1/' + method + ext,
                    data: $.param({
                        ie: 1,
                        hash: key,
                        last: 1
                    }),
                    contentType: 'application/json; charset=utf-8',
                    dataType: params.html ? 'html' : 'json'
                }).done(cb);
            });

        } else {

            api.xhr[method] = $.ajax({
                method: "POST",
                url: '/local/api.v1/' + method + ext,
                data: send,
                contentType: 'application/json; charset=utf-8',
                dataType: params.html ? 'html' : 'json'
            }).done(cb);
        }
    }
}

;(function () {

    'use strict';

    var options = $.extend({}, window.pageOptions || {}, window.optionsLanding || {});

    if (typeof $.showPayForm !== "function") {

        /**
         * Форма оплаты
         */
        $.showPayForm = function () {
            $('#payment a.modal-close').trigger('click');
            $('#trap button.button-close').trigger('click');
            console.log('>> [Step 3] OnlinePayment: Show widget');
            var invoiceId = document.body.getAttribute('data-orderId'),
                accountId = document.body.getAttribute('data-orderMail'),
                name = document.body.getAttribute('data-orderName');
            typeof window.payCourse !== "undefined" && window.payCourse(invoiceId, accountId, name);
        };
    }

    /**
     * Собираем данные для отправки
     * @param params
     */
    $.formData = function (params) {

        params = params || {};

        var form = params.form;
        var result = form.serializeArray();

        if (typeof sbjs === 'object') {

            /** @doc http://www.it-agency.ru/academy/tools/sourcebuster/ */
            result.push(
                {name: "utm_type_first", value: sbjs.get.first.typ},
                {name: "utm_source_first", value: sbjs.get.first.src},
                {name: "utm_medium_first", value: sbjs.get.first.mdm},
                {name: "utm_campaign_first", value: sbjs.get.first.cmp},
                {name: "utm_content_first", value: sbjs.get.first.cnt},
                {name: "utm_term_first", value: sbjs.get.first.trm},
                {name: "utm_date_first", value: sbjs.get.first_add.fd},
                {name: "utm_point_first", value: sbjs.get.first_add.ep},
                {name: "utm_referer_first", value: sbjs.get.first_add.rf},

                {name: "utm_type", value: sbjs.get.current.typ},
                {name: "utm_source", value: sbjs.get.current.src},
                {name: "utm_medium", value: sbjs.get.current.mdm},
                {name: "utm_campaign", value: sbjs.get.current.cmp},
                {name: "utm_content", value: sbjs.get.current.cnt},
                {name: "utm_term", value: sbjs.get.current.trm},
                {name: "utm_date", value: sbjs.get.current_add.fd},
                {name: "utm_point", value: sbjs.get.current_add.ep},
                {name: "utm_referer", value: sbjs.get.current_add.rf},

                {name: "utm_pgs", value: sbjs.get.session.pgs},
                {name: "utm_url", value: sbjs.get.session.cpg},
                {name: "utm_vst", value: sbjs.get.udata.vst},
                {name: "utm_agent", value: sbjs.get.udata.uag},
                {name: "utm_promo", value: sbjs.get.promo.code}
            );
        }

        result.push({
            name: "id",
            value: form.attr('data-action-url') === 'Y'
                ? form.attr('data-id')
                : options.ID
        });

        if (window.dataLayer) {
            window.dataLayer.forEach(function (item) {
                if (item.event === 'crto_transactionpage') {
                    result.push({name: 'transactionId', value: item.crto.transactionid});
                }
            });
        }

        result.forEach(function (item) {
            if (item.name === 'email') {
                window.advcake_data = window.advcake_data || [];
                window.advcake_data.push({
                    pageType: 1,
                    user: {email: item.value.hashCode()}
                });
            }
        });

        if (params.send) {
            result = result.concat(params.send || []);
        }

        // должно быть в конце
        if (typeof getHash === 'function') {
            var hashArray = [];
            var tmpObj = {};

            result.forEach(element => {
                if (element.name === 'name'){
                    tmpObj.name = element.value;
                }
                if (element.name === 'phone'){
                    tmpObj.phone = element.value;
                }
                if (element.name === 'email'){
                    tmpObj.email = element.value;
                }
            });

            hashArray.push(tmpObj.name);
            hashArray.push(tmpObj.email);
            hashArray.push(tmpObj.phone);

            result.push({
                name: "formHash",
                value: getHash(hashArray)
            })
        }

        var liveApiCallback = $.trim(form.attr('data-live-api-callback'));
        if(liveApiCallback.length > 0) {
            result.push({
                name: "liveApiCallback",
                value: liveApiCallback
            })
        }

        if (typeof BX !== 'undefined') {
            result.push({
                name: 'sessid',
                value: BX.bitrix_sessid()
            })
        }

        return result;
    };

    /**
     * Отправляем счетчики аналитики
     * @param params
     */
    $.formCounter = function (params) {

        params = params || {};

        var dict = {

            /**
             * @type formEvt ([data-event-code])
             * @info По новым формам делать на основе этого типа
             */
            'application.send.who': {
                type: 'LEAD',
                dataLayer: {
                    action: 'send',
                    category: 'application',
                    label: 'who'
                }
            },
            'hh.send.career': {
                type: 'CAREER',
                dataLayer: {
                    action: 'send',
                    category: 'hh',
                    label: 'career'
                }
            },
            'application.send.prices': {
                type: 'LEAD',
                dataLayer: {
                    action: 'send',
                    category: 'application',
                    label: 'prices'
                }
            },
            'callback.send.middle': {
                type: 'CONSULT',
                dataLayer: {
                    action: 'send',
                    category: 'callback',
                    label: 'middle'
                }
            },
            'callback.send.last': {
                type: 'CONSULT',
                dataLayer: {
                    action: 'send',
                    category: 'callback',
                    label: 'last'
                }
            },
            'callback.send.pop-up.consult': {
                type: 'CONSULT',
                dataLayer: {
                    action: 'send',
                    category: 'callback',
                    label: 'pop-up'
                }
            },
            'application.send.pop-up.lead': {
                type: 'LEAD',
                dataLayer: {
                    action: 'send',
                    category: 'application',
                    label: 'pop-up'
                }
            },
            'callback.send.pop-up': {
                type: 'CALLBACK',
                dataLayer: {
                    action: 'send',
                    category: 'callback',
                    label: 'pop-up'
                }
            },
            'application.send.alfa': {
                type: 'CONSULT',
                dataLayer: {
                    action: 'send',
                    category: 'application',
                    label: 'alfa'
                }
            },
            'application.send.order': {
                type: 'ORDER',
                dataLayer: {
                    action: 'send',
                    category: 'application',
                    label: 'order'
                }
            },
            'application.lead': {
                type: 'LEAD'
            },
            'application.callback': {
                type: 'CALLBACK'
            },
            'application.consult': {
                type: 'CONSULT'
            },
            'leave-popup': {
                type: 'popup.application',
                dataLayer: {
                    action: 'send',
                    category: 'popup.application',
                }
            },

            /** formId */
            'reservation_page_application': {
                type: 'LEAD',
                dataLayer: {
                    action: 'send',
                    category: 'application',
                    label: 'pop-up'
                }
            },
            'career_grown_page_application': {
                type: 'LEAD',
                dataLayer: {
                    action: 'send',
                    category: 'application',
                    label: 'pop-up'
                }
            },
            'footer_page_consult': {
                type: 'CONSULT',
                dataLayer: {
                    action: 'send',
                    category: 'callback',
                    label: 'last'
                }
            },
            'career_page_traineeship_application': {
                type: 'CAREER',
                dataLayer: {
                    action: 'send',
                    category: 'callback',
                    label: 'last'
                }
            },
            'first_page_callback': {
                type: 'CALLBACK',
                dataLayer: {
                    action: 'send',
                    category: 'callback',
                    label: 'last'
                }
            },
            'first_page_consult': {
                type: 'CONSULT',
                dataLayer: {
                    action: 'send',
                    category: 'callback',
                    label: 'last'
                }
            },
            'footer_page_callback': {
                type: 'CALLBACK',
                dataLayer: {
                    action: 'send',
                    category: 'callback',
                    label: 'last'
                }
            },
            '16_weeks_page_consult': {
                type: 'CONSULT',
                dataLayer: {
                    action: 'send',
                    category: 'callback',
                    label: 'last'
                }
            },

            /** formCode */
            'callback': {
                type: 'CALLBACK',
                dataLayer: {
                    action: 'send',
                    category: 'callback',
                    label: 'last'
                }
            },
            'consult': {
                type: 'CONSULT',
                dataLayer: {
                    action: 'send',
                    category: 'callback',
                    label: 'last'
                }
            },
            'application': {
                type: 'LEAD',
                dataLayer: {
                    action: 'send',
                    category: 'application',
                    label: 'last'
                }
            },
            'bron': {
                type: 'LEAD',
                dataLayer: {
                    action: 'send',
                    category: 'application',
                    label: 'pop-up'
                }
            },
            'staj': {
                type: 'CAREER',
                dataLayer: {
                    action: 'send',
                    category: 'hh',
                    label: 'career'
                }
            },
            'aic-footer-consult': {
                type: 'CONSULT',
                dataLayer: {
                    action: 'send',
                    category: 'callback',
                    label: 'last'
                }
            },
            'sketch-zabronirovat': {
                type: 'LEAD',
                dataLayer: {
                    action: 'send',
                    category: 'application',
                    label: 'pop-up'
                }
            },
            'sketch-consult': {
                type: 'CONSULT',
                dataLayer: {
                    action: 'send',
                    category: 'callback',
                    label: 'last'
                }
            },
            'lead': {
                type: 'LEAD',
                dataLayer: {
                    action: 'send',
                    category: 'application',
                    label: 'pop-up'
                }
            },
            'buy': {
                type: 'LEAD',
                dataLayer: {
                    action: 'send',
                    category: 'application',
                    label: 'pop-up'
                }
            },

            /** subject */
            'Получить стажеров себе': {
                type: 'CAREER',
                dataLayer: {
                    action: 'send',
                    category: 'hh',
                    label: 'career'
                }
            },
            'Получить консультацию': {
                type: 'CONSULT',
                dataLayer: {
                    action: 'send',
                    category: 'callback',
                    label: 'last'
                }
            },
            'Забронировать место': {
                type: 'LEAD',
                dataLayer: {
                    action: 'send',
                    category: 'application',
                    label: 'pop-up'
                }
            },
            'Записаться на курс': {
                type: 'LEAD',
                dataLayer: {
                    action: 'send',
                    category: 'application',
                    label: 'pop-up'
                }
            },
            'Обратный звонок': {
                type: 'CALLBACK',
                dataLayer: {
                    action: 'send',
                    category: 'callback',
                    label: 'last'
                }
            },
            'web70mobile': {
                type: 'LEAD'
            },
            'clear_code_analytics': {
                dataLayer: {
                    action: 'send',
                    category: (!params.subjectForm || params.subjectForm == 'Получить консультацию') ? 'callback' : 'application'
                }
            },
            'application.send': {
                dataLayer: {
                    action: 'send',
                    category: 'application',
                }
            }
        };

        var item = dict[params.formEvt] || dict[params.formId] || dict[params.formCode] || dict[params.subject] || {};

        console.log(">> Counter [DETECT]: ", item);

        if (item.type) {

            typeof yaCounter !== "undefined" && yaCounter.reachGoal(item.type);
            typeof gaCounter !== "undefined" && gaCounter('send', 'event', item.type);
        }

        if (item.dataLayer) {
            const eventType = (item.dataLayer.category != 'popup.application') ? 'form.submit' : 'popup.application'

            typeof dataLayer !== "undefined" && dataLayer.push({
                event: eventType,
                details: item.dataLayer
            });

            typeof yaCounter !== "undefined" && yaCounter.reachGoal(item.dataLayer.category + '-send');
            typeof gaCounter !== "undefined" && gaCounter('send', 'event', item.dataLayer.category, item.dataLayer.label);
        }

        if (params.formEvt !== 'clear_code_analytics') {
            typeof fbq !== "undefined" && fbq('track', 'Lead');
        }

        if (params.target && typeof VK === 'object' && VK.Retargeting) {
            VK.Retargeting.Event(params.target);
        }

        window.advcake_data = window.advcake_data || [];
        window.advcake_data.push({
            pageType: 4,
        });
    };

    /**
     * Выполняет доп. действия с формой после отправки
     * @param params
     */
    $.formAfter = function (params) {

        params = params || {};

        var form = params.form;
        var response = params.response || {};
        var liveApiCallback = $.trim(form.attr('data-live-api-callback'));
        var curUri = window.location.href;
        var formPayment = form.attr('data-skip-payment');
        var designCourse = (curUri.indexOf('/interiordesign') !== -1)
            || (curUri.indexOf('/graphic-design') !== -1)
            || (curUri.indexOf('/targetolog') !== -1);

        var after = function () {

            /**
             * Удаляем сохранённые cookie
             */
            document.cookie = 'savedUTM=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
            var hasOnlinePayment = (document.body.getAttribute('data-hasOnlinePayment') === 'true');

            /**
             * Отключаем вывод попапа = "Получите консультацию и доступ к курсу на 3 дня"
             */
            window.countShowTrapPopup = 1;

          /**
            /**
             * Отключаем вывод попапа = "Получите консультацию и доступ к курсу на 3 дня"
             */
            window.countShowTrapPopup = 1;

            /**
             * Подставляем данные о заявке
             */
            if (hasOnlinePayment && formPayment != 'Y') {
                if (response.orderId) {
                    document.body.setAttribute('data-orderId', response.orderId);
                }

                if (response.name) {
                    document.body.setAttribute('data-orderName', response.name);
                }

                if (response.email) {
                    document.body.setAttribute('data-orderMail', response.email);
                }

                if (typeof window.payCourse !== "function") {
                    console.log('>> [Step 2] OnlinePayment: Function payCourse not defined');
                } else {
                    console.log('>> [Step 2] OnlinePayment: Show pop-up');
                    $('#payment .popup-autopayment__button').attr('onclick', '$.showPayForm()');
                    $('#payment .button-close').attr('onclick', 'popupAutopayment.classList.remove(\'popup--active\')');

                    if ($('#registration').length > 0) {
                        $('#registration a.modal-close').trigger('click');
                    }
                    if ($('#subscribe').length > 0) {
                        $('#subscribe a.modal-close').trigger('click');
                    }
                    if ($('.popup.activePopup').length > 0) {
                        $('.popup.activePopup').find('.popup_close').trigger('click');
                    }

                    if (typeof timerInit == "function") {
                        timerInit(timerParams, popupAutopayment);
                        popupAutopayment.classList.add('popup--active');
                    }
                }
            } else if (formPayment == 'Y') {
                if ($('#trap').hasClass('popup--active')) {
                    closeActivePopup();
                    showMessagePopup();
                }
            } else if (formPayment == 'Y') {
              if ($('#trap').hasClass('popup--active')) {
                  closeActivePopup();
                  showMessagePopup();
              }
            }

            /**
             * Редирект с курса на связанную страницу
             */
            var redirect = form.attr('data-redirect-url');
            if (redirect) {
                window.setTimeout(function () {
                    window.location.href = redirect;
                }, parseFloat(form.attr('data-redirect-time') || 1000));
            }

            // Отключаем событие после заполнения формы
            // if (designCourse && window.dataLayer) {
            //     if ($(form).hasClass('form__consult') || $(form).hasClass('form__feedback')) {
            //         typeof dataLayer !== "undefined" && dataLayer.push({
            //             event: 'form.submit',
            //             details: {category: 'callback', action: 'send', label: ''}
            //         });
            //     } else {
            //         typeof dataLayer !== "undefined" && dataLayer.push({
            //             event: 'form.submit',
            //             details: {category: 'application', action: 'send', label: ''}
            //         });
            //     }
            //
            // }
        };

        after();
    };

    /**
     * Отправка данных на сервер API
     * @param params
     */
    $.formSend = function (params) {
        params = params || {};

        var form = params.form;
        var action = params.action && typeof params.action === "function"
            ? params.action
            : function () {
            };
        params = $.extend({}, params, {
            data: $.formData(params),
            serialize: form.serialize()
        });

        /**
         * Обработчик ajax результата
         * @param response
         */
        var on = function (response) {

            try {
                response = response || {};
                if (response.status === 'ok' || response.status === 'success') {
                    action('success', response, params);
                } else {
                    throw new Error('error');
                }
            } catch (ex) {
                action('error', {}, params);
                if (params.form.attr('data-leave') == 'Y') {
                    var popupMessage = document.querySelector('.popup-message');
                    var popupMessageTitle = popupMessage.querySelector('.popup-message__title');
                    var popupMessageDesc = popupMessage.querySelector('.popup-message__desc');
                    popupMessageTitle.textContent = 'Что-то пошло не так ;(';
                    popupMessageDesc.textContent = 'Попробуйте еще раз.';
                    popupMessage.classList.add('popup-message--error');
                    showPopup(popupMessage);
                } else {
                    alert('Во время отправки заявки произошла ошибка :(');

                }
                console.trace('>> Ошибка: ', ex);
            }
        };

        $.formSend.xhr && $.formSend.xhr.readyState !== 4 && $.formSend.xhr.abort();
        $.formSend.xhr = $.ajax({
            type: 'POST',
            url: params.url
                ? params.url
                : (form.attr('data-action-url') === 'Y'
                    ? form.attr('action')
                    : options.API_SEND),
            dataType: "json",
            data: $.param(params.data),
            beforeSend: function () {
                action('before', {}, params);
            },
            success: on,
            error: function () {
                on(false);
            }
        });
    };

})();
