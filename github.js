// Ссылка на твой GitHub внизу страниц языков, на месте бывшей кнопки «★ GitHub».
// Впиши адрес своего репозитория или профиля между кавычками, например:
//   var NATRIBU_GITHUB_URL = 'https://github.com/ник/репозиторий';
// Пустая строка: ссылки нет.
var NATRIBU_GITHUB_URL = '';

(function () {
    'use strict';

    var cell = document.getElementById('github_cell');
    if (!cell || !/^https?:\/\//i.test(NATRIBU_GITHUB_URL)) {
        return;
    }
    var link = document.createElement('a');
    link.href = NATRIBU_GITHUB_URL;
    link.target = '_blank';
    link.rel = 'noopener';
    link.style.fontSize = 'smaller';
    link.textContent = '★ GitHub';
    cell.appendChild(link);
}());
