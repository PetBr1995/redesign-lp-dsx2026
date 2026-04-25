import { Suspense, lazy, useEffect, useMemo, useState } from "react";

const Header = lazy(() => import("../components/Header"));
const Footer = lazy(() => import("../components/Footer"));

const checkoutMock = {
  produto: "Passaporte DSX 2026 - Standard",
  lote: "1º Lote",
  local: "Studio 5 Centro de Convenções - Manaus/AM",
  data: "13 e 14 de março de 2026",
  valor: 297,
  taxa: 0,
  maxParcelas: 3,
};

function formatCurrency(value) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

function onlyDigits(value = "") {
  return value.replace(/\D/g, "");
}

function formatCardNumber(value = "") {
  const digits = onlyDigits(value).slice(0, 16);
  return digits.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
}

function formatExpiry(value = "") {
  const digits = onlyDigits(value).slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

function formatCvv(value = "") {
  return onlyDigits(value).slice(0, 4);
}

function formatCpf(value = "") {
  const digits = onlyDigits(value).slice(0, 11);
  return digits
    .replace(/^(\d{3})(\d)/, "$1.$2")
    .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1-$2");
}

function detectCardBrand(value = "") {
  const digits = onlyDigits(value);
  if (!digits) return null;

  if (digits.startsWith("4")) return "visa";

  const firstTwo = Number(digits.slice(0, 2));
  const firstFour = Number(digits.slice(0, 4));
  if (
    (firstTwo >= 51 && firstTwo <= 55) ||
    (firstFour >= 2221 && firstFour <= 2720)
  ) {
    return "mastercard";
  }

  return null;
}

function getCardBrandIcon(brand) {
  if (!brand) return null;
  return `/icons-card/${brand}.svg`;
}

const Checkout = () => {
  const [parcelas, setParcelas] = useState(1);
  const [isCardBack, setIsCardBack] = useState(false);
  const [pagamentoConcluido, setPagamentoConcluido] = useState(false);
  const [form, setForm] = useState({
    nome: "",
    email: "",
    cpf: "",
    cartao: "",
    validade: "",
    cvv: "",
  });

  useEffect(() => {
    const pageTitle = "Finalizar Compra | Passaporte DSX 2026";
    const pageDescription =
      "Finalize seu pedido do Passaporte DSX 2026 com pagamento em até 3x sem juros.";
    const pageUrl = `${window.location.origin}/checkout`;
    const ogImage = `${window.location.origin}/dsx2026.png`;

    document.title = pageTitle;

    const updates = [
      { type: "name", key: "description", value: pageDescription },
      { type: "name", key: "robots", value: "noindex, nofollow" },
      { type: "name", key: "googlebot", value: "noindex, nofollow" },
      { type: "property", key: "og:type", value: "website" },
      { type: "property", key: "og:title", value: pageTitle },
      { type: "property", key: "og:description", value: pageDescription },
      { type: "property", key: "og:url", value: pageUrl },
      { type: "property", key: "og:image", value: ogImage },
      { type: "name", key: "twitter:card", value: "summary_large_image" },
      { type: "name", key: "twitter:title", value: pageTitle },
      { type: "name", key: "twitter:description", value: pageDescription },
      { type: "name", key: "twitter:image", value: ogImage },
    ];

    const previousTags = updates.map((item) => {
      const selector =
        item.type === "name"
          ? `meta[name="${item.key}"]`
          : `meta[property="${item.key}"]`;
      let tag = document.head.querySelector(selector);
      const existed = Boolean(tag);
      const previousContent = tag?.getAttribute("content");

      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute(item.type, item.key);
        document.head.appendChild(tag);
      }

      tag.setAttribute("content", item.value);
      return { tag, existed, previousContent };
    });

    const canonicalSelector = 'link[rel="canonical"]';
    let canonicalTag = document.head.querySelector(canonicalSelector);
    const canonicalExisted = Boolean(canonicalTag);
    const previousCanonical = canonicalTag?.getAttribute("href");

    if (!canonicalTag) {
      canonicalTag = document.createElement("link");
      canonicalTag.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalTag);
    }

    canonicalTag.setAttribute("href", pageUrl);

    return () => {
      previousTags.forEach(({ tag, existed, previousContent }) => {
        if (!existed) {
          tag.remove();
          return;
        }

        if (previousContent === null) {
          tag.removeAttribute("content");
        } else {
          tag.setAttribute("content", previousContent);
        }
      });

      if (!canonicalExisted) {
        canonicalTag?.remove();
      } else if (previousCanonical === null) {
        canonicalTag?.removeAttribute("href");
      } else {
        canonicalTag?.setAttribute("href", previousCanonical);
      }
    };
  }, []);

  const valorTotal = useMemo(
    () => checkoutMock.valor + checkoutMock.taxa,
    [],
  );

  const valorParcela = useMemo(
    () => valorTotal / parcelas,
    [valorTotal, parcelas],
  );
  const parcelOptions = useMemo(
    () => Array.from({ length: checkoutMock.maxParcelas }, (_, index) => index + 1),
    [],
  );

  const cardNumberPreview = useMemo(() => {
    if (!form.cartao) return "0000 0000 0000 0000";
    return formatCardNumber(form.cartao);
  }, [form.cartao]);

  const cardNamePreview = useMemo(() => {
    if (!form.nome) return "NOME DO TITULAR";
    return form.nome.toUpperCase();
  }, [form.nome]);

  const cardExpiryPreview = useMemo(() => {
    if (!form.validade) return "MM/AA";
    return formatExpiry(form.validade);
  }, [form.validade]);

  const cardCvvPreview = useMemo(() => {
    if (!form.cvv) return "***";
    return formatCvv(form.cvv).padEnd(3, "*");
  }, [form.cvv]);

  const cardBrand = useMemo(() => detectCardBrand(form.cartao), [form.cartao]);
  const cardBrandIcon = useMemo(() => getCardBrandIcon(cardBrand), [cardBrand]);

  const podePagar = useMemo(() => {
    return Object.values(form).every((value) => value.trim().length > 0);
  }, [form]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!podePagar) return;
    setPagamentoConcluido(true);
  };

  return (
    <section className="min-h-screen bg-black text-white">
      <Suspense fallback={<div className="h-[75px]" aria-hidden="true" />}>
        <Header />
      </Suspense>

      <div className="pt-[110px] pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-anton uppercase text-4xl md:text-6xl leading-none text-center">
            checkout dsx 2026
          </h1>
          <p className="font-jamjuree text-center text-white/70 mt-2 uppercase tracking-wide">
            Simulação de pagamento com parcelamento em até 3x sem juros
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6 mt-10">
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-white/15 bg-white/[0.03] p-5 md:p-7"
            >
              <h2 className="font-anton uppercase text-3xl">Dados do pagamento</h2>

              <div className="mt-5 [perspective:1000px]">
                <div
                  className="relative h-56 w-full transition-transform duration-500 [transform-style:preserve-3d]"
                  style={{ transform: isCardBack ? "rotateY(180deg)" : "rotateY(0deg)" }}
                >
                  <div className="absolute inset-0 rounded-2xl border border-[#F3CB46]/60 bg-gradient-to-br from-[#1e1e1e] via-[#0a0a0a] to-[#332510] p-5 [backface-visibility:hidden]">
                    <div className="flex justify-between items-center">
                      <p className="font-jamjuree text-xs uppercase text-white/70">Cartão de crédito</p>
                      {cardBrandIcon && (
                        <img
                          src={cardBrandIcon}
                          alt={cardBrand === "visa" ? "Visa" : "Mastercard"}
                          className="h-7 w-auto"
                        />
                      )}
                    </div>
                    <p className="font-jamjuree text-2xl md:text-3xl tracking-[0.16em] mt-10">
                      {cardNumberPreview}
                    </p>
                    <div className="flex justify-between items-end mt-8">
                      <div>
                        <p className="font-jamjuree text-[10px] text-white/55 uppercase">Titular</p>
                        <p className="font-jamjuree text-sm uppercase">{cardNamePreview}</p>
                      </div>
                      <div>
                        <p className="font-jamjuree text-[10px] text-white/55 uppercase">Validade</p>
                        <p className="font-jamjuree text-sm">{cardExpiryPreview}</p>
                      </div>
                    </div>
                  </div>

                  <div className="absolute inset-0 rounded-2xl border border-[#F3CB46]/60 bg-gradient-to-br from-[#141414] via-[#050505] to-[#2b210f] p-5 [transform:rotateY(180deg)] [backface-visibility:hidden]">
                    <div className="h-10 bg-white/90 mt-4 rounded-sm" />
                    <div className="mt-6 flex justify-end">
                      <div className="w-28 rounded-md bg-white/95 text-black p-2">
                        <p className="font-jamjuree text-[10px] text-right uppercase">CVV</p>
                        <p className="font-jamjuree text-right tracking-widest">{cardCvvPreview}</p>
                      </div>
                    </div>
                    <p className="font-jamjuree text-xs text-white/60 mt-8">
                      Este é um checkout simulado para demonstração.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
                <input
                  type="text"
                  placeholder="Nome completo"
                  className="p-3 rounded-xl bg-black/40 border border-white/20 focus:outline-none focus:border-[#F5A205]"
                  value={form.nome}
                  onChange={(e) => setForm((prev) => ({ ...prev, nome: e.target.value }))}
                  onFocus={() => setIsCardBack(false)}
                />
                <input
                  type="email"
                  placeholder="E-mail"
                  className="p-3 rounded-xl bg-black/40 border border-white/20 focus:outline-none focus:border-[#F5A205]"
                  value={form.email}
                  onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                  onFocus={() => setIsCardBack(false)}
                />
                <input
                  type="text"
                  placeholder="CPF"
                  className="p-3 rounded-xl bg-black/40 border border-white/20 focus:outline-none focus:border-[#F5A205]"
                  value={form.cpf}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, cpf: formatCpf(e.target.value) }))
                  }
                  onFocus={() => setIsCardBack(false)}
                />
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Número do cartão"
                    className="w-full p-3 pr-28 rounded-xl bg-black/40 border border-white/20 focus:outline-none focus:border-[#F5A205]"
                    value={form.cartao}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, cartao: formatCardNumber(e.target.value) }))
                    }
                    onFocus={() => setIsCardBack(false)}
                  />
                  {cardBrandIcon && (
                    <img
                      src={cardBrandIcon}
                      alt={cardBrand === "visa" ? "Visa" : "Mastercard"}
                      className="absolute right-3 top-1/2 -translate-y-1/2 h-6 w-auto"
                    />
                  )}
                </div>
                <input
                  type="text"
                  placeholder="Validade (MM/AA)"
                  className="p-3 rounded-xl bg-black/40 border border-white/20 focus:outline-none focus:border-[#F5A205]"
                  value={form.validade}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, validade: formatExpiry(e.target.value) }))
                  }
                  onFocus={() => setIsCardBack(false)}
                />
                <input
                  type="text"
                  placeholder="CVV"
                  className="p-3 rounded-xl bg-black/40 border border-white/20 focus:outline-none focus:border-[#F5A205]"
                  value={form.cvv}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, cvv: formatCvv(e.target.value) }))
                  }
                  onFocus={() => setIsCardBack(true)}
                  onBlur={() => setIsCardBack(false)}
                />
              </div>

              <div className="mt-6">
                <p className="font-jamjuree uppercase text-sm text-white/70 mb-3">Parcelamento</p>

                <div className="relative max-w-md">
                  <select
                    value={parcelas}
                    onChange={(e) => setParcelas(Number(e.target.value))}
                    className="w-full appearance-none rounded-xl border border-[#F5A205]/40 bg-black/35 p-3 pr-10 text-white font-jamjuree focus:outline-none focus:border-[#F5A205]"
                  >
                    {parcelOptions.map((parcela) => (
                      <option key={parcela} value={parcela} className="bg-[#111111]">
                        {parcela}x de {formatCurrency(valorTotal / parcela)} sem juros
                      </option>
                    ))}
                  </select>
                  <img
                    src="/arrow-down.svg"
                    alt="Abrir opções"
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 opacity-80"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={!podePagar}
                className="mt-8 w-full rounded-2xl bg-gradient-to-r from-[#F3CB46] to-[#E7A040] text-black font-jamjuree uppercase font-bold py-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Simular pagamento
              </button>

              {pagamentoConcluido && (
                <div className="mt-4 rounded-xl border border-[#12DB98]/50 bg-[#12DB98]/10 p-4">
                  <p className="font-jamjuree text-[#12DB98] font-semibold">
                    Pagamento simulado com sucesso.
                  </p>
                  <p className="font-jamjuree text-sm text-white/80 mt-1">
                    Seu pedido foi registrado em {parcelas}x de {formatCurrency(valorParcela)} sem juros.
                  </p>
                </div>
              )}
            </form>

            <aside className="h-fit rounded-2xl border border-white/15 bg-white/[0.03] p-5 md:p-7">
              <h2 className="font-anton uppercase text-3xl">Resumo do pedido</h2>

              <div className="mt-5 space-y-3 font-jamjuree">
                <div>
                  <p className="text-white/60 text-sm uppercase">Produto</p>
                  <p className="font-semibold">{checkoutMock.produto}</p>
                </div>

                <div className="flex justify-between gap-4">
                  <div>
                    <p className="text-white/60 text-sm uppercase">Lote</p>
                    <p>{checkoutMock.lote}</p>
                  </div>
                  <div>
                    <p className="text-white/60 text-sm uppercase">Data</p>
                    <p>{checkoutMock.data}</p>
                  </div>
                </div>

                <div>
                  <p className="text-white/60 text-sm uppercase">Local</p>
                  <p>{checkoutMock.local}</p>
                </div>
              </div>

              <div className="border-t border-white/15 mt-6 pt-4 space-y-2 font-jamjuree">
                <div className="flex justify-between text-white/75">
                  <span>Ingresso</span>
                  <span>{formatCurrency(checkoutMock.valor)}</span>
                </div>
                <div className="flex justify-between text-white/75">
                  <span>Taxa</span>
                  <span>{formatCurrency(checkoutMock.taxa)}</span>
                </div>
                <div className="flex justify-between text-xl font-semibold text-[#F3CB46]">
                  <span>Total</span>
                  <span>{formatCurrency(valorTotal)}</span>
                </div>
              </div>

              <div className="mt-5 rounded-xl border border-white/15 bg-black/30 p-4 font-jamjuree">
                <p className="uppercase text-sm text-white/70">Forma de pagamento</p>
                <p className="mt-1">Cartão de crédito em até 3x sem juros</p>
                <p className="mt-2 text-sm text-[#F3CB46]">
                  Selecionado: {parcelas}x de {formatCurrency(valorParcela)}
                </p>
              </div>
            </aside>
          </div>
        </div>
      </div>

      <Suspense fallback={<div className="h-[120px]" aria-hidden="true" />}>
        <Footer />
      </Suspense>
    </section>
  );
};

export default Checkout;
