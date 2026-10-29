import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { pageMetadata } from "@/lib/seo";
import { CONTACT_EMAIL, LAST_UPDATED } from "@/lib/site";

export const metadata: Metadata = pageMetadata(
    "/terms",
    "Terms",
    "The terms for using Jinx, the free dating app with one match a day.",
);

export default function Terms() {
    return (
        <LegalPage
            title="Terms"
            updated={LAST_UPDATED}
            intro={
                <p>
                    These terms are the agreement between you and Jinx when you use the app. We've
                    tried to keep them plain. By creating an account, you agree to them and to our{" "}
                    <a href="/privacy">privacy policy</a>.
                </p>
            }
        >
            <h2>Who can use Jinx</h2>
            <ul>
                <li>You must be 18 or over.</li>
                <li>You must not have been banned from Jinx before.</li>
                <li>You must not have been convicted of a sexual or violent offence.</li>
            </ul>
            <p>You can have one account, and it's yours alone. Keep your Apple ID secure.</p>

            <h2>How it works</h2>
            <p>
                Jinx suggests one match a day. If you both connect, you get to know each other
                through rounds of questions, and you can both choose to open chat later. We can't
                promise you'll get a match every day, or that any match will work out.
            </p>
            <p>
                Jinx is currently free. If we ever add paid features, we'll explain the price
                clearly before you pay anything.
            </p>

            <h2>Be kind</h2>
            <p>When you use Jinx, you agree not to:</p>
            <ul>
                <li>harass, threaten, bully or demean anyone;</li>
                <li>post anything sexually explicit, violent, hateful or illegal;</li>
                <li>use photos that aren't of you, or that include children;</li>
                <li>pretend to be someone else or lie about your age;</li>
                <li>ask for money, promote anything, or use Jinx for commercial purposes;</li>
                <li>try to get around our contact-detail checks before chat is open;</li>
                <li>scrape, copy or interfere with the app or other people's accounts.</li>
            </ul>

            <h2>Your content</h2>
            <p>
                Your photos, answers and messages stay yours. You give us permission to store,
                check and show them to the people Jinx matches you with, only for running the app.
                That permission ends when you delete them or your account.
            </p>
            <p>
                Everything is checked before others see it, and we may remove anything that breaks
                these terms.
            </p>

            <h2>Safety</h2>
            <p>
                You can end a connection, block or report someone at any time from the safety menu.
                We review reports within 24 hours and may warn, suspend or ban accounts.
            </p>
            <p>
                We don't run criminal background checks, and we can't control how people behave
                outside the app. If you meet someone, meet in a public place, tell a friend where
                you're going, and leave if you feel uncomfortable. If you're ever in danger, call 999.
            </p>

            <h2>Ending your account</h2>
            <p>
                You can pause or delete your account at any time in Profile, Settings. We may
                suspend or close an account that breaks these terms or puts others at risk. We'll
                usually tell you why, unless doing so would put someone at risk.
            </p>

            <h2>Our responsibility</h2>
            <p>
                We work hard to keep Jinx running and safe, but we provide it as it is and can't
                promise it will always be available or free of errors. We aren't responsible for
                what other users say or do, on or off the app.
            </p>
            <p>
                Nothing in these terms limits our liability for death or personal injury caused by
                our negligence, for fraud, or for anything else that can't be limited by law. It
                doesn't affect your legal rights as a consumer.
            </p>

            <h2>Changes</h2>
            <p>
                We may update these terms as Jinx grows. If a change matters, we'll tell you in the
                app before it applies. If you don't agree, you can delete your account.
            </p>

            <h2>The law</h2>
            <p>
                These terms are governed by the law of England and Wales. If you live elsewhere in
                the UK, you can also bring a claim in your local courts.
            </p>

            <h2>Contact</h2>
            <p>
                Questions about these terms? Email{" "}
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
            </p>
        </LegalPage>
    );
}
