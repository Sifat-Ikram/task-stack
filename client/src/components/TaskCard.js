import { RiDeleteBin6Line } from "react-icons/ri";
import { BsBarChartFill } from "react-icons/bs";
import { LuClipboardPen } from "react-icons/lu";
import Link from "next/link";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import Swal from "sweetalert2";

export default function TaskCard({ task, onDelete }) {
  const axiosPublic = useAxiosPublic();

  const handleDeleteTask = async (id) => {
    try {
      // Show confirmation dialog first
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
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
        if (onDelete) onDelete();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message || "Something went wrong!",
      });
    }
  };

  return (
    <Link href={`/dashboard/taskDetails/${task._id}`}>
      <div className="border border-[#E1E1E1] px-[22px] py-5 flex flex-col justify-between space-y-5 rounded-[8px]">
        <div className="flex items-start space-x-[14px]">
          {/* Placeholder icon */}
          <div className="bg-teal-500 text-white rounded-full w-9 h-7 flex items-center justify-center font-bold">
            <BsBarChartFill />
          </div>
          <div className="flex flex-col">
            <h3 className="poppins text-[#161616] text-left text-base sm:text-lg lg:text-2xl font-semibold">
              {task.title}
            </h3>
            <p className="poppins text-left text-xs lg:text-sm font-normal text-[#667085]">
              {task.shortDescription}
            </p>
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleDeleteTask(task._id);
            }}
            className="ml-auto text-[#FF4C24] cursor-pointer"
            title="Delete task"
          >
            <RiDeleteBin6Line />
          </button>
        </div>
        <div className="flex justify-between items-center poppins text-xs sm:text-sm lg:text-base font-normal text-[#667085]">
          <div className="flex items-center space-x-1">
            <LuClipboardPen />
            <span>
              {new Date(task.endDate).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
          <span
            className={`font-semibold flex items-center gap-2 ${
              task.status === "Pending"
                ? "text-[#E343E6]"
                : task.status === "In Progress"
                ? "text-[#DD9221]"
                : task.status === "Completed"
                ? "text-[#21D789]"
                : "text-gray-500"
            }`}
          >
            <span className="text-xl leading-none">•</span>
            {task.status}
          </span>
        </div>
      </div>
    </Link>
  );
}
