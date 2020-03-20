import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../../models/user';
import { ContextMessageUpdate } from 'telegraf';
import { profileInfo } from '../../util/profile.template';
import { profileBoard } from './keyboards';

export async function showProfile(ctx: ContextMessageUpdate) {
  const userRepository = getCustomRepository(UserRepository);
  const user = await userRepository.findOne({where: {id: ctx.from.id} , relations: ['words']});
  return ctx.upReply(profileInfo(user), profileBoard());
}