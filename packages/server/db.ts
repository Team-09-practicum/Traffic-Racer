import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import dotenv from 'dotenv';
import path from 'path';
import mongoose from 'mongoose';
import { isDev } from './utils/constants';

dotenv.config({ path: path.join(__dirname, '..', '..', '.env') });

const {
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  POSTGRES_PORT,
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_DB,
  MONGO_PORT,
  MONGO_HOST,
} = process.env;

const sequelizeOptions: SequelizeOptions = {
  host: isDev() ? 'localhost' : 'postgres',
  port: Number(POSTGRES_PORT),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  dialect: 'postgres',
  models: [path.join(__dirname, '/models')],
};

export const sequelize = new Sequelize(sequelizeOptions);

export async function dbConnect() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    console.log('\x1b[32m', `✨Connection to DB on ${POSTGRES_PORT} has been established successfully✨`, '\x1b[0m');
  } catch (error) {
    console.error('Unable sequelize to connect to the database:', error);
  }
}
export const mongoConnect = async (): Promise<void> => {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`);

    console.log('  ➜ 🎸 Connected to the Mongo database');
  } catch (e) {
    if (e instanceof Error) {
      console.error(`Mongo DB connect error: ${e.message}`);
    } else {
      console.error(e);
    }
  }
};
