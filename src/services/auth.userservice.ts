// services/auth.userservice.ts
import { User } from "../database/models/user";

interface CreateUserInput {
  name?: string;
  email?: string;
  password?: string;
  phone?: string;
  acceptedTerms?: boolean;
}

interface UpdateUserInput {
  name?: string;
  email?: string;
  password?: string;
  phone?: string;
  acceptedTerms?: boolean;
}

export class UserService {
  // Create user
  static async createUser(data: CreateUserInput) {
    const { name, email, password, phone, acceptedTerms } = data;

    if (!name || !email || !password) {
      throw new Error("Name, email, and password are required");
    }

    if (!acceptedTerms) {
      throw new Error("You must accept the terms and conditions");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) throw new Error("Invalid email format");

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/;
    if (!passwordRegex.test(password)) {
      throw new Error(
        "Password must be at least 6 characters and include letters and numbers"
      );
    }

    if (phone) {
      const phoneRegex = /^[0-9]{10,15}$/;
      if (!phoneRegex.test(phone))
        throw new Error("Phone number must be 10-15 digits");
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) throw new Error("Email already exists");

    const duplicateUser = await User.findOne({ where: { name, email } });
    if (duplicateUser) throw new Error("User already exists");

    const user = await User.create({
      name,
      email,
      password,
      phone,
      acceptedTerms,
    });
    return user;
  }

  // Get single user
  static async getUserById(id: number) {
    const user = await User.findByPk(id);
    if (!user) throw new Error("User not found");
    return user;
  }

  // Get all users
  static async getAllUsers() {
    return await User.findAll();
  }

  // Update user by ID
  static async updateUserById(id: number, data: UpdateUserInput) {
    const user = await User.findByPk(id);
    if (!user) return null;

    // Update only fields that are provided
    await user.update(data);
    return user;
  }

  // Delete user by ID
  static async deleteUserById(id: number) {
    const user = await User.findByPk(id);
    if (!user) return null;

    await user.destroy();
    return true;
  }
}
