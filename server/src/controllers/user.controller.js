import { body, validationResult } from "express-validator";
import { loginUser, registerUser } from "../services/user.service.js";

const isProduction = process.env.NODE_ENV === "production";

export const validateRegister = [
  body("name").notEmpty(),
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),
];

export const validateLogin = [
  body("email").isEmail(),
  body("password").notEmpty(),
];

export const register = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { name, email, password } = req.body;
    const { accessToken, refreshToken, expiresIn, user } = await registerUser(
      name,
      email,
      password
    );

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: isProduction,
      maxAge: expiresIn * 1000, // typically 15 min for access token
      sameSite: isProduction ? "None" : "Lax",
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: isProduction,
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days for refresh token
      sameSite: isProduction ? "None" : "Lax",
    });

    res.status(201).json({ user });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { email, password } = req.body;
    const { accessToken, refreshToken, expiresIn, user } = await loginUser(
      email,
      password
    );

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: isProduction,
      maxAge: expiresIn * 1000,
      sameSite: isProduction ? "None" : "Lax",
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: isProduction,
      maxAge: 30 * 24 * 60 * 60 * 1000,
      sameSite: isProduction ? "None" : "Lax",
    });

    res.status(200).json({ user });
  } catch (err) {
    next(err);
  }
};

export const profile = async (req, res) => {
  res.status(200).json({ user: req.user });
};
