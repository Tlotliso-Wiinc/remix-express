import { Sequelize } from 'sequelize';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: join(__dirname, '../database.sqlite'),
  //logging: (...msg) => console.log(msg),
  //logging: console.log,
  logging: false
});

export default sequelize;