const Footer = () => {
  return (
    <footer
      className="
          relative
          py-6
          bg-black
        "
    >
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <img
          src="/logo-dsx-horizontal.svg"
          alt="Vem aí DSX"
          className="w-[150px]"
        />

        <div className="font-jamjuree text-center text-sm leading-relaxed">
          <p className="text-white">10.279.661/0001-51</p>
          <p className="text-white">© 2026 Digital Hub Experience.</p>
          <p className="text-white">Todos os direitos reservados.</p>
        </div>

        <img
          src="/logo-digitalhub-branca.svg"
          alt="Powered by Digital Hub"
          className="w-[180px]"
        />
      </div>
    </footer>
  );
};

export default Footer;
