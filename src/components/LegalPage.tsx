import type { ReactNode } from "react";
import Footer from "./Footer";

type Props = {
    title: string;
    intro?: ReactNode;
    updated?: string;
    children: ReactNode;
};

// shared shell for the privacy, terms and contact pages: one readable column
const LegalPage = ({ title, intro, updated, children }: Props) => {
    return (
        <div className="flex h-full flex-col bg-white px-6 font-sans">
            <main className="mx-auto w-full max-w-2xl py-16 md:py-24">
                <h1 className="mb-4 text-4xl font-bold text-gray-900">{title}</h1>
                {updated && <p className="mb-8 text-sm text-gray-500">Last updated {updated}</p>}
                {intro && <div className="mb-12 text-lg text-gray-600">{intro}</div>}
                <div className="text-gray-600 [&_a]:text-gray-900 [&_a]:underline [&_a]:underline-offset-2 [&_h2]:mt-12 [&_h2]:mb-4 [&_h2]:border-t [&_h2]:border-gray-200 [&_h2]:pt-8 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-gray-900 [&_li]:mb-2 [&_p]:mb-4 [&_strong]:font-semibold [&_strong]:text-gray-900 [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-5">
                    {children}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default LegalPage;
