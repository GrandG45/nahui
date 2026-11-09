(function () {
    'use strict';

    var KEY = 'natribu_theme';
    var root = document.documentElement;

    function stored() {
        try { return window.localStorage.getItem(KEY); } catch (e) { return null; }
    }

    function apply(theme) {
        if (theme === 'dark') {
            root.setAttribute('data-theme', 'dark');
        } else {
            root.removeAttribute('data-theme');
        }
    }

    // по умолчанию светлая, как на оригинале; тёмная включается кнопкой и запоминается
    apply(stored());

    function addButton() {
        var button = document.createElement('button');
        button.type = 'button';
        button.id = 'theme_toggle';
        button.textContent = '◐';
        button.title = 'Тёмная / светлая тема';
        button.setAttribute('aria-label', button.title);
        button.addEventListener('click', function () {
            var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            apply(next);
            try { window.localStorage.setItem(KEY, next); } catch (e) {}
        });
        document.body.appendChild(button);
    }

    if (document.body) {
        addButton();
    } else {
        document.addEventListener('DOMContentLoaded', addButton);
    }
}());
