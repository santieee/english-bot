import { Extra, Markup } from 'telegraf';

export function profileBoard() {
  return Extra.HTML().markup((m: Markup) =>
    m.inlineKeyboard([
      [m.callbackButton('↩️ Назад', 'back', false)],
    ], {}),
  );
}