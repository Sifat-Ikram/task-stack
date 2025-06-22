import mongoose from "mongoose";

const submittedTaskSchema = new mongoose.Schema(
  {
    task: {
      title: { type: String, required: true, trim: true },
      category: { type: String, required: true, trim: true },
      shortDescription: { type: String, trim: true },
      longDescription: { type: String, required: true, trim: true },
      startDate: { type: Date },
      endDate: { type: Date, required: true },
      status: { type: String },
    },
    user: {
      id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
      name: { type: String, required: true },
      email: { type: String, required: true },
    },
    submittedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const SubmittedTask = mongoose.model("SubmittedTask", submittedTaskSchema);
export default SubmittedTask;
