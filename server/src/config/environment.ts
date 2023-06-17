import * as dotenv from 'dotenv';

dotenv.config();

export const environment = {
  logLevel: process.env.LOG_LEVEL,
  serverPort: process.env.SERVER_PORT,
  mongoPath: process.env.MONGO_PATH,
  secretAccessToken: process.env.SECRET_ACCESS_TOKEN as string,
  secretRefreshToken: process.env.SECRET_REFRESH_TOKEN as string,
  accessTokenExpTime: process.env.ACCESS_TOKEN_EXP_TIME,
  refreshTokenExpTime: process.env.REFRESH_TOKEN_EXP_TIME,
  sessionSecret: process.env.SESSION_SECRET as string,
  mongoDbUser: process.env.MONGO_DB_USER as string,
  mongoDbPassword: process.env.MONGO_DB_PASSWORD as string,
};
