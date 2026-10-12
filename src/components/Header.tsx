import Image from "next/image";

const Header = () => {
    return (
        <header className="w-full h-[100px] bg-white pl-8 flex items-center justify-start">
            <h1 className="font-chango text-4xl">P<span style={{ color: process.env.NEXT_PUBLIC_BRAND_COLOR }}>OO</span>L</h1>
        </header>
    )
}

export default Header;