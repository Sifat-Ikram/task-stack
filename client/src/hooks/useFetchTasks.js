"use client";
import { useState, useEffect } from "react";
import useAxiosPublic from "./useAxiosPublic";

export function useFetchTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    axiosPublic
      .get("/api/tasks/get")
      .then((res) => setTasks(res.data))
      .catch((err) => setError(err.message || "Error fetching tasks"))
      .finally(() => setLoading(false));
  }, [axiosPublic]);

  return { tasks, loading, error };
}
