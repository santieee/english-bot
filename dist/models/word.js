"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
const user_1 = require("./user");
const typeorm_1 = require("typeorm");
let Word = class Word {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Word.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Word.prototype, "en", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Word.prototype, "ru", void 0);
__decorate([
    typeorm_1.ManyToOne(type => user_1.User, user => user.words, { eager: true }),
    __metadata("design:type", user_1.User)
], Word.prototype, "user", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", String)
], Word.prototype, "createdAt", void 0);
Word = __decorate([
    typeorm_1.Entity(),
    typeorm_1.Unique(['en'])
], Word);
exports.Word = Word;
let WordRepository = class WordRepository extends typeorm_1.Repository {
    createWord(wordData) {
        return __awaiter(this, void 0, void 0, function* () {
            let word = new Word();
            word = Object.assign(Object.assign({}, wordData), { en: wordData.en.toLowerCase(), ru: wordData.ru.toLowerCase() });
            return yield this.save(word);
        });
    }
    getWords({ page = 1 }) {
        return __awaiter(this, void 0, void 0, function* () {
            const take = 6;
            const skip = take * (page - 1);
            let [words, totalCount] = yield this.findAndCount({ skip, take, order: { id: 'DESC' } });
            let pages = Math.ceil(totalCount / take);
            if (page > pages) {
                page = pages;
                const skip = take * (page - 1);
                [words, totalCount] = yield this.findAndCount({ skip, take, order: { id: 'DESC' } });
                pages = Math.ceil(totalCount / take);
            }
            return {
                words,
                page,
                pages,
            };
        });
    }
};
WordRepository = __decorate([
    typeorm_1.EntityRepository(Word)
], WordRepository);
exports.WordRepository = WordRepository;
//# sourceMappingURL=word.js.map