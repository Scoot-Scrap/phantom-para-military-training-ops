// lib/auth.ts
import bcrypt from "bcryptjs";
import { randomBytes } from "crypto";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Register a new user with a role (default: trainee)
export async function registerUser(
  username: string,
  password: string,
  role: "trainee" | "instructor" | "admin" = "trainee",
) {
  const existing = await prisma.user.findUnique({ where: { username } });
  if (existing) return { error: "User already exists" };
  const passwordHash = await bcrypt.hash(password, 10);
  await prisma.user.create({
    data: { username, passwordHash, role },
  });
  return { success: true };
}

// Authenticate user credentials
export async function authenticateUser(username: string, password: string) {
  const user = await prisma.user.findUnique({ where: { username } });
  if (!user) return { error: "Invalid username or password" };
  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) return { error: "Invalid username or password" };
  return { success: true, role: user.role };
}

// In-memory session management (for demonstration)
const sessions: { [token: string]: { username: string; role: string } } = {};

export function createSession(username: string, role: string) {
  const token = randomBytes(16).toString("hex");
  sessions[token] = { username, role };
  return token;
}

export function getUserFromSession(token: string) {
  return sessions[token];
}

export function destroySession(token: string) {
  delete sessions[token];
}
