import { ContextMessageUpdate } from 'telegraf';
import { getLibrary, saveWord, removeWord, getWord, greeting } from './actions';
import Scene from 'telegraf/scenes/base';

export const library = new Scene('library');

library.enter((ctx: ContextMessageUpdate) => {
  greeting(ctx);
});

library.enter((ctx: ContextMessageUpdate) => {
  getLibrary(ctx);
});

library.action('profile', async (ctx: ContextMessageUpdate) => {
  ctx.scene.enter('profile');
});

library.action(/getLibrary/, (ctx: ContextMessageUpdate) => {
  getLibrary(ctx);
});

library.action(/getWord/, async (ctx: ContextMessageUpdate) => {
  getWord(ctx);
});

// library.action('addWord', async (ctx: ContextMessageUpdate) => {
//   return ctx.upReply('Введите слово', backToLibrary());
// });

library.action('back', async (ctx: ContextMessageUpdate) => {
  ctx.scene.reenter();
});

library.on('text', (ctx: ContextMessageUpdate) => {
  saveWord(ctx);
});

library.action(/removeWord/, (ctx: ContextMessageUpdate) => {
  removeWord(ctx);
});

library.action('back', async (ctx: ContextMessageUpdate) => {
  ctx.scene.enter('library');
});