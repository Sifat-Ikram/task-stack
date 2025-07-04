"use client";
import { useState, useEffect } from "react";
import useAxiosPublic from "./useAxiosPublic";

export function useFetchTaskById(taskId, refreshTrigger = 0) {
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    if (!taskId) return;
    setLoading(true);
    axiosPublic
      .get(`/api/tasks/${taskId}`)
      .then((res) => setTask(res.data))
      .catch((err) => setError(err.message || "Error fetching task"))
      .finally(() => setLoading(false));
  }, [taskId, refreshTrigger, axiosPublic]);

  return { task, loading, error };
}
