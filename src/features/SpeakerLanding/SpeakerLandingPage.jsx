import { useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import SpeakerLandingTemplate from "./components/SpeakerLandingTemplate";
import { getSegmentBySlug, segmentLandingList } from "./speakerLandingData";

const SegmentNotFound = () => {
  const suggestedSegments = segmentLandingList.slice(0, 8);

  return (
    <section className="min-h-screen bg-black px-4 py-16 text-white">
      <div className="mx-auto max-w-3xl rounded-3xl border border-white/15 bg-[#0A0A0A] p-8">
        <p className="font-jamjuree text-sm uppercase tracking-[0.1em] text-[#F5C02B]">
          LP de Segmento
        </p>
        <h1 className="mt-2 font-anton text-4xl uppercase">Segmento não encontrado</h1>
        <p className="mt-3 font-jamjuree text-white/80">
          Confira alguns slugs disponíveis para testar o template dinâmico:
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {suggestedSegments.map((segment) => (
            <Link
              key={segment.slug}
              to={`/lp/${segment.slug}`}
              className="rounded-full border border-[#F5C02B]/40 px-4 py-2 font-jamjuree text-sm text-[#F5C02B] transition hover:bg-[#F5C02B]/10"
            >
              {segment.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

const SpeakerLandingPage = () => {
  const { slug = "" } = useParams();
  const segment = useMemo(() => getSegmentBySlug(slug), [slug]);

  useEffect(() => {
    if (!segment) {
      document.title = "Segmento | DSX 2026";
      return;
    }

    const pageTitle = `${segment.name} | Segmento DSX 2026`;
    const pageDescription = `Trilha de ${segment.name} no DSX 2026`;

    document.title = pageTitle;

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", pageDescription);
    }
  }, [segment]);

  if (!segment) {
    return <SegmentNotFound />;
  }

  return <SpeakerLandingTemplate speaker={segment} />;
};

export default SpeakerLandingPage;
