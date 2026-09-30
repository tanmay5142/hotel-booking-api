import { Router } from "express";
import { register, login } from "../controllers/authControllers.js";
import { validateBody } from "../middleware/validate.js";
import { registerSchema, loginSchema } from "../validation/authValidation.js";
import rateLimit from "express-rate-limit";

const router = Router();

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: { message: "Too many attempts, please try again later." },
});

router.post("/register", authLimiter, validateBody(registerSchema), register);
router.post("/login", authLimiter, validateBody(loginSchema), login);

export default router;