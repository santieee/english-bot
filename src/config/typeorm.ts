import { createConnection } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { User } from '../models/user';
import { Word } from '../models/word';

(async () => {
  const typeOrmOptions: PostgresConnectionOptions = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DB_USER,
    entities: [User, Word],
    synchronize: true,
  };
  await createConnection(typeOrmOptions);
  console.log('PG connected!');
})();

