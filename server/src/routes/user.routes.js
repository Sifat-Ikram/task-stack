import express from "express";
import {
  login,
  profile,
  register,
  validateLogin,
  validateRegister,
} from "../controllers/user.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { logout, refresh } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);
router.post("/refresh", refresh);
router.post("/logout", logout);
router.get("/profile", protect, profile);

export default router;
