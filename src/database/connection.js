import { env } from "../config/env.service.js";
import { MongoClient } from "mongodb";
export async function databaseConnection() {
  const uri = env.DATABASE_URL;
  const client = new MongoClient(uri);

  const database = client.db("liberary");
  return database;
}
