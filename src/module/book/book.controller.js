import express, { Router } from "express";
import {
  createBooks,
  indexBooks,
  insertBook,
  insetBooks,
  updateFuture,
  findBookBT,
  findByY,
  findByG,
  skipLimit,
  integerYear,
  genreHS,
  d2000,
  getA,
  getA2,
  getA3,
  getA4,
} from "./book.service.js";

const router = Router();

router.post("/collection/books", async (req, res) => {
  try {
    await createBooks(req, res);
  } catch (error) {
    console.log(error);
    res.json({ message: "Internal server error." });
  }
});

router.post("/collection/books/index", async (req, res) => {
  try {
    await indexBooks(req, res);
  } catch (error) {
    console.log(error);
    res.json({ message: "Internal server error." });
  }
});

router.post("/books", async (req, res) => {
  try {
    await insertBook(req, res);
  } catch (error) {
    console.log(error);
    res.json({ message: "Internal server error." });
  }
});

router.post("/books/batch", async (req, res) => {
  try {
    await insetBooks(req, res);
  } catch (error) {
    console.log(error);
    res.json({ message: "Internal server error." });
  }
});

router.patch("/books/Future", async (req, res) => {
  try {
    await updateFuture(req, res);
  } catch (error) {
    console.log(error);
    res.json({ message: "Internal server error." });
  }
});

router.get("/books/title", async (req, res) => {
  try {
    await findBookBT(req, res);
  } catch (error) {
    console.log(error);
    res.json({ message: "Internal server error." });
  }
});

router.get("/books/year", async (req, res) => {
  try {
    await findByY(req, res);
  } catch (error) {
    console.log(error);
    res.json({ message: "Internal server error." });
  }
});

router.get("/books/genre", async (req, res) => {
  try {
    await findByG(req, res);
  } catch (error) {
    console.log(error);
    res.json({ message: "Internal server error." });
  }
});

router.get("/books/skip-limit", async (req, res) => {
  try {
    await skipLimit(req, res);
  } catch (error) {
    console.log(error);
    res.json({ message: "Internal server error." });
  }
});

router.get("/books/year-integer", async (req, res) => {
  try {
    await integerYear(req, res);
  } catch (error) {
    console.log(error);
    res.json({ message: "Internal server error." });
  }
});

router.get("/books/exclude-genres", async (req, res) => {
  try {
    await genreHS(req, res);
  } catch (error) {
    console.log(error);
    res.json({ message: "Internal server error." });
  }
});

router.delete("/books/before-year", async (req, res) => {
  try {
    await d2000(req, res);
  } catch (error) {
    console.log(error);
    res.json({ message: "Internal server error." });
  }
});

router.get("/books/aggregate1", async (req, res) => {
  try {
    await getA(req, res);
  } catch (error) {
    console.log(error);
    res.json({ message: "Internal server error." });
  }
});

router.get("/books/aggregate2", async (req, res) => {
  try {
    await getA2(req, res);
  } catch (error) {
    console.log(error);
    res.json({ message: "Internal server error." });
  }
});

router.get("/books/aggregate3", async (req, res) => {
  try {
    await getA3(req, res);
  } catch (error) {
    console.log(error);
    res.json({ message: "Internal server error." });
  }
});

router.get("/books/aggregate4", async (req, res) => {
  try {
    await getA4(req, res);
  } catch (error) {
    console.log(error);
    res.json({ message: "Internal server error." });
  }
});
export default router;
