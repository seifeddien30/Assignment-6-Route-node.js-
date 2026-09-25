import { databaseConnection } from "../../database/connection.js";
const db = await databaseConnection();
import { ObjectId } from "mongodb";

export const createlogs = async (req, res) => {
  try {
    const createlog = await db.createCollection("logs", {
      capped: true,
      size: 1024,
    });

    return res.json(createlog);
  } catch (error) {
    console.log(error);
    return res.json({
      message: error.message,
    });
  }
};

export const insertLog = async (req, res) => {
  let { book_id, action } = req.body;
  const addLog = await db
    .collection("logs")
    .insertOne({ book_id: new ObjectId(book_id), action });
  if (addLog.acknowledged) {
    return res.json({ message: "book inserted successfully", addLog });
  } else {
    return res.json({ message: "something went wrong" });
  }
};
