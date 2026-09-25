import express from "express";
import { databaseConnection } from "./database/connection.js";
import { env } from "./config/env.service.js";
import booksRouter from "./module/book/book.controller.js";
import authorRouter from "./module/author/author.controller.js";
import logRouter from "./module/log/log.controller.js";

const app = express();

app.use(express.json());

app.use(booksRouter);
app.use(authorRouter);
app.use(logRouter);

databaseConnection();
app.listen(env.PORT, () => {
  console.log(`Server is running on port ${env.PORT}`);
});
