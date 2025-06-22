import SubmittedTask from "../models/submittedTask.model.js";

export default class SubmittedTaskService {
  // Get all submitted tasks (optional for admin or dashboard)
  static async getAllSubmittedTasks() {
    return await SubmittedTask.find().sort({ createdAt: -1 });
  }

  // Create a new task submission
  static async createSubmittedTask(data) {
    const task = new SubmittedTask(data);
    return await task.save();
  }

  // Get all submissions by a specific user ID
  static async getSubmittedTasksByUserId(userId) {
    return await SubmittedTask.find({ "user.id": userId }).sort({ createdAt: -1 });
  }
}
