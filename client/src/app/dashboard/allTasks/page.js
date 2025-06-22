"use client";

import TaskCard from "@/components/TaskCard";
import { useFetchTasks } from "@/hooks/useFetchTasks";
import Link from "next/link";
import { useState } from "react";

const categories = [
  "Art and Craft",
  "Nature",
  "Family",
  "Sport",
  "Friends",
  "Meditation",
];

const statuses = [
  { name: "All Task", value: "All" },
  { name: "Ongoing", value: "In Progress" },
  { name: "Pending", value: "Pending" },
  { name: "Collaborative Task", value: "Collaborative Task" },
  { name: "Completed", value: "Completed" },
];

export default function TaskListPage() {
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const { tasks, loading, error, refetch } = useFetchTasks();
  
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

  // Filter tasks by category and status
  const filteredTasks = tasks.filter((task) => {
    const categoryMatch =
      categoryFilter === "All" || task.category === categoryFilter;
    const statusMatch = statusFilter === "All" || task.status === statusFilter;
    return categoryMatch && statusMatch;
  });

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        <h2 className="text-base sm:text-lg lg:text-xl font-bold">
          All Task List
        </h2>

        <div className="flex flex-wrap items-center gap-3">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="border border-[#E1E1E1] rounded-md px-3 py-2 text-sm sm:text-base text-[#667085] jakarta font-medium"
          >
            <option value="All">Select Task Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-[#E1E1E1] rounded-md px-3 py-2 text-sm sm:text-base text-[#667085] jakarta font-medium"
          >
            <option value="All">Select Task Status</option>
            {statuses.map(({ name, value }) => (
              <option key={value} value={value}>
                {name}
              </option>
            ))}
          </select>

          <Link href="/dashboard/addTask">
            <button className="bg-[#60E5AE] text-sm sm:text-base jakarta cursor-pointer text-[#1F1F1F] px-2 sm:px-4 lg:px-6 py-[2px] sm:py-2 lg:py-3  rounded-[8px]">
              Add New Task
            </button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <TaskCard key={task._id} task={task} onDelete={refetch} />
          ))
        ) : (
          <p className="text-gray-500">No tasks found for selected filters.</p>
        )}
      </div>
    </div>
  );
}
