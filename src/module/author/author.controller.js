import express, { Router } from "express";
import { createAuthors } from "./author.service.js";

const router = Router();

router.post("/collection/authors", async (req, res) => {
  try {
    await createAuthors(req, res);
  } catch (error) {
    console.log(err);
    res.json({ message: "Internal server error." });
  }
});

export default router;
