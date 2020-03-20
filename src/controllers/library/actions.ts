import { ContextMessageUpdate } from 'telegraf';
import { getCustomRepository, Not } from 'typeorm';
import { libraryBoard, backToLibrary, afterSaveWordBoard, startBoard } from './keyboards';
import { WordRepository, Word } from '../../models/word';
import { UserRepository } from '../../models/user';
import { wordInfo } from '../../util/word.template';
import { translate } from '../../util/translate';


export async function greeting(ctx: ContextMessageUpdate) {
  const userRepository = getCustomRepository(UserRepository);
  await userRepository.createUser(ctx.from);
  return ctx.upReply(`🌐 Добро пожаловать!\n➖➖➖➖➖➖➖➖➖➖\n`, startBoard());
}

export async function getLibrary(ctx: ContextMessageUpdate) {
  let page;
  if (ctx.match.input && /page/.test(ctx.match.input)) page = JSON.parse(ctx.match.input).page;
  else page = ctx.session.page ? ctx.session.page : 1;
  ctx.session.page = page;
  const wordRepository = getCustomRepository(WordRepository);
  const words = await wordRepository.getWords({page});
  const text = `📚 Словарь \n` +
  `➖➖➖➖➖➖➖➖➖➖\n` +
  `Страница ${words.page}/${words.pages}`;
  return ctx.upReply(text, libraryBoard(words));
}

export async function saveWord(ctx: ContextMessageUpdate) {
  try {
    const wordToTranslate = ctx.update.message.text;
    if (wordToTranslate === '/start') return ctx.scene.reenter();
    const translatedData = await translate(wordToTranslate);

    const wordRepository = getCustomRepository(WordRepository);
    const wordExist = await wordRepository.findOne({en: translatedData.en});
    if (wordExist) {
      return ctx.upReply(
        `⚠️ Слово уже было добавлено\n` +
        `➖➖➖➖➖➖➖➖➖➖\n` +
        `\n${wordInfo(wordExist)}`, 
        afterSaveWordBoard(wordExist.id),
      );
    }
    const word = await wordRepository.createWord({user: ctx.from, ...translatedData});
    await ctx.upReply(
      `✅ Слово успешно сохранено \n` +
      `➖➖➖➖➖➖➖➖➖➖\n` +
      `\n${wordInfo(word)}`, 
      afterSaveWordBoard(word.id),
    );
    noticeAboutNewWord(ctx, word);
  } catch (e) {
    console.log('ERROR', e);
    return ctx.upReply(`⛔️ Что-то пошло не так`,  backToLibrary());
  } 
}

export async function getWord(ctx: ContextMessageUpdate) {
  const wordRepository = getCustomRepository(WordRepository);
  const wordId = JSON.parse(ctx.match.input).id;
  const word = await wordRepository.findOne({id: wordId});
  return ctx.upReply(`${wordInfo(word)}`, afterSaveWordBoard(word.id));
}

export async function removeWord(ctx: ContextMessageUpdate) {
  const wordRepository = getCustomRepository(WordRepository);
  const idForRemove = JSON.parse(ctx.match.input).id;
  wordRepository.delete(idForRemove);
  return ctx.upReply(`✅ Слово успешно удалено, можете продолжить вводить слова для добавления.`,  backToLibrary());
}

export async function noticeAboutNewWord(ctx: ContextMessageUpdate, word: Word) {
  const userRepository = getCustomRepository(UserRepository);
  const usersWithouSender = await userRepository.find({ id: Not(ctx.from.id) });
  for (const user of usersWithouSender) {
    ctx.telegram.sendMessage(
      user.id, 
      `⚡️Новое слово!\n` +
      `➖➖➖➖➖➖➖➖➖➖\n` + 
      `${wordInfo(word)}`,
      backToLibrary(),
    );
  }
}