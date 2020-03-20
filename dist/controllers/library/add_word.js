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
const keyboards_1 = require("./keyboards");
const typeorm_1 = require("typeorm");
const translate_1 = require("../../util/translate");
const word_info_template_1 = require("../../util/word_info.template");
const base_1 = __importDefault(require("telegraf/scenes/base"));
const word_1 = require("../../models/word");
exports.libraryAddWord = new base_1.default('libraryAddWord');
exports.libraryAddWord.on('text', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const wordToTranslate = ctx.update.message.text;
        const translatedWord = yield translate_1.translate(wordToTranslate);
        const wordRepository = typeorm_1.getCustomRepository(word_1.WordRepository);
        const existWord = yield wordRepository.findOne({ en: translatedWord.en });
        if (existWord) {
            ctx.state.selectedWord = existWord;
            console.log(ctx.state);
            return ctx.upReply(`⚠️ Слово уже было добавлено  \n\n${word_info_template_1.wordInfo(existWord)}`, keyboards_1.afterSaveWordBoard());
        }
        const word = yield wordRepository.createWord(Object.assign({ user: ctx.from }, translatedWord));
        ctx.state.selectedWord = word;
        console.log(ctx.state);
        // console.log(await wordRepository.find());
        return ctx.upReply(`✅ Слово успешно сохранено  \n\n${word_info_template_1.wordInfo(word)}`, keyboards_1.afterSaveWordBoard());
    }
    catch (e) {
    }
}));
//# sourceMappingURL=add_word.js.map