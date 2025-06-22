"use client";
import { useEffect, useState } from "react";
import WheelSpinner from "@/components/WheelSpinner";
import { useFetchTasks } from "@/hooks/useFetchTasks";

const WheelSpin = () => {
  const { tasks, loading, error, refetch } = useFetchTasks();

  const categories = [
    "Art and Craft",
    "Nature",
    "Family",
    "Sport",
    "Friends",
    "Meditation",
  ];

  const [categoryFilter, setCategoryFilter] = useState(categories[0]);
  const [filteredTasks, setFilteredTasks] = useState([]);

  // Filter tasks when tasks or category changes
  useEffect(() => {
    if (tasks && tasks.length > 0) {
      const filtered = tasks
        .filter((task) => task.category === categoryFilter)
        .map((task) => ({ id: task.id, option: task.title })); // <-- Add id here
      setFilteredTasks(filtered);
    } else {
      setFilteredTasks([]);
    }
  }, [tasks, categoryFilter]);

  return (
    <div className="min-h-screen px-4">
      <div className="flex flex-col sm:flex-row gap-10 items-center sm:justify-between">
        <h1 className="poppins text-2xl font-semibold text-black">
          Spin Wheel
        </h1>
        <div className="flex flex-col items-center sm:items-start gap-6">
          <h1 className="poppins text-base font-semibold text-black">
            Select Task Category
          </h1>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="border border-[#E1E1E1] rounded-md w-60 px-3 py-2 text-sm sm:text-base text-[#667085] font-medium"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <WheelSpinner data={filteredTasks} tasks={tasks} />
      </div>
    </div>
  );
};

export default WheelSpin;
