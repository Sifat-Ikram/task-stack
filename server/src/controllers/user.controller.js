import { body, validationResult } from "express-validator";
import { loginUser, registerUser } from "../services/user.service.js";

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
      secure: false,
      maxAge: expiresIn * 1000,
      sameSite: "lax",
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      sameSite: "lax",
    });

    // You can still send user info back if needed (just not tokens)
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
      secure: false,
      maxAge: expiresIn * 1000,
      sameSite: "lax",
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "lax",
    });

    res.status(200).json({ user });
  } catch (err) {
    next(err);
  }
};

export const profile = async (req, res) => {
  res.status(200).json({ user: req.user });
};
