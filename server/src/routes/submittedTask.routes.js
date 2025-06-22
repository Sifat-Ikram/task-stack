import express from "express";
import {
  createSubmittedTask,
} from "../controllers/submittedTask.controller.js";

import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Apply auth middleware to all routes below
router.use(protect);

// Create a new submitted task
router.post("/create", createSubmittedTask);

export default router;
