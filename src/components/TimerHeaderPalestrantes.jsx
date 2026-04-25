import { useState, useEffect } from "react";
import imgFundo from "../assets/vemai-dsx.png";

const TimerHeaderPalestrantes = () => {
  const targetDate = new Date("2026-01-01T00:00:00");

  const calculateTimeLeft = () => {
    const difference = targetDate.getTime() - new Date().getTime();

    if (difference <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num) => num.toString().padStart(2, "0");

  return (
    <section className="fixed top-0 left-0 right-0 z-1000 bg-black px-4 pt-5">
      <div
        className="
          max-w-[1200px]
          mx-auto
          flex
          flex-col
          sm:flex-row
          items-center
          justify-center
          gap-3
        "
      >
        {/* LOGO FORA DO CONTAINER */}
        <a href="/" className="shrink-0">
          <img
            src="/logo-home.png"
            alt="logo"
            className="h-8 sm:h-8 w-auto hover:-translate-y-0.5 transition-[.4s]"
          />
        </a>

        {/* CONTAINER DO TIMER (igual ao seu, só responsivo) */}
        <div
          className="
            w-full max-w-[700px]
            rounded-[50px]
            bg-[#111111]
            text-center
            overflow-hidden
            flex
            flex-col              /* mobile: coluna */
            sm:flex-row           /* sm+: linha */
            justify-center
            items-center
            gap-2 sm:gap-4
            h-auto sm:h-20
            py-2 sm:py-0
          "
        >
          {/* Imagem VemAí */}
          <div className="flex justify-center items-center">
            <img
              src={imgFundo}
              alt="img"
              className="w-56 sm:w-80 translate-x-0 sm:translate-x-14"
            />
          </div>

          {/* Timer */}
          <div
            className="
              bg-cover
              bg-center
              h-14 sm:h-full
              w-[92%] sm:w-[55%] md:w-[40%]
              translate-x-0 sm:translate-x-[30px] md:translate-x-[50px]
              flex
              items-center
              justify-center
              gap-0.5 sm:gap-1
              px-2
              rounded-[30px] sm:rounded-none
            "
          >
            <TimeBlock value={formatNumber(timeLeft.days)} label="Dias" />
            <Separator />
            <TimeBlock value={formatNumber(timeLeft.hours)} label="Horas" />
            <Separator />
            <TimeBlock value={formatNumber(timeLeft.minutes)} label="Minutos" />
            <Separator />
            <TimeBlock value={formatNumber(timeLeft.seconds)} label="Segundos" />
          </div>
        </div>
      </div>
    </section>
  );
};

function TimeBlock({ value, label }) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <span className="text-xl sm:text-2xl font-black font-mono text-white">
        {value}
      </span>
      <span className="text-[8px] font-bold text-white tracking-wider">
        {label}
      </span>
    </div>
  );
}

function Separator() {
  return (
    <div className="flex flex-col justify-center mb-4 items-center gap-1.5 h-full">
      <div className="w-1 h-1 bg-white rounded-full"></div>
      <div className="w-1 h-1 bg-white rounded-full"></div>
    </div>
  );
}

export default TimerHeaderPalestrantes;
