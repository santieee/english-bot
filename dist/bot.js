"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./config/env");
require("./config/typeorm");
const context_1 = require("./config/context");
const telegraf_1 = __importDefault(require("telegraf"));
const library_1 = require("./controllers/library");
const profile_1 = require("./controllers/profile");
const stage_1 = __importDefault(require("telegraf/stage"));
const session_1 = __importDefault(require("telegraf/session"));
const bot = new telegraf_1.default(process.env.BOT_TOKEN);
const stage = new stage_1.default([profile_1.profile, library_1.library], { default: library_1.library });
bot.use(session_1.default());
bot.use(stage.middleware());
bot.context = Object.assign(Object.assign({}, bot.context), context_1.extendedСontext);
bot.start((ctx) => __awaiter(void 0, void 0, void 0, function* () {
    ctx.scene.enter('library');
}));
bot.launch();
//# sourceMappingURL=bot.js.map