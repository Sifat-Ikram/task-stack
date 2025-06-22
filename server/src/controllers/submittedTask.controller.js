import SubmittedTaskService from "../services/submittedTask.service.js";
import { updateUserPoints } from "../services/user.service.js";

export async function createSubmittedTask(req, res) {
  try {
    const taskData = req.body;

    if (!taskData || !taskData.task || !taskData.user) {
      return res.status(400).json({ message: "Invalid submission data" });
    }

    // Create the submission first
    const newTask = await SubmittedTaskService.createSubmittedTask(taskData);

    // Update user points after submission
    const updatedUser = await updateUserPoints(taskData.user.id);

    // Return both new submission and updated points
    res.status(201).json({
      submission: newTask,
      userPoints: updatedUser.points,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to submit task", error: error.message });
  }
}
