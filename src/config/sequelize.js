import { Sequelize } from 'sequelize';
const sequelize = new Sequelize(
  process.env.DB_NAME || 'filesdb',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || 'root',
  {
    host: process.env.DB_HOST || 'db',
    dialect: 'mysql',
    logging: false
  }
);
export default sequelize;
