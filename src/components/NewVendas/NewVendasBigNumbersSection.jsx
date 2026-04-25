const metrics = [
  {
    target: 2000,
    label: "Participantes",
    prefix: "+",
    suffix: "",
    useThousands: true,
  },
  {
    target: 40,
    label: "Palestras",
    prefix: "+",
    suffix: "",
    useThousands: false,
  },
  {
    target: 30,
    label: "Expositores",
    prefix: "+",
    suffix: "",
    useThousands: false,
  },
];

const experienceHighlights = [
  { value: "3 PALCOS", label: "simultâneos" },
  { value: "VIP", label: "área exclusiva" },
  { value: "FEIRA", label: "de negócios" },
  { value: "PRAÇA", label: "de alimentação" },
];

const formatMetricValue = (value, metric) => {
  const baseValue = metric.useThousands
    ? value.toLocaleString("pt-BR")
    : String(value);
  return `${metric.prefix}${baseValue}${metric.suffix}`;
};

const NewVendasBigNumbersSection = () => {
  return (
    <section className="bg-black text-white">
      <div className="mx-auto w-full max-w-6xl px-4 pb-6 pt-8 md:pb-8 md:pt-10">
        <div className="mx-auto grid w-full max-w-5xl grid-cols-3 gap-3 px-2 py-2 md:gap-4">
          {metrics.map((item) => (
            <div
              key={item.label}
              className="rounded-[16px] border border-[#7A5E24]/70 bg-[#161006] shadow-[inset_0_1px_0_rgba(255,224,146,0.08)]"
            >
              <div className="px-2 py-3 text-center md:px-3 md:py-4">
                <p className="font-anton text-[30px] leading-none tracking-[0.01em] text-[#F5C02B] sm:text-[40px] md:text-[68px]">
                  {formatMetricValue(item.target, item)}
                </p>
                <p className="mt-2 font-jamjuree text-[11px] font-bold uppercase tracking-[0.11em] text-white/90 md:text-[17px]">
                  {item.label}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="mx-auto mt-3 grid w-full max-w-5xl grid-cols-2 gap-3 px-2 md:grid-cols-4 md:gap-4">
          {experienceHighlights.map((item) => (
            <div
              key={`${item.value}-${item.label}`}
              className="rounded-[14px] border border-[#7A5E24]/60 bg-[#141006]"
            >
              <div className="px-3 py-3 text-center">
                <p className="font-anton leading-none tracking-[0.03em] text-[#F5C02B] text-[20px] md:text-[30px]">
                  {item.value}
                </p>
                <p className="mt-1 font-jamjuree text-[10px] font-bold uppercase tracking-[0.09em] text-white/85 md:text-[13px]">
                  {item.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewVendasBigNumbersSection;
