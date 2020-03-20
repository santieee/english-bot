"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const telegraf_1 = require("telegraf");
function profileBoard() {
    return telegraf_1.Extra.HTML().markup((m) => m.inlineKeyboard([
        [m.callbackButton('↩️ Назад', 'back', false)],
    ], {}));
}
exports.profileBoard = profileBoard;
//# sourceMappingURL=keyboards.js.map