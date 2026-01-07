import { Sequelize } from "sequelize";
import { allModel } from "./../database/models/index"; 

const sequelize = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USERNAME as string,
  String(process.env.DB_PASSWORD),
  {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 5432,
    dialect: "postgres",
  }
);

// Initialize all models
export const models = allModel(sequelize);

export const databaseConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected successfully!");

    // Optional: sync all models
    await sequelize.sync({ alter: true });
    console.log("✅ Models synced successfully!");
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error);
    throw error;
  }
};

export default sequelize;
