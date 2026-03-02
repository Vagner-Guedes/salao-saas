import { Router } from "express"
import { AuthController } from "../controllers/authController"
import { authMiddleware } from "./authMiddleware"

const router = Router()
const authController = new AuthController()

router.post("/signup", (req, res) => authController.signup(req, res))
router.post("/login", (req, res) => authController.login(req, res))
router.get("/me", authMiddleware, (req, res) => authController.me(req, res))

export { router }