import { useState, useEffect } from "react";
import { HiOutlineClock } from "react-icons/hi";

const Countdown = () => {
  const [hours, setHours] = useState(2);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [timerOn, setTimerOn] = useState(false);

  useEffect(() => {
    if (timerOn) {
      const intervalId = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else if (hours > 0) {
          setHours(hours - 1);
          setMinutes(59);
          setSeconds(59);
        } else {
          clearInterval(intervalId);
        }
      }, 1000);
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [hours, minutes, seconds, timerOn]);

  const handleTimeChange = (e, setValue) => {
    const inputValue = parseInt(e.target.value, 10);
    if (!isNaN(inputValue)) {
      setValue(inputValue);
    }
  };

  const handleStartStopClick = () => {
    setTimerOn(!timerOn);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="flex flex-col h-[20%] ">
        {timerOn === true && hours === 0 && minutes === 0 && seconds === 0 && (
          <h3 className=" text-red-600 font-semibold text-xl">Time's up!</h3>
        )}
        <HiOutlineClock className="text-9xl mb-6 text-blue-500" />
      </div>
      <div className="flex space-x-4">
        <div className="flex items-center border border-gray-300 rounded-lg bg-white shadow-md p-4">
          <input
            type="number"
            id="hours"
            label="Hours"
            value={hours}
            onChange={(e) => handleTimeChange(e, setHours)}
            className="appearance-none w-full text-gray-700 py-1 px-2 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex items-center border border-gray-300 rounded-lg bg-white shadow-md p-4">
          <input
            type="number"
            id="minutes"
            label="Minutes"
            value={minutes}
            onChange={(e) => handleTimeChange(e, setMinutes)}
            className="appearance-none w-full text-gray-700 py-1 px-2 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex items-center border border-gray-300 rounded-lg bg-white shadow-md p-4">
          <input
            type="number"
            id="seconds"
            label="Seconds"
            value={seconds}
            onChange={(e) => handleTimeChange(e, setSeconds)}
            className="appearance-none w-full text-gray-700 py-1 px-2 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
      </div>
      <div className="mt-6">
        <button
          onClick={handleStartStopClick}
          className="w-32 bg-green-700 text-lg rounded-lg shadow-md p-2 text-white"
        >
          {timerOn ? "Stop" : "Start"}
        </button>
      </div>
    </div>
  );
};

export default Countdown;
