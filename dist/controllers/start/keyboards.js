"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const telegraf_1 = require("telegraf");
function startBoard() {
    return telegraf_1.Extra.HTML().markup((m) => m.inlineKeyboard([
        [m.callbackButton('📚 Словарь', 'library', false)],
        [m.callbackButton('👤 Личный кабинет', 'lk', false)],
    ], {}));
}
exports.startBoard = startBoard;
//# sourceMappingURL=keyboards.js.map