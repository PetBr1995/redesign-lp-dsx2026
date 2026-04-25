import { Instagram, Youtube } from "lucide-react";
import { FaTiktok } from "react-icons/fa";

const RedesSociais = () => {
  return (
    <section
      className="
        bg-white
        py-14
        relative
        overflow-hidden

        after:content-['']
        after:absolute
        after:bottom-[-80px]
        after:left-1/2
        after:-translate-x-1/2
        after:bg-[url(/vector-26.svg)]
        after:w-[420px]
        after:h-[140px]
        after:bg-cover
        after:bg-center
        after:bg-no-repeat
      "
    >
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <h3 className="font-anton uppercase text-3xl sm:text-4xl text-center">
          Siga-nos e acompanhe os nossos conteúdos nas redes sociais
        </h3>

        <div className="flex flex-wrap justify-center items-center gap-4 my-8">
          {/* Instagram DSX */}
          <a
            href="https://www.instagram.com/dsx.summit/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 bg-black px-4 py-2 rounded-md text-white hover:bg-zinc-800 transition hover:scale-[1.03]"
          >
            <Instagram size={18} />
            @dsx.summit
          </a>

          {/* Instagram Digital Hub */}
          <a
            href="https://www.instagram.com/digitalhub.experience/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 bg-black px-4 py-2 rounded-md text-white hover:bg-zinc-800 transition hover:scale-[1.03]"
          >
            <Instagram size={18} />
            @digitalhub.experience
          </a>

          {/* TikTok */}
          <a
            href="https://www.tiktok.com/@dsx.summit"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 bg-black px-4 py-2 rounded-md text-white hover:bg-zinc-800 transition hover:scale-[1.03]"
          >
            <FaTiktok size={18} />
            @dsx.summit
          </a>

          {/* YouTube */}
          <a
            href="https://www.youtube.com/@dsx.summit"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 bg-black px-4 py-2 rounded-md text-white hover:bg-zinc-800 transition hover:scale-[1.03]"
          >
            <Youtube size={18} />
            @dsx.summit
          </a>
        </div>
      </div>
    </section>
  );
};

export default RedesSociais;
