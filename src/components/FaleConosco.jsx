import CTAButton from "./Mascaras/CTAButton";
import HeaderMask from "./Mascaras/HeaderMask"
import { motion } from "framer-motion";
const FaleConosco = () => {


  const cardInf = [
    {
      titulo: "Presença de marca",
      img: "/thumb_card_1.png",
      avif: "/optimized/step1/thumb_card_1.avif",
      webp: "/optimized/step1/thumb_card_1.webp",
    },
    {
      titulo: "Negócios gerados",
      img: "/thumb_card_2.png",
      avif: "/optimized/step1/thumb_card_2.avif",
      webp: "/optimized/step1/thumb_card_2.webp",
    },
    {
      titulo: "Conexões estratégicas",
      img: "/thumb_card_3.png",
      avif: "/optimized/step1/thumb_card_3.avif",
      webp: "/optimized/step1/thumb_card_3.webp",
    },
    {
      titulo: "Visibilidade integrada",
      img: "/thumb_card_4.png",
      avif: "/optimized/step1/thumb_card_4.avif",
      webp: "/optimized/step1/thumb_card_4.webp",
    },
  ]
  return (


    <section
      id="faleconosco"
      className="
          relative
          bg-modern-image
          bg-cover 
          bg-center 
          bg-black
          bg-no-repeat
          bg-center 
          py-5
          sm:py-10
          md:py-15
        "
      style={{
        "--bg-image-fallback": "url('/optimized/step1/banner-patrocinador.webp')",
        "--bg-image-modern":
          "image-set(url('/optimized/step1/banner-patrocinador.avif') type('image/avif'))",
      }}
    >
      {/* Overlay */}


      {/* Conteúdo */}
      <div className="relative z-10">

        <h3 className="relative z-20 font-anton uppercase pb-6 text-white font-bebas text-3xl md:text-5xl text-center">
          Seja um patrocinador ou expositor <br /> no DSX 2026
        </h3>

        <p className="relative z-20 font-jamjuree text-center text-[#F5D247] text-xl uppercase">
          Como as empresas que escolheram estar na 1ª edição.
        </p>
        <div className="py-4 px-4 max-w-7xl mx-auto grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {cardInf.map((item) => (
            <div key={item.titulo} className="mx-auto">
              <picture>
                <source srcSet={item.avif} type="image/avif" />
                <source srcSet={item.webp} type="image/webp" />
                <img src={item.img} alt="image" />
              </picture>
              <h4 className="text-center mt-5 text-white font-jamjuree uppercase">
                {item.titulo}
              </h4>
            </div>
          ))}
        </div>


        <div className="relative z-20 py-10 flex justify-center items-center">
          <HeaderMask
            titulo="seja patrocinador"
            textColor="#ffffff"
            link="https://wa.me/5592936180463"
            target="_blank"
          />
        </div>
      </div>
    </section>
  );
};

export default FaleConosco;

