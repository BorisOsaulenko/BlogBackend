import { config } from "dotenv";
if (
  process.env.NODE_ENV &&
  ["test", "dev", "prod"].includes(process.env.NODE_ENV)
)
  config({ path: `./.${process.env.NODE_ENV}.env` });
else throw new Error("NODE_ENV is not defined");

const env = {
  DB_URL: process.env.DB_URL as string,
  PORT: process.env.PORT as string,
  NODE_ENV: process.env.NODE_ENV as string,
  JWT_SECRET: process.env.JWT_SECRET as string,
};

if (!env.DB_URL) throw new Error("DB_URL is not defined");
if (!env.PORT) throw new Error("PORT is not defined");
if (!env.NODE_ENV) throw new Error("NODE_ENV is not defined");
if (!env.JWT_SECRET) throw new Error("JWT_SECRET is not defined");

export default env;
