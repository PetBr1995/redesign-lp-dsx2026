import { useState, useEffect } from 'react';
import imgFundo from '../assets/vemai-dsx.png';
import CTAButton from './Mascaras/MainMask';
import MainMask from './Mascaras/MainMask';

const TimerHeader = () => {
    // Mude essa data para a data real do evento DSX 2026
    const targetDate = new Date('2026-02-01T00:00:00');

    const calculateTimeLeft = () => {
        const difference = targetDate.getTime() - new Date().getTime();

        if (difference <= 0) {
            return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        return { days, hours, minutes, seconds };
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatNumber = (num) => num.toString().padStart(2, '0');

    return (
        <div
            className="
    fixed 
    -top-2.5
    sm:top-0 
    left-0 
    sm:left-1/2 
    -translate-x-5
    sm:-translate-x-1/2
    z-1000
    max-w-[700px] 
    w-[105%]
    sm:w-[90%]
    m-2 
    rounded-none
    sm:rounded-[50px]
    bg-[#111111] 
    text-center
    overflow-hidden
    before:content-['']
    before:absolute
    before:inset-0
    before:bg-[url('/elipse-1.png')]
    before:bg-no-repeat
    before:bg-center
    before:bg-contain
    before:opacity-80
    before:h-[170px]
    before:-top-15
    before:right-120
    before:z-0

    flex
    flex-col            /* 👈 coluna no mobile */
    sm:flex-row         /* 👈 volta pra linha no sm+ */
    justify-center
    items-center
    gap-2 sm:gap-4
    h-auto sm:h-20      /* 👈 no mobile deixa altura automática */
    py-2 sm:py-0        /* 👈 dá respiro no mobile */
  "
        >
            {/* Logo */}
            <div className="relative z-10 flex flex-col items-center gap-2 py-2 sm:py-3">
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
                
                h-14 sm:h-full      /* 👈 altura menor no mobile */
                w-[92%] sm:w-[55%] md:w-[40%]
                
                translate-x-0
                sm:translate-x-[30px]
                md:translate-x-[50px]
                
                flex
                items-center
                justify-center
                gap-0.5 sm:gap-1
                px-2 sm:px-2
                rounded-[30px] sm:rounded-none   /* opcional: arredonda no mobile */
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
            <MainMask titulo="As vendas começam em: " textColor="#000000" backgroundColor="#ffffff" />
        </div>

    );
};

// Bloco compacto do número
function TimeBlock({ value, label }) {
    return (
        <div className="flex flex-col items-center gap-0.5">
            <span className="text-2xl font-black font-mono text-white">
                {value}
            </span>
            <span className="text-[8px] font-bold text-white tracking-wider">
                {label}
            </span>
        </div>
    );
}

// Separador compacto
function Separator() {
    return (
        <div className="flex flex-col  justify-center mb-4 items-center gap-1.5 h-full">
            <div className="w-1 h-1 bg-white rounded-full"></div>
            <div className="w-1 h-1 bg-white rounded-full"></div>
        </div>
    );
}

export default TimerHeader;
