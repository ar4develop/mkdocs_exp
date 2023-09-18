'use strict';

(function ($) {
    // максимальное количество выводимых статей включая основную статью
    var maxPages = 5;

    // селектор статьи
    var elementContainerSelector = '[data-area="article"]';

    // селектор последнего элемента внутри статьи для определения нижней границы статьи и получения url
    var elementBottomSelector = '[data-area="article-bottom"]';

    // селектор прикреплённого блока с соцкнопками
    var articleStickySelector = '[data-area="article-sticky"]';

    var scrollEventName = 'scroll.toInfinity touchmove';

    var $window = $(window);

    var halfWindowHeight = $window.height() / 2;

    var $elementContainer;
    var $elementBottomContainer;
    var points = [];
    var activePointIndex = false;

    var loadNextArticleInProgress = false;

    // заполняем переменные контейнеров актуальными элементами страницы
    function initContainers() {
        $elementContainer = $(elementContainerSelector).last();
        $elementBottomContainer = $elementContainer.find(elementBottomSelector);
    }

    // верхняя границы текущей статьи
    function getOffset() {
        return $elementContainer.offset().top - 50;
    }

    // добавляем координаты и url статьи в список находящихся на странице
    function addPoint() {
        var currentUrl = $elementBottomContainer.data('current-url');
        var currentTitle = $elementContainer.data('title');

        points.push({
            offset        : getOffset(),
            url           : currentUrl,
            title         : currentTitle,
            countersLoaded: (activePointIndex === false),  // для первой статьи не отправляем
        });
    }

    function initRewriteUTM() {
        if (typeof rewriteUTM === 'function') {
            rewriteUTM();
        }
    }

    // слушаем событие скролла
    function initScrollEventListen() {
        $window.on(scrollEventName, scrollEventHandler);
    }

    // обработчик события скролла
    function scrollEventHandler() {
        // событие на прокрутку должно сработать только один раз
        $window.off(scrollEventName);

        scrollEventAction(function () {
            // после окончания загрузки снова ждем прокрутки
            initScrollEventListen();
        });
    }

    // прикрепляем стикеры для активной статьи и отключаем для остальных
    function updateStickyState() {
        var $currentArticle = $(elementContainerSelector).eq(activePointIndex);

        var $articleSticky = $currentArticle.find(articleStickySelector);

        if ($articleSticky.length) {
            $articleSticky.sticky({topSpacing: 100, bottomSpacing: 800});
            $articleSticky.animate({opacity: 1});
        }

        var $notCurrentArticles = $(elementContainerSelector).not($currentArticle);

        if ($notCurrentArticles.length) {
            $notCurrentArticles.find(articleStickySelector).each(function (index, notCurrentArticle) {
                var $notCurrentArticle = $(notCurrentArticle);

                // noinspection JSCheckFunctionSignatures
                $notCurrentArticle.animate({opacity: 0}, function () {
                    $notCurrentArticle.unstick();
                });
            });
        }
    }

    function getHash($obj) {
        return murmurHash3.x86.hash128(JSON.stringify($obj))
    }

    // действие по событию скролла
    function scrollEventAction(epilog) {
        if (needLoadNextArticle()) {
            // лимит количества статей
            if (points.length >= maxPages) {
                epilog();  // продолжаем следить за прокруткой
                return true;
            }

            var ids = [];
            $(elementBottomSelector).each(function() {
                ids.push($(this).data('id'));
            });

            loadNextArticleInProgress = true;

            $.ajax({
                url: '/local/ajax/getNextArticle.php',
                type: 'POST',
                data: {
                    ids: ids,
                },
                success: function(result) {
                    if (result.status === 'ok') {
                        if (result.next === '') {
                            // если для следующей статьи нет url
                            epilog();  // продолжаем следить за прокруткой
                        } else {
                            // загружаем следующую статью
                            $.get(result.next, function(data) {
                                var $data = $(data);

                                var $newArticleContent = $data.find(elementContainerSelector);

                                if ($newArticleContent.length === 0) {
                                    throw 'Could not find ' + elementContainerSelector;
                                }

                                // выводим новую статью под последней
                                $elementContainer.after($newArticleContent[0].outerHTML);

                                //выводим боковой баннер
                                typeof window.showSideBanner === 'function'
                                && window.showSideBanner($elementContainer.next());

                                // скрываем iframe facebook
                                typeof window.hideFacebook === 'function'
                                && window.hideFacebook($elementContainer.next());

                                // получаем контейнеры от последней статьи
                                initContainers();

                                if (!$elementBottomContainer.length) {
                                    loadNextArticleInProgress = false;

                                    epilog(); // по окончании загрузки снова следим за прокруткой
                                    return;
                                }

                                // добавляем коодинаты и url последней статьи в список
                                addPoint();

                                // что-то ещё прогружается, обновляем границы статьи
                                setTimeout(
                                    function() {
                                        points[points.length - 1].offset = getOffset();
                                    },
                                    1000
                                );

                                // прикрепляем стикеры для активной статьи и отключаем для остальных
                                updateStickyState();

                                loadNextArticleInProgress = false;

                                epilog();  // продолжаем следить за прокруткой
                            });
                        }
                    }
                },
                error: function() {
                    loadNextArticleInProgress = false;
                }
            });

            epilog();  // продолжаем следить за прокруткой
            return;
        }

        // индекс текущей точки
        var currentPointIndex = getCurrentPointIndex();

        if (currentPointIndex !== activePointIndex) {
            activePointIndex = currentPointIndex;

            var currentPoint = points[activePointIndex];

            // меняем url
            historyPushState(currentPoint.url);

            // Меняем заголовок браузера
            document.title = currentPoint.title;

            // прикрепляем стикеры для активной статьи и отключаем для остальных
            updateStickyState();

            if (!currentPoint.countersLoaded) {
                updateCounter();
            }
        }

        // ждём дальше
        epilog();  // продолжаем следить за прокруткой
        return true;
    }

    function needLoadNextArticle() {
        if (loadNextArticleInProgress) {
            return false;
        }
        if($("#test_iframe").length)
        {
            return false;
        }


        var scrollPosition = $window.scrollTop() + $window.height();
        var endOfPage = $(document).height() - (halfWindowHeight * 6);

        return (scrollPosition > endOfPage);
    }

    function updateCounter() {
        var currentPoint = points[activePointIndex];

        var url = currentPoint.url;
        var title = currentPoint.title;

        if (window.requestIdleCallback) {
            requestIdleCallback(function () {
                Fingerprint2.get(function (components) {
                    var $url = url,
                        $hash = getHash(components);
                    if($url.length > 0 && $hash.length > 0) {
                        var xhr = new XMLHttpRequest();
                        var body = 'url=' + encodeURIComponent($url) +
                            '&hash=' + encodeURIComponent($hash);

                        xhr.open('POST', '/local/ajax/addCounter.php', true);
                        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                        xhr.send(body);
                    }
                })
            })
        } else {
            setTimeout(function () {
                Fingerprint2.get(function (components) {
                    var $url = url,
                        $hash = getHash(components);
                    if($url.length > 0 && $hash.length > 0) {
                        var xhr = new XMLHttpRequest();
                        var body = 'url=' + encodeURIComponent($url) +
                            '&hash=' + encodeURIComponent($hash);

                        xhr.open('POST', '/local/ajax/addCounter.php', true);
                        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                        xhr.send(body);
                    }
                })
            }, 500)
        }

        // счетчик GTM
        if (typeof dataLayer !== 'undefined') {
            dataLayer.push({
                event: 'pageview',
                page: {
                    path: url,
                    title: title,
                }
            });
        }

        // счетчик Я.Метрики
        if (typeof ym !== 'undefined') {
            ym(
                45205785,
                'hit',
                url,
                {
                    title: title,
                }
            );
        }

        initRewriteUTM();

        points[activePointIndex].countersLoaded = true;
    }

    function getCurrentPointIndex() {
        var scrollPosition = $window.scrollTop();

        for (var index = (points.length - 1); index >= 0; index--) {
            var point = points[index];

            if (scrollPosition > point.offset) {
                return index;
            }
        }

        return 0;
    }

    function historyPushState(nextArticleUrl) {
        if (typeof window.history === 'object') {
            window.history.pushState(null, null, nextArticleUrl);
        }
    }

    $(function () {
        initContainers();

        if (!$elementBottomContainer.length) {
            return;
        }

        addPoint();

        initScrollEventListen();
    });
})(jQuery);
