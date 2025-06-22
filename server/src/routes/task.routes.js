import express from "express";
import {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/task.controller.js";

import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(protect);

// Get all tasks
router.get("/get", getTasks);

// Get a single task by ID
router.get("/:id", getTaskById);

// Create a new task
router.post("/create", createTask);

// Update a task
router.put("/update/:id", updateTask);

// Delete a task
router.delete("/delete/:id", deleteTask);

export default router;
