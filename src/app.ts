import { config as dotenv } from "dotenv";
import { Request, Response } from "express";

dotenv(); // Load immediately
import mainRouter from "./routes";

import express, { Express } from "express";

const app: Express = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", mainRouter);
export default app;