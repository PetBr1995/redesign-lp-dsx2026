const TesteAnimation = () => {
    return (
      <>
        <style>
          {`
            @keyframes borderMove {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
          `}
        </style>
  
        <section className="flex justify-center items-center h-screen bg-zinc-900">
          <div
            className="bg-gradient-to-r from-red-600 via-amber-500 to-amber-300
                       bg-[length:300%_300%]
                       animate-[borderMove_3s_linear_infinite]
                       w-[252px] h-[102px] p-[2px] rounded-xl"
          >
            <div className="bg-black w-full h-full rounded-xl" />
          </div>
        </section>
      </>
    )
  }
  
  export default TesteAnimation
  