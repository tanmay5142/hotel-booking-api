import bcrypt from "bcryptjs";
import jwt, { SignOptions } from "jsonwebtoken";
import User, { IUser } from "../models/User.js";

const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_EXPIRES_IN = (process.env.JWT_EXPIRES_IN || "7d") as SignOptions["expiresIn"];

function generateToken(userId: string): string {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export async function registerUser(name: string, email: string, password: string) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashedPassword });

  const token = generateToken(user.id);
  return { user, token };
}

export async function loginUser(email: string, password: string) {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid credentials");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = generateToken(user.id);
  return { user, token };
}


