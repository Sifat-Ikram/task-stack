"use client";
import Image from "next/image";
import img from "../assets/desktop.png";
import error from "../assets/error.png";
import Link from "next/link";

const ForgotPassword = () => {
  return (
    <div className="w-full relative min-h-screen">
      <div className="relative w-full h-[174px]">
        <Image src={img} alt="image" fill priority className="object-cover" />
      </div>
      <div className="absolute top-[90px] left-[60px] w-11/12 mx-auto flex flex-col justify-center items-center drop-shadow-lg bg-white p-14 rounded-[15px]">
        <div className="w-[584px] mx-auto flex flex-col space-y-20">
          <div className="h-[520px] relative w-full">
            <Image
              src={error}
              alt="error"
              fill
              priority
              className="object-cover"
            />
          </div>
          <Link
            href="/"
            className="w-full bg-[#60E5AE] text-center jakarta cursor-pointer text-[#1F1F1F] font-semibold text-lg transition-colors duration-300 py-[15px] rounded-[8px]"
          >
            Back To Home
          </Link>
        </div>
      </div>
      <div className="h-[400px]" />
    </div>
  );
};

export default ForgotPassword;
