import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "./config/db.config.js";
import userRoutes from "./routes/user.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";

const app = express();

// Connect DB
connectDB();

// Middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());

// Routes
app.use("/api/user", userRoutes);

// Health check
app.get("/api/health", (req, res) => res.status(200).json({ status: "OK" }));

// 404 Handler
app.use("*", (req, res) => res.status(404).json({ message: "Not Found" }));

// Error Handler
app.use(errorHandler);

export default app;
