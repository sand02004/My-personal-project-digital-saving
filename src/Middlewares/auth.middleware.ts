import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../types/AuthenticatedRequest";
import { User } from "../database/models/user";

export const authenticate = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const user = await User.findByPk(1);
  if (!user) return res.status(401).json({ message: "Unauthorized" });

  req.user = user;
  next();
};
