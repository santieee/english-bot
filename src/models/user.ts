import { Entity, Column, EntityRepository, Repository, Unique, PrimaryColumn, OneToMany } from 'typeorm';
import { Word } from './word';

@Entity()
@Unique(['id'])
export class User {
  @PrimaryColumn()
  id: number;

  @Column()
  is_bot: boolean;

  @Column()
  first_name: string;

  @Column({nullable: true})
  username: string;

  @Column()
  language_code: string;

  @OneToMany(type => Word, word => word.user)
  words: Word[];
}

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(userData: User) {
    let user = new User();
    user = userData;
    await this.save(user);
    return user;
  }
}
