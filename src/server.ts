import { config as dotenv } from "dotenv";
dotenv(); // Load immediately

import express, { Express } from "express";
import { databaseConnection } from "./config/database";

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const startApp = async () => {
  try {
    await databaseConnection();

    app.listen(port, () => {
      console.log(`🚀 Server running on port ${port}`);
    });
  } catch (error) {
    console.log("❌ Error starting server:", error);
    process.exit(1);
  }
};

startApp();

export default app;
