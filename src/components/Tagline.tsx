const BRAND = process.env.NEXT_PUBLIC_BRAND_COLOR ?? "#0e989d";

const Tagline = () => {
    return (
        <div className="mx-auto flex max-w-2xl flex-col items-center pt-16 pb-16 text-center md:pt-24">


            <h1 className="text-5xl leading-[1.05] font-black tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">

                <span
                    className="block text-4xl font-light animate-[fade-up_0.7s_ease-out_160ms_both] motion-reduce:animate-none"
                    style={{ color: BRAND }}
                >
                    Some things just <span className="text-black">click.</span>
                </span>
            </h1>

       
        </div>
    )
}

export default Tagline;
