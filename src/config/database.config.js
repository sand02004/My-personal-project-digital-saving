require("dotenv").config();

const getEnv = (key, fallbackKey) => {
  return process.env[key] || process.env[fallbackKey];
};

const env = process.env.NODE_ENV || "development";

const prefixMap = {
  development: "DEV",
  testing: "TEST",
  production: "PROD",
};

const prefix = prefixMap[env];

module.exports = {
  [env]: {
    username: getEnv(`DB_${prefix}_USERNAME`, "DB_USERNAME"),
    password: getEnv(`DB_${prefix}_PASSWORD`, "DB_PASSWORD"),
    database: getEnv(`DB_${prefix}_NAME`, "DB_NAME"),
    host: getEnv(`DB_${prefix}_HOST`, "DB_HOST") || "localhost",
    port: Number(getEnv(`DB_${prefix}_PORT`, "DB_PORT")),
    dialect: getEnv(`DB_${prefix}_DIALECT`, "DB_DIALECT") || "postgres",
    logging: false,
  },
};
