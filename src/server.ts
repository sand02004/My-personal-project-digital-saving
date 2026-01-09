import app from './app'
import { databaseConnection } from "./config/database";

const port = process.env.PORT || 3000;

const startApp = async () => {
  try {
    await databaseConnection();

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.log("Error starting server:", error);
    process.exit(1);
  }
};

startApp();