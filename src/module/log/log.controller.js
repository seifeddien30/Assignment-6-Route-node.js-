import express, { Router } from "express";
import { createlogs, insertLog } from "./log.service.js";

const router = Router();

router.post("/collection/logs/capped", async (req, res) => {
  try {
    await createlogs(req, res);
  } catch (error) {
    console.log(err);
    res.json({ message: "Internal server error." });
  }
});

router.post("/logs", async (req, res) => {
  try {
    await insertLog(req, res);
  } catch (error) {
    console.log(err);
    res.json({ message: "Internal server error." });
  }
});

export default router;
