"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extendedСontext = {
    upReply(message, keyboard) {
        try {
            this.telegram.editMessageText(this.from.id, this.update.callback_query.message.message_id, 0, message, keyboard);
        }
        catch (e) {
            this.reply(message, keyboard);
        }
    },
};
//# sourceMappingURL=context.js.map