import { Word } from '../models/word';

export function wordInfo(word: Word) {
  
  return `${word.en} - ${word.ru} \n\n` +
    `Добавлено: @${word.user.username} \n` +
    `Дата добавления: ${parseDate(word.createdAt)}`;
} 

export function parseDate(date: string) {
  const dateForFormat = JSON.parse(JSON.stringify(date)).split('T')[0];
  const [yy, mm, dd] = dateForFormat.split('-');
  return `${dd}.${mm}.${yy}`;
}