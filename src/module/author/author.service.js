import { databaseConnection } from "../../database/connection.js";
const db = await databaseConnection();

export const createAuthors = async (req, res) => {
  let { name, nationality } = req.body;
  const addAuthor = await db.collection("authors").insertOne({
    name: name,
    nationality: nationality,
  });

  return res.json(addAuthor);
};
