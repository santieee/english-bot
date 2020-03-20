"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function profileInfo(user) {
    return `👤 Профиль \n` +
        `➖➖➖➖➖➖➖➖➖➖\n` +
        `<b>Username:</b> @${user.username}\n` +
        `<b>Name:</b> ${user.first_name}\n` +
        `<b>Добавлено слов:</b> ${user.words.length}`;
}
exports.profileInfo = profileInfo;
//# sourceMappingURL=profile.template.js.map