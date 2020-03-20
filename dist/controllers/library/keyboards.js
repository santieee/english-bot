"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const telegraf_1 = require("telegraf");
function startBoard() {
    return telegraf_1.Extra.HTML().markup((m) => m.inlineKeyboard([
        [m.callbackButton('📚 Словарь', JSON.stringify({ a: 'getLibrary' }), false)],
        [m.callbackButton('👤 Личный кабинет', 'profile', false)],
    ], {}));
}
exports.startBoard = startBoard;
function libraryBoard(data) {
    const backArrow = data.page > 1 ?
        ['⬅️', JSON.stringify({ a: 'getLibrary', page: data.page - 1 }), false] :
        ['⏹', 'stub', false];
    const nextArrow = data.page < data.pages ?
        ['➡️', JSON.stringify({ a: 'getLibrary', page: data.page + 1 }), false] :
        ['⏹', 'stub', false];
    return telegraf_1.Extra.HTML().markup((m) => m.inlineKeyboard([
        ...data.words.map((word) => [m.callbackButton(word.en, JSON.stringify({ a: 'getWord', id: word.id }), false)]),
        [m.callbackButton(...backArrow), m.callbackButton(...nextArrow)],
        // [m.callbackButton('➕ Добавить слово', 'addWord', false)],
        [m.callbackButton('↩️ Назад', 'back', false)],
    ], {}));
}
exports.libraryBoard = libraryBoard;
function afterSaveWordBoard(id) {
    return telegraf_1.Extra.HTML().markup((m) => m.inlineKeyboard([
        [m.callbackButton('❌ Удалить', JSON.stringify({ a: 'removeWord', id }), false)],
        [m.callbackButton('↩️ Назад', JSON.stringify({ a: 'getLibrary' }), false)],
    ], {}));
}
exports.afterSaveWordBoard = afterSaveWordBoard;
function backToLibrary() {
    return telegraf_1.Extra.HTML().markup((m) => m.inlineKeyboard([
        [m.callbackButton('↩️ Назад', JSON.stringify({ a: 'getLibrary' }), false)],
    ], {}));
}
exports.backToLibrary = backToLibrary;
//# sourceMappingURL=keyboards.js.map