import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { CONTACT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
    title: "Contact | Jinx",
    description: "Get in touch with the Jinx team.",
};

const BRAND = process.env.NEXT_PUBLIC_BRAND_COLOR ?? "rgb(19, 19, 19)";

export default function Contact() {
    return (
        <LegalPage
            title="Contact"
            intro={
                <>
                    <p className="mb-6">Questions, feedback or a problem? Email us and a person will reply.</p>
                    <a
                        href={`mailto:${CONTACT_EMAIL}`}
                        className="inline-flex rounded-full px-5 py-2 text-lg text-white transition hover:-translate-y-0.5 hover:brightness-95 active:translate-y-0 active:scale-[0.98]"
                        style={{ backgroundColor: BRAND }}
                    >
                        {CONTACT_EMAIL}
                    </a>
                </>
            }
        >
            <h2>Reporting someone</h2>
            <p>
                The quickest way is in the app. Open the safety menu on any match, connection or
                chat and tap Report. It sends us the context we need, and we review every report
                within 24 hours.
            </p>
            <p>
                If you can't use the app, email us with as much detail as you can. If you're ever in
                danger, call 999.
            </p>

            <h2>Your data</h2>
            <p>
                You can delete your account in the app from Profile, Settings. For any other request
                about your data, email us and see our <a href="/privacy">privacy policy</a>.
            </p>
        </LegalPage>
    );
}
