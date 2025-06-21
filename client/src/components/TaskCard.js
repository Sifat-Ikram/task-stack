import { RiDeleteBin6Line } from "react-icons/ri";
import { BsBarChartFill } from "react-icons/bs";
import { LuClipboardPen } from "react-icons/lu";

export default function TaskCard({ task, onDelete }) {
  return (
    <div className="border border-[#E1E1E1] px-[22px] py-5 flex flex-col justify-between space-y-5">
      <div className="flex items-center gap-[14px]">
        {/* Placeholder icon */}
        <div className="bg-teal-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
          <BsBarChartFill />
        </div>
        <div className="flex flex-col">
          <h3 className="poppins text-[#161616] text-left text-base sm:text-lg lg:text-2xl font-semibold">
            {task.title}
          </h3>
          <p className="poppins text-left text-xs lg:text-sm font-normal text-[#667085]">
            {task.description}
          </p>
        </div>
        <button
          onClick={() => onDelete(task.id)}
          className="ml-auto text-[#FF4C24]"
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
        <span className={`font-semibold text-pink-500`}>{task.status}</span>
      </div>
    </div>
  );
}
