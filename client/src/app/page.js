"use client";
import img from "../assets/login.png";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiEye, FiEyeOff } from "react-icons/fi";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const storedEmail = localStorage.getItem("rememberedEmail");
    if (storedEmail) {
      setValue("email", storedEmail);
      setRememberMe(true);
    }
  }, []);

  const onSubmit = async (data) => {
    setLoading(true);

    const userInfo = {
      email: data.email,
      password: data.password,
    };

    try {
      const res = await axiosPublic.post("/api/user/login", userInfo);

      const { user } = res.data;

      localStorage.setItem("user", JSON.stringify(user));

      if (rememberMe) {
        localStorage.setItem("rememberedEmail", data.email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }

      Swal.fire({
        icon: "success",
        title: "Login Successful!",
        text: `Welcome back, ${user.name}`,
        timer: 2000,
        showConfirmButton: false,
      });

      router.push("/dashboard/allTasks");
    } catch (error) {
      const message =
        error?.response?.data?.message || "Invalid email or password!";

      console.log(message);

      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Image section */}
      <div className="w-1/2 relative hidden md:block">
        <Image src={img} alt="Login" fill priority className="object-cover" />
      </div>

      {/* Form section */}
      <div className="w-full sm:flex-1 flex justify-center items-center">
        <div className="w-4/5 mx-auto flex flex-col space-y-5">
          <div className="text-center space-y-1">
            <h1 className="poppins text-[40px] font-semibold text-[#1F1F1F]">
              Login
            </h1>
            <p className="jakarta text-base font-medium text-[#667085]">
              WelcomeBack,Please Enter your Details to Log In.
            </p>
          </div>
          <div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="space-y-2">
                <div>
                  <label className="poppins text-base font-semibold text-[#1F1F1F]">
                    Email Address
                  </label>
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="m32220@gmail.com"
                    {...register("email", { required: "Email is required" })}
                    className="w-full border border-gray-300 px-[15px] shadow-md py-[11px] rounded-[5px]"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <div>
                  <label className="poppins text-base font-semibold text-[#1F1F1F]">
                    Password
                  </label>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="***********"
                    {...register("password", {
                      required: "Password is required",
                    })}
                    className="w-full border border-gray-300 px-[15px] shadow-md py-[11px] rounded-[5px] pr-10"
                  />
                  <div
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
                  >
                    {showPassword ? (
                      <FiEyeOff size={20} />
                    ) : (
                      <FiEye size={20} />
                    )}
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between mt-2 mb-4">
                  <label className="flex items-center space-x-2 text-sm text-gray-600">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="accent-teal-600"
                    />
                    <span className="jakarta text-base font-medium text-[#667085]">
                      Remember me
                    </span>
                  </label>
                  <a
                    href="/forgotPassword"
                    className="jakarta text-base font-medium text-[#667085]"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#60E5AE] jakarta cursor-pointer text-[#1F1F1F] font-semibold text-lg transition-colors duration-300 py-[15px] rounded-[8px]"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>
          </div>
          <div className="space-y-8">
            <div className="flex items-center space-x-[10px] w-11/12 mx-auto">
              <hr className="flex-grow border-[1.5px] border-t border-[#667085]" />
              <span className="jakarta text-base font-medium text-[#667085]">
                Or
              </span>
              <hr className="flex-grow border-[1.5px] border-t border-[#667085]" />
            </div>
            <div>
              <h1 className="jakarta text-base font-medium text-[#667085] text-center">
                Don’t have an account?{" "}
                <Link
                  href="/register"
                  className="jakarta text-base font-bold text-[#667085] ml-1"
                >
                  Sign Up
                </Link>
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
