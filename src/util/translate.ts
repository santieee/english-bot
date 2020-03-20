import axios from 'axios';
import { Word } from '../models/word';

export async function translate(word: string) {
  try {
    const isEnglish = /[a-zA-Z]/g.test(word);
    const langToTranslate = isEnglish ? 'en-ru' : 'ru-en';
    const uri = encodeURI(
      `https://translate.yandex.net/api/v1.5/tr.json/translate?` +
      `lang=${langToTranslate}` +
      `&key=${process.env.TRANSLATE_TOKEN}` +
      `&text=${word}`,
    );
    
    const { data } = await axios.get(uri);
    const translated = data.text.join(', ').toLowerCase();
    const wordToTranslate = word.toLowerCase();
    const wordData = {
      en: isEnglish ? wordToTranslate : translated,
      ru: isEnglish ? translated : wordToTranslate,
    };
    return wordData;
  } catch (e) {
    console.log('ERROR: ', e);
  }
}