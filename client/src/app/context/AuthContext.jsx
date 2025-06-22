"use client";

import { createContext, useContext, useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import useAxiosPublic from "@/hooks/useAxiosPublic";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const axiosPublic = useAxiosPublic();

  // Create an axios instance with interceptor to handle 401
  const axiosInstance = useMemo(() => {
    const instance = axios.create({
      withCredentials: true,
    });

    instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        // Prevent infinite loops
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
            // Call refresh endpoint, which sets new access token cookie
            await axiosPublic.post("/api/user/refresh");

            // Retry the original request with new cookie set
            return instance(originalRequest);
          } catch (refreshError) {
            console.error("Refresh token failed:", refreshError);
            // Optionally logout user here or redirect
            router.push("/"); // Redirect to login on refresh failure
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );

    return instance;
  }, [axiosPublic, router]);

  // Try to refresh token on mount to see if user is still logged in
  useEffect(() => {
    const attemptRefresh = async () => {
      try {
        await axiosPublic.post("/api/user/refresh");
      } catch (err) {
        // 400 means no refresh token, no problem, just not logged in
        if (err.response?.status !== 400) {
          console.error("Unexpected refresh error:", err);
          router.push("/");
        }
      } finally {
        setLoading(false);
      }
    };

    attemptRefresh();
  }, [axiosPublic, router]);

  return (
    <AuthContext.Provider
      value={{
        axiosInstance,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
