import { databaseConnection } from "../../database/connection.js";
const db = await databaseConnection();
export const createBooks = async (req, res) => {
  const createBook = await db.createCollection("books", {
    validator: { $and: [{ title: { $exists: true } }] },
  });
  console.log(createBook);

  return res.json({ message: "books collection created successfully" });
};

export const indexBooks = async (req, res) => {
  const index = await db.collection("books").createIndex({ title: 1 });
  return res.json({ message: "indexing done!", index });
};

export const insertBook = async (req, res) => {
  let { title, author, year, genres } = req.body;
  const addBook = await db
    .collection("books")
    .insertOne({ title, author, year, genres });
  if (addBook.acknowledged) {
    return res.json({ message: "book added successfully" }, addBook);
  } else {
    return res.json({ message: "something went wrong" });
  }
};

export const insetBooks = async (req, res) => {
  let books = req.body;
  const addBooks = await db.collection("books").insertMany(books);
  if (addBooks.insertedCount > 0) {
    return res.json({ message: "books added successfully", addBooks });
  } else {
    return res.json({ message: "Something went wrong" });
  }
};

export const updateFuture = async (req, res) => {
  const updatedBook = await db
    .collection("books")
    .updateOne({ title: "Future" }, { $set: { year: 2022 } });
  if (updatedBook.modifiedCount > 0) {
    return res.json({ message: "Book updated successfully" });
  } else {
    return res.json({ message: "something went wrong" });
  }
};

export const findBookBT = async (req, res) => {
  let { title } = req.query;
  const fBook = await db.collection("books").findOne({ title });
  if (fBook) {
    return res.json({ message: "Book found", fBook });
  } else {
    return res.json({ message: "book is not found" });
  }
};

export const findByY = async (req, res) => {
  let { from, to } = req.query;
  const foundBooks = await db
    .collection("books")
    .find({ year: { $gte: Number(from), $lte: Number(to) } })
    .toArray();
  if (foundBooks.length > 0) {
    return res.json(foundBooks);
  } else {
    return res.json({ message: "no books found" });
  }
};

export const findByG = async (req, res) => {
  const { genre } = req.query;

  const foundBooks = await db
    .collection("books")
    .find({ genre: { $in: [genre] } })
    .toArray();

  if (foundBooks.length > 0) {
    return res.json(foundBooks);
  } else {
    return res.json({ message: "no books found" });
  }
};

export const skipLimit = async (req, res) => {
  const books = await db
    .collection("books")
    .find({})
    .sort({ year: -1 })
    .skip(2)
    .limit(3)
    .toArray();

  return res.json(books);
};

export const integerYear = async (req, res) => {
  const books = await db
    .collection("books")
    .find({
      year: { $type: "int" },
    })
    .toArray();

  if (books.length > 0) {
    return res.json(books);
  } else {
    return res.json({ message: "no books found" });
  }
};

export const genreHS = async (req, res) => {
  const books = await db
    .collection("books")
    .find({
      genre: {
        $nin: ["Horror", "Science Fiction"],
      },
    })
    .toArray();

  if (books.length > 0) {
    return res.json(books);
  } else {
    return res.json({ message: "no books found" });
  }
};

export const d2000 = async (req, res) => {
  const { year } = req.query;

  const result = await db.collection("books").deleteMany({
    year: { $lt: Number(year) },
  });

  return res.json({
    message: "books deleted successfully",
    deletedCount: result.deletedCount,
  });
};

export const getA = async (req, res) => {
  const books = await db
    .collection("books")
    .aggregate([
      {
        $match: {
          year: { $gt: 2000 },
        },
      },
      {
        $sort: {
          year: -1,
        },
      },
    ])
    .toArray();

  return res.json(books);
};

export const getA2 = async (req, res) => {
  const books = await db
    .collection("books")
    .aggregate([
      {
        $match: {
          year: { $gt: 2000 },
        },
      },
      {
        $project: {
          _id: 0,
          title: 1,
          author: 1,
          year: 1,
        },
      },
    ])
    .toArray();

  return res.json(books);
};

export const getA3 = async (req, res) => {
  const books = await db
    .collection("books")
    .aggregate([
      {
        $unwind: "$genre",
      },
    ])
    .toArray();

  return res.json(books);
};
export const getA4 = async (req, res) => {
  const books = await db
    .collection("books")
    .aggregate([
      {
        $lookup: {
          from: "logs",
          localField: "_id",
          foreignField: "book_id",
          as: "logs",
        },
      },
    ])
    .toArray();

  return res.json(books);
};
