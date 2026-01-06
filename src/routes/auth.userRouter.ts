import { Router } from "express"; 
import type { Request, Response, NextFunction } from "express"; 

import { UserController } from "../controllers/auth.usercontroller.js";
import { advancedValidateUser } from "../Middlewares/userValidation.js";

const router = Router();

// Routes
router.post("/", advancedValidateUser, UserController.createUser);
router.get("/", UserController.getAllUsers);
router.get("/:id", UserController.getUser);

export default router;
