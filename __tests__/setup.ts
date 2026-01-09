import sequelize, { databaseConnection } from "../src/config/database";

beforeAll(async () => {
  await databaseConnection();
});

afterAll(async () => {
  await sequelize.close();
});

// Dummy test so Jest doesn’t complain
test("setup file sanity check", () => {
  expect(true).toBe(true);
});