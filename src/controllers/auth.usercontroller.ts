import type { Request, Response } from "express";
import { UserService } from "../services/auth.userservice.js";

export class UserController {
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

  static async getUser(req: Request, res: Response) {
    try {
      const user = await UserService.getUserById(Number(req.params.id));
      res.json(user);
    } catch (err) {
      res.status(404).json({ error: (err as Error).message });
    }
  }

  static async getAllUsers(req: Request, res: Response) {
    try {
      const users = await UserService.getAllUsers();
      res.json(users);
    } catch (err) {
      res.status(400).json({ error: (err as Error).message });
    }
  }
}
