import Image from "next/image";
import Link from "next/link";

const BRAND = process.env.NEXT_PUBLIC_BRAND_COLOR ?? "rgb(19, 19, 19)";

const Footer = () => {
    return (
        <footer className="mt-auto flex flex-col items-center gap-6 border-t border-gray-200 py-12 text-sm text-gray-500">


            {/* same crop as the header: the source PNG is a padded square */}
            <span className="relative block h-8 aspect-[1510/758] overflow-hidden opacity-80">
                <Image
                    src="/jinx-on-white.png"
                    alt="Jinx LTD"
                    width={2000}
                    height={2000}
                    sizes="90px"
                    className="absolute max-w-none"
                    style={{ width: "132.45%", height: "auto", left: "-13.58%", top: "-83.25%" }}
                />
            </span>

            <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                <Link href="/privacy" className="transition-colors hover:text-gray-900">Privacy</Link>
                <Link href="/terms" className="transition-colors hover:text-gray-900">Terms</Link>
                <Link href="/community-guidelines" className="transition-colors hover:text-gray-900">Guidelines</Link>
                <Link href="/contact" className="transition-colors hover:text-gray-900">Contact</Link>
            </nav>

            <p>© 2026 Jinx LTD</p>
        </footer>
    )
}

export default Footer;
