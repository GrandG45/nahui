(function () {
    'use strict';

    // Локальный счётчик: сколько раз эта страница открывалась у тебя.
    var script = document.currentScript;
    var key = 'natribu_count_' + ((script && script.getAttribute('data-key')) || 'ru');
    var number = 1;
    try {
        number = (parseInt(window.localStorage.getItem(key), 10) || 0) + 1;
        window.localStorage.setItem(key, String(number));
    } catch (e) {}

    var counters = document.querySelectorAll('span[id=counter]');
    if (!counters.length) {
        return;
    }
    for (var i = 0; i < counters.length; i++) {
        counters[i].textContent = number;
    }

    // Как на оригинале: через минуту, а потом каждые 10 секунд счётчик на 0,8 с краснеет.
    function flash() {
        for (var i = 0; i < counters.length; i++) {
            counters[i].style.color = 'red';
        }
        setTimeout(function () {
            for (var i = 0; i < counters.length; i++) {
                counters[i].style.color = '';
            }
        }, 800);
    }
    setTimeout(function tick() {
        flash();
        setTimeout(tick, 10000);
    }, 60000);
}());
