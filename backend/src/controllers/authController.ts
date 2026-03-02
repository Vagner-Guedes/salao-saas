import { Request, Response } from "express"
import { AuthService } from "../services/authService"

const authService = new AuthService()

export class AuthController {
  async signup(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body
      const user = await authService.signup(name, email, password)
      return res.status(201).json(user)
    } catch (error: any) {
      return res.status(400).json({ message: error.message })
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body
      const token = await authService.login(email, password)
      return res.json({ token })
    } catch (error: any) {
      return res.status(401).json({ message: error.message })
    }
  }

  async me(req: Request, res: Response) {
    try {
      const userId = (req as any).user.userId
      const user = await authService.getMe(userId)
      return res.json(user)
    } catch (error: any) {
      return res.status(401).json({ message: error.message })
    }
  }
}