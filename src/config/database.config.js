require("dotenv").config();

const getEnv = (key, fallback) => process.env[key] || fallback;

const env = process.env.NODE_ENV || "development";

const prefixMap = {
  development: "DEV",
  test: "TEST",
  production: "PROD",
};

const prefix = prefixMap[env] || "DEV";

module.exports = {
  [env]: {
    username: getEnv(`DB_${prefix}_USERNAME`, getEnv("DB_USERNAME")),
    password: getEnv(`DB_${prefix}_PASSWORD`, getEnv("DB_PASSWORD")),
    database: getEnv(`DB_${prefix}_NAME`, getEnv("DB_NAME")),
    host: getEnv(`DB_${prefix}_HOST`, getEnv("DB_HOST")) || "localhost",
    port: Number(getEnv(`DB_${prefix}_PORT`, getEnv("DB_PORT"))) || 5432,
    dialect: getEnv(`DB_${prefix}_DIALECT`, getEnv("DB_DIALECT")) || "postgres",
    logging: false,
  },
};
