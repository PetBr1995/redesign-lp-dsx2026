const MainMask = ({link, target , titulo, textColor, backgroundColor }) => {
  return (
    <a href={link} target={target} rel="noopener noreferrer">

      <section className="font-jamjuree flex justify-center items-center">
        {/* ESQUERDA */}
        <div
          className="
        relative
        rounded-[16px]
        bg-linear-to-r from-[#8E3EEB] to-[#E0474A]
        p-0.5
        
        after:content-['']
        after:absolute
        after:top-[12px]
        after:bottom-0.5
        after:right-[-5px]
        after:w-[11px]
        after:h-[20px]
        after:bg-(--afterBackground)
        after:z-10
        "
          style={{ '--afterBackground': backgroundColor }}
        >
          <div className="flex justify-center items-center rounded-[14px] w-[200px] h-10" style={{ backgroundColor: backgroundColor }}>
            <p className="uppercase text-[13px] font-bold" style={{ color: textColor }}>{titulo}</p>
          </div>
        </div>

        {/* DIREITA */}
        <div className="relative -ml-0.5 rounded-[16px] bg-linear-to-r from-[#E0474A] to-[#E0474A] p-0.5">
          <div className="flex justify-center items-center rounded-[14px] w-[50px] h-10" style={{ backgroundColor: backgroundColor }}>
            <img src="/Arrow-1.svg" alt="" aria-hidden="true" className="w-[20px] h-auto " />
          </div>
        </div>
      </section>
    </a>
  )
}

export default MainMask
