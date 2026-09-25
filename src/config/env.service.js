import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.resolve("src/.env"),
});

export const env = {
  PORT: process.env.PORT,
  DATABASE_URL: process.env.DATABASE_URL,
};
