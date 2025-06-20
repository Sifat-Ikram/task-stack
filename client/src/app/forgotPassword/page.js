"use client";
import Image from "next/image";
import img from "../../assets/desktop.png";
import reset from "../../assets/reset.png";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { useState } from "react";

const ForgotPassword = () => {
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
    console.log(data);
  };

  return (
    <div className="w-full relative">
      <div className="relative w-full h-[174px]">
        <Image src={img} alt="image" fill priority className="object-cover" />
      </div>
      <div className="absolute top-[90px] left-[60px] w-11/12 mx-auto flex flex-col justify-center items-center drop-shadow-lg bg-white p-14 rounded-[15px]">
        <div className="w-4/5 mx-auto flex flex-col space-y-5">
          <div className="relative h-[96.75px] w-[96.75px] mx-auto">
            <Image
              src={reset}
              alt="reset"
              fill
              priority
              className="object-cover"
            />
          </div>
          <div className="text-center space-y-1">
            <h1 className="poppins text-[40px] font-semibold text-[#1F1F1F]">
              Reset your Password
            </h1>
            <p className="jakarta text-base font-medium text-[#667085]">
              Strong passwords include numbers, letters, and punctuation marks.
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
                    Enter New Password
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
                    placeholder="Retype password"
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
                {loading ? "Resetting Password..." : "Reset Password"}
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="h-[400px]" />
    </div>
  );
};

export default ForgotPassword;
