"use client";

import useAxiosPublic from "@/hooks/useAxiosPublic";
import axios from "axios";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

export default function AddTask() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const axiosPublic = useAxiosPublic();

  const onSubmit = async (taskData) => {
    try {
      const res = await axiosPublic.post("/api/tasks/create", taskData);

      if (res.data?._id) {
        Swal.fire({
          icon: "success",
          title: "Task Added!",
          text: "Your new task has been successfully created.",
          confirmButtonColor: "#008080",
        });
        reset(); // Clear form
      }
    } catch (error) {
      console.error("Error creating task:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text:
          error?.response?.data?.message ||
          "Something went wrong while adding the task!",
        confirmButtonColor: "#d33",
      });
    }
  };

  return (
    <div className="w-full p-6">
      <h1 className="text-xl font-bold text-center">Add New Task</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block mb-1 font-semibold">Title</label>
          <input
            {...register("title", { required: "Title is required" })}
            placeholder="Plan a Picnic with Friends"
            className="w-full p-2 border border-gray-500 rounded-md focus:outline-teal-600"
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Category */}
          <div>
            <label className="block mb-1 font-semibold">Category</label>
            <input
              {...register("category")}
              placeholder="Friends"
              className="w-full p-2 border border-gray-500 rounded-md focus:outline-teal-600"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block mb-1 font-semibold">Status</label>
            <select
              {...register("status")}
              className="w-full p-2 border border-gray-500 rounded-md focus:outline-teal-600"
              defaultValue="Pending"
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>

        {/* Start and End Dates */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-semibold">Start Date</label>
            <input
              type="date"
              {...register("startDate")}
              defaultValue="2025-06-22"
              className="w-full p-2 border border-gray-500 rounded-md focus:outline-teal-600"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">End Date</label>
            <input
              type="date"
              {...register("endDate")}
              defaultValue="2025-06-22"
              className="w-full p-2 border border-gray-500 rounded-md focus:outline-teal-600"
            />
          </div>
        </div>

        {/* Short Description */}
        <div>
          <label className="block mb-1 font-semibold">Short Description</label>
          <textarea
            {...register("shortDescription")}
            placeholder="Organize an outdoor picnic and enjoy quality time with friends."
            rows={2}
            className="w-full p-2 border border-gray-500 rounded-md focus:outline-teal-600"
          />
        </div>

        {/* Long Description */}
        <div>
          <label className="block mb-1 font-semibold">Long Description</label>
          <textarea
            {...register("longDescription")}
            placeholder="Enter a detailed plan for the picnic..."
            rows={4}
            className="w-full p-2 border border-gray-500 rounded-md focus:outline-teal-600"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-[#60E5AE] jakarta cursor-pointer text-[#1F1F1F] px-6 py-3 rounded-[8px]"
        >
          Add Task
        </button>
      </form>
    </div>
  );
}
