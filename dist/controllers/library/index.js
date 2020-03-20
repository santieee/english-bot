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
const actions_1 = require("./actions");
const base_1 = __importDefault(require("telegraf/scenes/base"));
exports.library = new base_1.default('library');
exports.library.enter((ctx) => {
    actions_1.greeting(ctx);
});
exports.library.enter((ctx) => {
    actions_1.getLibrary(ctx);
});
exports.library.action('profile', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    ctx.scene.enter('profile');
}));
exports.library.action(/getLibrary/, (ctx) => {
    actions_1.getLibrary(ctx);
});
exports.library.action(/getWord/, (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    actions_1.getWord(ctx);
}));
// library.action('addWord', async (ctx: ContextMessageUpdate) => {
//   return ctx.upReply('Введите слово', backToLibrary());
// });
exports.library.action('back', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    ctx.scene.reenter();
}));
exports.library.on('text', (ctx) => {
    actions_1.saveWord(ctx);
});
exports.library.action(/removeWord/, (ctx) => {
    actions_1.removeWord(ctx);
});
exports.library.action('back', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    ctx.scene.enter('library');
}));
//# sourceMappingURL=index.js.map