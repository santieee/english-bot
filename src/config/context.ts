export const extendedСontext = {
  upReply(message: string, keyboard: object) {
    try {
      this.telegram.editMessageText(this.from.id, this.update.callback_query.message.message_id, 0, message, keyboard);
    } catch (e) {
      this.reply(message, keyboard);
    }
    
  },
};
