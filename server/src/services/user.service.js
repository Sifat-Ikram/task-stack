import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/jwt.utils.js";
import SubmittedTask from "../models/submittedTask.model.js";

export const registerUser = async (name, email, password) => {
  const userExists = await User.findOne({ email });
  if (userExists) throw new Error("User already exists");
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await User.create({ name, email, password: hashedPassword });

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  return {
    accessToken,
    refreshToken,
    expiresIn: 15 * 60,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      points: user.points
    },
  };
};

export const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new Error("Invalid credentials");
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  return {
    accessToken,
    refreshToken,
    expiresIn: 15 * 60,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      points: user.points
    },
  };
};

export const updateUserPoints = async (userId) => {
  const submissionCount = await SubmittedTask.countDocuments({ "user.id": userId });
  const points = submissionCount * 20;

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { points },
    { new: true }
  );

  return updatedUser;
};

export const refreshAccessToken = async (refreshToken) => {
  if (!refreshToken) throw new Error("Refresh token missing");

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      throw new Error("User not found");
    }

    const newAccessToken = generateAccessToken(user);
    return {
      accessToken: newAccessToken,
      expiresIn: 15 * 60,
    };
  } catch (error) {
    throw new Error("Invalid refresh token");
  }
};
