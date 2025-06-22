"use client";
import { useParams } from "next/navigation";
import { useFetchTaskById } from "@/hooks/useFetchTaskById";
import { RiEdit2Fill } from "react-icons/ri";
import Link from "next/link";
import Image from "next/image";
import edit from "../../../../../public/edit.png";
import { useState } from "react";

const TaskDetails = ({ params }) => {
  const { taskId } = useParams();
  const { task, loading, error } = useFetchTaskById(taskId);
  const statuses = ["In Progress", "Pending", "Completed"];
  const [statusFilter, setStatusFilter] = useState("");
  const [updating, setUpdating] = useState(false);

  console.log(task);

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

  return (
    <div className="p-3 flex flex-col space-y-10">
      <div className="flex justify-between items-center pb-3 border-b-[1px] border-[#E1E1E1]">
        <h1 className="poppins text-2xl font-semibold text-[#1F1F1F]">
          Task Details
        </h1>
        <div className="flex items-center gap-5">
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
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
            {updating && (
              <p className="text-sm text-gray-500 mt-1">Updating status...</p>
            )}
          </div>
          <div className="w-full flex flex-col sm:flex-row gap-5 items-center sm:justify-end">
            <button className="bg-[#FF4C2426] text-base lg:text-lg font-semibold jakarta cursor-pointer text-[#FF4C24] px-2 sm:px-4 lg:px-12 py-[2px] sm:py-2 lg:py-3 rounded-[8px]">
              <span>Delete Task</span>
            </button>
            <button className="bg-[#60E5AE] text-base lg:text-lg font-semibold jakarta cursor-pointer text-[#1F1F1F] px-2 sm:px-4 lg:px-12 py-[2px] sm:py-2 lg:py-3 rounded-[8px]">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
