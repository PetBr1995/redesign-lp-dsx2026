const BannerSection = () => {
    return (
        <section className="w-full">
            <a 
                href="https://chat.whatsapp.com/GXEsJXjFNBi1a3LLAiG90R" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block"
            >
                <picture>
                    <source
                        media="(max-width: 768px)"
                        type="image/avif"
                        srcSet="/optimized/step1/12-[DSX]-Grupo-VIP-BANNER-LP-MOBILE.avif"
                    />
                    <source
                        media="(max-width: 768px)"
                        type="image/webp"
                        srcSet="/optimized/step1/12-[DSX]-Grupo-VIP-BANNER-LP-MOBILE.webp"
                    />
                    <source
                        media="(max-width: 768px)"
                        srcSet="/12-[DSX]-Grupo-VIP-BANNER-LP-MOBILE.png"
                    />
                    <source
                        type="image/avif"
                        srcSet="/optimized/step1/12-[DSX]-Grupo-VIP-BANNER-LP-WEB.avif"
                    />
                    <source
                        type="image/webp"
                        srcSet="/optimized/step1/12-[DSX]-Grupo-VIP-BANNER-LP-WEB.webp"
                    />
                    <img
                        className="w-full h-auto object-contain"
                        src="/12-[DSX]-Grupo-VIP-BANNER-LP-WEB.png"
                        alt="banner-grupo-vip"
                    />
                </picture>
            </a>
        </section>
    )
}

export default BannerSection
