import Task from "../models/task.model.js";

export default class TaskService {
  static async getAllTasks() {
    return await Task.find().sort({ createdAt: -1 });
  }

  static async getTaskById(id) {
    return await Task.findById(id);
  }

  static async createTask(data) {
    const task = new Task(data);
    return await task.save();
  }

  static async updateTaskById(id, updateData) {
    const updatedTask = await Task.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedTask) {
      const error = new Error("Task not found");
      error.status = 404;
      throw error;
    }

    return updatedTask;
  }

  static async deleteTask(id) {
    return await Task.findByIdAndDelete(id);
  }
}
