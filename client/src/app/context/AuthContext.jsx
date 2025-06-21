"use client";

import { createContext, useContext, useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const axiosInstance = useMemo(() => {
    const instance = axios.create({
      withCredentials: true,
    });

    instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
            await axios.post(
              "http://localhost:5000/api/user/refresh",
              {},
              { withCredentials: true }
            );
            return instance(originalRequest);
          } catch (refreshError) {
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );

    return instance;
  }, []);

  // On app load, ping refresh endpoint to get fresh access token cookie if possible
  useEffect(() => {
    (async () => {
      try {
        await axios.post(
          "http://localhost:5000/api/user/refresh",
          {},
          { withCredentials: true }
        );
      } catch (refreshError) {
        router.push("/");
        return Promise.reject(refreshError);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

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
