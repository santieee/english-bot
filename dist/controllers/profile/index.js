"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = __importDefault(require("telegraf/scenes/base"));
const actions_1 = require("./actions");
exports.profile = new base_1.default('profile');
exports.profile.enter((ctx) => {
    actions_1.showProfile(ctx);
});
exports.profile.action('back', (ctx) => {
    ctx.scene.enter('library');
});
//# sourceMappingURL=index.js.map