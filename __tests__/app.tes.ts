import request from "supertest";
import app from "../src/app";
import sequelize from "../src/config/database";
import { User } from "../src/database/models/user";

describe("User API Endpoints", () => {
  // Before all tests, connect to DB and clear the users table
  beforeAll(async () => {
    await sequelize.authenticate();
    await User.destroy({ where: {} }); // clear table for clean state
  });

  // After all tests, close DB connection
  afterAll(async () => {
    await sequelize.close();
  });

  describe("GET /api/v1/users", () => {
    beforeAll(async () => {
      // Seed a test user
      await User.create({
        name: "Seed User",
        email: `seed${Date.now()}@example.com`,
        password: "Password123@",
        phone: "0791161111",
        acceptedTerms: true,
      });
    });

    it("should return all users as an array", async () => {
      const res = await request(app).get("/api/v1/users");

      console.log("GET /users STATUS:", res.status);
      console.log("GET /users BODY:", JSON.stringify(res.body, null, 2));

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
      expect(res.body[0]).toHaveProperty("id");
      expect(res.body[0]).toHaveProperty("email");
    });
  });

  describe("POST /api/v1/users", () => {
    it("should create a new user and return the created object", async () => {
      const uniqueEmail = `testuser${Date.now()}@example.com`;
      const user = {
        name: "Test User",
        email: uniqueEmail,
        password: "Password123@",
        phone: "0791161111",
        acceptedTerms: true,
      };

      const res = await request(app)
        .post("/api/v1/users")
        .send(user)
        .set("Accept", "application/json");

      console.log("POST /users STATUS:", res.status);
      console.log("POST /users BODY:", JSON.stringify(res.body, null, 2));

      expect(res.status).toBe(201); // matches your controller
      expect(res.body).toHaveProperty("user"); // root contains "user"

      const createdUser = res.body.user;

      expect(createdUser).toHaveProperty("id");
      expect(createdUser.email).toBe(user.email);
      expect(createdUser.name).toBe(user.name);
    });

    it("should fail creating a user with duplicate email", async () => {
      const duplicateEmail = `duplicate${Date.now()}@example.com`;
      const userData = {
        name: "Duplicate User",
        email: duplicateEmail,
        password: "Password123@",
        phone: "0791161111",
        acceptedTerms: true,
      };

      // First creation succeeds
      await request(app).post("/api/v1/users").send(userData);

      // Second creation fails
      const res = await request(app).post("/api/v1/users").send(userData);

      console.log("POST /users duplicate STATUS:", res.status);
      console.log(
        "POST /users duplicate BODY:",
        JSON.stringify(res.body, null, 2)
      );

      expect(res.status).toBe(400); // or 409 if your controller uses that
      expect(res.body).toHaveProperty("error");
    });
  });
  it("should update an existing user", async () => {
    // Step 1: Grab an existing user from the database
    const existingUser = await User.findOne(); // pick the first user
    if (!existingUser) throw new Error("No users found to update");

    // Step 2: Define the changes
    const newChanges = {
      name: "Updated Name",
      phone: "0791162222",
    };

    // Step 3: Send the update request
    const res = await request(app)
      .put(`/api/v1/users/${existingUser.id}`)
      .send(newChanges)
      .set("Accept", "application/json");

    console.log("UPDATE /users STATUS:", res.status);
    console.log("UPDATE /users BODY:", JSON.stringify(res.body, null, 2));

    // Step 4: Assertions
    expect(res.status).toBe(200); 
    expect(res.body).toHaveProperty("user");
    
  });

});
