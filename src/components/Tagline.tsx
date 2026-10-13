const Tagline = () => {
    return (
        <div className=" mx-auto  py-20 flex flex-col gap-4 justify-center items-center h-max">
            <h1 style={{ color: process.env.NEXT_PUBLIC_BRAND_COLOR }} className="font-black text-5xl lg:text-6xl text-center animate-[fade-up_0.7s_ease-out_both] motion-reduce:animate-none">
                STOP SWIPING
            </h1>
            <h2 className="font-light text-3xl  lg:text-4xl text-center animate-[fade-up_0.7s_ease-out_150ms_both] motion-reduce:animate-none">
                START CONNECTING
            </h2>
        </div>
    )
}

export default Tagline;