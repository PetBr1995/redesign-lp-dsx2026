import HeroWhatsAppPage from "../components/ComponentsWhatsAppPage/HeroWhatsAppPage"
import SecondSectionWhatsAppPage from "../components/ComponentsWhatsAppPage/SeconcSectionWhatsAppPage"
import { FormButton } from "../components/FormSection"
import HeroSection from "../components/HeroSection"
import HeroSectionV2 from "../components/HeroSectionV2"
import CTAButton from "../components/Mascaras/CTAButton"
import HeaderMask from "../components/Mascaras/HeaderMask"
import MainMask from "../components/Mascaras/MainMask"
import WhatsAppButton from "../components/Mascaras/WhatsAppButton"

const WhatsappPage = () => {
    return (
        <>
            <section>
                <HeroWhatsAppPage />
                <SecondSectionWhatsAppPage />
                <div className="py-10 flex flex-col justify-center items-center">
                    <h2 className=" text-white font-jamjuree text-2xl mb-5">GRUPO VIP LIBERADO!</h2>    
                   <WhatsAppButton titulo="Entre para o grupo VIP" link="https://chat.whatsapp.com/GXEsJXjFNBi1a3LLAiG90R"/>
                </div>
            </section>
        </>
    )
}

export default WhatsappPage