"use client";
import img from "../../assets/register.png";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const password = watch("password");

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      console.log("Registration Data:", data);

      setTimeout(() => {
        alert("Registration successful! 🎉");
        setLoading(false);
        // Redirect logic here
      }, 1000);
    } catch (error) {
      console.error("Registration failed", error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Image section */}
      <div className="w-1/2 relative hidden sm:block">
        <Image src={img} alt="sign up" fill priority className="object-cover" />
      </div>

      {/* Form section */}
      <div className="w-full sm:flex-1 flex justify-center items-center py-20">
        <div className="w-4/5 mx-auto flex flex-col space-y-5">
          <div className="text-center space-y-1">
            <h1 className="poppins text-[40px] font-semibold text-[#1F1F1F]">
              Sign Up
            </h1>
            <p className="jakarta text-base font-medium text-[#667085]">
              To Create Account, Please Fill in the From Below.
            </p>
          </div>
          <div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="space-y-2">
                <div>
                  <label className="poppins text-base font-semibold text-[#1F1F1F]">
                    Full Name
                  </label>
                </div>
                <div>
                  <input
                    type="name"
                    placeholder="Enter your full name"
                    {...register("name", { required: "Name is required" })}
                    className="w-full border border-gray-300 px-[20px] shadow-md py-[13px] rounded-[5px]"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <div>
                  <label className="poppins text-base font-semibold text-[#1F1F1F]">
                    Email Address
                  </label>
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Enter your email adders"
                    {...register("email", { required: "Email is required" })}
                    className="w-full border border-gray-300 px-[20px] shadow-md py-[13px] rounded-[5px]"
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
                      required: "password is required",
                    })}
                    className="w-full border border-gray-300 px-[20px] shadow-md py-[13px] rounded-[5px]"
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
              </div>
              <div className="space-y-2">
                <div>
                  <label className="poppins text-base font-semibold text-[#1F1F1F]">
                    Confirm Password
                  </label>
                </div>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="***********"
                    {...register("confirmPassword", {
                      required: "Please confirm your password",
                      validate: (value) =>
                        value === password || "Passwords do not match",
                    })}
                    className="w-full border border-gray-300 px-[20px] shadow-md py-[13px] rounded-[5px]"
                  />
                  <div
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
                  >
                    {showConfirmPassword ? (
                      <FiEyeOff size={20} />
                    ) : (
                      <FiEye size={20} />
                    )}
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#60E5AE] jakarta cursor-pointer text-[#1F1F1F] font-semibold text-lg transition-colors duration-300 py-[15px] rounded-[8px]"
              >
                {loading ? "Signing up..." : "Sign Up"}
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
                Already have an account?
                <Link
                  href="/"
                  className="jakarta text-base font-bold text-[#667085] ml-1"
                >
                  Log In
                </Link>
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
