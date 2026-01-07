// controllers/user.controller.ts
import type { Request, Response } from "express";
import { UserService } from "../services/auth.userservice";

export class UserController {
  // ✅ Create a new user
  static async createUser(req: Request, res: Response) {
    try {
      const { name, email, password, phone, acceptedTerms } = req.body;

      const user = await UserService.createUser({
        name,
        email,
        password,
        phone,
        acceptedTerms,
      });

      res.status(201).json({ message: "User created successfully", user });
    } catch (err) {
      res.status(400).json({ error: (err as Error).message });
    }
  }

  // ✅ Get a single user by ID
  static async getUser(req: Request, res: Response) {
    try {
      const userId = Number(req.params.id);

      if (!userId) {
        return res.status(400).json({ error: "Invalid user ID" });
      }

      const user = await UserService.getUserById(userId);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  }

  // ✅ Get all users
  static async getAllUsers(req: Request, res: Response) {
    try {
      const users = await UserService.getAllUsers();
      res.json(users);
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  }

  // ✅ Update a user by ID
  static async updateUser(req: Request, res: Response) {
    try {
      const userId = Number(req.params.id);
      const { name, email, password, phone, acceptedTerms } = req.body;

      if (!userId) {
        return res.status(400).json({ error: "Invalid user ID" });
      }

      const updatedUser = await UserService.updateUserById(userId, {
        name,
        email,
        password,
        phone,
        acceptedTerms,
      });

      if (!updatedUser) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json({ message: "User updated successfully", user: updatedUser });
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  }

  // ✅ Delete a user by ID
  static async deleteUser(req: Request, res: Response) {
    try {
      const userId = Number(req.params.id);

      if (!userId) {
        return res.status(400).json({ error: "Invalid user ID" });
      }

      const deleted = await UserService.deleteUserById(userId);

      if (!deleted) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json({ message: "User deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  }
}
