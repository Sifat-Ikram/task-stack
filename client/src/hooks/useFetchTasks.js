"use client";
import { useState, useEffect, useCallback } from "react";
import useAxiosPublic from "./useAxiosPublic";

export function useFetchTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const axiosPublic = useAxiosPublic();

  const fetchTasks = useCallback(() => {
    setLoading(true);
    setError(null);

    axiosPublic
      .get("/api/tasks/get")
      .then((res) => setTasks(res.data))
      .catch((err) => setError(err.message || "Error fetching tasks"))
      .finally(() => setLoading(false));
  }, [axiosPublic]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return { tasks, loading, error, refetch: fetchTasks };
}
