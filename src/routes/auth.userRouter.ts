import { Router } from "express";
import type { Request, Response, NextFunction } from "express";

import { UserController } from "../controllers/auth.usercontroller";
import { advancedValidateUser } from "../Middlewares/userValidation";

const router = Router();

// Routes
router.post("/", advancedValidateUser, UserController.createUser); // POST /api/v1/users
router.get("/", UserController.getAllUsers); // GET /api/v1/users
router.get("/:id", UserController.getUser); // GET /api/v1/users/:id
router.put("/:id", UserController.updateUser); // PUT /api/v1/users/:id
router.delete("/:id", UserController.deleteUser); // DELETE /api/v1/users/:id

export default router;
