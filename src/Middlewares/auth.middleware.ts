import { Request, Response, NextFunction } from "express";
import { User } from "../database/models/user";

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = await User.findByPk(1); // just an example
  if (!user) return res.status(401).json({ message: "Unauthorized" });

  req.user = user; // ✅ now TypeScript knows this exists
  next();
};
