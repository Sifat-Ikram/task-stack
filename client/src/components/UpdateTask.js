"use client";

import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const UpdateTask = ({ task, onClose, onUpdate }) => {
  // Initialize react-hook-form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: "",
      category: "",
      shortDescription: "",
      longDescription: "",
      startDate: "",
      endDate: "",
      status: "",
    },
  });

  const axiosPublic = useAxiosPublic();

  // Prefill form when task changes
  useEffect(() => {
    if (task) {
      reset({
        title: task.title || "",
        category: task.category || "",
        shortDescription: task.shortDescription || "",
        longDescription: task.longDescription || "",
        startDate: task.startDate ? task.startDate.split("T")[0] : "",
        endDate: task.endDate ? task.endDate.split("T")[0] : "",
        status: task.status || "",
      });
    }
  }, [task, reset]);

  const onSubmit = async (data) => {
    // Validate dates here because RHF default validation doesn't cover date comparison
    if (new Date(data.startDate) > new Date(data.endDate)) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Start Date cannot be after End Date.",
      });
      return;
    }

    try {
      // Patch request to update task
      const response = await axiosPublic.put(
        `/api/tasks/update/${task._id}`,
        data
      );

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Task updated successfully!",
        timer: 2000,
        showConfirmButton: false,
      });

      onUpdate();
      onClose();
    } catch (error) {
      console.error("Update error:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error.response?.data?.message ||
          "Failed to update the task. Please try again.",
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-3xl w-full p-6 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-2xl font-bold"
          aria-label="Close"
        >
          &times;
        </button>

        <h2 className="text-2xl font-semibold mb-6 text-center poppins">
          Edit Task
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium poppins">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register("title", { required: "Title is required" })}
              className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 ${
                errors.title
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-[#60E5AE]"
              }`}
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium poppins">
              Category <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register("category", { required: "Category is required" })}
              className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 ${
                errors.category
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-[#60E5AE]"
              }`}
            />
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">
                {errors.category.message}
              </p>
            )}
          </div>

          {/* Short Description */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium poppins">
              Short Description <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={2}
              {...register("shortDescription", {
                required: "Short description is required",
              })}
              className={`w-full border rounded-md px-3 py-2 resize-none focus:outline-none focus:ring-2 ${
                errors.shortDescription
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-[#60E5AE]"
              }`}
            />
            {errors.shortDescription && (
              <p className="text-red-500 text-sm mt-1">
                {errors.shortDescription.message}
              </p>
            )}
          </div>

          {/* Long Description */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium poppins">
              Long Description <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={4}
              {...register("longDescription", {
                required: "Long description is required",
              })}
              className={`w-full border rounded-md px-3 py-2 resize-none focus:outline-none focus:ring-2 ${
                errors.longDescription
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-[#60E5AE]"
              }`}
            />
            {errors.longDescription && (
              <p className="text-red-500 text-sm mt-1">
                {errors.longDescription.message}
              </p>
            )}
          </div>

          {/* Start Date */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium poppins">
              Start Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              {...register("startDate", { required: "Start date is required" })}
              className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 ${
                errors.startDate
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-[#60E5AE]"
              }`}
            />
            {errors.startDate && (
              <p className="text-red-500 text-sm mt-1">
                {errors.startDate.message}
              </p>
            )}
          </div>

          {/* End Date */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium poppins">
              End Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              {...register("endDate", { required: "End date is required" })}
              className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 ${
                errors.endDate
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-[#60E5AE]"
              }`}
            />
            {errors.endDate && (
              <p className="text-red-500 text-sm mt-1">
                {errors.endDate.message}
              </p>
            )}
          </div>

          {/* Status */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium poppins">
              Status
            </label>
            <select
              {...register("status")}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#60E5AE]"
            >
              <option value="">Select status</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Collaborative Task">Collaborative Task</option>
              <option value="All Task">All Task</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-[#60E5AE] text-white py-3 rounded-md font-semibold poppins hover:bg-[#4dbd95] transition-colors ${
              isSubmitting ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Updating..." : "Update Task"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateTask;
