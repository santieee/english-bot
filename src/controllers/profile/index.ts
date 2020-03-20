import Scene from 'telegraf/scenes/base';
import { ContextMessageUpdate } from 'telegraf';
import { showProfile } from './actions';

export const profile = new Scene('profile');

profile.enter((ctx: ContextMessageUpdate) => {
  showProfile(ctx);
});

profile.action('back', (ctx: ContextMessageUpdate) => {
  ctx.scene.enter('library');
});