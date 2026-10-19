import LogoOutline from "./LogoOutline";

const BRAND = process.env.NEXT_PUBLIC_BRAND_COLOR ?? "rgb(19, 19, 19)";

const Tagline = () => {
    return (
        <div className="mx-auto flex max-w-2xl flex-col items-center pt-16 pb-16 text-center md:pt-24">
            <LogoOutline className="mb-8 w-48 text-white sm:w-60" />

            <h1 className="text-5xl leading-[1.05] font-black tracking-tight text-white sm:text-6xl lg:text-7xl">

                <span
                    className="block text-4xl text-white font-bold  animate-[fade-up_0.7s_ease-out_160ms_both] motion-reduce:animate-none"
                    // style={{ color: BRAND }}
                >
                    Some things just <span className="text-white">click.</span>
                </span>
            </h1>

       
        </div>
    )
}

export default Tagline;
