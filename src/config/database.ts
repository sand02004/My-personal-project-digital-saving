import { Sequelize } from "sequelize";
import { allModel } from "../database/models/index";

const dbConfig =
  require("./database.config")[process.env.NODE_ENV || "development"];

// Create Sequelize instance
const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
    logging: dbConfig.logging,
    define: {
      freezeTableName: true, // Important: use exact table names
      underscored: true, // Important if your columns use snake_case
      timestamps: false, // Optional: disable if your DB already has timestamp columns
    },
  }
);

// Initialize models
export const models = allModel(sequelize);

// Connect only, do NOT sync
export const databaseConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected successfully!");
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error);
    throw error;
  }
};

export default sequelize;