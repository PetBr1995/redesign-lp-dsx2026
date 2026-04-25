import { useEffect, useState } from "react";

const Timer = ({ targetDate, className = "" }) => {
  const calculateTimeLeft = () => {
    const difference = new Date(targetDate).getTime() - new Date().getTime();

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const format = (num) => String(num).padStart(2, "0");

  return (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      <TimeBlock value={format(timeLeft.days)} label="Dias" />
      <Separator />
      <TimeBlock value={format(timeLeft.hours)} label="Horas" />
      <Separator />
      <TimeBlock value={format(timeLeft.minutes)} label="Minutos" />
      <Separator />
      <TimeBlock value={format(timeLeft.seconds)} label="Segundos" />
    </div>
  );
};

export default Timer;

/* =======================
   Subcomponentes
======================= */

const TimeBlock = ({ value, label }) => {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <span className="text-2xl font-black font-mono text-black">
        {value}
      </span>
      <span className="text-[8px] font-bold text-black tracking-wider">
        {label}
      </span>
    </div>
  );
};

const Separator = () => {
  return (
    <div className="flex flex-col mb-4 justify-center items-center gap-1.5">
      <div className="w-1 h-1 bg-black rounded-full" />
      <div className="w-1 h-1 bg-black rounded-full" />
    </div>
  );
};
