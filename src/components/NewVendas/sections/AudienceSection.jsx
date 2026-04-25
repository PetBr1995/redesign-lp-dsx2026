const AudienceSection = ({ items }) => {
  const firstRowItems = items.slice(0, 3);
  const secondRowItems = items.slice(3, 5);

  const splitSubtitleAndBody = (description = "") => {
    const text = description.trim();
    const match = text.match(/^(.*?[.!?])\s+(.*)$/);

    if (!match) {
      return { subtitle: text, body: "" };
    }

    return {
      subtitle: match[1],
      body: match[2],
    };
  };

  const renderCard = (profile) => {
    const { subtitle, body } = splitSubtitleAndBody(profile.description);

    return (
      <article
        key={profile.description}
        className="flex h-full min-h-[210px] items-start rounded-2xl border border-[#7A5D24] bg-gradient-to-b from-[#1E170B] to-[#120D06] p-5 shadow-[inset_0_0_0_1px_rgba(201,168,76,0.1)] md:min-h-[230px] md:p-6"
      >
        <div className="flex w-full flex-col items-start gap-4 text-left">
          <h2 className="font-anton text-[26px] uppercase leading-none tracking-[0.02em] text-[#F5C02B] md:text-[30px]">
            {profile.title}
          </h2>

          <div className="w-full space-y-2">
            <p className="border-l-2 border-[#F5C02B]/70 pl-3 font-jamjuree text-[14px] font-semibold leading-snug text-[#F5C02B] md:text-[16px]">
              {subtitle}
            </p>
            {body ? (
              <p className="font-jamjuree text-[14px] font-normal leading-relaxed text-white/85 md:text-[16px]">
                {body}
              </p>
            ) : null}
          </div>
        </div>
      </article>
    );
  };

  return (
    <div className="relative bg-black pb-16 pt-6 md:pb-20 md:pt-8">
      <div className="pointer-events-none absolute left-0 top-8 h-44 w-44 rounded-full bg-[#F5C02B]/10 blur-3xl" />
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-center font-anton text-[30px] uppercase leading-[1.12] tracking-[0.01em] text-white md:text-[52px] md:leading-[1.03]">
          Para quem é o DSX:
        </h2>

        <p className="mx-auto mt-3 max-w-3xl text-center font-jamjuree text-[15px] leading-relaxed text-white/80 md:text-[17px]">
          Uma experiência desenhada para quem toma decisão, lidera equipes e quer
          transformar estratégia em crescimento real.
        </p>

        <div className="mx-auto mt-10 max-w-6xl space-y-4">
          <div className="grid grid-cols-1 items-stretch gap-4 lg:grid-cols-3">
            {firstRowItems.map(renderCard)}
          </div>

          <div className="grid grid-cols-1 items-stretch gap-4 lg:grid-cols-2">
            {secondRowItems.map(renderCard)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudienceSection;
