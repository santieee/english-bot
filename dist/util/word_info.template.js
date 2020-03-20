"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function wordInfo(word) {
    return `<b>${word.en}</b> - ${word.ru} \n\n` +
        `Добавлено: @${word.user.username} \n` +
        `Дата добавления: ${parseDate(word.createdAt)}`;
}
exports.wordInfo = wordInfo;
function parseDate(date) {
    const dateForFormat = JSON.parse(JSON.stringify(date)).split('T')[0];
    const [yy, mm, dd] = dateForFormat.split('-');
    return `${dd}.${mm}.${yy}`;
}
exports.parseDate = parseDate;
//# sourceMappingURL=word_info.template.js.map