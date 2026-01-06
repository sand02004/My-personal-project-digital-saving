import { User } from "../database/models/user.js";

interface CreateUserInput {
  name?: string;
  email?: string;
  password?: string;
  phone?: string;
  acceptedTerms?: boolean;
}

export class UserService {
  static async createUser(data: CreateUserInput) {
    const { name, email, password, phone, acceptedTerms } = data;

    // 1️⃣ Required fields check
    if (!name || !email || !password) {
      throw new Error("Name, email, and password are required");
    }

    // 2️⃣ Terms & Conditions check
    if (!acceptedTerms) {
      throw new Error("You must accept the terms and conditions");
    }

    // 3️⃣ Email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error("Invalid email format");
    }

    // 4️⃣ Password strength
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/;
    if (!passwordRegex.test(password)) {
      throw new Error(
        "Password must be at least 6 characters and include letters and numbers"
      );
    }

    // 5️⃣ Optional phone validation (if provided)
    if (phone) {
      const phoneRegex = /^[0-9]{10,15}$/; // 10-15 digits
      if (!phoneRegex.test(phone)) {
        throw new Error("Phone number must be 10-15 digits");
      }
    }

    // 6️⃣ Check if email already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new Error("Email already exists");
    }

    // 7️⃣ Optional duplicate check (name + email)
    const duplicateUser = await User.findOne({ where: { name, email } });
    if (duplicateUser) {
      throw new Error("User already exists");
    }

    // ✅ Create user
    const user = await User.create({
      name,
      email,
      password,
      phone,
      acceptedTerms,
    });
    return user;
  }

  static async getUserById(id: number) {
    const user = await User.findByPk(id);
    if (!user) throw new Error("User not found");
    return user;
  }

  static async getAllUsers() {
    return await User.findAll();
  }
}
