import { User } from "../database/models/user";
import bcrypt from "bcrypt";

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
  static async createUser(data: CreateUserInput) {
    const { name, email, password, phone, acceptedTerms } = data;

    if (!name || !email || !password)
      throw new Error("Name, email, and password are required");
    if (!acceptedTerms)
      throw new Error("You must accept the terms and conditions");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) throw new Error("Invalid email format");

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/;
    if (!passwordRegex.test(password))
      throw new Error(
        "Password must be at least 6 characters and include letters and numbers"
      );

    if (phone) {
      const phoneRegex = /^[0-9]{10,15}$/;
      if (!phoneRegex.test(phone))
        throw new Error("Phone number must be 10-15 digits");
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) throw new Error("Email already exists");

    const duplicateUser = await User.findOne({ where: { name, email } });
    if (duplicateUser) throw new Error("User already exists");

    // ✅ HASH PASSWORD HERE
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
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

  static async updateUserById(id: number, data: UpdateUserInput) {
    const user = await User.findByPk(id);
    if (!user) return null;

    // ✅ Hash password if it's being updated
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    await user.update(data);
    return user;
  }

  static async deleteUserById(id: number) {
    const user = await User.findByPk(id);
    if (!user) return null;

    await user.destroy();
    return true;
  }

  // ✅ Optional: login function to check password
  static async login(email: string, password: string) {
    const user = await User.findOne({ where: { email } });
    if (!user) throw new Error("User not found");

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new Error("Invalid credentials");

    return user;
  }
}
