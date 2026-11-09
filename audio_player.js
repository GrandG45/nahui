(function () {
    'use strict';

    var audio = document.getElementById('page_audio');
    var button = document.getElementById('page_audio_button');
    if (!audio || !button) {
        return;
    }

    // Пауза между повторами, в миллисекундах. Поменяй число, если нужна другая.
    var LOOP_PAUSE_MS = 3000;

    var started = false;
    var waiting = false;
    var pauseTimer = null;

    function clearPause() {
        if (pauseTimer) {
            clearTimeout(pauseTimer);
            pauseTimer = null;
        }
    }

    function playPageSound() {
        clearPause();
        audio.pause();
        try {
            audio.currentTime = 0;
        } catch (e) {}

        var playback = audio.play();
        if (playback && typeof playback.then === 'function') {
            playback.then(function () { started = true; }, waitForGesture);
        } else {
            started = true;
        }
    }

    // Браузеры не дают звуку играть сами по себе, пока человек ничего не нажал:
    // тогда звук стартует с первого действия на странице.
    function waitForGesture() {
        if (waiting) {
            return;
        }
        waiting = true;
        var names = ['pointerdown', 'keydown', 'touchstart'];
        var onGesture = function (e) {
            if (button.contains(e.target)) {
                return; // клик по гифке сам запускает звук
            }
            names.forEach(function (n) { document.removeEventListener(n, onGesture, true); });
            waiting = false;
            if (!started) {
                playPageSound();
            }
        };
        names.forEach(function (n) { document.addEventListener(n, onGesture, true); });
    }

    // Звук играет по кругу, между повторами небольшая пауза.
    audio.addEventListener('ended', function () {
        clearPause();
        pauseTimer = setTimeout(function () {
            pauseTimer = null;
            playPageSound();
        }, LOOP_PAUSE_MS);
    });

    button.addEventListener('click', playPageSound);
    playPageSound();
}());
