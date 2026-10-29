// Mirrors docs/legal/community-guidelines.md in BlackParkWard/Spark. A change to one must be made to the other.
import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { pageMetadata } from "@/lib/seo";
import { CONTACT_EMAIL, LAST_UPDATED } from "@/lib/site";

export const metadata: Metadata = pageMetadata(
    "/community-guidelines",
    "Community guidelines",
    "How we expect people to treat each other on Jinx, and what happens when they don't.",
);

export default function CommunityGuidelines() {
    return (
        <LegalPage
            title="Community guidelines"
            updated={LAST_UPDATED}
            intro={
                <p>
                    Jinx works best when everyone feels safe being themselves. These guidelines
                    explain what we expect from each other. They sit alongside our{" "}
                    <a href="/terms">terms</a>, which are the formal version.
                </p>
            }
        >
            <h2>Be yourself</h2>
            <ul>
                <li>Use your real first name and your real age.</li>
                <li>Only use photos of you, taken recently enough that you'd be recognised.</li>
                <li>Don't include children in your photos, even your own.</li>
                <li>Answer questions honestly. The point is for someone to get to know the real you.</li>
            </ul>

            <h2>Be kind</h2>
            <ul>
                <li>Treat your match the way you'd want to be treated.</li>
                <li>No harassment, threats, bullying or insults.</li>
                <li>
                    No hate. That includes anything targeting someone's race, ethnicity, religion,
                    disability, gender, sexuality or age.
                </li>
                <li>
                    If it isn't working, it's fine to end the connection. You don't owe anyone an
                    explanation, but please don't be cruel.
                </li>
            </ul>

            <h2>Keep it appropriate</h2>
            <ul>
                <li>No nudity or sexually explicit content, in photos, answers or messages.</li>
                <li>No violent, graphic or illegal content.</li>
                <li>Don't pressure anyone into anything they're not comfortable with.</li>
            </ul>

            <h2>Take your time</h2>
            <p>
                Jinx is built around getting to know someone before you chat. Please don't try to
                get around that by sharing phone numbers, social handles or other contact details
                in your answers before chat is open.
            </p>

            <h2>No scams or selling</h2>
            <ul>
                <li>Never ask anyone for money, gifts or financial details.</li>
                <li>Don't promote products, services, other apps or accounts.</li>
                <li>One account per person, and no fake or automated accounts.</li>
            </ul>
            <p>
                If someone asks you for money, no matter how good the story, please report them.
            </p>

            <h2>Meeting up</h2>
            <p>
                If you decide to meet, meet somewhere public, tell a friend where you're going, and
                get there and back on your own terms. Leave if you feel uncomfortable. If you're
                ever in danger, call 999.
            </p>

            <h2>Reporting</h2>
            <p>
                You can end a connection, block or report someone at any time from the safety menu.
                Reports are confidential, so the other person won't know it was you. We review them
                within 24 hours.
            </p>

            <h2>What happens if someone breaks these</h2>
            <p>
                Everything is checked before others see it, and we remove anything that breaks
                these guidelines. Depending on what happened, we may warn, suspend or permanently
                ban an account. Serious cases, especially anything involving a risk to someone's
                safety, may be passed to the police.
            </p>

            <h2>Contact</h2>
            <p>
                Questions, or something you'd like us to look at? Email{" "}
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
            </p>
        </LegalPage>
    );
}
