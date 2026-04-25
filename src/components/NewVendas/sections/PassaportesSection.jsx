import PassaporteVendasHomeTeste from "../../HomeTesteComponentes/PassaporteVendasHomeTeste";
import PassaportesMobileHomeTeste from "../../HomeTesteComponentes/PassaportesMobileHomeTeste";
import PassaporteGrupoHomeTeste from "../../HomeTesteComponentes/PassaporteGrupoHomeTeste";

const PassaportesSection = ({
  isMobile,
  onBuyPassaporte,
  hidePassaporteButtons = false,
}) => {
  return (
    <div id="passaportes" className="relative bg-black pt-2">
      <div className="mx-auto max-w-6xl px-4 pb-5 text-center md:pb-8">
        <p className="font-jamjuree text-xs font-bold uppercase tracking-[0.14em] text-[#F5C02B] md:text-sm">
          Seu próximo passo começa aqui
        </p>
        <h2 className="mt-2 font-anton text-[30px] uppercase leading-[1.08] text-white md:text-[52px]">
          Escolha seu passaporte
        </h2>
        <p className="mx-auto mt-3 max-w-3xl font-jamjuree text-[15px] leading-relaxed text-white/82 md:text-[18px]">
          Garanta seu acesso ao DSX 2026 com a modalidade que faz sentido para o
          seu momento e para o crescimento do seu negócio.
        </p>
      </div>

      {isMobile ? (
        <PassaportesMobileHomeTeste
          onBuyPassaporte={onBuyPassaporte}
          hideBuyButton={hidePassaporteButtons}
        />
      ) : (
        <PassaporteVendasHomeTeste
          onBuyPassaporte={onBuyPassaporte}
          hideBuyButton={hidePassaporteButtons}
        />
      )}
      <PassaporteGrupoHomeTeste
        onBuyPassaporte={onBuyPassaporte}
        hideBuyButton={hidePassaporteButtons}
      />
    </div>
  );
};

export default PassaportesSection;
