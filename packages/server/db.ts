import { Sequelize, SequelizeOptions } from 'sequelize-typescript';

const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT } = process.env;

const sequelizeOptions: SequelizeOptions = {
  host: 'postgres',
  port: Number(POSTGRES_PORT),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  dialect: 'postgres',
};

export const sequelize = new Sequelize(sequelizeOptions);

// Инициализируем модели
// export const User = sequelize.define('User', userModel, {});

export async function dbConnect() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log(`✨Connection to DB on ${POSTGRES_PORT} has been established successfully✨`);
  } catch (error) {
    console.error('Unable sequelize to connect to the database:', error);
  }
}
