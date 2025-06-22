"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Wheel } from "react-custom-roulette";
import { TbWheel } from "react-icons/tb";

export default function WheelSpinner({ data, tasks }) {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const router = useRouter();

  const handleSpinClick = () => {
    if (!data || data.length === 0) return;
    const newPrizeNumber = Math.floor(Math.random() * data.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
  };

  const handleGoToTask = () => {
    if (!mustSpin && data && data.length > 0) {
      const selectedTask = data[prizeNumber];
      const task = tasks.find((t) => t.title === selectedTask.option);
      router.push(`/dashboard/taskDetails/${task._id}`);
    } else {
      alert("Please spin the wheel first!");
    }
  };

  return (
    <div className="min-h-screen mt-36">
      {data && data.length > 0 ? (
        <div className="wheelContainer">
          <div style={{ transform: "rotate(130deg)" }}>
            <Wheel
              mustStartSpinning={mustSpin}
              prizeNumber={prizeNumber}
              data={data}
              outerBorderColor={"#fff"}
              outerBorderWidth={10}
              innerBorderColor={"transparent"}
              radiusLineColor={"#fff"}
              radiusLineWidth={1}
              textColors={["#fff"]}
              textDistance={60}
              fontSize={[18]}
              fontWeight={[500]}
              startingOptionIndex={0}
              backgroundColors={[
                "#98DF8A",
                "#1F77B4",
                "#AEC7E8",
                "#FF7F0E",
                "#FFBB78",
                "#2CA02C",
              ]}
              onStopSpinning={() => {
                setMustSpin(false);
              }}
            />
          </div>
          <div className="flex flex-col items-center gap-5 mt-20">
            <h1 className="poppins text-base font-semibold text-black">
              Spin Wheel to pick your task
            </h1>
            <div className="flex justify-center items-center gap-8">
              <button
                className="spinButton jakarta text-lg flex items-center gap-3 font-bold text-black bg-[60E5AE] px-6 py-3 rounded-[8px]"
                onClick={handleSpinClick}
                disabled={mustSpin}
              >
                <TbWheel className="text-lg font-semibold" />
                {mustSpin ? "Spinning..." : "SPIN"}
              </button>
              {!mustSpin && (
                <button className="spinButton ..." onClick={handleGoToTask}>
                  Go To Task
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center mt-10 text-gray-500 text-lg">
          No tasks available in this category.
        </div>
      )}
    </div>
  );
}
