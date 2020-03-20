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
const axios_1 = __importDefault(require("axios"));
function translate(word) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const isEnglish = /[a-zA-Z]/g.test(word);
            const langToTranslate = isEnglish ? 'en-ru' : 'ru-en';
            const uri = encodeURI(`https://translate.yandex.net/api/v1.5/tr.json/translate?` +
                `lang=${langToTranslate}` +
                `&key=${process.env.TRANSLATE_TOKEN}` +
                `&text=${word}`);
            const { data } = yield axios_1.default.get(uri);
            const translated = data.text.join(', ').toLowerCase();
            const wordToTranslate = word.toLowerCase();
            const wordData = {
                en: isEnglish ? wordToTranslate : translated,
                ru: isEnglish ? translated : wordToTranslate,
            };
            return wordData;
        }
        catch (e) {
            console.log('ERROR: ', e);
        }
    });
}
exports.translate = translate;
//# sourceMappingURL=translate.js.map