import { User } from '../models/user';

export function profileInfo(user: User) {
  return `👤 Профиль \n` +
  `➖➖➖➖➖➖➖➖➖➖\n` +
  `<b>Username:</b> @${user.username}\n` +
  `<b>Name:</b> ${user.first_name}\n` +
  `<b>Добавлено слов:</b> ${user.words.length}`;

}