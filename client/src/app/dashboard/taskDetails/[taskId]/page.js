"use client";
import { useParams } from "next/navigation";
import { useFetchTaskById } from "@/hooks/useFetchTaskById";
import { RiEdit2Fill } from "react-icons/ri";
import Link from "next/link";
import Image from "next/image";
import edit from "../../../../../public/edit.png";
import { useEffect, useState } from "react";
import delette from "../../../../assets/delete.png";
import submitted from "../../../../../public/submitted.png";
import Swal from "sweetalert2";
import useAxiosPublic from "@/hooks/useAxiosPublic";

const TaskDetails = ({ params }) => {
  const { taskId } = useParams();
  const { task, loading, error } = useFetchTaskById(taskId);
  const statuses = [
    { name: "All Task", value: "All Task" },
    { name: "Ongoing", value: "In Progress" },
    { name: "Pending", value: "Pending" },
    { name: "Collaborative Task", value: "Collaborative Task" },
    { name: "Completed", value: "Completed" },
  ];
  const [statusFilter, setStatusFilter] = useState("");
  const [updating, setUpdating] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const axiosPublic = useAxiosPublic();

  const [user, setUser] = useState(() => {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("user"));
    }
    return null;
  });

  useEffect(() => {
    if (task?.status) {
      setStatusFilter(task.status);
    }
  }, [task]);
  if (loading) {
    return <p className="text-center text-gray-500">Loading tasks...</p>;
  }

  if (error) {
    return (
      <p className="text-center text-red-500">
        Oops! Something went wrong: {error}
      </p>
    );
  }

  const handleStatusChange = async (newStatus) => {
    try {
      setUpdating(true);
      // This will call your backend API to update status
      await fetch(`/api/tasks/${taskId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      setStatusFilter(newStatus);
    } catch (error) {
      console.error("Failed to update task status:", error);
      alert("Failed to update task status");
    } finally {
      setUpdating(false);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      // Show confirmation dialog first
      const result = await Swal.fire({
        title: "Are you sure?",
        html: `<div style="display: flex; justify-content: center; margin-bottom: 10px;">
    <img src="${delette.src}" alt="Delete" style="width: 335px; height: 252px; margin-bottom: 10px;" />
    </div>
    <p>You won't be able to revert this!</p>
  `,
        icon: null, // disables the default icon
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await axiosPublic.delete(`/api/tasks/delete/${id}`);

        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Your task has been deleted.",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message || "Something went wrong!",
      });
    }
  };

  const handleSubmitTask = async (task) => {
    try {
      setSubmitting(true);

      if (!user) {
        throw new Error("User not authenticated. Please log in again.");
      }

      // Prepare the submission payload
      const submissionPayload = {
        task: {
          title: task.title,
          longDescription: task.longDescription,
          endDate: task.endDate,
          status: task.status,
          category: task.category,
          shortDescription: task.shortDescription,
          startDate: task.startDate,
        },
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      };

      // POST the submission to the correct endpoint
      const { data } = await axiosPublic.post(
        "/api/submitted-tasks/create",
        submissionPayload
      );

      const POINTS_EARNED = 20;

      // Success alert
      Swal.fire({
        html: `
  <div style="display: flex; justify-content: center; margin-bottom: 10px;">
    <img src="${submitted.src}" alt="Submitted" style="width: 335px; height: 252px;" />
  </div>
  <h1 style="font-family: Poppins; font-size: 24px; font-weight: 600; color: #1F1F1F;">Successfully Completed the Task!</h1>
  <p style="font-family: Poppins; font-size: 18px; font-weight: 400; color: #737791;">Congratulations! You have successfully completed the task and earned 20 points.</p>
`,
        timer: 2000,
        showConfirmButton: false,
        // Remove the icon property completely
      });

      const updatedUser = {
        ...user,
        points: (user.points || 0) + POINTS_EARNED,
      };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (error) {
      console.error("Submit Error:", error);

      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: error.response?.data?.message || error.message,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-3 flex flex-col space-y-10">
      <div className="flex justify-between items-center pb-3 border-b-[1px] border-[#E1E1E1]">
        <h1 className="poppins text-2xl font-semibold text-[#1F1F1F]">
          Task Details
        </h1>
        <div className="flex items-center gap-5">
          <h1 className="poppins text-base font-semibold text-[#C716F3]">
            {user.points} Points
          </h1>
          <button className="flex items-center space-x-1 bg-[#f1c8751a] text-sm sm:text-base jakarta cursor-pointer text-[#FFAB00] px-2 sm:px-4 lg:px-6 py-[2px] sm:py-2 lg:py-3 rounded-[8px]">
            <RiEdit2Fill />
            <span>Edit Task</span>
          </button>
          <Link href="/dashboard/allTasks">
            <button className="bg-[#60E5AE] text-sm sm:text-base jakarta cursor-pointer text-[#1F1F1F] px-2 sm:px-4 lg:px-6 py-[2px] sm:py-2 lg:py-3 rounded-[8px]">
              Back
            </button>
          </Link>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row">
        <div></div>
        <div className="flex flex-col items-start space-y-14">
          <div className="flex flex-col space-y-3">
            <h1 className="poppins text-lg sm:text-xl lg:text-[30.8px] font-semibold text-[#1F1F1F]">
              {task.title}
            </h1>
            <p className="poppins text-xs sm:text-sm lg:text-[17.79px] font-normal text-[#667085]">
              {task.longDescription}
            </p>
          </div>
          <div className="flex flex-col md:flex-row items-start md:items-center md:justify-start">
            <div className="flex flex-col items-start space-y-2 md:pr-10 border-r-[1.5px] border-[#E1E1E1]">
              <h1 className="poppins text-lg font-semibold text-[#1F1F1F]">
                End Date
              </h1>
              <span className="flex items-center space-x-2">
                <Image
                  src={edit}
                  alt="date"
                  width={20}
                  height={20}
                  className="sm:w-[24px] sm:h-[24px] xl:w-[35px] xl:h-[35px]"
                />
                <h1 className="poppins text-sm sm:text-base lg:text-xl font-normal text-[#1F1F1F]">
                  {new Date(task.endDate)
                    .toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })
                    .replace(/(\d+), (\d+)/, "$1 - $2")}
                </h1>
              </span>
            </div>
            <div className="md:pl-10">
              <span
                className={`poppins text-sm sm:text-lg lg:text-3xl font-medium flex items-center gap-2 ${
                  task.status === "Pending"
                    ? "text-[#E343E6]"
                    : task.status === "In Progress"
                    ? "text-[#DD9221]"
                    : task.status === "Completed"
                    ? "text-[#21D789]"
                    : "text-gray-500"
                }`}
              >
                <span className="poppins text-sm sm:text-lg lg:text-3xl leading-none">
                  •
                </span>
                {task.status}
              </span>
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <h1 className="poppins text-base font-semibold text-[#1F1F1F]">
              Change Status
            </h1>
            <select
              value={statusFilter}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="border border-[#E1E1E1] w-auto sm:w-[380px] md:w-[413px] rounded-md px-3 py-2 text-[#667085] jakarta font-medium"
              disabled={updating}
            >
              <option value="" disabled>
                Select Task Status
              </option>
              {statuses.map(({ name, value }) => (
                <option key={value} value={value}>
                  {name}
                </option>
              ))}
            </select>
            {updating && (
              <p className="text-sm text-gray-500 mt-1">Updating status...</p>
            )}
          </div>
          <div className="w-full flex flex-col sm:flex-row gap-5 items-center sm:justify-end">
            <button
              onClick={() => handleDeleteTask(task._id)}
              className="bg-[#FF4C2426] text-base lg:text-lg font-semibold jakarta cursor-pointer text-[#FF4C24] px-2 sm:px-4 lg:px-12 py-[2px] sm:py-2 lg:py-3 rounded-[8px]"
            >
              Delete Task
            </button>
            <button
              onClick={() => handleSubmitTask(task)}
              className="bg-[#60E5AE] text-base lg:text-lg font-semibold jakarta cursor-pointer text-[#1F1F1F] px-2 sm:px-4 lg:px-12 py-[2px] sm:py-2 lg:py-3 rounded-[8px]"
            >
              {submitting ? "Submitting" : "Submit"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
