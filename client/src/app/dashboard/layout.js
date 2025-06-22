"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { usePathname, useRouter } from "next/navigation";
import img from "../../assets/desktop.png";
import icon from "../../assets/icon.png";
import task from "../../assets/task.png";
import wheel from "../../../public/wheel.png";
import { IoChevronDownSharp, IoPersonCircleSharp } from "react-icons/io5";

export default function DashboardLayout({ children }) {
  const [userName, setUserName] = useState("User");
  const axiosPublic = useAxiosPublic();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUserName(parsedUser.name || "User");
      } catch (err) {
        console.error("Invalid user data in localStorage");
      }
    }
  }, []);

  const handleLogout = async () => {
    try {
      // Call your backend logout API
      await axiosPublic.post("/api/user/logout");

      // Clear frontend localStorage after successful logout
      localStorage.removeItem("user");

      // Show success message
      await Swal.fire({
        icon: "success",
        title: "Logged Out",
        text: "You have been successfully logged out.",
        timer: 1500,
        showConfirmButton: false,
      });

      // Redirect to login page
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);

      Swal.fire({
        icon: "error",
        title: "Logout Failed",
        text: error?.response?.data?.message || "Something went wrong!",
      });
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-100">
      <div
        className="w-full h-[306px] bg-cover bg-center p-6 text-white space-y-16"
        style={{
          backgroundImage: `url(${img.src})`,
        }}
      >
        <div className="flex justify-between items-center w-11/12 max-w-screen-xl mx-auto">
          <div className="flex items-center space-x-2">
            <div className="relative sm:hidden group">
              {/* Keep the group hover on the parent */}
              <button className="text-white text-2xl focus:outline-none pb-1 cursor-pointer">
                &#9776;
              </button>

              {/* Wrap both button and dropdown in a hoverable container */}
              <div className="absolute left-0 w-36 bg-[#60E5AE] text-black rounded-lg shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition duration-200 z-50">
                <Link
                  href="/task"
                  className="flex items-center px-4 py-2 hover:bg-[#66b695] hover:rounded-lg space-x-2"
                >
                  <Image src={task} alt="task list" width={20} height={20} />
                  <span className="text-sm font-medium jakarta">Task list</span>
                </Link>
                <Link
                  href="/wheel"
                  className="flex items-center px-4 py-2 hover:bg-[#66b695] hover:rounded-lg space-x-2"
                >
                  <Image src={wheel} alt="spin" width={20} height={20} />
                  <span className="text-sm font-medium jakarta">Spin</span>
                </Link>
              </div>
            </div>

            {/* Logo */}
            <div className="flex items-center space-x-1 sm:space-x-2">
              <Image
                src={icon}
                alt="logo"
                className="object-cover"
                width={24}
                height={24}
              />
              <h1 className="text-lg sm:text-xl xl:text-2xl font-semibold poppins">
                Tasko
              </h1>
            </div>
          </div>

          {/* Navigation */}
          <div className="hidden sm:flex items-center space-x-3 sm:space-x-4 md:space-x-5 xl:space-x-6">
            <Link
              href="/dashboard/allTasks"
              className="flex items-center space-x-1 sm:space-x-2"
            >
              <Image
                src={task}
                alt="task list"
                width={20}
                height={20}
                className="sm:w-[24px] sm:h-[24px] xl:w-[28px] xl:h-[28px]"
              />
              <span className="text-sm sm:text-base xl:text-lg font-medium jakarta">
                Task list
              </span>
            </Link>

            <Link
              href="/dashboard/spinningWheel"
              className="flex items-center space-x-1 sm:space-x-2"
            >
              <Image
                src={wheel}
                alt="spin"
                width={20}
                height={20}
                className="sm:w-[24px] sm:h-[24px] xl:w-[28px] xl:h-[28px]"
              />
              <span className="text-sm sm:text-base xl:text-lg font-medium jakarta">
                Spin
              </span>
            </Link>
          </div>

          <div className="flex items-center space-x-1 sm:space-x-2">
            <IoPersonCircleSharp className="text-2xl sm:text-3xl" />
            <h1 className="text-base sm:text-lg xl:text-xl font-semibold poppins">
              {userName}
            </h1>
            <div className="relative group pb-2">
              {/* Dropdown Icon */}
              <IoChevronDownSharp className="text-base sm:text-lg cursor-pointer mt-2" />

              {/* Hover Dropdown */}
              <div className="absolute right-0 top-full w-28 bg-[#60E5AE] border rounded-lg shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition duration-200 z-50">
                <button
                  onClick={handleLogout}
                  className="w-full text-center px-4 py-2 text-sm hover:bg-[#66b695] rounded-md"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
        <div>
          {pathname === "/dashboard/allTasks" && (
            <div className="flex flex-col">
              <h1 className="poppins text-lg sm:text-xl xl:text-2xl font-semibold text-[#60E5AE]">
                Hi {userName}
              </h1>
              <h1 className="poppins text-2xl sm:text-3xl xl:text-[40px] font-semibold text-white">
                Welcome to Dashboard
              </h1>
            </div>
          )}
        </div>
      </div>
      {/* Content Area */}
      <main className="-mt-20 relative z-20 w-11/12 max-w-7xl mx-auto bg-white rounded-xl p-6 shadow-lg">
        {children}
      </main>
    </div>
  );
}
