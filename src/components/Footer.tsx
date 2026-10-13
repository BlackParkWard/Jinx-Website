import Image from "next/image";

const BRAND = process.env.NEXT_PUBLIC_BRAND_COLOR ?? "#0e989d";

const Footer = () => {
    return (
        <footer className="mt-auto flex flex-col items-center gap-6 border-t border-gray-200 py-12 text-sm text-gray-500">


            {/* same crop as the header: the source PNG is a padded square */}
            <span className="relative block h-8 aspect-[1510/758] overflow-hidden opacity-80">
                <Image
                    src="/jinx-on-white.png"
                    alt="Jinx"
                    width={2000}
                    height={2000}
                    sizes="90px"
                    className="absolute max-w-none"
                    style={{ width: "132.45%", height: "auto", left: "-13.58%", top: "-83.25%" }}
                />
            </span>

            {/* TODO: link these once the pages and a contact address exist */}
            <nav className="flex gap-6">
                <span>Privacy</span>
                <span>Terms</span>
                <span>Contact</span>
            </nav>

            <p>© 2026 Jinx</p>
        </footer>
    )
}

export default Footer;
