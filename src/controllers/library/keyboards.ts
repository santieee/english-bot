import { Extra, Markup } from 'telegraf';
import { Word } from '../../models/word';

export function startBoard() {
  return Extra.HTML().markup((m: Markup) =>
    m.inlineKeyboard([
      [m.callbackButton('📚 Словарь', JSON.stringify({a: 'getLibrary'}), false)],
      [m.callbackButton('👤 Личный кабинет', 'profile', false)],
    ], {}),
  );
}

export function libraryBoard(data: {words: Word[], page: number, pages: number}) {
 
  const backArrow: [string, string, boolean] = data.page > 1 ?
    ['⬅️', JSON.stringify({a: 'getLibrary' , page: data.page - 1}), false] :
    ['⏹', 'stub', false];
  const nextArrow: [string, string, boolean] =  data.page < data.pages ?
    ['➡️', JSON.stringify({a: 'getLibrary' , page: data.page + 1}), false] :
    ['⏹', 'stub', false];
    
  return Extra.HTML().markup((m: Markup) =>
    m.inlineKeyboard([
      ...data.words.map( (word: Word) => [m.callbackButton(word.en, JSON.stringify({a: 'getWord', id: word.id}), false)]),
      [m.callbackButton(...backArrow), m.callbackButton(...nextArrow)],
      // [m.callbackButton('➕ Добавить слово', 'addWord', false)],
      [m.callbackButton('↩️ Назад', 'back', false)],
    ], {}),
  );
}

export function afterSaveWordBoard(id: number) {
  return Extra.HTML().markup((m: Markup) =>
    m.inlineKeyboard([
      [m.callbackButton('❌ Удалить', JSON.stringify({a: 'removeWord', id}), false)],
      [m.callbackButton('↩️ Назад', JSON.stringify({a: 'getLibrary'}), false)],
    ], {}),
  );
}

export function backToLibrary() {
  return Extra.HTML().markup((m: Markup) =>
    m.inlineKeyboard([
      [m.callbackButton('↩️ Назад', JSON.stringify({a: 'getLibrary'}), false)],
    ], {}),
  );
}