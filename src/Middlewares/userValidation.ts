import { type Request, type Response, type NextFunction } from "express";

export const advancedValidateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, password, phone, acceptedTerms } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ error: "Name, email, and password are required" });
  }

  if (!acceptedTerms) {
    return res
      .status(400)
      .json({ error: "You must accept the terms and conditions" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email))
    return res.status(400).json({ error: "Invalid email format" });

  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/;
  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      error:
        "Password must be at least 6 characters and include letters and numbers",
    });
  }

  if (phone) {
    const phoneRegex = /^[0-9]{10,15}$/;
    if (!phoneRegex.test(phone))
      return res
        .status(400)
        .json({ error: "Phone number must be 10-15 digits" });
  }

  next();
};
