import './config/env';
import './config/typeorm';
import { extendedСontext } from './config/context';
import Telegraf, { ContextMessageUpdate } from 'telegraf';
import { library } from './controllers/library';
import { profile } from './controllers/profile';
import Stage from 'telegraf/stage';
import session from 'telegraf/session';

const bot = new Telegraf(process.env.BOT_TOKEN);

const stage = new Stage([profile, library], { default: library });

bot.use(session());
bot.use(stage.middleware());
bot.context = { ...bot.context, ...extendedСontext };

bot.start(async (ctx: ContextMessageUpdate) => {
  ctx.scene.enter('library');
});

bot.launch();
