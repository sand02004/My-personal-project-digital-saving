import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  dialect: "sqlite", // or your database
  storage: "./database.sqlite", // or your connection string
});

export default sequelize;
