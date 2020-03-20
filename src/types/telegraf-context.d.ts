import { Word } from "../models/word";

declare module 'telegraf' {
  interface ContextMessageUpdate {
    scene: any;
    session: {
      page: number;
    };
    upReply: Function;
    from: any;
  }
}