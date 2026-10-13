import Image from "next/image";

const Header = () => {
    return (
        <header className="w-full h-[100px] shrink-0 bg-white pl-8 flex items-center justify-start">
            <h1>
                {/* the source PNG is a padded square, so crop to the wordmark */}
                <span className="relative block h-11 aspect-[1510/758] overflow-hidden">
                    <Image
                        src="/jinx-on-white.png"
                        alt="Jinx"
                        width={2000}
                        height={2000}
                        sizes="120px"
                        preload
                        className="absolute max-w-none"
                        style={{ width: "132.45%", height: "auto", left: "-13.58%", top: "-83.25%" }}
                    />
                </span>
            </h1>
        </header>
    )
}

export default Header;
