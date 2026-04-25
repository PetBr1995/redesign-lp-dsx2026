const SlidaData = () => {
  const itens = Array.from({ length: 8 }, (_, idx) => (
    <h3
      key={idx}
      className="relative px-4 whitespace-nowrap after:absolute after:content-[''] after:top-2 after:left-0 after:rounded-full after:bg-[#D63278] after:w-2 after:h-2 font-jamjuree text-black uppercase font-medium"
    >
      23 e 24 &bull; JUL &bull; 2026
    </h3>
  ));

  return (
    <div className="faixa-wrapper bg-[#F5A205] py-4">
      <div className="relative faixa-track-fast">
        <div className="flex shrink-0">{itens}</div>
        <div className="flex shrink-0">{itens}</div>
      </div>
    </div>
  );
};

export default SlidaData;
