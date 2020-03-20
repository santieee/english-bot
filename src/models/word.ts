import { User } from './user';
import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  EntityRepository, 
  Repository, 
  Unique, 
  CreateDateColumn, 
  ManyToOne, 
} from 'typeorm';

@Entity()
@Unique(['en'])
export class Word {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  en: string;

  @Column()
  ru: string;

  @ManyToOne(type => User, user => user.words, {eager: true})
  user: User;

  @CreateDateColumn()
  createdAt: string;
}

@EntityRepository(Word)
export class WordRepository extends Repository<Word> {
  
  async createWord(wordData: any) {
    let word = new Word();
    word = {
      ...wordData, 
      en: wordData.en.toLowerCase(),
      ru: wordData.ru.toLowerCase(),
    };
    return await this.save(word);
  }

  async getWords({page = 1}) {
    const take = 6;
    const skip = take * (page - 1);
    let [words, totalCount] = await this.findAndCount({skip, take, order: {id: 'DESC'}});
    let pages = Math.ceil(totalCount / take);
    if (page > pages) { 
      page = pages;
      const skip = take * (page - 1);
      [words, totalCount] = await this.findAndCount({skip, take, order: {id: 'DESC'}});
      pages = Math.ceil(totalCount / take);
    }    
    return {
      words,
      page,
      pages,
    };
  }
}
