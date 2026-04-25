const FooterSection = () => {
  return (
    <footer className="relative bg-black px-4 pb-8 pt-2">
      <div className="mx-auto max-w-6xl rounded-2xl border border-[#4D3D19] bg-[#130E07] px-4 py-6 text-center md:px-8">
        <p className="text-[14px] text-white/90 md:text-[15px]">
          Pagamento 100% seguro · Parcelamento em até 12x
        </p>

        <div className="pt-3">
          <p className="text-[13px] text-white/75 md:text-[14px]">
            DSX — Digital Summit Experience © 2026 · Realização: Digital Hub Experience · Todos os direitos reservados.
          </p>
          <p className="mt-1 text-[13px] text-white/75 md:text-[14px]">
            CNPJ 10.279.661/0001-51
          </p>
          <p className="mt-1 text-[13px] text-white/75 md:text-[14px]">
            Endereço eletrônico: https://dsx.com.vc
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
