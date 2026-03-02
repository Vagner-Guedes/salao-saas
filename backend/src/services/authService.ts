import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { prisma } from "../lib/prisma"

export class AuthService {
  async signup(name: string, email: string, password: string) {
    const userExists = await prisma.user.findUnique({ where: { email } })
    if (userExists) throw new Error("User already exists")

    const passwordHash = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: {
        name,
        email,
        accounts: {
          create: {
            provider: "credentials",
            passwordHash
          }
        }
      }
    })

    return { id: user.id, name: user.name, email: user.email }
  }

  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({
      where: { email },
      include: { accounts: true }
    })
    if (!user) throw new Error("Invalid credentials")

    const account = user.accounts.find(acc => acc.provider === "credentials")
    if (!account || !account.passwordHash) throw new Error("Invalid credentials")

    const isValid = await bcrypt.compare(password, account.passwordHash)
    if (!isValid) throw new Error("Invalid credentials")

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "15m" }
    )

    return token
  }

  async getMe(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true, email: true }
    })
    if (!user) throw new Error("User not found")
    return user
  }
}