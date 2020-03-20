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
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const keyboards_1 = require("./keyboards");
const word_1 = require("../../models/word");
const user_1 = require("../../models/user");
const word_template_1 = require("../../util/word.template");
const translate_1 = require("../../util/translate");
function greeting(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        const userRepository = typeorm_1.getCustomRepository(user_1.UserRepository);
        yield userRepository.createUser(ctx.from);
        return ctx.upReply(`🌐 Добро пожаловать!\n➖➖➖➖➖➖➖➖➖➖\n`, keyboards_1.startBoard());
    });
}
exports.greeting = greeting;
function getLibrary(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        let page;
        if (ctx.match.input && /page/.test(ctx.match.input))
            page = JSON.parse(ctx.match.input).page;
        else
            page = ctx.session.page ? ctx.session.page : 1;
        ctx.session.page = page;
        const wordRepository = typeorm_1.getCustomRepository(word_1.WordRepository);
        const words = yield wordRepository.getWords({ page });
        const text = `📚 Словарь \n` +
            `➖➖➖➖➖➖➖➖➖➖\n` +
            `Страница ${words.page}/${words.pages}`;
        return ctx.upReply(text, keyboards_1.libraryBoard(words));
    });
}
exports.getLibrary = getLibrary;
function saveWord(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const wordToTranslate = ctx.update.message.text;
            if (wordToTranslate === '/start')
                return ctx.scene.reenter();
            const translatedData = yield translate_1.translate(wordToTranslate);
            const wordRepository = typeorm_1.getCustomRepository(word_1.WordRepository);
            const wordExist = yield wordRepository.findOne({ en: translatedData.en });
            if (wordExist) {
                return ctx.upReply(`⚠️ Слово уже было добавлено\n` +
                    `➖➖➖➖➖➖➖➖➖➖\n` +
                    `\n${word_template_1.wordInfo(wordExist)}`, keyboards_1.afterSaveWordBoard(wordExist.id));
            }
            const word = yield wordRepository.createWord(Object.assign({ user: ctx.from }, translatedData));
            yield ctx.upReply(`✅ Слово успешно сохранено \n` +
                `➖➖➖➖➖➖➖➖➖➖\n` +
                `\n${word_template_1.wordInfo(word)}`, keyboards_1.afterSaveWordBoard(word.id));
            noticeAboutNewWord(ctx, word);
        }
        catch (e) {
            console.log('ERROR', e);
            return ctx.upReply(`⛔️ Что-то пошло не так`, keyboards_1.backToLibrary());
        }
    });
}
exports.saveWord = saveWord;
function getWord(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        const wordRepository = typeorm_1.getCustomRepository(word_1.WordRepository);
        const wordId = JSON.parse(ctx.match.input).id;
        const word = yield wordRepository.findOne({ id: wordId });
        return ctx.upReply(`${word_template_1.wordInfo(word)}`, keyboards_1.afterSaveWordBoard(word.id));
    });
}
exports.getWord = getWord;
function removeWord(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        const wordRepository = typeorm_1.getCustomRepository(word_1.WordRepository);
        const idForRemove = JSON.parse(ctx.match.input).id;
        wordRepository.delete(idForRemove);
        return ctx.upReply(`✅ Слово успешно удалено, можете продолжить вводить слова для добавления.`, keyboards_1.backToLibrary());
    });
}
exports.removeWord = removeWord;
function noticeAboutNewWord(ctx, word) {
    return __awaiter(this, void 0, void 0, function* () {
        const userRepository = typeorm_1.getCustomRepository(user_1.UserRepository);
        const usersWithouSender = yield userRepository.find({ id: typeorm_1.Not(ctx.from.id) });
        for (const user of usersWithouSender) {
            ctx.telegram.sendMessage(user.id, `⚡️Новое слово!\n` +
                `➖➖➖➖➖➖➖➖➖➖\n` +
                `${word_template_1.wordInfo(word)}`, keyboards_1.backToLibrary());
        }
    });
}
exports.noticeAboutNewWord = noticeAboutNewWord;
//# sourceMappingURL=actions.js.map